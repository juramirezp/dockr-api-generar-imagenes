import express from 'express';
import ImageController from '../controllers/imageController.js';

const router = express.Router();
const imageController = new ImageController();

const setRoutes = (app) => {
    router.post('/generate', imageController.createImage.bind(imageController));
    app.use('/api/images', router);
};

export default setRoutes;