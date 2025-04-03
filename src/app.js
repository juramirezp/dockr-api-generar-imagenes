import express from "express";
import bodyParser from "body-parser";
import imageRoutes from "./routes/imageRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/images", imageRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
