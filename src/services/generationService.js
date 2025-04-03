import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import mime from "mime-types";

class GenerationService {
	constructor(apiKey) {
		this.apiKey = apiKey || process.env.GOOGLE_API_KEY;

		if (!this.apiKey) {
			throw new Error("Se requiere una API Key de Google para el servicio de generación");
		}

		this.genAI = new GoogleGenerativeAI(this.apiKey);
		this.model = this.genAI.getGenerativeModel({
			model: "gemini-2.0-flash", // Mantenemos el modelo original
			// model: "gemini-2.0-flash-exp-image-generation", // Mantenemos el modelo original
		});
	}

	async generateImages(prompt) {
		// Configuración ajustada para eliminar parámetros problemáticos
		const generationConfig = {
			temperature: 1,
			topP: 0.95,
			topK: 40,
			maxOutputTokens: 8192,
		};

		try {
			// Intentamos usar directamente generateContent en lugar de startChat
			const result = await this.model.generateContent({
				contents: [{ role: "user", parts: [{ text: prompt }] }],
				generationConfig,
			});

			console.log("Respuesta de la API:", JSON.stringify(result, null, 2));

			// Procesamos la respuesta para extraer las imágenes
			return this.processImageResponse(result);
		} catch (error) {
			console.error("Error completo:", error);
			throw new Error("Error durante la generación de imágenes: " + error.message);
		}
	}

	// Método para procesar la respuesta y extraer las imágenes
	processImageResponse(result) {
		const outputDir = "./results";
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		const response = result.response;
		const timestamp = new Date().getTime();
		let images = [];

		// Extraer las partes que contienen imágenes
		try {
			const candidates = [response];
			candidates.forEach((candidate, candidateIndex) => {
				const parts = candidate.text ? [{ text: candidate.text }] : candidate.parts || [];

				parts.forEach((part, partIndex) => {
					if (part.inlineData && part.inlineData.data && part.inlineData.mimeType) {
						try {
							const extension = mime.extension(part.inlineData.mimeType) || "png";
							const filename = `imagen_${timestamp}_${candidateIndex}_${partIndex}.${extension}`;
							const filepath = path.join(outputDir, filename);
							fs.writeFileSync(filepath, Buffer.from(part.inlineData.data, "base64"));

							images.push({
								filename: filename,
								path: filepath,
								mimeType: part.inlineData.mimeType,
							});
						} catch (err) {
							console.error(`Error al guardar la imagen: ${err.message}`);
						}
					}
				});
			});
		} catch (error) {
			console.error("Error al procesar las imágenes:", error);
		}

		// Si no se encontraron imágenes, creamos un archivo de texto con el prompt
		if (images.length === 0) {
			const textFilename = path.join(outputDir, `solicitud_${timestamp}.txt`);
			fs.writeFileSync(textFilename, `Prompt solicitado: ${JSON.stringify(result, null, 2)}`);

			return {
				success: false,
				message: "No se pudieron generar imágenes. Revisa los registros para más detalles.",
				timestamp: timestamp,
				responseLog: textFilename,
			};
		}

		return {
			success: true,
			count: images.length,
			images: images,
			timestamp: timestamp,
		};
	}

	// El método original saveImages por si necesitamos mantenerlo
	saveImages(candidates) {
		const outputDir = "./results";
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		let images = [];
		const timestamp = new Date().getTime();

		candidates.forEach((candidate, candidateIndex) => {
			const parts = candidate.content?.parts || [];
			parts.forEach((part, partIndex) => {
				if (part.inlineData && part.inlineData.data && part.inlineData.mimeType) {
					try {
						const extension = mime.extension(part.inlineData.mimeType) || "png";
						const filename = `imagen_${timestamp}_${candidateIndex}_${partIndex}.${extension}`;
						const filepath = path.join(outputDir, filename);
						fs.writeFileSync(filepath, Buffer.from(part.inlineData.data, "base64"));

						images.push({
							filename: filename,
							path: filepath,
							mimeType: part.inlineData.mimeType,
						});
					} catch (err) {
						console.error(`Error al guardar la imagen: ${err.message}`);
					}
				}
			});
		});

		return {
			success: true,
			count: images.length,
			images: images,
			timestamp: timestamp,
		};
	}
}

export default GenerationService;
