import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../Css/register.css'

const Register = () => {
  const { login } = useContext(AuthContext);
  const history = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      login(res.data.token);
      history.push('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg);
    }
  };

  return (
    <form class="dark-form" onSubmit={onSubmit}>
  <input type="text" class="form-input" name="name" value={form.name} onChange={onChange} placeholder="Name" required />
  <input type="email" class="form-input" name="email" value={form.email} onChange={onChange} placeholder="Email" required />
  <input type="password" class="form-input" name="password" value={form.password} onChange={onChange} placeholder="Password" required />
  <button type="submit" class="form-button">Register</button>
</form>
  );
};

export default Register;
