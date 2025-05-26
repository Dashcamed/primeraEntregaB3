# 🐾 API de Gestión de Mascotas

API RESTful para la gestión de usuarios y mascotas, desarrollada con Node.js, Express, TypeScript y MongoDB.

## 🚀 Requisitos

- Node.js 22+
- MongoDB 8.0+

## 🛠️ Instalación

1. Clona el repositorio
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env.prod o .env.dev` basado en `.env.example` y configura las variables de entorno
4. Inicia el servidor en prod o dev:

   ```bash
   npm run (prod o dev)
   ```

## 🔧 Variables de Entorno

- `PORT`: Puerto del servidor (por defecto: 8080)
- `MONGO_URL`: URL de conexión a MongoDB en local (ej: `mongodb://localhost:27017/mocksGenerator`) o usa la de la nube.

## 📚 Documentación de la API

### Mock Data

- **GET** `/api/mock/mockingPets`

  - Genera y devuelve datos de ejemplo de mascotas
  - No requiere autenticación

- **GET** `/api/mock/mockingUsers`

  - Genera y devuelve datos de ejemplo de usuarios
  - No requiere autenticación

- **POST** `/api/mock/generateData`

  - Genera y guarda datos de ejemplo en la base de datos
  - Body: `{ "users": number, "pets": number }`
  - No requiere autenticación

### Usuarios

- **GET** `/api/user`

  - Obtiene todas las mascotas generadas en la base de datos

### Mascotas

- **GET** `/api/pet`

  - Obtiene todas las mascotas generadas en la base de datos

## 🏗️ Estructura del Proyecto

```
src/
├── config/         # Configuraciones
├── controllers/    # Controladores
├── dao/            # Data Access Objects
├── interfaces/     # Interfaces TypeScript
├── models/         # Modelos de datos
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
└── utils/          # Utilidades
└── types/          # Types para reconocer logger en express

```

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express
- TypeScript
- MongoDB con Mongoose
- Faker.js (para datos de prueba)
- Bcrypt (para hashing de contraseñas)

## 📝 Notas Adicionales

- Las contraseñas se almacenan de forma segura usando bcrypt
- La validación de datos se realiza tanto a nivel de ruta como de modelo
