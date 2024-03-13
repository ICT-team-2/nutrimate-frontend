import { useMutation } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAtom } from 'jotai/react';
import { userIdAtom } from '@src/pages/login/atom.js';

const useDeleteUser = () => {
  const [userId, setUserId] = useAtom(userIdAtom);
  const navigate = useNavigate();

  //axios
  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/member`, {
        params: {
          userId: userId,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.DELETE],
    mutationFn: deleteUser,
    onSuccess: () => {
      setUserId(undefined);
      sessionStorage.removeItem('userId');
      navigate('/');
    },
  });
};

export default useDeleteUser;