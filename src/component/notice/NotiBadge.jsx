import React, { useEffect, useState } from 'react';

import { Notifications } from "@mui/icons-material";
import { Badge, MenuItem } from "@mui/material";
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import  firebaseConfigFile from '@src/component/calendar/fireConfig.js';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, update, onValue  } from 'firebase/database';
import Menu from '@mui/material/Menu';

const firebaseApp = initializeApp(firebaseConfigFile);
// Firebase 데이터베이스 초기화
const database = getDatabase();

// addCommentFB 함수 수정
const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    // post에도 comment_cnt를 하나 플러스 해줍니다.
    update(ref(database, `posts/${post_id}`), { comment_cnt: increment });

    // comment를 추가해줍니다.
    dispatch(addComment(post_id, comment));

    // 리덕스에 post가 있을 때만 post의 comment_cnt를 +1해줍니다.
    const post = getState().post.posts.find((post) => post.id === post_id);
    if (post) {
      dispatch(
        postActions.editPost(post_id, {
          comment_cnt: parseInt(post.comment_cnt) + 1,
        })
      );

      // 알림 리스트에 하나를 추가해줍니다!
      const _noti_item = push(ref(database, `noti/${post.user_info.user_id}/list`));

      _noti_item.set({
        post_id: post.id,
        user_name: comment.user_name,
        image_url: post.image_url,
        insert_dt: comment.insert_dt,
      }, (err) => {
        if (err) {
          console.log('알림 저장 실패');
        } else {
          // 알림이 가게 해줍니다!
          update(ref(database, `noti/${post.user_info.user_id}`), { read: false });
        }
      });
    }
  };
};

// NotiBadge 컴포넌트 수정
const NotiBadge = (props) => {
  
  const [is_read, setIsRead] = useState(true);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); 
  const notiDB = ref(database, `noti/${userId}`);

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
          const notificationList = Object.values(data);
          setNotifications(notificationList);
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Badge invisible={is_read} color="secondary" onClick={notiCheck} variant="dot">
      <Notifications style={{ color: 'red' }} onClick={handleMenuOpen} />
      </Badge>
      {notifications.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {notifications.map((notification, index) => (
            <MenuItem key={index}>{notification.message}</MenuItem>
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