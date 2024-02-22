import React, { useEffect, useRef } from 'react';
import {
  FlexGrowDiv,
  UserAvatar,
} from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FeedCommentComponent
  from '@src/component/board/feed/FeedCommentComponent.jsx';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import LikeButton from '@src/component/board/LikeButton.jsx';
import { Button, TextField } from '@mui/material';
import useClickLikeButton
  from '@src/component/board/feed/hooks/useClickLikeButton.jsx';
import useFetchCommentsList
  from '@src/component/board/feed/hooks/useFetchCommentsList.jsx';
import CommentTextField from '@src/component/board/feed/CommentTextField.jsx';
import { useAtom } from 'jotai';
import {
  commentEditDataAtom,
  commentListRefAtom,
  replyChipDataAtom,
} from '@src/component/board/atom.js';
import { useSetAtom } from 'jotai/react';
import { INIT_EDIT_COMMENT_STATE } from '@src/component/board/const.js';
import BookmarkButton from '@src/component/board/BookmarkButton.jsx';

const CONTAINER_MAX_HEIGHT = 'calc(100vh - 100px)';
const COMMENT_LIST_MAX_HEIGHT = 'calc(200% - 120px)';

const FeedCommentInnerContainer = styled.div`
    max-width: 100%;
    padding-left: 30px;
    max-height: ${CONTAINER_MAX_HEIGHT};
    height: 80vw;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    position: relative;

`;
const FeedCommentOuterContainer = styled.div`
    width: 500px;

`;

const FeedCommentHeader = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 10px 0;
`;
const NicknameTypo = styled(Typography)`
    margin: 9px 0 0 10px;
`;
const FeedCommentBody = styled.div`
    overflow-y: scroll;
    height: 70vh;
    scrollbar-width: none;
    position: relative;
    max-height: ${COMMENT_LIST_MAX_HEIGHT};
    flex-grow: 1;
    backface-visibility: hidden; //하드웨어 가속을 강제로 활성화
    transform: translate3d(0, 0, 0);
`;

const LikeButtonContainer = styled.div`
    position: relative;
    left: 13px;
    top: 4px;
`;
const ButtonsContainer = styled.div`
    display: flex;
`;
const CommentInputContainer = styled.div`
    display: flex;
`;
const StyledButton = styled(Button)`
    height: 40px;
    margin-left: 5px;
`;
const LikeViewContainer = styled.div`
    position: relative;
    bottom: 5px;
`;

const LikeTypography = styled(Typography)`
    font-weight: bold;
`;

const FeedCommentList = (props) => {
  const { feedData } = props;
  const {
    boardId, boardContent, boardThumbnail,
    checkedLike, likeCount, userNick: writer,
  } = feedData;
  const commentInputRef = useRef(null);
  const commentListRef = useRef(null);
  
  const [cmtListRef, setCmtListRef] = useAtom(commentListRefAtom);
  const setEditCommentData = useSetAtom(commentEditDataAtom);
  const setReplyChipData = useSetAtom(replyChipDataAtom);
  
  const clickLikeButton = useClickLikeButton(boardId);
  const { data: cmtData, isLoading, isError } = useFetchCommentsList(boardId);
  
  const onClickLike = () => {
    clickLikeButton.mutate();
  };
  // useEffect(() => {
  //   console.log(cmtData);
  // }, [cmtData]);
  
  useEffect(() => {
    setCmtListRef(commentListRef.current);
  }, [commentListRef.current]);
  
  return (
    <FeedCommentOuterContainer>
      <FeedCommentInnerContainer>
        <FeedCommentHeader>
          <UserAvatar userNick={writer} />
          <NicknameTypo variant='subtitle2'>{writer}</NicknameTypo>
        </FeedCommentHeader>
        <Divider />
        <FeedCommentBody ref={commentListRef}>
          {/*처음은 본문 표시*/}
          <FeedCommentComponent
            cmtDepth={0}
            inputRef={commentInputRef}
            isContent={true}
            {...feedData}
          />
          <FeedComments cmtData={cmtData} inputRef={commentInputRef} />
          {/*<FeedCommentComponent />*/}
        </FeedCommentBody>
        <Divider />
        <ButtonsContainer>
          <Tooltip title='댓글'>
            <IconButton
              onClick={() => {
                setEditCommentData(INIT_EDIT_COMMENT_STATE);
                setReplyChipData([]);
                commentInputRef.current.focus();
              }}
              aria-label='comment'>
              <CommentIcon />
            </IconButton>
          </Tooltip>
          <FlexGrowDiv />
          <Tooltip title={'좋아요'}>
            <LikeButtonContainer>
              <LikeButton
                onClick={onClickLike}
                clicked={checkedLike === 1}
                size={7} />
            </LikeButtonContainer>
          </Tooltip>
          <Tooltip title='북마크'>
            <BookmarkButton />
          </Tooltip>
        </ButtonsContainer>
        <LikeViewContainer>
          <LikeTypography variant='body2'>좋아요 {likeCount}개</LikeTypography>
        </LikeViewContainer>
        <CommentTextField
          inputRef={commentInputRef}
          size='small'
          boardId={boardId}
        />
      </FeedCommentInnerContainer>
    </FeedCommentOuterContainer>
  
  );
};

const FeedComments = ({ cmtData, inputRef }) => {
  
  return (
    <>
      {cmtData && cmtData.length > 0 && cmtData.map((cmt, index) => {
        return (
          <React.Fragment
            key={`comment-${index}`}>
            <FeedCommentComponent
              inputRef={inputRef}
              {...cmt}
            />
            {cmt.replies.length !== 0 && <FeedComments
              cmtData={cmt.replies}
              inputRef={inputRef}
            />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FeedCommentList;

