import React, { forwardRef } from 'react';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// eslint-disable-next-line react/display-name
const BookmarkButton = forwardRef((props, ref) => {
    
    const { clicked, onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        ref={ref} {...props}>
      <BookmarkIcon
        color={clicked.toString() === true.toString() ? 'info' : 'disabled'} />
    </IconButton>
    );
  })
;

BookmarkButton.defaultProps = {
  clicked: false.toString(),
  onClick: () => {},
};

export default BookmarkButton;
