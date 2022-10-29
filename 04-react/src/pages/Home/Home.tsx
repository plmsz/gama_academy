import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Footer';
import Nav from '../../Nav';
import { Container } from './style';

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Container>
        <h1>HOME</h1>
        <Link to='/contact'>Ir contato</Link>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
