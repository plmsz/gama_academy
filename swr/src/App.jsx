import { useState } from 'react';
import './App.css';
import useSWR from 'swr';

//args é url da api, fetcher faz a chamada para api

//se a janela entra em foco, faz uma nova chamada para api,
/* 
vamos add um novo usuário ,
    {
      "name": "Batman",
      "id": 5
    }
 */
const fetcher = (...args) => fetch(...args).then((response) => response.json());

function App() {
  const { data, error } = useSWR('http://localhost:8080/users/', fetcher);

  if (error) return 'An error has occurred.';

  return (
    <div className='App'>
      <h1>Usuários</h1>
      {data ? (
        <ul>
          {data?.map((user) => {
            return <li>{user.name}</li>;
          })}
        </ul>
      ) : (
        <h2>Carregando...</h2>
      )}
    </div>
  );
}

export default App;
