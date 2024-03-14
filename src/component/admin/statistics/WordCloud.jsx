import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Loading from '@src/component/admin/statistics/Loading.jsx';

const ChartContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 50%;
    left: 0;
    right: 0;
    margin: 30px;
    display: flex;
    flex-direction: column;
`;
const ChartOuterContainer = styled.div`
    width: 90%;
    height: 0;
    padding-bottom: ${({ paddingbottom }) => paddingbottom}%; // 가로 세로 비율 1.5:1에 맞는 padding-bottom 값
    position: relative; // 내부 요소를 absolute positioning하기 위해
    top: -20px;
    margin: 0 auto;
`;

const ChartPaper = styled(Paper)`
    width: 100%;
    height: 0;
    padding-bottom: ${({ paddingbottom }) => paddingbottom + 10}%; // 가로 세로 비율 1.5:1에 맞는 padding-bottom 값
    position: relative; // 내부 요소를 absolute positioning하기 위해
`;

const ChartTitleTypo = styled(Typography)`
    padding: 20px 0 0 20px;
    color: #333;
`;

const StyledWordCloudImg = styled.img`
    max-width: 60%;
    margin: 0 auto;
`;

const WordCloud = (props) => {
  const { children, title, paddingbottom, titleVariant, titleComponent } = props;
  const [image, setImage] = useState('');
  const [loadingImage, setLoadingImage] = useState('');
  useEffect(() => {
    setLoadingImage(true);
    axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/word`)
      .then(response => {
        setImage(response.data.image_base64);
        setLoadingImage(false);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);


  return (
    <ChartPaper paddingbottom={paddingbottom}>
      {titleComponent}
      <ChartTitleTypo variant={titleVariant}>워드클라우드</ChartTitleTypo>
      <ChartOuterContainer paddingbottom={paddingbottom}>
        <ChartContainer>
          {loadingImage ? <Loading /> :
            <StyledWordCloudImg src={`data:image/jpeg;base64,${image}`} alt="Selected Image" />}
        </ChartContainer>
      </ChartOuterContainer>
    </ChartPaper>
  );
};
WordCloud.defaultProps = {
  paddingbottom: 50,
  titleVariant: 'h6',
};

export default WordCloud;
