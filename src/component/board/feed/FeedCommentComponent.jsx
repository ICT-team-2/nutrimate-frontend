import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';

const CommentContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: ${({ depth }) => depth * 20}px;
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
`;
const ApliyButton = styled(Button)`
    margin-left: 40px;

`;

const FeedCommentComponent = (props) => {
  const { userNick, content, cmtDepth, inputRef } = props;
  return (
    <CommentContainer depth={cmtDepth}>
      <NicknameContainer>
        <UserAvatar userNick={'ex2'} />
        <NicknameTypo variant="subtitle2">{'닉네임'}</NicknameTypo>
      </NicknameContainer>
      <BodyTypo
        variant="body2"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div>
        <ApliyButton
          onClick={() => {
            inputRef.current.focus();
          }}
        >답글달기</ApliyButton>
      </div>
    </CommentContainer>
  );
};

FeedCommentComponent.defaultProps = {
  userNick: '',
  content: '더 많은 인테리어 콘텐츠가 궁금하다면?<br />' +
    '        오늘의집에서 관심있는 주제를 선택하고<br />' +
    '        맞춤형 콘텐츠를 추천 받으세요<br />' +
    '        <br />' +
    '        오늘의집 유저분이 직접 제보해주신 소중한 콘텐츠인 만큼,<br />' +
    '        여러분의 따뜻한 댓글 부탁드릴게요<br />',
  cmtDepth: 1,
};

export default FeedCommentComponent;
