import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../Loader';

interface IData {
  nome: string;
  email: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const [data, setData] = useState<IData>({} as IData);
  const [load, setLoad] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoad(true);
      api
        .post('users', data)
        .then((response) => {
          setLoad(false);
          toast.success('Cadastro realizado com sucesso!', {
            hideProgressBar: false,
            onClose: () => history.push('/'),
          });
        })
        .catch((e) => {
          toast.error('Algo deu errado, tente novamente.');
        })
        .finally(()=>setLoad(false))
    },
    [data, history]
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <>
          <h1>Cadastre-se</h1>
          <form name='contact' onSubmit={handleSubmit}>
            <input
              type='text'
              name='nome'
              placeholder='Nome'
              onChange={handleChange}
            />
            <input
              type='email'
              name='email'
              placeholder='E-mail'
              onChange={handleChange}
            />
            <input
              type='password'
              name='senha'
              placeholder='Senha'
              onChange={handleChange}
            />
            <button type='submit'>Cadastrar</button>
            <Link to='signin'>Já tem cadastro? Faça o log-in.</Link>
          </form>
        </>
      )}
    </>
  );
};

export default SignUp;
