import { useRef, useState } from 'react';
import Alert from './components/Alert';
import List from './components/List';

function App() {
  const userInput = useRef<HTMLInputElement | null>(null);
  const repoInput = useRef<HTMLInputElement | null>(null);
  const [repos, setRepos] = useState<string[]>();
  const [repo, setRepo] = useState<string>();
  const [tempRepos, setTempRepos] = useState<string[]>();
  const [error, setError] = useState({ error: false, text: '', type: '' });

  const repoAriaInvalid =
    error.error && error.type === 'repo' ? { 'aria-invalid': true } : '';
  const ariaValidUser =
    !error.error && userInput?.current?.value !== undefined
      ? { 'aria-invalid': false }
      : '';

  const userAriaInvalid =
    error.error && error.type === 'user' ? { 'aria-invalid': true } : '';
  const ariaValidRepo =
    !error.error && repoInput?.current?.value !== undefined && repo !== ''
      ? { 'aria-invalid': false }
      : '';

  async function getUserRepos(e: React.FocusEvent<HTMLInputElement, Element>) {
    setRepo('');
    const userName = e.target.value;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${import.meta.env.VITE_TOKEN}`,
      },
    };
    const response = await fetch(
      `https://api.github.com/users/${userName}/repos?page=1&per_page=100`,
      options
    );
    const responseJSON = await response.json();

    if (responseJSON.message) {
      setError({
        error: true,
        type: 'user',
        text: `User not found`,
      });
      setRepos([]);
      setRepo('');
      userInput.current?.focus();
      return;
    }

    setError({ error: false, text: '', type: 'user' });
    const data = await responseJSON.map((repo: { name: string }) => repo.name);
    setRepos(data);
    setTempRepos(data);
  }

  function filteredRepos(e: React.ChangeEvent<HTMLInputElement>) {
    setError({ error: false, text: '', type: 'user' });
    const value = e.target.value.toLowerCase();
    setRepo(value);
    const filteredData = tempRepos?.filter((repo) =>
      repo.toLowerCase().includes(value)
    );

    if (filteredData?.length === 0 && value) {
      setError({
        error: true,
        type: 'repo',
        text: `No repo with the name of ${value} was found`,
      });
      setRepos([]);
      return;
    }

    setRepos(filteredData);
  }
  return (
    <main className='container'>
      <h1>Repos</h1>
      <input
        id='username'
        type='text'
        placeholder='Enter GitHub Username'
        onBlur={getUserRepos}
        ref={userInput}
        {...userAriaInvalid}
        {...ariaValidUser}
      />
      {error.error && error.type === 'user' && <Alert>{error.text}</Alert>}
      <input
        type='text'
        id='repo'
        placeholder='Search a Repo'
        onChange={filteredRepos}
        value={repo}
        ref={repoInput}
        {...repoAriaInvalid}
        {...ariaValidRepo}
      />
      {error.error && error.type === 'repo' && <Alert>{error.text}</Alert>}
      <List items={repos} />
    </main>
  );
}

export default App;
