import React, { useEffect, useState } from 'react';

import { Notifications } from "@mui/icons-material";
import { Badge, MenuItem, Divider } from "@mui/material";
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import  firebaseConfigFile from '@src/component/calendar/fireConfig.js';
import { initializeApp } from 'firebase/app';
import Button from '@mui/material/Button';
import { getDatabase, ref, push, update, onValue,set,remove } from 'firebase/database';
import { getFirestore, collection, addDoc, updateDoc, query, where , increment, getDocs } from 'firebase/firestore';
import Menu from '@mui/material/Menu';




const firebaseApp = initializeApp(firebaseConfigFile);
// Firebase 데이터베이스 초기화
const database = getDatabase(firebaseApp);
const firestore =getFirestore(firebaseApp);
const followDB = collection(firestore, 'follow');

// addCommentFB 함수 수정
export const addCommentFB = async(post_id, contents, message) => {
  console.log('sfs', post_id);
  console.log('sfs', contents);
  console.log('sfs', message);

  const now = new Date();
  const timestamp = now.toISOString();
  
  //const postDB = collection(firestore, 'post');
  contents = {...contents, message: message};

  try {
    //const followDocRef = await addDoc(followDB, contents);
    //const incrementValue = increment(1);
    //await updateDoc(followDocRef, { follow_cnt: incrementValue });

    const notiListRef = ref(database, `noti/${contents.followeeId}/list`);
    const newNotiRef = push(notiListRef);

    set(newNotiRef,{
      post_id: post_id,
      insert_dt: message,
      timestamp: timestamp 
    }, (err) => {
        if(err){
            console.log('알림 저장 실패');
        }else{
          // 알림이 가게 해줍니다!
          const notiDB = ref(database,`noti/${contents.followeeId}`);
          // 읽음 상태를 false로 바꿔주면 되겠죠!
          notiDB.update({ read: false });
        }
    });

                // 알림이 가게 해줍니다!

  } catch (error) {
    console.error("Error adding comment: ", error);
  }
};


const NotiBadge = (props) => {
  
  const [is_read, setIsRead] = useState(true);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); 
  const notiDB = ref(database, `noti/${userId}`);

  useEffect(()=>{
    console.log(notifications);
  },[notifications])

  const handleRemove = (notificationKey) => {
    // 데이터베이스에서 알림 삭제
    console.log(notificationKey)
    const notiItemRef = ref(database, `noti/${userId}/list/${notificationKey}`);
    console.log(notiItemRef)
    remove(notiItemRef)
      .then(() => {
        console.log('알림이 삭제되었습니다.');
  
        // 로컬 상태에서 알림 제거
        setNotifications(prevNotifications =>
          prevNotifications.filter(notification => notification.key !== notificationKey)
        );
      })
      .catch((error) => {
        console.error('알림 삭제 실패: ', error);
      });
  };

  const notiCheck = () => {
    update(notiDB, { read: true });
    props._onClick();
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
            key: key // 새로운 속성으로 인덱스를 추가
          }));
           
          setNotifications(notificationList);
          if(notificationLists[1]==false){
            console.log('sdffs')
            setIsRead(false);
          }
        }
      });
        
    }
  }, []);

  return (
    <React.Fragment>
      <Badge invisible={is_read} badgeContent={notifications.length} color="primary" onClick={notiCheck} >
            <Notifications style={{ color: 'red' }} onClick={handleMenuOpen} />
      </Badge>
      {notifications.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {notifications.map((notification, index) => (
            <div key={index}>
                <MenuItem>{notification.insert_dt} <Button onClick={() => handleRemove(notification.key)}>✖</Button></MenuItem>
                {index < notifications.length - 1 && <Divider />}
            </div>
          ))}
        </Menu>
      )}
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
    _onClick: () => { },
};

export default NotiBadge;