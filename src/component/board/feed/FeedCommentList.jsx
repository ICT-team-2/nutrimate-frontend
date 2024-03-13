import React, { useEffect, useRef, useState } from 'react';
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
import { Button, TextField } from '@mui/material';
import useFetchCommentsList
  from '@src/hooks/board/common/comment/useFetchCommentsList.jsx';
import CommentInputTextField from '@src/component/board/CommentInputTextField.jsx';
import { atom, useAtom } from 'jotai';
import {
  commentEditDataAtom,
  commentListRefAtom, isCommentEditAtom,
  replyChipDataAtom,
} from '@src/component/board/atom.js';
import { useSetAtom } from 'jotai/react';
import { INIT_EDIT_COMMENT_STATE } from '@src/component/board/const.js';
import useFetchFeedDetail from '@src/hooks/board/feed/useFetchFeedDetail.jsx';
import CommentEditTextField from '@src/component/board/CommentEditTextField.jsx';
import FeedDropMenu from '@src/component/board/feed/FeedDropMenu.jsx';
import BoardLikeButton from '@src/component/board/BoardLikeButton.jsx';
import BoardBookmarkButton from '@src/component/board/BoardBookmarkButton.jsx';
import FollowButton from '@src/component/common/FollowButton.jsx';
import { useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import ReportModal from '@src/component/admin/manage/ReportModal.jsx';

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
const LikeViewContainer = styled.div`
    position: relative;
    bottom: 5px;
`;
const LikeTypography = styled(Typography)`
    font-weight: bold;
`;


const FeedCommentList = (props) => {
  const { feedData} = props;
  const {
    boardId, likeCount, userNick: writer,
    userId: writerId,
  } = feedData;

  const commentInputRef = useRef(null);
  const commentEditRef = useRef(null);
  const commentListRef = useRef(null);

  const [cmtListRef, setCmtListRef] = useAtom(commentListRefAtom);//스크롤 내리는 용도
  const setEditCommentData = useSetAtom(commentEditDataAtom);
  const setReplyChipData = useSetAtom(replyChipDataAtom);
  const [isEdit, setIsEdit] = useAtom(isCommentEditAtom);//댓글 수정 모드인지

  const { data: detailData, isLoading: detailLoading } = useFetchFeedDetail(boardId);
  const { data: cmtData } = useFetchCommentsList(boardId);

  const isWriter = writerId === parseInt(sessionStorage.getItem('userId'));
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportModalComment , setShowReportModalComment] = useState(false);
  const [cmtId , setCmtId] = useState(false);

  const queryClient = useQueryClient();

  const onChangeFollow = () => {
    queryClient.invalidateQueries({
      predicate: query => {
        return query.queryKey.includes(REACT_QUERY_KEYS.FEED);
      },
    });
  };


  useEffect(() => {
    setIsEdit(false);
  }, []);

  useEffect(() => {
    setCmtListRef(commentListRef.current);
  }, [commentListRef.current]);

  return (
    <FeedCommentOuterContainer>
      {showReportModal && <ReportModal setShowReportModal={setShowReportModal}  showReportModal={showReportModal}  boardId={boardId} searchKeyWord={'BOARD'}/>}
      {showReportModalComment && <ReportModal setShowReportModal={setShowReportModalComment}  showReportModal={showReportModalComment}  cmtId={cmtId} searchKeyWord={'CMT'}/>}
      <FeedCommentInnerContainer>
        <FeedCommentHeader>
          <UserAvatar userNick={writer} />
          <NicknameTypo variant="subtitle2">{writer}</NicknameTypo>
          <FlexGrowDiv />
          {!isWriter &&
            <FollowButton
              following={detailData?.checkedFollowed === 1}
              followId={writerId}
              onClickFollow={onChangeFollow}
              onClickUnfollow={onChangeFollow}
            />}
          <FeedDropMenu boardId={boardId} setShowReportModal={setShowReportModal} setCmtId={setCmtId} />
        </FeedCommentHeader>
        <Divider />
        <FeedCommentBody ref={commentListRef}>
          {/*처음은 본문 표시*/}
          <FeedCommentComponent
            setShowReportModalComment={setShowReportModalComment}
            setCmtId={setCmtId}
            cmtDepth={0}
            inputRef={commentInputRef}
            editRef={commentEditRef}
            isContent={true}
            {...feedData}
          />
          <FeedComments
            cmtData={cmtData}
            inputRef={commentInputRef}
            editRef={commentEditRef}
            setCmtId={setCmtId}
            setShowReportModalComment={setShowReportModalComment}
          />
        </FeedCommentBody>
        <Divider />
        <ButtonsContainer>
          <Tooltip title="댓글">
            <IconButton
              onClick={async () => {
                setEditCommentData(INIT_EDIT_COMMENT_STATE);
                setReplyChipData([]);
                await setIsEdit(false);
                commentInputRef.current.focus();
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
                clicked={detailData?.checkedLike === 1}
                size={7} />
            </LikeButtonContainer>
          </Tooltip>
          <Tooltip title="북마크">
            <BoardBookmarkButton
              boardid={boardId}
              clicked={(detailData?.checkedBookmark === 1) + ''}
            />
          </Tooltip>
        </ButtonsContainer>
        <LikeViewContainer>
          <LikeTypography variant="body2">좋아요 {likeCount}개</LikeTypography>
        </LikeViewContainer>
        {!isEdit ? <CommentInputTextField
            inputRef={commentInputRef}
            size="small"
            boardId={boardId}
          /> :
          <CommentEditTextField
            inputRef={commentEditRef}
            size="small"
            boardId={boardId}
          />}
      </FeedCommentInnerContainer>
    </FeedCommentOuterContainer>
  );
};

const FeedComments = ({ cmtData, inputRef, editRef ,setShowReportModalComment,setCmtId}) => {

  return (
    <>
      {cmtData && cmtData.length > 0 && cmtData.map((cmt, index) => {
        return (
          <React.Fragment
            key={`comment-${index}`}>
            <FeedCommentComponent
              setShowReportModalComment={setShowReportModalComment}
              setCmtId={setCmtId}
              inputRef={inputRef}
              editRef={editRef}
              {...cmt}
            />
            {cmt.replies.length !== 0 &&
              <FeedComments
                setShowReportModalComment={setShowReportModalComment}
                setCmtId={setCmtId}
                cmtData={cmt.replies}
                inputRef={inputRef}
                editRef={editRef}
              />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FeedCommentList;

