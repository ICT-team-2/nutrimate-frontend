import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const useInsertFollow = () => {

  //axios
  const insertFollow = async (data) => {
    try {
      const response = await axios.post('/follow/insertFollow', data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  //react-query
  const result = useMutation({
    mutationKey: ['insertFollow'],
    mutationFn: insertFollow,

  });
  return result;
};

export default useInsertFollow;