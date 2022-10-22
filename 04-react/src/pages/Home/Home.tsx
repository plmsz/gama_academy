import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <h1>HOME</h1>
      <Link to='/contact'>Ir contato</Link>
    </>
  );
};

export default Home;