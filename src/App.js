import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    let id = Math.floor((Math.random() * 1000000) + 1);

    const response = await api.post('/repositories', {
      id: `${id}`,
      url: "https://github.com/teste",
      title: `Desafio ReactJS ${id}`,
      techs: ["React", "Node.js"],
    })

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories([...repositories])
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    }).catch(() => {
      setRepositories([...repositories]);
    });
  }, [repositories]);

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositories => 
          <li key={repositories.id}>
          {repositories.title}

          <button onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
