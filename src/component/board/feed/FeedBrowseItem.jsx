import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NO_IMAGE_PATH } from '@src/utils/const.js';
import FeedDetailContent from '@src/component/board/feed/FeedDetailContent.jsx';
import * as React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import ImageListItem from '@mui/material/ImageListItem';

const rowCols = [
  {
    rows: 3,
    cols: 4,
  },
  {
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
];

const StyledImageListItem = muiStyled(ImageListItem)`
  cursor: pointer;
`;

const FeedBrowseItem = (props) => {
  const { item, index } = props;
  const [open, setOpen] = useState(false);


  useEffect(() => {
    console.log('item', index, item);
  }, [item]);

  const clickModalOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <StyledImageListItem
        key={item.img + index}
        cols={rowCols[index % rowCols.length].cols || 1}
        rows={rowCols[index % rowCols.length].rows || 1}
        onClick={clickModalOpen}
      >
        <img
          src={item.boardThumbnail && (import.meta.env.REACT_APP_BACKEND_URL + item.boardThumbnail)}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = NO_IMAGE_PATH;
          }}
        />
      </StyledImageListItem>
      <FeedDetailContent open={open} setOpen={setOpen} data={item} />
    </>
  );
};

export default FeedBrowseItem;