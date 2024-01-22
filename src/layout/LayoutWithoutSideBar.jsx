import Header from '@src/component/common/Header/Header.jsx';
import Footer from '@src/component/common/Footer/Footer.jsx';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const footerHeight = '13px';
const Wrapper = styled.div`
    height: fit-content;
    min-height: 96vh;
    display: flex;
    flex-direction: column;
`;
const StyledFooter = muiStyled(Footer)`
    height: ${footerHeight};
`;

const Content = styled.div`
    flex-grow: 1;
    padding-bottom: ${footerHeight}; // 푸터의 높이만큼 padding-bottom을 추가
`;

function LayoutWithoutSideBar() {


  return (
    <>
      <Wrapper>
        <Header hasDrawer={false} />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
      <StyledFooter footerheight={footerHeight} />
    </>
  )
    ;
}

export default LayoutWithoutSideBar;
