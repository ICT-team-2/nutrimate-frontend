import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, TOAST_MESSAGE, TOAST_OPTIONS } from '@src/utils/const.js';
import { profileImageAtom } from '@src/component/mypage/atom.js';
import { useAtom } from 'jotai/react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const useCreateImageAI = () => {

  const toastId = useRef(null);
  const loadingToast = () => {
    toastId.current = toast.loading(TOAST_MESSAGE.IMAGE_CREATE.LOADING,
      TOAST_OPTIONS.LOADING);
  };

  //axios
  const createImageAI = async ({ prompt }) => {
    loadingToast();
    const formData = new FormData();
    formData.append('prompt', prompt);
    const response = await axios.post(import.meta.env.REACT_APP_FLASK_URL + '/profile/img', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.PROFILE,
      REACT_QUERY_KEYS.IMAGE,
      REACT_QUERY_KEYS.CREATE,
    ],
    mutationFn: createImageAI,
    onSuccess: () => {
      toast.update(toastId.current, {
        render: TOAST_MESSAGE.IMAGE_CREATE.SUCCESS,
        ...TOAST_OPTIONS.SUCCESS,
      });
    },
    onError: (error) => {
      console.error(error);
      toast.update(toastId.current, {
        render: TOAST_MESSAGE.IMAGE_CREATE.ERROR,
        ...TOAST_OPTIONS.ERROR,
      });
    },
  });
};

export default useCreateImageAI;