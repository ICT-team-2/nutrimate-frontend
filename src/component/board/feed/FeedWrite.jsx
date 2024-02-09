import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { styled as muiStyled } from '@mui/material/styles';
import InputHashtag from '@src/component/board/InputHashtag.jsx';

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`;

const StyledTextField = muiStyled(TextField)`
    margin: 20px 0;
    width: 100%
`;
/**
 * 피드 글을 작성하는 화면.
 *
 * @return {JSX} 피드 글 작성 화면
 */
const FeedWrite = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <TitleContainer>
        <Typography variant="h5">피드 작성</Typography>
        <Button variant="contained">등록</Button>
      </TitleContainer>
      <ImgUploader
        width="100%" height="400px"
        selectedImage={selectedImage} setSelectedImage={setSelectedImage}
      >이미지 업로드</ImgUploader>
      <InputHashtag />
      <StyledTextField
        id="outlined-textarea"
        label="본문"
        placeholder="문구를 작성하세요"
        multiline
        minRows={6}
      />
    </>
  );
};

export default FeedWrite;
