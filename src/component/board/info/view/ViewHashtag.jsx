import * as React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const ListItem = muiStyled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ViewHashtag = ({ hashtags }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
    >
      {hashtags && hashtags.map((data, index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data.tagName}
              color="primary"
              variant="outlined"
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default ViewHashtag;