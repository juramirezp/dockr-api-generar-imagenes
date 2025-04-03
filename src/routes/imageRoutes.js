import express from "express";
import ImageController from "../controllers/imageController.js";

const router = express.Router();
const imageController = new ImageController();

// Definir las rutas directamente en el router
router.post("/generate", imageController.createImage.bind(imageController));

// Exportar el router directamente
export default router;
