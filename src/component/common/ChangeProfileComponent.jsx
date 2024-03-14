import { useSetAtom } from 'jotai/react';
import { profileModalAtom } from '@src/component/mypage/atom.js';
import ChangeProfileModal
  from '@src/component/mypage/myinfo/ChangeProfileModal.jsx';
import { Button } from '@mui/material';
import React from 'react';
import FollowButton from '@src/component/common/FollowButton.jsx';
import useChangeProfileImage from '@src/hooks/mypage/useChangeProfileImage.jsx';

/**
 *
 * @param props{{buttonSize: 'small' | 'medium' | 'large'}}
 * @returns {Element}
 * @constructor
 */
const ChangeProfileComponent = (props) => {

  const setOpenModal = useSetAtom(profileModalAtom);
  const { buttonSize, isLoginUser, profileUserId } = props;
  const changeProfile = useChangeProfileImage();

  return (<>
    <ChangeProfileModal changeProfile={(file) => {
      changeProfile.mutate(file);
    }} />
    {isLoginUser && <Button
      onClick={() => setOpenModal(true)}
      variant='contained'
      size={buttonSize}>프로필 변경</Button>
    }
  </>);

};

ChangeProfileComponent.defaultProps = {
  buttonSize: 'small',
  isLoginUser: true,
};

export default ChangeProfileComponent;