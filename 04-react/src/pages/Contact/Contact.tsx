import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Link } from 'react-router-dom';
import { api } from '../../services/api';

interface IData {
  name: string;
  email: string;
}

const Contact: React.FC = () => {
  const [data, setData] = useState<IData>({} as IData);
  const [submit, setSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // alert(JSON.stringify(data));
      api.post('', data).then((response) => {
        if (response.status === 200) {
          setSubmit(true);
        }
      });
    },
    [data]
  );

  return (
    <>
      <h1>Contato</h1>
      {submit ? (
        <div>
          <h1>Obrigado pelo envio do dados!</h1>
        </div>
      ) : (
        <form name='contact' onSubmit={handleSubmit}>
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
          <button type='submit'>Cadastrar</button>
        </form>
      )}
      <Link to='/'>Ir Home</Link>
    </>
  );
};

export default Contact;
