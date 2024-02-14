import React from 'react';
import { FlexGrowDiv, UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import ChangeProfileComponent from '@src/component/common/ChangeProfileComponent.jsx';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { useAtomValue } from 'jotai/react';
import { uploadedImageAtom } from '@src/component/mypage/atom.js';

const PROFILE_IMG_SIZE = 100;

const StyledContainerDiv = styled.div`
    background-color: ${({ theme }) => theme['dark-background']};
    border-radius: 10px;
    width: calc(100% + 60px);
    padding: 30px;
    display: flex;
`;

const NameContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
`;

const ProfileContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SubTitleTypo = muiStyled(Typography)`
  color: ${({ theme }) => theme['gray-light-text']};
`;
const NameProfileComponent = ({ profileButton }) => {
  const uploadImg = useAtomValue(uploadedImageAtom);

  return (
    <StyledContainerDiv>
      <UserAvatar size={PROFILE_IMG_SIZE} variant="rounded" src={uploadImg} />
      <NameContainer>
        <Typography variant="h5">이름</Typography>
        <SubTitleTypo variant="subtitle1">닉네임</SubTitleTypo>
      </NameContainer>
      <FlexGrowDiv />
      {profileButton &&
        <ProfileContainer>
          <ChangeProfileComponent buttonSize="medium" />
        </ProfileContainer>
      }
    </StyledContainerDiv>
  );
};

NameProfileComponent.defaultProps = {
  profileButton: false,
};

export default NameProfileComponent;
