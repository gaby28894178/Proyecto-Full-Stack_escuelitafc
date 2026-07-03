# Backend - Plataforma de Cursos MVP

Backend desarrollado con Node.js, Express, PostgreSQL y Sequelize para una plataforma de cursos.

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

1. **Node.js** (versión 16.x o superior) - [Descargar Node.js](https://nodejs.org/)
2. **PostgreSQL** (última versión LTS) - [Descargar PostgreSQL](https://www.postgresql.org/download/)
3. **npm** (viene incluido con Node.js) o **yarn**

## Instalación

1. **Clonar o acceder al directorio del proyecto**:
   ```bash
   cd "Proyecto Full Stack_escuelitafc\Backend"
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   - Copia el archivo `.env.example` y renómbralo a `.env`:
     ```bash
     # En PowerShell:
     Copy-Item .env.example .env
     ```
   - Abre el archivo `.env` y configura tus credenciales de PostgreSQL:
     ```env
     PORT=3001
     DB_USER=postgres
     DB_PASSWORD=tu_contraseña_de_postgres
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=mvp_cursos_db
     JWT_SECRET=clave_secreta_para_tokens_jwt_123
     ```

## Ejecución del Servidor

### Modo Desarrollo (con nodemon):
```bash
npm run dev
```

### Modo Producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

## Documentación de la API (Swagger)

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de la API en:
```
http://localhost:3001/api-docs
```

## Colección de Postman

Para probar las rutas de la API, importa la colección de Postman que se encuentra en:
```
postman/PlataformaCursosMVP.postman_collection.json
```

### Cómo usar la colección:
1. Abre Postman
2. Haz clic en **Import**
3. Selecciona el archivo JSON mencionado
4. Después de iniciar sesión, copia el token JWT y actualiza la variable `token` en la colección

## Estructura del Proyecto

```
Backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Conexión y configuración de PostgreSQL
│   │   └── swagger.js           # Configuración de Swagger
│   ├── controllers/
│   │   ├── authController.js    # Controladores de autenticación
│   │   ├── courseController.js  # Controladores de cursos
│   │   └── enrollmentController.js # Controladores de inscripciones
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Middleware de autenticación JWT
│   │   └── validateAuth.js      # Middleware de validación de datos
│   ├── models/
│   │   ├── User.js              # Modelo de Usuario
│   │   ├── Course.js            # Modelo de Curso
│   │   └── Enrollment.js        # Modelo de Inscripción (relación many-to-many)
│   ├── routes/
│   │   ├── authRoutes.js        # Rutas de autenticación
│   │   ├── courseRoutes.js      # Rutas de cursos
│   │   └── enrollmentRoutes.js  # Rutas de inscripciones
│   └── index.js                 # Punto de entrada del servidor
├── postman/                     # Colección de Postman
│   └── PlataformaCursosMVP.postman_collection.json
├── .env                         # Variables de entorno (no subir a git)
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Funcionalidades Principales

1. **Autenticación**:
   - Registro de usuarios (rol estudiante o admin)
   - Inicio de sesión con JWT (token expira en 15 minutos)
   - Obtener perfil del usuario logeado (incluye cursos inscritos)
   - Actualizar perfil del usuario (nombre, email, contraseña)

2. **Cursos**:
   - Catálogo público de cursos (GET)
   - CRUD de cursos (solo admin: POST, PUT, DELETE)

3. **Inscripciones**:
   - Inscribirse en un curso (estudiante)
   - Ver cursos inscritos (estudiante)

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **JWT (jsonwebtoken)** - Autenticación
- **bcryptjs** - Hashing de contraseñas
- **Swagger UI** - Documentación de API
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **nodemon** - Reinicio automático en desarrollo
