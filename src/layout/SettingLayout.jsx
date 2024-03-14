import Footer from '@src/component/common/Footer/Footer.jsx';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { FOOTER_HEIGHT } from '@src/utils/const.js';
import SettingHeader from '@src/component/setting/sidemenu/SettingHeader.jsx';
import useCheckUserToken from '@src/hooks/useCheckUserToken.jsx';

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
`;

function SettingLayout() {

  return (
    <>
      <Wrapper>
        <SettingHeader />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
      <StyledFooter footerheight={FOOTER_HEIGHT} />
    </>
  )
    ;
}

export default SettingLayout;
