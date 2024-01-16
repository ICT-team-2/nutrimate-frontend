import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container, TextField } from '@mui/material';
import styled from 'styled-components';

const InfoBoardContainer = muiStyled(Container)`
  margin: 0 15vw;
`;

const ContainerDiv = styled.div`
    margin-top: 10px;
`;

const TextFieldContainerDiv = styled.div`
    display: flex;
`;
const InfoBoard = ({ data }) => {
  return (
    <InfoBoardContainer>
      <ContainerDiv>
        <TextFieldContainerDiv>
          <TextField label='Outlined' id='search' size='small' />
          <div style={{ flexGrow: 1 }}></div>
          <Button variant='contained'>+ Add New User</Button>
        </TextFieldContainerDiv>
      </ContainerDiv>
    </InfoBoardContainer>
  );
};

export default InfoBoard;
