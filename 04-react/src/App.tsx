import React from 'react';
import Routes from './routes';
import GlobalStyles from './styles/global';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className='container'>
      <GlobalStyles />
      <Routes />
      <ToastContainer theme="dark"/>
    </main>
  );
}

export default App;
