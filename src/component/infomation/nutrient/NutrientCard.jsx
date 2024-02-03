import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import Chip from '@mui/material/Chip';

const CustomCard = styled(Card)`
    width: 250px;
    //margin: 20px;
    height: 380px;
`;

const CustomCardMedia = styled(CardMedia)`
    height: 130px;
    width: 130px;
    margin: 0 auto;
`;

/// ...처리
const TitleTypography = styled(Typography)`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
`;

const RankTypography = styled(Typography)`
    margin: 20px 0 0 20px;
    color: ${({ theme }) => theme['primary-color']};
    font-weight: bold;
    display: inline-block;
`;
const EfficacyChip = styled(Chip)`
    margin: 5px;
`;

export default function NutrientCard(props) {
  const { nutrient, img, url, company, ranking, point, efficacy } = props;
  return (
    <CustomCard>
      <Link to={url} style={{ textDecoration: 'none' }}>
        <RankTypography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ margin: 0 }}
        >
          {ranking}
        </RankTypography>
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
          <Rating
            precision={0.1}
            name="read-only" value={point} readOnly />
          <br />
          {efficacy.map((eff, index) => {
            return (
              <div key={eff + index}>
                <EfficacyChip label={eff} />
              </div>
            );
          })}
        </CardContent>
      </Link>
    </CustomCard>
  );
}

NutrientCard.defaultProps = {
  nutrient: '영양제',
  img: '/src/asset/image/loading.png',
  url: 'https://naver.com',
  date: '2022.01.12',
  company: '회사',
  point: 4.4,
  reviewNumber: 100,
  efficacy: ['효능1', '효능2'],
  ranking: 1,
};

