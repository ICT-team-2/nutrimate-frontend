import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, TOAST_MESSAGE, TOAST_OPTIONS } from '@src/utils/const.js';
import { profileImageAtom } from '@src/component/mypage/atom.js';
import { useAtom } from 'jotai/react';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const useCreateImageAI = () => {
  
  //axios
  const createImageAI = async ({ prompt }) => {
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
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useCreateImageAI;