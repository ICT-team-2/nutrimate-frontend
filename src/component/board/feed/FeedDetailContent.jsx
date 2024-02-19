import React from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 16px;
    border-radius: 10px;
    display: flex;
`;

const FeedDetailContent = ({ data, open, setOpen }) => {

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <StyledBox>
        <FlexGrowDiv>
          <img src={data.img} alt="feed" />
        </FlexGrowDiv>
        <FlexGrowDiv>
          
        </FlexGrowDiv>
      </StyledBox>
    </Modal>
  );
};

FeedDetailContent.defaultProps = {
  data: {
    img: '/src/asset/image/loading.png',

  },
  open: false,
  setOpen: () => {
  },
};

export default FeedDetailContent;
