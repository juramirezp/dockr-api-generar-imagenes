import GenerationService from "../services/generationService.js"; // Importar el servicio

class ImageController {
	constructor() {
		this.generationService = new GenerationService(); // Instanciar internamente
	}

	async createImage(req, res) {
		const { prompt } = req.body;

		if (!prompt) {
			return res.status(400).json({ error: "El prompt es requerido." });
		}

		try {
			const images = await this.generationService.generateImages(prompt);
			return res.status(200).json({ images });
		} catch (error) {
			return res.status(500).json({ error: "Error al generar imágenes.", details: error.message });
		}
	}
}

export default ImageController;
