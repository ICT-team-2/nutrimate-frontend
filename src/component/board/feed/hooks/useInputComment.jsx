import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useAtom } from 'jotai';
import { commentListRefAtom } from '@src/component/board/atom.js';

const useInputComment = (boardId) => {

  const queryClient = useQueryClient();
  const [cmtListRef, setCmtListRef] = useAtom(commentListRefAtom);

  //axios
  /**
   * @param cmtData{{ cmtContent:string}}
   * @returns {Promise<any>}
   */
  const inputComment = async (cmtData) => {
    try {
      const result = await axios.post('/board/comments/write', {
        boardId: boardId,
        userId: sessionStorage.getItem('userId'),
        ...cmtData,
      });
      return result.data;
    } catch (e) {
      console.error(e);
    }
  };

  //react-query
  return useMutation({
    mutationFn: inputComment,
    mutationKey: [REACT_QUERY_KEYS.COMMENTS, REACT_QUERY_KEYS.INSERT],
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.COMMENTS])
        .then(() => {
          //스크롤 이동 - 댓글 입력 후 맨 아래로 이동
          cmtListRef.scrollTo(0, cmtListRef.scrollHeight);
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useInputComment;