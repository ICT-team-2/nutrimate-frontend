import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled as muiStyled } from '@mui/material/styles';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import { FlexGrowDiv, UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import LikeButton from '@src/component/board/LikeButton.jsx';
import BookmarkButton from '@src/component/board/BookmarkButton.jsx';
import useClickLikeButton from '@src/component/board/hooks/useClickLikeButton.jsx';
import useClickBookmark from '@src/component/board/hooks/useClickBookmark.jsx';
import { useEffect, useState } from 'react';
import FeedDetailContent from '@src/component/board/feed/FeedDetailContent.jsx';
import { NO_IMAGE_PATH } from '@src/utils/const.js';
import FeedContentDropMenu from '@src/component/board/feed/FeedContentDropMenu.jsx';

const CustomCard = styled(Card)`
    width: 240px;
    margin: 10px;
    height: ${({ isbookmark }) => isbookmark ? '300px' : '240px'};
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;
const LikeButtonContainer = styled.div`
    position: relative;
    left: 20px;
`;
const CustomCardMedia = styled.img`
    flex-grow: 1;
    object-fit: cover;
`;
const defaultData = {
  title: 'Title',
  author: 'Author',
  content: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
    'species, ranging across all continents except Antarctica',
  url: '/src/asset/image/loading.png',
  date: '2022.01.12',
};

export default function MyFeedCard(props) {

  const { data, isBookmark } = props;
  const {
    boardContent, boardId, boardThumbnail,
    checkedLike, likeCount, userNick: writer, checkedBookmark,
    userId: writerId, userProfile: writerProfile,
  } = data;
  const [likeClicked, setLikeClicked] = useState(checkedLike === 1);
  const clickLikeButton = useClickLikeButton(boardId);
  const clickBookmark = useClickBookmark(boardId, true);
  const userId = parseInt(sessionStorage.getItem('userId'));
  const [modalOpen, setModalOpen] = useState(false);

  const onClickLike = (e) => {
    clickLikeButton.mutate();
    e.stopPropagation();
  };

  const onClickBookmark = (e) => {
    clickBookmark.mutate();
    e.stopPropagation();
  };

  const clickCard = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setLikeClicked(checkedLike === 1);
  }, [checkedLike]);
  return (
    <>
      <CustomCard
        isbookmark={isBookmark}
        onClick={clickCard}>
        <CustomCardMedia
          src={import.meta.env.REACT_APP_BACKEND_URL + `${boardThumbnail}`}
          alt={'feed'}
          onError={(e) => {
            e.target.src = NO_IMAGE_PATH;
          }}
        />
        {isBookmark && (<CardActions>
          <FlexGrowDiv />
          <Tooltip title={'좋아요'}>
            <LikeButtonContainer>
              <LikeButton
                onClick={onClickLike}
                size={7}
                clicked={likeClicked}
              />
            </LikeButtonContainer>
          </Tooltip>
          <Tooltip title="북마크">
            <BookmarkButton
              clicked={(checkedBookmark === 1) + ''}
              onClick={onClickBookmark}
            />
          </Tooltip>
        </CardActions>)}
      </CustomCard>
      <FeedDetailContent
        data={data}
        open={modalOpen}
        setOpen={setModalOpen} />
    </>
  );
}

MyFeedCard.defaultProps = {
  title: defaultData.title,
  content: defaultData.content,
  img: defaultData.url,
  date: defaultData.date,
  author: defaultData.author,
};