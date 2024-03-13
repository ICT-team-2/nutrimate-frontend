import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import {
  FlexGrowDiv,
  UserAvatar,
} from '@src/component/common/GlobalComponents.jsx';
import Tooltip from '@mui/material/Tooltip';
import FeedDetailContent from '@src/component/board/feed/FeedDetailContent.jsx';
import { LINKS, NO_IMAGE_PATH } from '@src/utils/const.js';
import FeedDropMenu from '@src/component/board/feed/FeedDropMenu.jsx';
import BoardBookmarkButton from '@src/component/board/BoardBookmarkButton.jsx';
import BoardLikeButton from '@src/component/board/BoardLikeButton.jsx';
import useUpdateViewCount from '@src/hooks/board/common/useUpdateViewCount.jsx';

const ViewContentContainer = styled.div`
    margin: 30px 0;
`;
const StyledCard = muiStyled(Card)`

`;
const ContentTypo = styled(Typography)`
    overflow: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'auto' : 'hidden'};
    text-overflow: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'clip' : 'ellipsis'};
    white-space: ${({ clickmoreview }) => clickmoreview === 'true'
            ? 'normal' : 'nowrap'};
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
const isEllipsisActive = (element) => {
  return element.offsetWidth < element.scrollWidth;
};

/**
 * 상세보기의 카드형태의 피드 하나를 렌더링합니다.
 *
 * @return {JSX.Element} 피드 뷰의 콘텐츠
 */
function FeedViewContent(props) {
  const [clickMoreView, setClickMoreView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    boardContent, boardId, boardThumbnail,
    checkedLike, userNick: writer, checkedBookmark,
    userId: writerId, userProfile: writerProfile,
  } = props;
  const [likeClicked, setLikeClicked] = useState(checkedLike === 1);
  const userId = parseInt(sessionStorage.getItem('userId'));

  const [contentEllipsis, setContentEllipsis] = useState(false);
  const contentRef = useRef(null);

  const updateViewCount = useUpdateViewCount();


  useEffect(() => {
    setLikeClicked(checkedLike === 1);
  }, [checkedLike]);

  useEffect(() => {
    if (!contentRef.current) return;
    setContentEllipsis(isEllipsisActive(contentRef.current));
  }, [contentRef.current]);


  return (
    <>
      <ViewContentContainer>
        <StyledCard>
          <CardHeader
            avatar={
              <UserAvatar
                src={import.meta.env.REACT_APP_BACKEND_URL + writerProfile}
                userNick={writer}
                aria-label="recipe">
                {writer}
              </UserAvatar>
            }
            action={
              (writerId === userId) && <FeedDropMenu boardId={boardId}/>
            }
            title={writer}
          />
          <CardMedia
            component="img"
            height="500"
            image={import.meta.env.REACT_APP_BACKEND_URL + boardThumbnail}
            alt="feed image"
            onError={(e) => {
              e.target.src = NO_IMAGE_PATH;
            }}
          />
          <CardActions disableSpacing>
            <Tooltip title="댓글">
              <IconButton
                onClick={() => {
                  updateViewCount.mutate(boardId);
                  //   {
                  //   onSuccess: () => {
                  //     setModalOpen(true);
                  //   },
                  // });
                  setModalOpen(true);
                }}
                aria-label="comment">
                <CommentIcon />
              </IconButton>
            </Tooltip>
            <FlexGrowDiv />
            <Tooltip title={'좋아요'}>
              <LikeButtonContainer>
                <BoardLikeButton
                  boardId={boardId}
                  size={7}
                  clicked={likeClicked}
                />
              </LikeButtonContainer>
            </Tooltip>
            <Tooltip title="북마크">
              <BoardBookmarkButton
                boardid={boardId}
                clicked={(checkedBookmark === 1) + ''}
              />
            </Tooltip>
          </CardActions>
          <CardContent>
            <ContentTypo
              ref={contentRef}
              variant="body2" color="text.secondary"
              clickmoreview={clickMoreView + ''}
            >
              {boardContent}
            </ContentTypo>
            {!clickMoreView && contentEllipsis &&
              <MoreViewButton
                onClick={() => setClickMoreView(true)}
                variant="body2" color="text.secondary">
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
