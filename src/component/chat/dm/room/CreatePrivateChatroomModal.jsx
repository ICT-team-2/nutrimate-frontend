import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { ClearRounded } from '@mui/icons-material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { Tab, Tabs } from '@mui/material';
import { CREATE_CHATROOM_TAB, DM_CHATROOM_TAB } from '@src/component/chat/dm/const.js';
import ChatroomModalItem from '@src/component/chat/dm/room/ChatroomModalItem.jsx';
import useFetchFollowerList from '@src/hooks/follow/useFetchFollowerList.jsx';
import useFetchFolloweeList from '@src/hooks/follow/useFetchFolloweeList.jsx';
import TextField from '@mui/material/TextField';
import ConfirmCreateChatroomModal from '@src/component/chat/dm/room/ConfirmCreateChatroomModal.jsx';
import useFetchSearchUser from '@src/hooks/dmchat/chatroom/useFetchSearchUser.jsx';

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
`;

const StyledIconButton = styled(IconButton)`
    width: fit-content;
    height: fit-content;
    margin: auto;
`;

const TitleContainer = styled.div`
    display: flex;
    padding-bottom: 10px;
`;
const StyledClearRoundedButton = styled(IconButton)`
    position: absolute;
    right: 5px;
    top: 15px;
`;

const StyledItemContainer = styled.div`
    overflow-y: scroll;
    height: 300px;
`;

const StyledTextField = styled(TextField)`
    margin-left: 10px;
`;

const TextFieldContainer = styled.div`
    display: flex;
    margin: 10px 0;
`;
const SearchButton = styled(Button)`
    height: 40px;
    margin-right: 5px;
    margin-left: 10px;
`;

const CreatePrivateChatroomModal = (props) => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState([]);
  const [opponentId, setOpponentId] = useState(undefined);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  const { data: followerList } = useFetchFollowerList();
  const { data: followeeList } = useFetchFolloweeList();
  const { data: searchUserList, refetch: refetchSearch } = useFetchSearchUser(searchWord);

  useEffect(() => {
    setData([]);
    if (!followeeList && !followerList) return;
    switch (tabValue) {
      case CREATE_CHATROOM_TAB.FOLLOWER.tabValue:
        setData(followerList);
        break;
      case CREATE_CHATROOM_TAB.FOLLOWEE.tabValue:
        setData(followeeList);
        break;
      case CREATE_CHATROOM_TAB.SEARCH.tabValue:
        setData(searchUserList ? searchUserList
            .filter((user) =>
              user.userId !== parseInt(sessionStorage.getItem('userId')),
            )
          : [],
        );
        break;
      default:
        break;
    }
  }, [tabValue, followerList, followeeList, searchUserList]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <StyledIconButton
        onClick={handleOpen}>
        <AddRoundedIcon />
      </StyledIconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <TitleContainer>
            <FlexGrowDiv />
            <Typography variant="h6" component="h2">
              1:1 채팅방 생성
            </Typography>
            <FlexGrowDiv />
            <StyledClearRoundedButton
              onClick={handleClose}>
              <ClearRounded />
            </StyledClearRoundedButton>
          </TitleContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            {Object.values(CREATE_CHATROOM_TAB).map((tab) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>
          {tabValue === CREATE_CHATROOM_TAB.SEARCH.tabValue &&
            (<TextFieldContainer>
                <StyledTextField
                  size="small" label="닉네임" fullWidth
                  value={searchWord}
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      refetchSearch();
                      e.stopPropagation();
                      e.preventDefault();
                    }
                  }}
                />
                <SearchButton
                  onClick={() => {
                    refetchSearch();
                  }}
                  variant="contained">검색</SearchButton>
              </TextFieldContainer>
            )
          }
          <StyledItemContainer>
            {data && data.map((item) => (<ChatroomModalItem
              key={item.userId}
              {...item}
              onClick={() => {
                setOpponentId(item.userId);
                setOpenConfirmModal(true);
              }} />))}
          </StyledItemContainer>
        </StyledBox>
      </Modal>
      <ConfirmCreateChatroomModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        opponentId={opponentId}
        mode={DM_CHATROOM_TAB.PRIVATE.value}
        setFirstModalOpen={setOpen}
      />
    </>
  );
};

export default CreatePrivateChatroomModal;