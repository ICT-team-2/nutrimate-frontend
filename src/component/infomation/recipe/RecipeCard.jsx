import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CustomCard = styled(Card)`
    width: 250px;
    //margin: 20px;
    height: 320px;
`;

const CustomCardMedia = styled(CardMedia)`
    height: 220px;
    //object-fit: cover;
`;

/// ...처리
const TitleTypography = styled(Typography)`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;
const CardContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const TypoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 20px;
`;


export default function RecipeCard(props) {
  const { title, image, url } = props;

  return (
    <Link to={url} style={{ textDecoration: 'none' }}>
      <CustomCard>
        <CustomCardMedia
          image={image}
          title={title}
        />

        <CardContent>
          <TitleTypography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ margin: 0 }}
          >
            {title}
          </TitleTypography>
        </CardContent>
      </CustomCard>
    </Link>

  );
}

RecipeCard.defaultProps = {
  title: '소갈비찜 만드는 법',
  image: '/src/asset/image/loading.png',
  url: 'https://naver.com',
};

