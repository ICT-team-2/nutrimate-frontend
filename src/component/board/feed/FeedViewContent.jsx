import React, { useState } from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import {
  FlexGrowDiv,
  UserAvatar,
} from '@src/component/common/GlobalComponents.jsx';
import Tooltip from '@mui/material/Tooltip';
import LikeButton from '@src/component/board/LikeButton.jsx';
import FeedDetailContent from '@src/component/board/feed/FeedDetailContent.jsx';
import useClickLikeButton
  from '@src/component/board/feed/hooks/useClickLikeButton.jsx';
import { NO_IMAGE_PATH } from '@src/utils/const.js';
import BookmarkButton from '@src/component/board/BookmarkButton.jsx';

const ViewContentContainer = styled.div`
    margin: 30px 0;
`;
const StyledCard = muiStyled(Card)`

`;
const ContentTypo = styled(Typography)`
    overflow: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'auto'
            : 'hidden'};
    text-overflow: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'clip'
            : 'ellipsis'};
    white-space: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'normal'
            : 'nowrap'};
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
function FeedViewContent (props) {
  const [clickMoreView, setClickMoreView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    boardContent, boardId, boardThumbnail,
    checkedLike, likeCount, userNick: writer,
  } = props;
  const clickLikeButton = useClickLikeButton(boardId);
  
  const onClickLike = () => {
    clickLikeButton.mutate();
  };
  
  return (
    <>
      <ViewContentContainer>
        <StyledCard>
          <CardHeader
            avatar={
              <UserAvatar
                userNick={writer}
                sx={{ bgcolor: red[500] }} aria-label='recipe'>
                {writer}
              </UserAvatar>
            }
            title={writer}
          />
          <CardMedia
            component='img'
            height='500'
            image={import.meta.env.REACT_APP_BACKEND_URL + boardThumbnail}
            alt='feed image'
            onError={(e) => {
              e.target.src = NO_IMAGE_PATH;
            }}
          />
          <CardActions disableSpacing>
            <Tooltip title='댓글'>
              <IconButton
                onClick={() => setModalOpen(true)}
                aria-label='comment'>
                <CommentIcon />
              </IconButton>
            </Tooltip>
            <FlexGrowDiv />
            <Tooltip title={'좋아요'}>
              <LikeButtonContainer>
                <LikeButton
                  onClick={onClickLike}
                  size={7}
                  clicked={checkedLike === 1} />
              </LikeButtonContainer>
            </Tooltip>
            <Tooltip title='북마크'>
              <BookmarkButton />
            </Tooltip>
          </CardActions>
          <CardContent>
            <ContentTypo
              variant='body2' color='text.secondary'
              clickmoreview={clickMoreView + ''}>
              {boardContent}
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
      <FeedDetailContent
        open={modalOpen} setOpen={setModalOpen}
        data={props}
      />
    </>
  );
}

export default FeedViewContent;
