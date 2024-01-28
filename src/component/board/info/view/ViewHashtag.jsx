import * as React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const ListItem = muiStyled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


const ViewHashtag = () => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);


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
      {chipData.map((data) => {


        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
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