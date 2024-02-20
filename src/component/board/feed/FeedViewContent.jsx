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
import LikeButton from '@src/component/board/LikeButton.jsx';
import FeedDetailContent from '@src/component/board/feed/FeedDetailContent.jsx';

const ViewContentContainer = styled.div`
    margin: 30px 0;
`;
const StyledCard = muiStyled(Card)`

`;
const ContentTypo = styled(Typography)`
    overflow: ${({ clickmoreview }) => clickmoreview === 'true' ? 'auto' : 'hidden'};
    text-overflow: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'clip'
            : 'ellipsis'};
    white-space: ${({ clickmoreview }) => clickmoreview === 'true' ? 'normal' : 'nowrap'};
`;

const MoreViewButton = styled(Typography)`
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;

`;
const LikeButtonContainer = styled.div`
    position: relative;
    left: 13px;

`;

/**
 * 상세보기의 카드형태의 피드 하나를 렌더링합니다.
 *
 * @return {JSX.Element} 피드 뷰의 콘텐츠
 */
function FeedViewContent() {
  const [clickMoreView, setClickMoreView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ViewContentContainer>
        <StyledCard>
          <CardHeader
            avatar={
              <UserAvatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </UserAvatar>
            }
            title={'닉네임'}
          />
          <CardMedia
            component="img"
            height="500"
            image="/src/asset/image/loading.png"
            alt="Paella dish"
          />
          <CardActions disableSpacing>
            <Tooltip title="댓글">
              <IconButton
                onClick={() => setModalOpen(true)}
                aria-label="comment">
                <CommentIcon />
              </IconButton>
            </Tooltip>
            <FlexGrowDiv />
            <Tooltip title={'좋아요'}>
              <LikeButtonContainer>
                <LikeButton size={7} />
              </LikeButtonContainer>
            </Tooltip>
            <Tooltip title="북마크">
              <IconButton aria-label="bookmark">
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
          <CardContent>
            <ContentTypo
              variant="body2" color="text.secondary"
              clickmoreview={clickMoreView + ''}>
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </ContentTypo>

            {!clickMoreView &&
              <MoreViewButton
                onClick={() => setClickMoreView(true)}
                variant="body2" color="text.secondary">
                더보기
              </MoreViewButton>}
          </CardContent>
        </StyledCard>
      </ViewContentContainer>
      <FeedDetailContent
        open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

export default FeedViewContent;
