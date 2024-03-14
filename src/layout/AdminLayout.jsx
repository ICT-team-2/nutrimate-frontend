import Header from '@src/component/common/Header/Header.jsx';
import Footer from '@src/component/common/Footer/Footer.jsx';
import styled, { createGlobalStyle } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import { FOOTER_HEIGHT } from '@src/utils/const.js';
import AdminHeader from '@src/component/admin/header/AdminHeader.jsx';
import { ADMIN_DRAWER_WIDTH } from '@src/component/admin/const.js';
import useCheckUserToken from '@src/hooks/useCheckUserToken.jsx';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';
import { useEffect } from 'react';


const Wrapper = styled.div`
    height: fit-content;
    min-height: 96vh;
    display: flex;
    flex-direction: column;
`;
const StyledFooter = muiStyled(Footer)`
    height: ${FOOTER_HEIGHT};
`;

const Content = styled.div`
    flex-grow: 1;
    padding-bottom: ${FOOTER_HEIGHT}; // 푸터의 높이만큼 padding-bottom을 추가
    display: flex;
`;

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme['main-background']};
    }
`;
const OutletContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin-top: 20px;
`;

function AdminLayout() {

  const { data: userData, isLoading } = useFetchProfileData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) return;
    if (userData.userRole !== 'ROLE_ADMIN') {
      navigate('/');
    }
  }, [userData]);

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AdminHeader />
        <Content>
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </Content>
      </Wrapper>
      <StyledFooter footerheight={FOOTER_HEIGHT} />
    </>
  )
    ;
}

export default AdminLayout;
