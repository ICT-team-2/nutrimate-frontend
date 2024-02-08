import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';

const CustomCard = styled(Card)`
    width: 350px;
    //margin: 20px;
    height: 350px;
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
    -webkit-line-clamp: 1;
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


export default function SportCard(props) {
  const { title, video, url, youtuber } = props;
  const [isHover, setIsHover] = useState(false);
  return (
    <CustomCard>
      <CustomCardMedia
        component="video"
        controls={isHover}
        image={video}
        title={title}
        // 마우스 오버하면 controls가 나오도록
        onMouseOver={(e) => setIsHover(true)}
        onMouseOut={(e) => setIsHover(false)}
      />
      <Link to={url} style={{ textDecoration: 'none' }}>
        <CardContent>
          <CardContentContainer>
            <UserAvatar size={80} />
            <TypoContainer>
              <TitleTypography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ margin: 0 }}
              >
                {title}
              </TitleTypography>
              <Typography variant="subtitle2" color="text.secondary">
                {youtuber}
              </Typography>
            </TypoContainer>
          </CardContentContainer>
        </CardContent>
      </Link>
    </CustomCard>
  );
}

SportCard.defaultProps = {
  title: '운동영상',
  video: '/src/asset/video/MockupVideo.mp4',
  url: 'https://naver.com',
  youtuber: '유튜버',
};

