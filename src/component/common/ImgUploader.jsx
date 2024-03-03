import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { fa } from 'faker/lib/locales.js';

export const ResetStyleInput = styled.input`
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: none;
`;

const StyledUploadImgDiv = styled.div`
    width: ${({ width, afterupload }) => afterupload === 'true' ? 'auto' : width || '200px'};
    height: ${({ height, afterupload }) => afterupload === 'true' ? 'fit-content' : height || '100px'};
    min-width: ${({ minwidth, afterupload }) => afterupload === 'true'
            ? 'auto'
            : minwidth || 'auto'};
    min-height: ${({ minheight, afterupload }) => afterupload === 'true'
            ? 'auto'
            : minheight || 'auto'};
    max-width: ${({ maxwidth }) => maxwidth || 'auto'};
    max-height: ${({ maxheight }) => maxheight || 'auto'};
    border: 1px dashed ${({ theme }) => theme['border-color-deep']};
    background-color: ${({ theme }) => theme['white']};
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: auto;
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
    height: auto;
    //object-fit: cover;
    margin: auto;
`;

const StyledButton = muiStyled(Button)`
    margin-top: 10px;
`;

const ImgUploaderContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    margin: 0 auto;
`;
/**
 * 이미지 업로더 컴포넌트입니다.
 * @param props {Object} - 이미지 업로더 컴포넌트의 속성들입니다.
 * @param {string} props.width - 이미지 업로더의 너비입니다.
 * @param {string} props.height - 이미지 업로더의 높이입니다.
 * @param {string} props.children - 이미지 업로더의 제목입니다.
 * @param {string} props.selectedImage - 이미지 업로더의 선택된 이미지입니다.
 * @param {function} props.setSelectedImage - 이미지 업로더의 선택된 이미지를 설정하는 함수입니다.
 * @param {string} props.minheight - 이미지 업로더의 최소 높이입니다.
 * @param {string} props.maxwidth - 이미지 업로더의 최대 너비입니다.
 * @param {string} props.maxheight - 이미지 업로더의 최대 높이입니다.
 * @param {string} props.minwidth - 이미지 업로더의 최소 너비입니다.
 * @param {string} props.src - 이미지 업로더의 이미지 경로입니다.
 * @returns {Element}
 * @constructor
 */
export const ImgUploader = (props) => {
  const {
    width, height, children: title,
    selectedImage, setSelectedImage, minheight, maxwidth,
    maxheight, minwidth, src,
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

  useEffect(() => {
    if (src != null) {
      setAfterUpload(true);
    }
  }, [src]);

  return (
    <ImgUploaderContainer
      width={width}
      height={height}
    >
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
        {(selectedImage || src)
          ? <StyledUploadImg src={selectedImage || src} />
          : (<StyledUploadImgDivInner>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <StyledButton variant="contained" size="small"
                          color="primary">{title}</StyledButton>
          </StyledUploadImgDivInner>)}
      </StyledUploadImgDiv>
    </ImgUploaderContainer>
  );
};
ImgUploader.defaultProps = {
  width: '200px',
  height: '100px',
  children: '이미지 업로드',
};
