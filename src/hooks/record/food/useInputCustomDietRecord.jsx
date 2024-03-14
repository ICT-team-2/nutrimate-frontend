import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, TOAST_MESSAGE } from '@src/utils/const.js';
import { toast } from 'react-toastify';

const useInputCustomDietRecord = () => {

  const queryClient = useQueryClient();

  //axios
  /**
   * @param data {object} 요청 파라미터
   * @param data.record {object} 기록
   * @param data.record.doDate {string} 날짜
   * @param data.foodName {string} 음식 이름
   * @param data.foodCal {number} 음식 칼로리
   * @param data.mealTime {'BREAKFAST'|'LUNCH'|'DINNER'|'SNACK'} 식사 시간
   * @param data.recordIntake {number|undefined} 음식 섭취량

   * 선택 파라미터
   * @param data.foodIntake {number|undefined} 음식 섭취량
   * @param data.intakeUnit {'g'|'mL'|undefined} 섭취량 단위
   * @param data.foodCarbo {number|undefined} 탄수화물
   * @param data.foodProtein {number|undefined} 단백질
   * @param data.foodProvi {number|undefined} 지방
   * @param data.foodChole {number|undefined} 콜레스테롤
   * @param data.foodSalt {number|undefined} 나트륨
   */
  const fetchCustomDietRecord = async (data) => {
    const response = await axios.post('/record/diet/custom', {
      ...data,
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
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.INSERT,
      REACT_QUERY_KEYS.CUSTOM],
    mutationFn: fetchCustomDietRecord,
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.RECORD.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.RECORD],
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.RECORD.ERROR);
      console.error(error);
    },
  });
};

export default useInputCustomDietRecord;

const record = {
  record: {
    userId: 3,
    doDate: '2024-03-06',
  },
  foodName: '닭꼬치',
  foodCal: 200,//섭취 칼로리, kcal 단위
  mealTime: 'BREAKFAST', //BREAKFAST, LUNCH, DINNER, SNACK,

  //섭취량
  foodIntake: 80,//필수값 아님, 기본값:200, 음식 양(80g)
  intakeUnit: 'g',//필수값 아님, 기본값 g(그램), g혹은 ml로


  //탄단지
  foodCarbo: 14,//필수값 아님 기본값 null
  foodProtein: 12, //필수값 아님 기본값 null
  foodProvi: 9, //필수값 아님 기본값 null


  //콜레스테롤, 나트륨
  foodChole: 108,//필수값 아님 기본값 null
  foodSalt: 1300,//필수값 아님 기본값 null
};