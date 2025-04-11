import React, { useState } from 'react';
import axios from '../services/api';

export default function CustomerRegister() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post('/auth/register', { ...form, role: 'customer' });
    alert('Registered. Please check email.');
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="First Name" onChange={e => setForm({ ...form, firstName: e.target.value })} />
      <input placeholder="Last Name" onChange={e => setForm({ ...form, lastName: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button>Register</button>
    </form>
  );
}