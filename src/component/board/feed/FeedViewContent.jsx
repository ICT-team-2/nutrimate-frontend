import React, { useState } from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  FlexGrowDiv,
  UserAvatar,
} from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const ViewContentContainer = styled.div`
    margin: 20px 0;
`;
const StyledCard = muiStyled(Card)`

`;
const ContentTypo = styled(Typography)`
    overflow: ${({ clickMoreView }) => clickMoreView ? 'auto' : 'hidden'};
    text-overflow: ${({ clickMoreView }) => clickMoreView
            ? 'clip'
            : 'ellipsis'};
    white-space: ${({ clickMoreView }) => clickMoreView ? 'normal' : 'nowrap'};
`;

const MoreViewButton = styled(Typography)`
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;

`;

/**
 * 상세보기의 카드형태의 피드 하나를 렌더링합니다.
 *
 * @return {JSX.Element} 피드 뷰의 콘텐츠
 */
function FeedViewContent () {
  const [clickMoreView, setClickMoreView] = useState(false);
  
  return (
    <ViewContentContainer>
      <StyledCard>
        <CardHeader
          avatar={
            <UserAvatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              R
            </UserAvatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={'닉네임'}
          // subheader='September 14, 2016'
        />
        <CardMedia
          component='img'
          height='500'
          image='/src/asset/image/loading.png'
          alt='Paella dish'
        />
        <CardActions disableSpacing>
          <Tooltip title={'좋아요'}>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='댓글'>
            <IconButton aria-label='comment'>
              <CommentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='공유'>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <FlexGrowDiv />
          <Tooltip title='북마크'>
            <IconButton aria-label='bookmark'>
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
        <CardContent>
          <ContentTypo
            variant='body2' color='text.secondary'
            clickMoreView={clickMoreView}>
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </ContentTypo>
          
          {!clickMoreView &&
            <MoreViewButton
              onClick={() => setClickMoreView(true)}
              variant='body2' color='text.secondary'>
            더보기
          </MoreViewButton>}
        </CardContent>
      </StyledCard>
    </ViewContentContainer>
  );
}

export default FeedViewContent;
