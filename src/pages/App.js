import { useState } from 'react'; // Hook para gerenciar estados
import gitLogo from '../assets/github.png'; // Logo do GitHub
import Input from '../components/Input'; // Componente de Input
import Button from '../components/Button'; // Componente de Botão
import ItemRepo from '../components/ItemRepo'; // Componente para exibir cada repositório
import { api } from '../services/api'; // Serviço para requisições à API do GitHub

import { Container } from './styles'; // Estilos do componente App

function App() {
  // Estado para armazenar o nome do repositório digitado no input
  const [currentRepo, setCurrentRepo] = useState('');
  // Estado para armazenar a lista de repositórios
  const [repos, setRepos] = useState([]);

  // Função para buscar um repositório na API do GitHub
  const handleSearchRepo = async () => {
    try {
      // Faz a requisição para buscar os dados do repositório
      const { data } = await api.get(`repos/${currentRepo}`);

      // Verifica se o repositório foi encontrado
      if (data.id) {
        // Verifica se o repositório já está na lista
        const isExist = repos.some((repo) => repo.id === data.id);

        if (!isExist) {
          // Adiciona o repositório ao estado
          setRepos((prev) => [...prev, data]);
          setCurrentRepo(''); // Limpa o campo de input
          return;
        }

        alert('Repositório já está na lista!');
      } else {
        alert('Repositório não encontrado!');
      }
    } catch (error) {
      alert('Erro ao buscar o repositório. Verifique o nome digitado.');
    }
  };

  // Função para remover um repositório da lista
  const handleRemoveRepo = (id) => {
    // Filtra os repositórios para remover o selecionado
    const updatedRepos = repos.filter((repo) => repo.id !== id);
    setRepos(updatedRepos); // Atualiza o estado com a nova lista
  };

  return (
    <Container>
      {/* Logo do GitHub */}
      <img src={gitLogo} width={72} height={72} alt="GitHub Logo" />
      
      {/* Campo de entrada para o nome do repositório */}
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
        placeholder="Digite o repositório (ex: facebook/react)"
      />
      
      {/* Botão para buscar o repositório */}
      <Button onClick={handleSearchRepo} text="Buscar Repositório" />

      {/* Lista de repositórios */}
      {repos.map((repo) => (
        <ItemRepo
          key={repo.id} // Chave única para cada item
          repo={repo} // Dados do repositório
          handleRemoveRepo={() => handleRemoveRepo(repo.id)} // Passa a função de remoção
        />
      ))}
    </Container>
  );
}

export default App;
