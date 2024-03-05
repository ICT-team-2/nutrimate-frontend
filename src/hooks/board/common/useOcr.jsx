import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useOcr = () => {
  //axios
  /**
   * OCR API 호출
   * @param file {File}
   * @returns {Promise<any>}
   */
  const fetchOcr = async (file) => {
    const formData = new FormData();
    formData.append('data', file);
    const response = await axios.post(`${import.meta.env.REACT_APP_FLASK_URL}/ocr`,
      formData);
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.OCR],
    mutationFn: fetchOcr,
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useOcr;