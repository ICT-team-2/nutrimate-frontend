import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

// CardMedia 커스터마이징
const CustomCardMedia = styled(CardMedia)`
    width: 270px; // 이미지 너비 설정
    height: 240px; // 이미지 높이 설정
    object-fit: cover; // 이미지 비율 유지
`;

// Typography 커스터마이징
const TitleTypography = styled(Typography)`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #383838; // 텍스트 색상 설정
    font-size: 16px;
    margin-top: 3px;
`;

// 이미지와 텍스트를 감싸는 컨테이너
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    //align-items: center; // 가운데 정렬
    text-decoration: none; // 링크 텍스트 꾸밈 제거
`;

export default function RecipeCard(props) {
  const { title, image, url } = props;

  return (
    <Link to={url} style={{ textDecoration: 'none' }}>
      <ContentContainer>
        <CustomCardMedia
          component="img"
          image={image}
          alt={title}
        />
        <TitleTypography
          gutterBottom
          variant="h6"
          component="div"
        >
        {title}
        </TitleTypography>
      </ContentContainer>
    </Link>
  );
}

RecipeCard.defaultProps = {
  title: '소갈비찜 만드는 법',
  image: '/src/asset/image/loading.png',
  url: 'https://naver.com',
};