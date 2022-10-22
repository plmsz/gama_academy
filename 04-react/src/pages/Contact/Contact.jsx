import React, { useState } from 'react';

// import { Container } from './styles';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [form, setForm] = useState();
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form));
  };
  return (
    <>
      <h1>Contato</h1>
      <form name='contact'>
        <input
          type='text'
          name='name'
          placeholder='Nome'
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='E-mail'
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type='submit'>
          Cadastrar
        </button>
      </form>
      <Link to='/'>Ir Home</Link>
    </>
  );
};

export default Contact;
