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

const CustomCard = muiStyled(Card)`
  width: 240px;
  margin: 10px;
  height: 300px;
`;

const CustomCardMedia = muiStyled(CardMedia)`
  height: 150px;
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

export default function FeedCard(props) {

  const { title, content, img, date, author } = props;

  return (
    <CustomCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={author}
      />
      <CustomCardMedia
        image={img}
        component="img"
        alt={title}
      />
      <CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CardContent>

    </CustomCard>
  );
}

FeedCard.defaultProps = {
  title: defaultData.title,
  content: defaultData.content,
  img: defaultData.url,
  date: defaultData.date,
  author: defaultData.author,
};