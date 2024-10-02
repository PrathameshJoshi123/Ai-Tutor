const Student = require('../models/student');
const path = require('path');
const dotenv = require('dotenv');

// Set the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from .env file
dotenv.config({ path: envPath });


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


exports.chatController = async (req, res) => {
    const { message } = req.body;
    const studentId = req.student;
    
    try {
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        // Initialize history if not present
        if (!student.history || !Array.isArray(student.history)) {
            student.history = [];
        }

        // Append the new user message to history
        student.history.push({
            role: 'user',
            content: message
        });

        // Create arrays to hold messages for 'user' and 'model'
        

        // Iterate over the history and group messages by role
        const userMessages = student.history
            .filter(entry => entry.role === 'user')
            .map(entry => ({
                text: entry.content // Get the content as is
            }));

        const modelMessages = student.history
            .filter(entry => entry.role === 'assistant')
            .map(entry => ({
                text: entry.content // Get the content as is
            }));

        // Ensure there's at least one message in both userMessages and modelMessages
        if (userMessages.length === 0) {
            userMessages.push({ text: "Hello!" });  // Fallback message for user
        }
        if (modelMessages.length === 0) {
            modelMessages.push({ text: "How can I assist you?" });  // Fallback message for assistant
        }
        
        // Define model (ensure correct model name)
        const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: userMessages
            },
            {
                role: "model",
                parts: modelMessages
            },
        ]
        });

        // Send the message and get the response
        const response = await chat.sendMessage(message);
        
        const aiResponseText = response.response.text() || 'No response';

        // Append AI's response to the history as 'assistant'
        student.history.push({
            role: 'assistant',
            content: aiResponseText
        });

        // Save updated history to the database
        await student.save();

        // Respond to the client with the AI's response
        res.json({ response: aiResponseText });
    } catch (error) {
        console.error('Error in chatWithAI:', error);
        res.status(500).send('Server Error');
    }
};










