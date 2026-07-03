const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.update(req.body, { where: { id } });
    res.json({ message: 'Curso actualizado con éxito' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Curso eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
