import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FACE_EMOTION_RESULT, REACT_QUERY_KEYS } from '@src/utils/const.js';

const useAnalyzeFaceEmtionWithAI = () => {
  //axios

  const fetchAnalyzeFaceEmtionWithAI = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
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
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useAnalyzeFaceEmtionWithAI;