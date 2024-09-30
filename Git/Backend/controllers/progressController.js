const Student = require('../models/student');

exports.getProgress = async (req, res) => {
  const studentId = req.student;
  try {
    const student = await Student.findById(studentId).select('progress learningPath');
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json({ progress: student.progress, learningPath: student.learningPath });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateProgress = async (req, res) => {
  const { topic, score } = req.body;
  const studentId = req.student;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Update progress
    student.progress.set(topic, score);
    await student.save();

    res.json({ msg: 'Progress updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
