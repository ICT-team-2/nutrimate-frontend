import React, { forwardRef, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';

/**
 * 북마크 버튼 컴포넌트입니다.
 * @param {Object} props - 북마크 버튼 컴포넌트의 속성들입니다.
 * @param {boolean} props.clicked - 북마크 버튼의 클릭 여부입니다.
 * @param {function} props.onClick - 북마크 버튼 클릭 시 실행되는 함수입니다.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
// eslint-disable-next-line react/display-name
const BookmarkButton = forwardRef((props, ref) => {

    const { clicked, onClick, ...rest } = props;
    const [clickedState, setClickedState] = useState(clicked);

    useEffect(() => {
      setClickedState(clicked);
    }, [clicked]);

    const handleClick = () => {
      if (clickedState.toString() === true.toString()) {
        setClickedState(false);
      } else {
        setClickedState(true);
      }
      onClick();
    };

    return (
      <IconButton
        {...rest}
        onClick={() => handleClick()}
        ref={ref}>
        <BookmarkIcon
          color={clickedState.toString() === true.toString() ? 'info' : 'disabled'} />
      </IconButton>
    );
  })
;

BookmarkButton.defaultProps = {
  clicked: false.toString(),
  onClick: () => {
  },
};

export default BookmarkButton;
