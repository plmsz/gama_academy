import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../Loader';
import { Container } from '../../styles/common';

interface IData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const [data, setData] = useState<IData>({} as IData);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoad(true);
      api
        .post('login', data)
        .then((response) => {
          const sessionToken = JSON.stringify(response.data.accessToken);
          localStorage.setItem('@gamaServiceToken', sessionToken);
          setLoad(false);
          toast.success('Sucesso!', {
            hideProgressBar: false,
            onClose: () => navigate('/dash'),
          });
        })
        .catch((e) => {
          //TODO: "Incorrect password" "Cannot find user"
          toast.error('Algo deu errado, tente novamente.');
          setLoad(false);
        });
    },
    [data, navigate]
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container>
      {load ? (
        <Loader />
      ) : (
        <>
          <h1>Entrar</h1>
          <form name='contact' onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='E-mail'
              onChange={handleChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Senha'
              onChange={handleChange}
              required
            />
            <button type='submit'>Entrar</button>
            <Link to='signup'>Não tem cadastro? Faça agora!</Link>
          </form>
        </>
      )}
    </Container>
  );
};

export default SignIn;
