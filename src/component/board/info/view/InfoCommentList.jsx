import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import useFetchCommentsList from '@src/hooks/board/common/comment/useFetchCommentsList.jsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useSetAtom } from 'jotai/react';
import { commentEditDataAtom, isCommentEditAtom, replyChipDataAtom } from '@src/component/board/atom.js';
import useDeleteComment from '@src/hooks/board/common/comment/useDeleteComment.jsx';
import { COMMENT_TYPE } from '@src/component/board/const.js';
import { Button } from '@mui/material';
import ReportModal from '@src/component/admin/manage/ReportModal.jsx';

const StyledList = muiStyled(List)({
  width: '100%',
  bgcolor: 'background.paper',
});

const InfoCommentList = (props) => {
  const { boardId } = useParams();
  const { data, isLoading } = useFetchCommentsList(parseInt(boardId));
  const setIsCommentEdit = useSetAtom(isCommentEditAtom);


  useEffect(() => {
    setIsCommentEdit(false);
  }, []);
  return (
    <StyledList>
      {data && <InfoComments {...props} data={data} />}
    </StyledList>
  );
};

const InfoComments = (props) => {
  const { data } = props;

  return (<>
      {data && data.map((d, index) => {
        const id = nanoid();
        return (
          <React.Fragment key={id}>
            <InfoCommentComponent
              {...props}
              data={d}
              index={index}
            />
            <InfoComments
              {...props}
              isReply={true}
              data={d.replies} />
          </React.Fragment>
        );
      })}
    </>
  );
};

const StyledListItemText = styled(ListItemText)`
    cursor: ${({ cursor }) => cursor};
`;
const ApliyButton = styled(Button)`
    margin-left: 40px;
`;
const CommentContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: ${({ $depth }) => $depth * 20}px;
`;
const InfoCommentComponent = (props) => {
  const { index, isReply, data, inputRef, editRef } = props;
  const {
    cmtId, cmtContent, userId: writerId,
    userNick: writer, userProfile: writerProfile,
    cmtDepth,
  } = data;
  const { boardId } = useParams();


  const setReplyChipData = useSetAtom(replyChipDataAtom);
  const setCommentEditData = useSetAtom(commentEditDataAtom);
  const deleteComment = useDeleteComment(cmtId, parseInt(boardId));
  const setIsCommentEdit = useSetAtom(isCommentEditAtom);
  const handleReport = () => {
    setShowReportModal(true);
  };
  const [showReportModal, setShowReportModal] = React.useState(false);
  const isWriter = parseInt(sessionStorage.getItem('userId')) === writerId;


  return (<CommentContainer
      $depth={cmtDepth}
    >
      {(index !== 0 || isReply) &&
        <Divider variant="inset" component="li" />}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar
            userNick={data.userNick}
            alt={data.userNick}
            src={import.meta.env.REACT_APP_BACKEND_URL + data.userProfile} />
        </ListItemAvatar>
        <StyledListItemText
          cursor={isWriter ? 'pointer' : 'default'}
          primary={data.userNick}
          onClick={async () => {
            if (!isWriter) {
              return;
            }
            setCommentEditData({
              cmtId: cmtId,
              cmtContent: cmtContent,
            });
            await setIsCommentEdit(true);
            editRef.current.focus();
          }}
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {data.cmtContent}
            </Typography>
          }
        />
        <ApliyButton
          onClick={async () => {
            setReplyChipData([
              {
                type: COMMENT_TYPE.REPLY,
                cmtContent: '',
                replyNick: writer,
                cmtRef: cmtId,
                boardId: boardId,
              }]);
            await setIsCommentEdit(false);
            inputRef.current.focus();
          }}
        >답글달기</ApliyButton>
        {isWriter && <Button
          color="error"
          onClick={() => {
            deleteComment.mutate();
          }}
        >삭제</Button>}
        {!isWriter && <Button
          color="error"
          onClick={handleReport}
        >신고</Button>}
      </ListItem>
      {showReportModal && <ReportModal setShowReportModal={setShowReportModal}  showReportModal={showReportModal} cmtId={cmtId} boardId={boardId} searchKeyWord={'CMT'}/>}
    </CommentContainer>
  );
};

export default InfoCommentList;