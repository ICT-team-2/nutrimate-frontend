import React from 'react';
import { FlexGrowDiv, UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import ChangeProfileComponent from '@src/component/common/ChangeProfileComponent.jsx';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { useAtomValue } from 'jotai/react';
import { profileImageAtom } from '@src/component/mypage/atom.js';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';

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
const NameProfileComponent = ({ profileButton, name, nickname }) => {
  const { data } = useFetchProfileData();
  return (
    <StyledContainerDiv>
      <UserAvatar
        size={PROFILE_IMG_SIZE}
        variant="rounded"
        src={`${import.meta.env.REACT_APP_BACKEND_URL}${data?.userProfile}`} />
      <NameContainer>
        <Typography variant="h5">{name}</Typography>
        <SubTitleTypo variant="subtitle1">{nickname}</SubTitleTypo>
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
  name: '이름',
  nickname: '닉네임',
};

export default NameProfileComponent;
