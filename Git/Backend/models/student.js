const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  learningPath: [{ type: String }], // Topics or lessons
  progress: { type: Map, of: Number }, // e.g., { "Algebra": 80 }
  history: [ConversationSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
