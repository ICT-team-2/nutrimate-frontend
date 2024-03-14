import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
  REACT_QUERY_KEYS, TOAST_MESSAGE, TOAST_OPTIONS,
} from '@src/utils/const.js';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const useAnalyzeFaceEmtionWithAI = () => {

  const toastId = useRef(null);

  const loadingToast = () => {
    toastId.current = toast(TOAST_MESSAGE.ANALYZE.LOADING,
      TOAST_OPTIONS.LOADING);
  };

  //axios
  const fetchAnalyzeFaceEmtionWithAI = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    loadingToast();

    const response = await axios.post(`${import.meta.env.REACT_APP_FLASK_URL}/face`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationFn: fetchAnalyzeFaceEmtionWithAI,
    mutationKey: [
      REACT_QUERY_KEYS.FACE,
      REACT_QUERY_KEYS.EMOTION,
      REACT_QUERY_KEYS.IMAGE,
      REACT_QUERY_KEYS.ANALYZE,
    ],
    onSuccess: (data) => {
      toast.update(toastId.current, {
        ...TOAST_OPTIONS.SUCCESS,
        render: TOAST_MESSAGE.ANALYZE.SUCCESS,
      });
    },
    onError: (error) => {
      toast.update(toastId.current, {
        ...TOAST_OPTIONS.ERROR,
        render: TOAST_MESSAGE.ANALYZE.ERROR,
      });
      console.error(error);
    },
  });
};

export default useAnalyzeFaceEmtionWithAI;