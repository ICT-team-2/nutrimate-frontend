import React from 'react';
import LikeButton from '@src/component/board/LikeButton.jsx';
import useClickLikeButton from '@src/hooks/board/common/like/useClickLikeButton.jsx';

/**
 * 게시글 좋아요 버튼
 * @param props {object}
 * @param props.boardId {int} - 게시글 id
 *
 * @param props.className {string} - 좋아요 버튼의 className입니다.
 * @param props.clicked {boolean} - 좋아요 버튼의 클릭 여부입니다.
 * @param props.like {number} - 좋아요 버튼의 좋아요 개수입니다.
 * @param props.size {number} - 좋아요 버튼의 크기입니다.
 * @param props.heartColor {string} - 좋아요 버튼의 하트 색상입니다.
 * @param props.onClick {function} - 좋아요 버튼 클릭 시 실행되는 함수입니다.
 * @param props.viewCount {boolean} - 좋아요 개수를 표시할지 여부입니다
 * @returns {Element}
 * @constructor
 */
const BoardLikeButton = (props) => {
  const { boardId } = props;
  const clickLikeButton = useClickLikeButton(boardId);

  const onClickLike = () => {
    clickLikeButton.mutate();
  };

  return (
    <LikeButton
      {...props}
      onClick={onClickLike}
    />
  );
};

export default BoardLikeButton;
