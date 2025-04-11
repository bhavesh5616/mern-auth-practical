import React, { useState } from 'react';
import axios from 'axios';

function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify', { email, code });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="text" placeholder="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} required /><br />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyEmail;

