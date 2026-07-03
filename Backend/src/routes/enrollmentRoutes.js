const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Inscripciones
 *   description: Rutas para inscripciones de estudiantes
 */

/**
 * @swagger
 * /api/enrollments/enroll:
 *   post:
 *     tags: [Inscripciones]
 *     summary: Inscribe a un estudiante en un curso
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Inscripción exitosa
 *       400:
 *         description: Ya está inscrito en el curso
 *       401:
 *         description: No autorizado
 */
router.post('/enroll', verifyToken, enrollmentController.enroll);

/**
 * @swagger
 * /api/enrollments/my-courses:
 *   get:
 *     tags: [Inscripciones]
 *     summary: Obtiene los cursos inscritos por el estudiante
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos inscritos
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
 *       401:
 *         description: No autorizado
 */
router.get('/my-courses', verifyToken, enrollmentController.getMyCourses);

module.exports = router;
