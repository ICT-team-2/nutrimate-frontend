import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';

const StyledList = muiStyled(List)({
  width: '100%',
  bgcolor: 'background.paper',
  overflow: 'auto',
  height: '730px',
});

function ChallengeCommentList () {
  const len = 20;
  return (
    <StyledList>
      {Array.from(new Array(len)).fill(0).map((item, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary='Brunch this weekend?'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Ali Connors
                    </Typography>
                    {' — I\'ll be in your neighborhood doing errands this...'}
                  </React.Fragment>
                }
              />
            </ListItem>
            {len - 1 !== index && <Divider variant='inset' component='li' />}
          </React.Fragment>
        ),
      )}
</StyledList>
  )
    ;
}

export default ChallengeCommentList;