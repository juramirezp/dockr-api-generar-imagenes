import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }
        req.user = user;
        next();
    });
};

export default authMiddleware;