import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
  REACT_QUERY_KEYS,
  TOAST_MESSAGE,
  TOAST_OPTIONS,
} from '@src/utils/const.js';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const useAnalyzeFoodImageWithAI = () => {

  const toastId = useRef(null);

  const loadingToast = () => {
    toastId.current = toast(TOAST_MESSAGE.ANALYZE.LOADING, TOAST_OPTIONS.LOADING);
  };

  //axios
  /**
   * @param {string} base64Encoded
   * @returns {Promise}
   */
  const analyzeFoodImage = (base64Encoded) => {
    const formData = new FormData();
    formData.append('base64Encoded', base64Encoded);
    loadingToast();
    return axios.post(`${import.meta.env.REACT_APP_FLASK_URL}/food`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation({
    mutationKey: [
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.IMAGE,
      REACT_QUERY_KEYS.ANALYZE,
    ],
    mutationFn: analyzeFoodImage,
    onSuccess: (data) => {
      toast.update(toastId.current, {
        ...TOAST_OPTIONS.SUCCESS,
        render: TOAST_MESSAGE.ANALYZE.SUCCESS,
      });
    },
    onError: (error) => {
      console.error('onError', error);
      toast.update(toastId.current, {
        ...TOAST_OPTIONS.ERROR,
        render: TOAST_MESSAGE.ANALYZE.ERROR,
      });
    },
  });
};

export default useAnalyzeFoodImageWithAI;