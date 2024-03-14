import React from 'react';
import styled from 'styled-components';

const ContainerUp = styled.div`
    background: #27491D;
    min-height: 1000px;
    padding: 100px 300px;
`;
const ContainerDown = styled.div`
    background: #f8fbfa;
    min-height: 1300px;
    padding: 100px 300px;
`;
const ContentWrapper = styled.div`
    display: flex; // Flex 레이아웃 적용
    align-items: flex-start; // 아이템들을 상단 정렬
`;
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column; // 세로 방향으로 텍스트 아이템들을 정렬
    justify-content: flex-start;
`;
const PhoneImg = styled.img`
    width: 423px;
    height: 508px;
    margin-right: 90px; // 이미지와 텍스트 사이의 간격 조정
    margin-top: 30px;
`;
const DietImg = styled.img`
    width: 423px;
    height: 450px;
    margin-left: 90px; // 이미지와 텍스트 사이의 간격 조정
    margin-top: 30px;
`;
const HealthImg = styled.img`
    width: 423px;
    height: 450px;
    margin-right: 90px; // 이미지와 텍스트 사이의 간격 조정
    margin-top: 30px;
`;
const BodyTitle = styled.div`
    font-size: 38px;
    font-family: 'Noto Serif KR', sans-serif;
    margin-top: 50px;
    margin-bottom: 80px;
    color: white;
`;
const BodyContentUpOne = styled.div`
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
`;
const BodyContentDownOne = styled.div`
    color: white;
    font-size: 18px;
    margin-bottom: 50px;
`;
const BodyContentUpTwo = styled.div`
    color: black;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
`;
const BodyContentDownTwo = styled.div`
    color: black;
    font-size: 18px;
    margin-bottom: 50px;
`;

const MainPageDietContent = () => {
  return (
    <>
      <ContainerUp>
        <BodyTitle>
          나에게 맞는 건강한 식습관을 찾고 지속하세요.<br/>
          NutriMate가 여러분을 돕고 있습니다.
        </BodyTitle>
        <ContentWrapper>
          <PhoneImg src="/src/asset/image/img1.png" />
          <TextWrapper>
            <BodyContentUpOne>다양한 가격대에 맞춰 추천하는 최적의 음식</BodyContentUpOne>
            <BodyContentDownOne>
              NutriMate는 일상에서 실용적으로 활용할 수 있는 건강 지식을 제공하여 편하고 맛있는 식사를 즐길 수 있도록 도와드립니다. 쉽고 효과적인 가격대별 음식 추천부터 건강한 식습관을 기르는 데 필요한 정보까지, NutriMate가 당신의 건강을 위해 함께합니다.            
            </BodyContentDownOne>
            <BodyContentUpOne>알레르기를 고려한 개인 맞춤형 음식 추천</BodyContentUpOne>
            <BodyContentDownOne>
              NutriMate는 당신의 알레르기 상태를 고려하여 최적의 음식을 제안합니다. 다양한 알레르기 유형을 고려하여 건강하면서도 맛있는 음식을 찾아내어 당신의 식단을 다양화합니다. 또한, 알레르기를 일으킬 수 있는 잠재적인 음식 성분을 피하도록 도와줍니다.            
            </BodyContentDownOne>
            <BodyContentUpOne>당신에게 맞춤형으로 제안되는 식단 추천</BodyContentUpOne>
            <BodyContentDownOne>
              NutriMate는 사용자의 특별한 선호도와 식습관을 중심으로 식단을 제공합니다. 우리는 당신이 원하는 맛과 영양을 모두 갖춘 식사를 경험하실 수 있도록 도와드립니다. 이제 NutriMate와 함께 맛있고 건강한 식단을 만들어보세요.            
            </BodyContentDownOne>
          </TextWrapper>
        </ContentWrapper>
      </ContainerUp>

      <ContainerDown>
        <ContentWrapper>
          <TextWrapper style={{ marginTop: '160px' }}>
            <BodyContentUpTwo>식단 관리 프로그램</BodyContentUpTwo>
            <BodyContentDownTwo>
             NutriMate는 오늘 먹은 음식과 운동을 기록하고 탄수화물, 단백질, 지방의 비율을 계산하는 기능들로  여러분이 계속해서 나아가도록 돕습니다. 건강한 식습관을 만드는 순탄하지 않은 과정에서 모두가 스스로에게 가장 알맞은 목표를 달성할 수 있어야 한다고 믿기 때문이죠. 식단 이미지 분석을 통해 음식의 영양성분을 제공받으면서 나를 위한 코치를 만나고 내 상황에 맞는 최적의 도움을 받으세요.            
            </BodyContentDownTwo>
          </TextWrapper>
          <DietImg src="/src/asset/image/img2.png" />
        </ContentWrapper>
        <br/><br/><br/>
        <ContentWrapper>
        <HealthImg src="/src/asset/image/img3.png" />
          <TextWrapper style={{ marginTop: '160px' }}>
            <BodyContentUpTwo>당뇨병/고혈압 관리 프로그램</BodyContentUpTwo>
            <BodyContentDownTwo>
             우리는 식습관 관리에서 시작했지만, 이제 우리의 확장된 행동 변화 플랫폼에서 스트레스와 불안, 당뇨병, 고혈압과 같은 만성 또는 비만성 질환의 사람들을 도와 모두가 더 건강한 세상을 만들기 위해 노력하고 있습니다. NutriMate는 사람들이 건강한 식습관을 찾고 당뇨병, 고혈압을 예방 및 관리할 수 있도록 맞춤형 프로그램을 제공합니다.            
            </BodyContentDownTwo>
          </TextWrapper>
        </ContentWrapper>
      </ContainerDown>
    </>
  );
};

export default MainPageDietContent;