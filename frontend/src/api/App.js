import React from 'react';
import CustomerRegister from './components/CustomerRegister';
import AdminRegister from './components/AdminRegister';
import VerifyEmail from './components/VerifyEmail';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <div>
      <h1>MERN Auth System</h1>
      <CustomerRegister />
      <AdminRegister />
      <VerifyEmail />
      <AdminLogin />
    </div>
  );
}

export default App;
