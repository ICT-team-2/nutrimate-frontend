import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useInputSportRecord = () => {

  const queryClient = useQueryClient();
  //axios
  /**
   * @param data {object} 요청 파라미터
   * @param data.record {object} 기록
   * @param data.record.doDate {string} 날짜
   * @param data.sportId {number} 운동 id
   * @param data.sportTime {number} 운동 시간
   * @param data.sportWeight {number} 운동 시 몸무게 (kg)
   *
   * 선택 파라미터
   * @param data.sportSet {number|undefined} 운동 세트
   */
  const inputSportRecord = async (data) => {
    const response = await axios.post('/record/sport/db', {
      ...data,
      sportSet: !data.sportSet ? undefined : data.sportSet,
      record: {
        ...data.record,
        userId: sessionStorage.getItem('userId'),
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.SPORT,
      REACT_QUERY_KEYS.INSERT,
    ],
    mutationFn: inputSportRecord,
    onSuccess: () => {
      console.log('입력 성공');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.RECORD],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useInputSportRecord;