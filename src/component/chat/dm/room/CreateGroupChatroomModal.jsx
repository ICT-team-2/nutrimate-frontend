import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import styled, { createGlobalStyle } from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { ClearRounded } from '@mui/icons-material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { Stack, Tab, Tabs } from '@mui/material';
import { CREATE_CHATROOM_TAB, DM_CHATROOM_TAB } from '@src/component/chat/dm/const.js';
import ChatroomModalItem from '@src/component/chat/dm/room/ChatroomModalItem.jsx';
import useFetchFollowerList from '@src/hooks/follow/useFetchFollowerList.jsx';
import useFetchFolloweeList from '@src/hooks/follow/useFetchFolloweeList.jsx';
import TextField from '@mui/material/TextField';
import ConfirmCreateChatroomModal from '@src/component/chat/dm/room/ConfirmCreateChatroomModal.jsx';
import Avatar from '@mui/material/Avatar';
import { AvatarGroup } from '@mui/lab';
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

const GroupAvatarsContainer = styled.div`

`;

const StyledButton = styled(Button)`
    position: absolute;
    right: 20px;
`;

const CreateGroupChatroomModal = (props) => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState([]);
  const [opponentId, setOpponentId] = useState(undefined);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [userData, setUserData] = useState([]);

  const { data: followerList } = useFetchFollowerList();
  const { data: followeeList } = useFetchFolloweeList();

  const [searchWord, setSearchWord] = useState('');
  const { data: userList, refetch: refetchUser } = useFetchSearchUser(searchWord);

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
        setData(userList);
        break;
      default:
        break;
    }
  }, [tabValue, followerList, followeeList, userList]);


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
      >
        <StyledBox>
          <TitleContainer>
            <FlexGrowDiv />
            <Typography variant="h6" component="h2">
              그룹 채팅방 생성
            </Typography>
            <FlexGrowDiv />
            <StyledButton
              size="small"
              variant="contained"
              onClick={() => {
                if (userData.length === 0) return;
                setOpenConfirmModal(true);
              }}
            >
              생성
            </StyledButton>
          </TitleContainer>
          <GroupAvatarsContainer>
            <GroupAvatars data={userData.map(d => {
              return { src: d.userProfile, alt: d.userNick };
            })} />
          </GroupAvatarsContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            {Object.values(CREATE_CHATROOM_TAB).map((tab) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>
          {tabValue === CREATE_CHATROOM_TAB.SEARCH.tabValue &&
            (<TextFieldContainer>
                <StyledTextField
                  onChange={(e) => setSearchWord(e.target.value)}
                  value={searchWord}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      refetchUser();
                    }
                  }}
                  size="small" label="닉네임" fullWidth
                />
                <SearchButton
                  onClick={() => {
                    console.log(searchWord);
                    refetchUser();
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
                if (userData.find((user) => user.userId === item.userId)) {
                  setUserData(userData.filter((user) => user.userId !== item.userId));
                } else {
                  setUserData([...userData, item]);
                }
              }} />))}
          </StyledItemContainer>
        </StyledBox>
      </Modal>
      <ConfirmCreateChatroomModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        mode={DM_CHATROOM_TAB.GROUP.value}
        userIds={userData.map((user) => user.userId)}
        setFirstModalOpen={setOpen}
      />
    </>
  );
};

const GroupAvatarsGlobalStyle = createGlobalStyle`
    .MuiAvatarGroup-avatar {
        width: 25px;
        height: 25px;
        font-size: 0.875rem;
    }
`;

function GroupAvatars({ data }) {

  return (
    <>
      <GroupAvatarsGlobalStyle />
      <AvatarGroup max={10}>
        {data.map((d, i) => {
          return <Avatar key={i} alt={d.alt} src={d.src ?
            `${import.meta.env.REACT_APP_BACKEND_URL}${d.src}`
            : d.alt} />;
        })}
      </AvatarGroup>
    </>
  );
}

export default CreateGroupChatroomModal;