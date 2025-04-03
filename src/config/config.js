import dotenv from 'dotenv';

dotenv.config();

const config = {
    apiKey: process.env.API_KEY,
    outputDir: './results',
    port: process.env.PORT || 3000,
};

export default config;