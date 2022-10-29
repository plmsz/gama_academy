import styled from 'styled-components';

export const NavBar = styled.nav`
  align-items: center;
  padding: 0 2rem;
  img {
    max-width: 200px;
    height: auto;
  }
  .nav-links {
    a {
      text-decoration: none;
      color: #fff;
      margin: 12px;
      transition: 0.2s;
      &:hover {
        color: #676666;
      }
    }
  }
`;
