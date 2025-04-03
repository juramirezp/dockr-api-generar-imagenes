FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV PORT=3000
ENV NODE_ENV=production
# La API key real debe ser proporcionada al ejecutar el contenedor
ENV GOOGLE_API_KEY=AIzaSyBmCSu5Gu6MRtx5N3gHC31KbYFKWrRAOKg

EXPOSE 3000

CMD ["node", "src/app.js"]