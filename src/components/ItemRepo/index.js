import React from 'react';
import { ItemContainer } from './styles';

function ItemRepo({ repo, handleRemoveRepo }) {
  // Função para lidar com a remoção do repositório
  const handleRemove = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    handleRemoveRepo(repo.id); // Chama a função passada como prop para remover o item
  };

  return (
    <ItemContainer>
      {/* Nome do repositório */}
      <h3>{repo.name}</h3>
      
      {/* Nome completo do repositório */}
      <p>{repo.full_name}</p>
      
      {/* Link para abrir o repositório no GitHub */}
      <a href={repo.html_url} rel="noreferrer" target="_blank">
        Ver repositório
      </a>
      <br />

      {/* Link para remover o repositório */}
      <a
        href="#"
        rel="noreferrer"
        className="remover"
        onClick={handleRemove} // Associa a função de remoção ao evento de clique
      >
        Remover
      </a>
      <hr />
    </ItemContainer>
  );
}

export default ItemRepo;
