import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexGrowDiv, StyledContainer } from '@src/component/common/GlobalComponents.jsx';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver.jsx';
import { Zoom } from '@mui/material';

const DIET_INFOS = [
  {
    title: '일반 식단',
    content: '일상적인 식단으로, 균형 있는 영양소 섭취를 추구하는 사람들에게 적합합니다. 이 식단은 주로 탄수화물, 단백질, 지방을 적절하게 조화롭게 섭취하여 건강한 식습관을 지원합니다.',
    titleColor: '#C35022',
    index: 0,
    src: '/src/asset/image/mainpage/NormalDietImage.png',
  },
  {
    title: '고단백 식단',
    content: '운동을 많이 하는 분들이나 근육을 유지하고 키우고 싶은 분들에게 추천되는 식단입니다. 고단백질 식품을 중심으로 섭취하여 근육을 보호하고 회복시키는 효과가 있습니다.',
    titleColor: '#C9AA7E',
    index: 1,
    src: '/src/asset/image/mainpage/SportDietImage.png',
  },
  {
    title: '키토 식단',
    content: '탄수화물 섭취를 제한하고 지방과 단백질을 주로 섭취하는 식단입니다. 체중 관리나 혈당 관리에 관심이 있는 분들에게 적합하며, 지방 연소와 살이 빠짐을 도와줄 수 있습니다.',
    titleColor: '#B06498',
    index: 2,
    src: '/src/asset/image/mainpage/KitoDietImage.png',
  },
  {
    title: '비건 식단',
    content: '동물성 식품을 섭취하지 않는 채식주의자들을 위한 식단 입니다. 채소, 과일, 곡물, 콩, 견과류 등 식물성 식품을 중심으로 영양소를 공급하여 건강한 채식 생활을 도와줍니다',
    titleColor: '#C0C06E',
    index: 3,
    src: '/src/asset/image/mainpage/VeganDietImage.png',
  },
];

const ContainerDiv = styled.div`
    background: ${({ theme }) =>
            `linear-gradient(to bottom, 
            ${theme['main-background']} 0%, 
            #95B5A1 10%,
            #506B57 30%,
            #203B26 60%,
            #0C1F0E 100%)`};
    min-height: 2000px;
`;
const StyledFlexContainer = styled(StyledContainer)`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1500px;
`;
const InfoContainer = styled.div`
    display: flex;
    flex-direction: ${({ index }) => (parseInt(index) % 2 === 0 ?
            'row' : 'row-reverse')};
    align-items: center;
    margin-bottom: 100px;
`;

const ColumnFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin-left: ${({ index }) => (parseInt(index) % 2 === 0 ? '150px' : '0')};
    margin-right: ${({ index }) => (parseInt(index) % 2 === 0 ? '0' : '150px')};
    height: 700px;

`;
const DietInfoTitle = styled.div`
    font-family: 'Noto Serif KR', sans-serif;
    font-size: 64px;
    color: ${({ color }) => color};
`;
const DietInfoText = styled.div`
    color: white;
    margin: 20px 5px;
`;
const DietImg = styled.img`
    width: 700px;
    height: 600px;
`;


const DietInfoContent = (props) => {
  const { titleColor, index, title, content, src } = props;
  const imgRef = useRef();
  const [observe, unobserve] = useIntersectionObserver(() => {
    setZoom(true);
  });
  useEffect(() => {
    const img = imgRef.current;
    observe(img);
    return () => {
      unobserve(img);
    };
  }, []);

  const [zoom, setZoom] = useState(false);
  return (
    <InfoContainer index={index + ''}>
      <Zoom in={zoom} timeout={500}>
        <DietImg src={src} alt={title} ref={imgRef} />
      </Zoom>
      <FlexGrowDiv />
      <ColumnFlexDiv index={index + ''}>
        <FlexGrowDiv grow={2} />
        <FlexGrowDiv>
          <DietInfoTitle color={titleColor}>{title}</DietInfoTitle>
          <DietInfoText>
            {content}
          </DietInfoText>
        </FlexGrowDiv>
      </ColumnFlexDiv>
    </InfoContainer>
  );
};

const MainPageDietContent = () => {
  return (
    <ContainerDiv>
      <StyledFlexContainer>
        {DIET_INFOS.map((dietInfo) => (
          <DietInfoContent
            key={dietInfo.index}
            {...dietInfo} />
        ))}
      </StyledFlexContainer>
    </ContainerDiv>
  );
};


export default MainPageDietContent;
