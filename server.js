const express = require('express');
const bodyParser = require('body-parser');
const imageRoutes = require('./src/routes/imageRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const config = require('./src/config/config');

const app = express();
const PORT = config.port || 3000;

app.use(bodyParser.json());
app.use('/api/images', imageRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});