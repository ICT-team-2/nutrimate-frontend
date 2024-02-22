import React from 'react';
import styled from 'styled-components';
import {
  FlexGrowDiv,
  UserAvatar,
} from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useAtom } from 'jotai';
import {
  commentEditDataAtom,
  replyChipDataAtom,
} from '@src/component/board/atom.js';
import { COMMENT_TYPE } from '@src/component/board/const.js';
import useDeleteComment
  from '@src/component/board/feed/hooks/useDeleteComment.jsx';

const CommentContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: ${({ $depth }) => $depth * 20}px;
`;
const NicknameTypo = styled(Typography)`
    margin: 9px 0 0 10px;
`;
const NicknameContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 10px 0;
`;

const BodyTypo = styled(Typography)`
    margin-left: 50px;
    margin-bottom: 10px;
    cursor: ${({ iswriter }) => iswriter === 'true' ? 'pointer' : 'default'};
`;
const ApliyButton = styled(Button)`
    margin-left: 40px;

`;

const FeedCommentComponent = (props) => {
  const {
    cmtDepth, inputRef, isContent,
    boardId, boardContent, checkedLike,
    likeCount, userNick: writer, cmtContent,
    cmtId, userId: writerId,
  } = props;
  const [replyChipData, setReplyChipData] = useAtom(replyChipDataAtom);
  const [commentEditData, setCommentEditData] = useAtom(commentEditDataAtom);
  const deleteComment = useDeleteComment(cmtId);
  
  const isWriter = parseInt(sessionStorage.getItem('userId')) === writerId;
  
  return (
    <CommentContainer $depth={cmtDepth}>
      <NicknameContainer>
        <UserAvatar userNick={writer} />
        <NicknameTypo variant='subtitle2'>{writer}</NicknameTypo>
        <FlexGrowDiv />
      </NicknameContainer>
      <BodyTypo
        variant='body2'
        dangerouslySetInnerHTML={{
          __html: isContent
            ? boardContent
            : cmtContent,
        }}
        iswriter={isWriter + ''}
        onClick={() => {
          if (!isWriter) {
            return;
          }
          setCommentEditData({
            cmtId: cmtId,
            cmtContent: cmtContent,
          });
          inputRef.current.focus();
        }}
      />
      {!isContent && (<div>
        <ApliyButton
          onClick={() => {
            setReplyChipData([
              {
                type: COMMENT_TYPE.REPLY,
                cmtContent: '',
                replyNick: writer,
                cmtRef: cmtId,
                boardId: boardId,
              }]);
            inputRef.current.focus();
          }}
        >답글달기</ApliyButton>
        {isWriter && <Button
          color='error'
          onClick={() => {
            deleteComment.mutate();
          }}
        >삭제</Button>}
      </div>)}
    </CommentContainer>
  );
};

FeedCommentComponent.defaultProps = {
  userNick: '닉네임',
  boardContent: '더 많은 인테리어 콘텐츠가 궁금하다면?<br />' +
    '        오늘의집에서 관심있는 주제를 선택하고<br />' +
    '        맞춤형 콘텐츠를 추천 받으세요<br />' +
    '        <br />' +
    '        오늘의집 유저분이 직접 제보해주신 소중한 콘텐츠인 만큼,<br />' +
    '        여러분의 따뜻한 댓글 부탁드릴게요<br />',
  cmtContent: '더 많은 인테리어 콘텐츠가 궁금하다면?<br />' +
    '        오늘의집에서 관심있는 주제를 선택하고<br />' +
    '        맞춤형 콘텐츠를 추천 받으세요<br />' +
    '        <br />' +
    '        오늘의집 유저분이 직접 제보해주신 소중한 콘텐츠인 만큼,<br />' +
    '        여러분의 따뜻한 댓글 부탁드릴게요<br />',
  cmtDepth: 0,
};

export default FeedCommentComponent;
