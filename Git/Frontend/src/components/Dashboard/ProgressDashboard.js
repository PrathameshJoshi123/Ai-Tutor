import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Bar } from 'react-chartjs-2';

const ProgressDashboard = () => {
  const { token } = useContext(AuthContext);
  const [progress, setProgress] = useState({});
  const [learningPath, setLearningPath] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('/api/progress', {
          headers: { 'x-auth-token': token }
        });
        setProgress(res.data.progress);
        setLearningPath(res.data.learningPath);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchProgress();
  }, [token]);

  const data = {
    labels: Object.keys(progress),
    datasets: [{
      label: 'Progress (%)',
      data: Object.values(progress),
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  return (
    <div>
      <h2>Your Progress</h2>
      <Bar data={data} />
      <h3>Learning Path</h3>
      <ul>
        {learningPath.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressDashboard;
