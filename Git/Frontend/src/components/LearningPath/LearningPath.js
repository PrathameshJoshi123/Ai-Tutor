import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const LearningPath = () => {
  const { token } = useContext(AuthContext);
  const [learningPath, setLearningPath] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const res = await axios.get('/api/progress', {
          headers: { 'x-auth-token': token }
        });
        setLearningPath(res.data.learningPath);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchLearningPath();
  }, [token]);

  const addTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      // Assuming there's an API to add topics
      // You may need to implement this in the backend
      setLearningPath([...learningPath, newTopic]);
      setNewTopic('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Your Learning Path</h2>
      <ul>
        {learningPath.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newTopic} 
        onChange={e => setNewTopic(e.target.value)} 
        placeholder="Add new topic" 
      />
      <button onClick={addTopic}>Add</button>
    </div>
  );
};

export default LearningPath;
