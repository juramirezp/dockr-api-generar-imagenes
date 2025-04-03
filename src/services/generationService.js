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
			model: "gemini-2.0-flash-exp-image-generation",
		});
	}

	async generateImages(prompt) {
		const generationConfig = {
			temperature: 1,
			topP: 0.95,
			topK: 40,
			maxOutputTokens: 8192,
			responseModalities: ["image", "text"],
			responseMimeType: "text/plain",
		};

		try {
			const chatSession = this.model.startChat({
				generationConfig,
				history: [],
			});

			const result = await chatSession.sendMessage(prompt);
			return this.saveImages(result.response.candidates);
		} catch (error) {
			throw new Error("Error durante la generación de imágenes: " + error.message);
		}
	}

	saveImages(candidates) {
		const outputDir = "./results";
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir);
		}

		let imageCount = 0;

		candidates.forEach((candidate, candidateIndex) => {
			const parts = candidate.content?.parts || [];
			parts.forEach((part, partIndex) => {
				if (part.inlineData && part.inlineData.data && part.inlineData.mimeType) {
					try {
						const extension = mime.extension(part.inlineData.mimeType) || "png";
						const filename = path.join(outputDir, `imagen_${candidateIndex}_${partIndex}.${extension}`);
						fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
						imageCount++;
					} catch (err) {
						console.error(`Error al guardar la imagen: ${err.message}`);
					}
				}
			});
		});

		return imageCount;
	}
}

export default GenerationService;
