import React from 'react';

import { Link } from 'react-router-dom';
import Footer from '../../Footer';
import Nav from '../../Nav';
import { Container } from './style';

const Courses: React.FC = () => {
  return (
    <>
      <Nav />
      <Container className='container'>
        <h1>Cursos</h1>
        <Link to='/'>Ir Home</Link>
      </Container>
      <Footer />
    </>
  );
};

export default Courses;
