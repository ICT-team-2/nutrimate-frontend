import React, { useState, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EDITOR_HEIGHT } from '@src/utils/const.js';
import styled from 'styled-components';

const StyledEditor = styled(ReactQuill)`
    min-height: ${EDITOR_HEIGHT}px;
`;

function BoardEditor() {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.getModule('toolbar').addHandler('image', imageHandler);
    }
  }, []);

  function imageHandler() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
    );
    fileInput.classList.add('ql-image');
    fileInput.addEventListener('change', () => {
      const files = fileInput.files;
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64ImageSrc = reader.result;
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(
            range.index,
            'image',
            base64ImageSrc,
            Quill.sources.USER,
          );
          console.log(base64ImageSrc); // 이미지 내용 출력
        };
        reader.readAsDataURL(file);
      }
    });
    fileInput.click();
  }

  return (
    <div>
      <StyledEditor
        style={{ height: EDITOR_HEIGHT + 'px' }}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
              ],
              ['link', 'image'],
              ['clean'],
            ],
          },
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
        ]}
        ref={quillRef}
      />
    </div>
  );
}

export default BoardEditor;