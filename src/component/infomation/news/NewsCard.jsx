import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CustomCard = styled(Card)`
    display: flex; // flex 레이아웃을 사용하여 내부 요소들을 가로로 배치
    width: 100%; 
    margin-bottom: 10px; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
    height: 150px; 
`;

// 이미지 영역을 적절한 비율로 조정
const CustomCardMedia = styled(CardMedia)`
    width: 20%; // 전체 카드 너비의 30%를 차지하도록 설정
    object-fit: cover; // 이미지 비율을 유지하면서 영역에 맞게 조정
`;

const Content = styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%; // 텍스트 영역이 전체 카드 너비의 70%를 차지하도록 설정
`;

const ContentTypography = styled(Typography)`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
`;

const TitleTypography = styled(Typography)`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: black;
`;

export default function NewsCard(props) {
  const { title, content, img, url, date } = props;
  return (
    <CustomCard>
      <Link to={url} style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
        <CustomCardMedia
          image={img}
          title={title}
        />
        <Content>
          <TitleTypography
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </TitleTypography>
          <ContentTypography variant="body2" color="text.secondary">
            {content}
          </ContentTypography>
        </Content>
      </Link>
    </CustomCard>
  );
}

NewsCard.defaultProps = {
  title: 'Title',
  img: '/src/asset/image/loading.png',
  content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  url: 'https://naver.com',
  date: '2022.01.12',
};