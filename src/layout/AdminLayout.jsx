import Header from '@src/component/common/Header/Header.jsx';
import Footer from '@src/component/common/Footer/Footer.jsx';
import styled, { createGlobalStyle } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { FOOTER_HEIGHT } from '@src/utils/const.js';
import AdminHeader from '@src/component/admin/header/AdminHeader.jsx';
import { adminDrawerWidth } from '@src/component/admin/const.js';


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
    width: 100vw;
`;
const DrawerDiv = styled.div`
    width: ${adminDrawerWidth}px;
`;

const GlobalStyles = createGlobalStyle`
    body {
        width: calc(100% - ${adminDrawerWidth}px);
        background-color: ${({ theme }) => theme['main-background']};
    }
`;
const OutletContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`;

function AdminLayout() {


  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AdminHeader />
        <Content>
          <DrawerDiv />
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
