import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const PriceFoodCard = ({ diets }) => {
  return (
    <Grid container spacing={2} style={{ marginLeft: '-4px' }}>
      {Object.entries(diets).map(([dietType, dietInfo]) => (
        <Grid item xs={6} sm={6} md={6} key={dietType}>
          <Box display="flex" alignItems="center">
            <Box style={{ width: '60px' }}>
              <Typography variant="h5" component="div" style={{ marginBottom: '175px', fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>
                {dietType}
              </Typography>
            </Box>
            <Card style={{ marginTop: '10px', marginBottom: '10px', width: '440px' }}>
              <CardContent>
                <Box display="flex">
                  <img src={dietInfo['이미지']} alt={dietInfo['메뉴 이름']} style={{ width: '250px', height: '200px' }} />
                  <Box ml={3}>
                    <Typography variant="body2" style={{ fontSize:'17px', marginTop:'18px' }}>
                      {dietInfo['메뉴 이름']}
                    </Typography>
                    <Typography variant="body2" style={{ fontSize:'17px' }}>
                      {dietInfo['칼로리']}kcal
                    </Typography>
                    <br />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">
                        <CircleIcon style={{color:'orange',fontSize:'10px',marginRight:'3px'}}/>
                        FAT
                      </Typography>
                      <Typography variant="body2">
                        {dietInfo['지방']}g
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">
                        <CircleIcon style={{color:'red',fontSize:'10px',marginRight:'3px'}}/>
                        CARB
                      </Typography>
                      <Typography variant="body2">
                        {dietInfo['탄수화물']}g
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">
                        <CircleIcon style={{color:'green',fontSize:'10px',marginRight:'3px'}}/>
                        PROTEIN
                      </Typography>
                      <Typography variant="body2" style={{marginLeft:'18px'}}>
                        {dietInfo['단백질']}g
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PriceFoodCard;