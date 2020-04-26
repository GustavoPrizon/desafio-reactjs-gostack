import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositori] = useState([]);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: "github.com/gustavoprizon/novorepositorio",
      techs: "techs"
    })

    const repositori = response.data;
    
    setRepositori([...repositories, repositori]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    setRepositori(repositories);
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositori(response.data);
    })
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositori => <li key={repositori.id}>
          {repositori.title}
          <button onClick={() => handleRemoveRepository(repositori.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
