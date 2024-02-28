import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { styled as muiStyled } from '@mui/material/styles';
import InputHashtag from '@src/component/board/InputHashtag.jsx';
import { useAtom } from 'jotai/react';
import { inputHashTagAtom } from '@src/component/board/atom.js';
import useInputFeed from '@src/hooks/board/feed/useInputFeed.jsx';
import { base64toFile } from '@src/utils/functions.js';
import useEditFeed from '@src/hooks/board/feed/useEditFeed.jsx';
import { useNavigate } from 'react-router-dom';

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
const FeedWrite = ({ editData, isEdit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [chipData, setChipData] = useAtom(inputHashTagAtom);
  const inputFeed = useInputFeed();
  const editFeed = useEditFeed();
  const [boardContent, setBoardContent] = useState('');

  useEffect(() => {
    setChipData(editData?.hashtag.map((item, index) => ({
      key: index,
      label: item,
    })) ?? []);
    setBoardContent(editData?.boardContent ?? '');
    console.log(editData);
  }, [editData]);

  useEffect(() => {
    console.log('selectedImage', selectedImage);
  }, [selectedImage]);

  const onClickSubmit = () => {
    if (isEdit) {
      editFeed.mutate({
        boardId: editData.boardId,
        files: selectedImage ? base64toFile(selectedImage, 'feedImage.jpg') : null,
        hashtag: chipData.map((item) => item.label),
        boardContent: boardContent,
      });
      return;
    }
    inputFeed.mutate({
      files: base64toFile(selectedImage, 'feedImage.jpg'),
      hashtag: chipData.map((item) => item.label),
      boardContent: boardContent,
    });
  };


  return (
    <>
      <TitleContainer>
        <Typography variant="h5">피드 {isEdit ? '수정' : '작성'}</Typography>
        <Button
          onClick={onClickSubmit}
          variant="contained">등록</Button>
      </TitleContainer>
      <ImgUploader
        isEdit={isEdit}
        src={isEdit ?
          import.meta.env.REACT_APP_BACKEND_URL + editData?.boardThumbnail : null
        }
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
        value={boardContent}
        onChange={(e) => setBoardContent(e.target.value)}
      />
    </>
  );
};


export default FeedWrite;
