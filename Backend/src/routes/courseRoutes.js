const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Rutas para gestión de cursos (catálogo público y CRUD admin)
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Cursos]
 *     summary: Obtiene todos los cursos (público)
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   instructor:
 *                     type: string
 *                   duration:
 *                     type: string
 */
router.get('/', courseController.getAllCourses);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags: [Cursos]
 *     summary: Crea un nuevo curso (solo admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - instructor
 *             properties:
 *               title:
 *                 type: string
 *                 example: Curso de JavaScript
 *               description:
 *                 type: string
 *                 example: Aprende JavaScript desde cero
 *               instructor:
 *                 type: string
 *                 example: Profesor Gómez
 *               duration:
 *                 type: string
 *                 example: 40 horas
 *     responses:
 *       201:
 *         description: Curso creado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de admin
 */
router.post('/', verifyToken, isAdmin, courseController.createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     tags: [Cursos]
 *     summary: Actualiza un curso (solo admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               instructor:
 *                 type: string
 *               duration:
 *                 type: string
 *     responses:
 *       200:
 *         description: Curso actualizado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de admin
 */
router.put('/:id', verifyToken, isAdmin, courseController.updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     tags: [Cursos]
 *     summary: Elimina un curso (solo admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curso eliminado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permisos de admin
 */
router.delete('/:id', verifyToken, isAdmin, courseController.deleteCourse);

module.exports = router;
