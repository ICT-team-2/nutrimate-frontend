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

export default function NewsCard(props) {
  const { title, content, img, url, date } = props;
  return (
    <Link to={url} style={{ textDecoration: 'none' }}>
      <CustomCard>
        <CustomCardMedia
          image={img}
          title={title}
        />
        <CardContent>
          <TitleTypography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ margin: 0 }}
          >
            {title}
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

NewsCard.defaultProps = {
  title: 'Title',
  img: '/src/asset/image/loading.png',
  content: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
    'species, ranging across all continents except Antarctica',
  url: 'http://naver.com',
  date: '2022.01.12',
};

