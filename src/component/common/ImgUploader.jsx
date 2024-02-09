import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export const ResetStyleInput = styled.input`
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: none;
`;

const StyledUploadImgDiv = styled.div`
    width: ${({ width }) => width || '200px'};
    height: ${({ height }) => height || '100px'};
    min-width: ${({ minwidth, afterupload }) => afterupload === 'true' ? 'auto' : minwidth || 'auto'};
    min-height: ${({ minheight, afterupload }) => afterupload === 'true' ? 'auto' : minheight || 'auto'};
    max-width: ${({ maxwidth }) => maxwidth || 'auto'};
    max-height: ${({ maxheight }) => maxheight || 'auto'};
    border: 1px dashed ${({ theme }) => theme['border-color-deep']};
    background-color: ${({ theme }) => theme['white']};
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const StyledUploadImgDivInner = styled.div`
    margin: auto;
    color: ${({ theme }) => theme['light-gray-color']};
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const StyledUploadImg = styled.img`
    width: 100%;
    height: 100%;
    //object-fit: cover;
`;

const StyledButton = muiStyled(Button)`
    margin-top: 10px;
`;

export const ImgUploader = (props) => {
  const {
    width, height, children: title,
    selectedImage, setSelectedImage, minheight, maxwidth,
    maxheight, minwidth,
  } = props;
  const fileInputRef = useRef();
  const [afterUpload, setAfterUpload] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
    setAfterUpload(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setAfterUpload(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <ResetStyleInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <StyledUploadImgDiv
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        width={width}
        height={height}
        minheight={minheight}
        maxwidth={maxwidth}
        maxheight={maxheight}
        minwidth={minwidth}
        afterupload={afterUpload + ''}
      >
        {selectedImage ? (
          <StyledUploadImg src={selectedImage} />
        ) : (
          <StyledUploadImgDivInner>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <StyledButton variant="contained" size="small" color="primary">{title}</StyledButton>
          </StyledUploadImgDivInner>
        )}
      </StyledUploadImgDiv>
    </div>
  );
};
ImgUploader.defaultProps = {
  width: '200px',
  height: '100px',
  children: '이미지 업로드',
};
