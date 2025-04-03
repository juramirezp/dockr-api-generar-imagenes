# Generador de Imágenes API

Este proyecto es una API REST construida con Node.js y Express que permite generar imágenes a partir de un prompt proporcionado por el cliente. Las imágenes generadas se guardan en la carpeta `./results`.

## Estructura del Proyecto

```
generador-imagenes-api
├── src
│   ├── controllers
│   │   └── imageController.js       # Controlador para manejar las solicitudes de generación de imágenes
│   ├── routes
│   │   └── imageRoutes.js            # Rutas relacionadas con la generación de imágenes
│   ├── services
│   │   └── generationService.js       # Lógica para interactuar con la API de generación de imágenes
│   ├── middleware
│   │   ├── auth.js                    # Middleware para autenticación
│   │   └── errorHandler.js            # Middleware para manejo de errores
│   ├── utils
│   │   └── logger.js                  # Funciones para registro de información y errores
│   ├── config
│   │   └── config.js                  # Configuración de la aplicación
│   └── app.js                         # Punto de entrada de la aplicación
├── results                             # Carpeta para almacenar las imágenes generadas
│   └── .gitkeep
├── server.js                          # Archivo para iniciar el servidor
├── .env.example                       # Ejemplo de variables de entorno
├── .gitignore                         # Archivos y carpetas a ignorar por Git
├── package.json                       # Configuración de npm
└── README.md                          # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd generador-imagenes-api
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno. Copia el archivo `.env.example` a `.env` y ajusta los valores según sea necesario.

## Uso

1. Inicia el servidor:
   ```
   npm start
   ```

2. Realiza una solicitud POST a la ruta `/api/images` con un JSON que contenga el prompt para la generación de la imagen. Ejemplo:
   ```json
   {
       "prompt": "Un paisaje de montañas con un lago en primer plano, estilo acuarela"
   }
   ```

3. Las imágenes generadas se guardarán en la carpeta `./results`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.