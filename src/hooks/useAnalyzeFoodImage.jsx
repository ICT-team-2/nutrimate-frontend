import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useAnalyzeFoodImage = () => {
  //axios
  /**
   * @param {string} base64Encoded
   * @returns {Promise}
   */
  const analyzeFoodImage = (base64Encoded) => {
    const formData = new FormData();
    formData.append('base64Encoded', base64Encoded);
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
      console.log('onSuccess', data);
    },
    onError: (error) => {
      console.error('onError', error);
    },
  });
};

export default useAnalyzeFoodImage;