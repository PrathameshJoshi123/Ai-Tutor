import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ChatBox = () => {
  const { token } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Update conversation with user message
    const userMessage = { role: 'user', content: message };
    setConversation([...conversation, userMessage]);

    try {
      const res = await axios.post('/api/chat', { message }, {
        headers: { 'x-auth-token': token }
      });
      const aiMessage = { role: 'assistant', content: res.data.response };
      setConversation(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err.response.data);
      alert('Error communicating with AI.');
    }

    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="conversation-box">
        {conversation.map((msg, index) => (
          <div key={index} className={msg.role === 'user' ? 'user-msg' : 'ai-msg'}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input 
          type="text" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Ask your tutor..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
