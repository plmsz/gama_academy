import React from 'react';
import Footer from '../../Footer';
import Nav from '../../Nav';
import { Container } from '../../styles/common';

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Container>
        <h1>HOME</h1>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
