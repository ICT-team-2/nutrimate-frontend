import React, { useEffect, useState } from 'react';

import { Notifications } from '@mui/icons-material';
import { Badge, MenuItem, Divider, Popover } from '@mui/material';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import firebaseConfigFile from '@src/component/calendar/fireConfig.js';
import { initializeApp } from 'firebase/app';
import Button from '@mui/material/Button';
import { getDatabase, ref, push, update, onValue, set, remove, child } from 'firebase/database';
import { getFirestore, collection, addDoc, updateDoc, query, where, increment, getDocs } from 'firebase/firestore';
import dayjs from 'dayjs';
import styled from 'styled-components';


const firebaseApp = initializeApp(firebaseConfigFile);
// Firebase 데이터베이스 초기화
const database = getDatabase(firebaseApp);
const firestore = getFirestore(firebaseApp);

const StyledNotifications = styled(Notifications)`
    color: red;
    cursor: pointer;
`;

// addCommentFB 함수 수정
export const addCommentFB = async (post_id, contents, message) => {
  const now = dayjs();
  const timestamp = now.toISOString();

  //const postDB = collection(firestore, 'post');
  contents = { ...contents, message: message };

  try {

    const notiListRef = ref(database, `noti/${contents.followeeId}/list`);
    const newNotiRef = push(notiListRef);

    set(newNotiRef, {
      post_id: post_id,
      insert_dt: message,
      timestamp: timestamp,
      look: false,
    });
    const notiDB = ref(database, `noti/${contents.followeeId}`);
    // 읽음 상태를 false로 바꿔주면 되겠죠!
    update(notiDB, { read: false });

    // 알림이 가게 해줍니다!

  } catch (error) {
    console.error('Error adding comment: ', error);
  }
};


const NotiBadge = (props) => {

  const [is_read, setIsRead] = useState(true);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(null);
  const notiDB = ref(database, `noti/${userId}`);


  const handleRemove = (notificationKey) => {
    // 데이터베이스에서 알림 삭제
    const notiItemRef = ref(database, `noti/${userId}/list/${notificationKey}`);
    remove(notiItemRef)
      .then(() => {

        // 로컬 상태에서 알림 제거
        setNotifications(prevNotifications =>
          prevNotifications.filter(notification => notification.key !== notificationKey),
        );
      })
      .catch((error) => {
        console.error('알림 삭제 실패: ', error);
      });
  };

  const notiCheck = async () => {
    await update(notiDB, { read: true }); // read 상태를 true로 업데이트합니다.

    onValue(notiDB, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationLists = Object.values(data);
        if (notificationLists.length > 0) {
          const updates = {};
          const keys = Object.keys(notificationLists[0]);
          for (const key of keys) {
            // 업데이트할 경로를 문자열로 생성합니다.
            const updatePath = `noti/${userId}/list/${key}/look`;
            await update(ref(database), { [updatePath]: true });
          }
        }
      }
      props._onClick(); // 모든 비동기 작업이 완료된 후에 호출됩니다.
    });
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (userId) {
      const notiRef = ref(database, `noti/${userId}`);
      onValue(notiRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const notificationLists = Object.values(data);
          const keys = Object.keys(notificationLists[0]);
          const notificationList = keys.reverse().map((key, index) => ({
            ...notificationLists[0][key], // 기존 객체의 속성들을 복사
            key: key, // 새로운 속성으로 인덱스를 추가
          }));
          setNotifications(notificationList);
          const unreadNotifications = notificationList.filter(notificationList => !notificationList.look);
          setUnreadCount(unreadNotifications.length);
          if (notificationLists[1] == false) {
            setIsRead(false);
          }
        }
      });

    }
  }, []);

  return (
    <React.Fragment>
      <Badge invisible={is_read} badgeContent={unreadCount} color="primary" onClick={notiCheck}>
        <StyledNotifications style={{ color: 'red' }} onClick={handleMenuOpen} />
      </Badge>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification, index) => (
                <div key={index}>
                  <MenuItem style={{ display: 'flex', justifyContent: 'space-between', height: '50px', margin: '0' }}>
                    <span>{notification.insert_dt}</span>
                    <span style={{
                      color: 'grey',
                      fontSize: '10px',
                      padding: '0 10px',
                    }}>{dayjs(notification.timestamp).format('MM-DD HH:mm')}</span>
                    <span onClick={() => handleRemove(notification.key)}>✖</span>
                  </MenuItem>
                  {(index < notifications.length - 1) && <Divider style={{ margin: '0' }} />}
                </div>
              ))}
              {/* 반복되어서는 안 되는 부분 */}
              {notifications.length === 1 && (
                <MenuItem style={{ display: 'flex', justifyContent: 'space-between', height: '100px', margin: '0' }}>
                </MenuItem>
              )}
              {notifications.length === 2 && (
                <MenuItem style={{ display: 'flex', justifyContent: 'space-between', height: '50px', margin: '0' }}>
                </MenuItem>
              )}
            </>
          ) : (
            <MenuItem style={{ display: 'flex', justifyContent: 'center', height: '150px', margin: '0' }}>
              <span style={{ margin: '70px' }}>알람이 없습니다.</span>
            </MenuItem>
          )}
        </div>
      </Popover>

    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {
  },
};

export default NotiBadge;