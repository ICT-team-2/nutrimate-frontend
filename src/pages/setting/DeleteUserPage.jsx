import React, { useEffect } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container } from '@mui/material';
import { useSetAtom } from 'jotai/react';
import { SETTING_DRAWER_HEIGHT } from '@src/component/setting/const.js';
import { settingDrawerHeightAtom } from '@src/component/setting/atom.js';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const StyledCotainer = muiStyled(Container)`
    margin-top: 20px;
    width:60%;
`;
const StyledDiv = styled.div`
    margin: 20px 0;

`;

const DeleteUserPage = () => {
  const setDrawerHeight = useSetAtom(settingDrawerHeightAtom);

  useEffect(() => {
    setDrawerHeight(SETTING_DRAWER_HEIGHT.DELETE_USER);
  });


  return (
    <StyledCotainer>
      <Typography variant={'h5'}>회원탈퇴</Typography>
      <StyledDiv>
        탈퇴하실 경우에는 관리자에게 문의 시 복구가 가능합니다.<br />
        탈퇴하시겠습니까?
      </StyledDiv>
      <Button color="error" variant="contained">회원탈퇴</Button>
    </StyledCotainer>
  );
};

export default DeleteUserPage;
