
const { GenerativeAI } = require('@google/generative-ai');
const path = require('path');
const dotenv = require('dotenv');

// Set the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from .env file
dotenv.config({ path: envPath });

// Initialize the Gemini API client
const client = new GenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  const { message } = req.body;
  const studentId = req.student;

  try {
    // Fetch the student from the database
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Append user message to the history
    student.history.push({ role: 'user', content: message });

    // Prepare the history for the API call
    const history = student.history.map(entry => ({
      role: entry.role,
      content: entry.content,
    }));

    // Call the Gemini API
    const response = await client.chat({
      history: history,
      message: message,
    });

    // Access AI's response
    const aiResponse = response.data.message; // Adjust based on actual response structure

    // Append AI response to the history
    student.history.push({ role: 'assistant', content: aiResponse });
    await student.save();

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in chatWithAI:', error);
    res.status(500).send('Server Error');
  }
};
