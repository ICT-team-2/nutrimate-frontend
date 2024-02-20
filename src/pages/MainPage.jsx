import React, { useEffect,useState } from 'react';
import MainPageImg from '@src/asset/image/MainPageImg.jpg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import {
  FlexDiv,
  RelativeWrapper,
  StyledContainer,
} from '@src/component/common/GlobalComponents.jsx';
import MainPageIntroduce from '@src/component/mainpage/MainPageIntroduce.jsx';
import MainPageDietContent
  from '@src/component/mainpage/MainPageDietContent.jsx';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';


  

const MainImg = styled.img`
    width: 100%;
    height: ${(props) => props.size};
    object-fit: cover;
`;

const MainPageImgContent = styled.div`
    position: relative;
    transform: translateY(-400px); // transform 속성을 사용하여 위치 이동
    color: white;
    z-index: 10;
`;

const MainFirstTypo = styled.div`
    font-size: 40px;
    font-family: 'Noto Serif KR', sans-serif;
    margin-bottom: 30px;
`;
const MainSecondTypo = styled.div`
    font-size: 26px;
`;
const MainImgCover = styled.div`
    width: 100%;
    height: ${(props) => props.size};
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const StyledButton = styled(Button)`
    margin: 40px 0px 0 30px;
    width: 200px;
    height: 55px;
    font-size: 20px;
`;
const LastTitleContainer = styled.div`
    margin: 300px auto 200px;
    display: flex;
    flex-direction: column;
`;
const LastButtonContainer = styled.div`
    margin: 30px auto;
`;

const LastTitle = styled.div`
    font-family: 'Noto Serif KR', sans-serif;
    font-size: 64px;
`;

const MainPage = ({ imgSize }) => {
  
// const [token,setToken] = useState('');
// const cookies = useCookies(['access']);
// useEffect(() => {
//   if (cookies.access) {
//     console.log('aa');
//     setToken(cookies.access);
//     sessionStorage.setItem(token);
//   }
// });


const [token, setToken] = useState('');
const [cookies] = useCookies(['ACCESS']);
// 사용자 정보를 저장할 상태를 추가합니다.
const [userInfo, setUserInfo] = useState(null);
const [userId, setUserId] = useAtom(userIdAtom);
  useEffect(() => {
    if (cookies.ACCESS) {
      //console.log('Token found:', cookies.ACCESS);
      setToken(cookies.ACCESS);
      //sessionStorage.setItem('token', cookies.ACCESS);
      // 토큰을 디코딩하여 사용자 정보를 추출하고 상태에 저장합니다.
      const decodedToken = jwtDecode(cookies.ACCESS);
      setUserInfo(decodedToken);
      console.log('Decoded Token:', decodedToken);
      console.log("userId:",decodedToken.userInfo.userId)
      setUserId(decodedToken.userInfo.userId);
    }
  }, [cookies]);

  const navigate = useNavigate();
  const gotoSurvey = () => {
    navigate(LINKS.SURVEY);
  };

  // useEffect(() => {
  //   console.log("userId:",userId)
  // },[userId])
  
  
  return (
    <>
      <MainImg src={MainPageImg} size={imgSize} />
      <MainImgCover size={imgSize} />
      <StyledContainer>
        <RelativeWrapper>
          <MainPageImgContent>
            {/* <h2>{TITLE.APP}</h2> */}
            <MainFirstTypo>
              건강한 식습관으로 더 나은 삶의<br />
              시작을 경험하세요
            </MainFirstTypo>
            <MainSecondTypo>
              당신만의 맞춤식 프로그램으로 건강한 식습관을 만나보세요
            </MainSecondTypo>
            <StyledButton
              variant='contained'
              size='large'
              onClick={gotoSurvey}>시작하기</StyledButton>
          </MainPageImgContent>
        </RelativeWrapper>
      </StyledContainer>
      <MainPageIntroduce />
      <MainPageDietContent />
      <FlexDiv>
        <LastTitleContainer>
          <LastTitle>지금 내가 먹고있는 식단이 궁금하다면? </LastTitle>
          <LastButtonContainer>
            <StyledButton
              variant='contained'
              onClick={gotoSurvey}>내 식단 분석하기</StyledButton>
          </LastButtonContainer>
        </LastTitleContainer>
      </FlexDiv>
    </>
  );
};

MainPage.defaultProps = {
  imgSize: '100vh',
};



export default MainPage;
