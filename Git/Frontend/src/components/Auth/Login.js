import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const history = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.token);
      history.push('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={form.password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
