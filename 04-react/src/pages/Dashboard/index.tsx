import { useEffect, useState } from 'react';
import { Container } from './style';
import Loader from './../../Loader/index';
import { api } from './../../services/api';

interface ICollaborator {
  id: number;
  name: string;
  email: string;
  photo_id: number;
  photo: {
    url: string;
  };
}

function Dashboard() {
  const [data, setData] = useState<ICollaborator[]>();
  const [isLoad, setIsLoad] = useState(false);
  const token = localStorage.getItem('@gamaServiceToken')?.replaceAll('"', '');

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get('collaborator', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoad(true);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoad(false);
      }
    };
    fetch();
  }, [token]);

  if (isLoad) {
    return <Loader />;
  }

  return (
    <Container>
      <div className='wrapper'>
        <h1>Dashboard</h1>
        <div>
          {data?.map((el) => (
            <div key={el.id} className='card'>
              <img src={el.photo.url} alt={el.name} width='200' />
              <div className='content-information'>
                <p>Nome: {el.name}</p>
                <p>E-mail: {el.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
