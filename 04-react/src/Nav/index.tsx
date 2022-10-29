import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo';
import { NavBar } from './style';

function Nav() {
  return (
    <div>
      <NavBar>
        <Link to='/'>
          <Logo />
        </Link>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/courses'>Cursos</Link>
          <Link to='/signup'>Cadastre-se</Link>
          <Link to='/signin'>Login</Link>
        </div>
      </NavBar>
    </div>
  );
}

export default Nav;
