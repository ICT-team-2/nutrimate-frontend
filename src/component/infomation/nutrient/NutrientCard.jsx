import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CustomCard = styled(Card)`
    width: 275px;
    margin: 10px;
    height: 400px;
`;

const CustomCardMedia = styled(CardMedia)`
    height: 220px;
`;

/// ...처리
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
    -webkit-line-clamp: 2;
`;

export default function NutrientCard(props) {
  const { nutrient, content, img, url, date, company } = props;
  return (
    <Link to={url} style={{ textDecoration: 'none' }}>
      <CustomCard>
        
        <CustomCardMedia
          image={img}
          title={nutrient}
        />
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {company}
          </Typography>
          <TitleTypography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ margin: 0 }}
          >
            {nutrient}
          </TitleTypography>
          <br />
          <ContentTypography variant="body2" color="text.secondary">
            {content}
          </ContentTypography>
          <br />
          <Typography variant="caption" display="block" gutterBottom>
            발행일: {date}
          </Typography>
        </CardContent>
      </CustomCard>
    </Link>
  );
}

NutrientCard.defaultProps = {
  nutrient: '영양제',
  img: '/src/asset/image/loading.png',
  content: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
    'species, ranging across all continents except Antarctica',
  url: 'http://naver.com',
  date: '2022.01.12',
  company: '회사',
  point: 4,
  reviewNumber: 100,
  efficacy: ['효능1', '효능2'],
  ranking: 1,
};

