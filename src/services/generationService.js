import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import mime from "mime-types";

class GenerationService {
	constructor(apiKey) {
		this.apiKey = apiKey || process.env.GOOGLE_API_KEY;

		if (!this.apiKey) {
			throw new Error("Se requiere una API Key de Google para el servicio de generación");
		}

		// Usamos la nueva sintaxis de la biblioteca
		this.ai = new GoogleGenAI({ apiKey: this.apiKey });
	}

	async generateImages(prompt) {
		// Configuración ajustada
		const generationConfig = {
			temperature: 1,
			topP: 0.95,
			topK: 40,
			maxOutputTokens: 8192,
		};

		try {
			// Usamos la nueva sintaxis
			const response = await this.ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: prompt,
				generationConfig,
			});

			console.log("Respuesta de la API:", JSON.stringify(response, null, 2));

			// Guardamos la respuesta como texto
			return this.saveResponse(response, prompt);
		} catch (error) {
			console.error("Error completo:", error);
			throw new Error("Error durante la generación de imágenes: " + error.message);
		}
	}

	// Nuevo método para guardar respuestas en formato texto
	saveResponse(response, prompt) {
		const outputDir = "./results";
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		const timestamp = new Date().getTime();
		const textFilename = `respuesta_${timestamp}.txt`;
		const filepath = path.join(outputDir, textFilename);

		// Guardamos la respuesta en un archivo
		let content = `Prompt: ${prompt}\n\n`;
		content += `Respuesta: ${response.text || JSON.stringify(response, null, 2)}`;
		fs.writeFileSync(filepath, content);

		return {
			success: true,
			message: "Se ha generado la respuesta correctamente",
			timestamp: timestamp,
			responsePath: filepath,
			text: response.text || "",
			prompt: prompt,
		};
	}

	// Mantenemos el método antiguo por compatibilidad
	processImageResponse(result) {
		const outputDir = "./results";
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		const timestamp = new Date().getTime();
		const textFilename = `respuesta_${timestamp}.txt`;
		const filepath = path.join(outputDir, textFilename);

		fs.writeFileSync(filepath, JSON.stringify(result, null, 2));

		return {
			success: true,
			message: "Se ha guardado la respuesta",
			timestamp: timestamp,
			responsePath: filepath,
			text: result.text || "",
		};
	}
}

export default GenerationService;
