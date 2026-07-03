const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

exports.enroll = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const existing = await Enrollment.findOne({ where: { userId, courseId } });
    if (existing) return res.status(400).json({ error: 'Ya estás inscrito en este curso.' });

    await Enrollment.create({ userId, courseId });
    res.status(201).json({ message: 'Inscripción realizada con éxito.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: { model: Course, through: { attributes: [] } }
    });
    res.json(user.Courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
