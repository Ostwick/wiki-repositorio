import React from 'react';
import { ButtonContainer } from './styles'; // Estilos para o botão

function Button({ onClick, text = "Buscar" }) {
  return (
    <ButtonContainer onClick={onClick}>
      {text} {/* Texto do botão, padrão é "Buscar" */}
    </ButtonContainer>
  );
}

export default Button;
