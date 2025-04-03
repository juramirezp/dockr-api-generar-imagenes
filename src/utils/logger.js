import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, 'app.log');

const logger = {
    info: (message) => {
        const logMessage = `[INFO] ${new Date().toISOString()}: ${message}\n`;
        console.log(logMessage);
        fs.appendFileSync(logFilePath, logMessage);
    },
    error: (message) => {
        const logMessage = `[ERROR] ${new Date().toISOString()}: ${message}\n`;
        console.error(logMessage);
        fs.appendFileSync(logFilePath, logMessage);
    },
    warn: (message) => {
        const logMessage = `[WARN] ${new Date().toISOString()}: ${message}\n`;
        console.warn(logMessage);
        fs.appendFileSync(logFilePath, logMessage);
    }
};

export default logger;