import React, { forwardRef } from 'react';
import BookmarkButton from '@src/component/board/BookmarkButton.jsx';
import useClickBookmark from '@src/hooks/board/common/bookmark/useClickBookmark.jsx';

/**
 * 게시글 북마크 버튼
 * @param props {object}
 * @param props.boardid {int} - 게시글 id
 * @param props.profile {object} - 프로필 페이지인지 아닌지
 * @param {boolean} props.clicked - 북마크 버튼의 클릭 여부입니다.
 * @param {number} props.size - 북마크 버튼의 크기입니다.
 * (프로필 페이지는 북마크 버튼 클릭 후 글 목록이 업데이트가 되지 않음)
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
// eslint-disable-next-line react/display-name
const BoardBookmarkButton = forwardRef((props, ref) => {

  const { boardid: boardId, profile } = props;
  const clickBookmarkButton = useClickBookmark(boardId, profile);

  const onClickBookmark = () => {
    clickBookmarkButton.mutate();
  };

  return (
    <BookmarkButton
      {...props}
      ref={ref}
      onClick={onClickBookmark}
    />
  );
});

export default BoardBookmarkButton;
