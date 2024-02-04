import React, { useState } from 'react';
import {
  SubTitleTypography,
  TitleTypography,
} from '@src/component/survey/CommonComponents.jsx';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import {
  surveyDataAtom,
  surveyProgressAtom,
} from '@src/component/survey/atom.js';
import { useAtom } from 'jotai/react';

const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;
`;

const PrevButton = styled(Button)`
    margin-right: 10px;
`;

const SurveyName = () => {
  
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);
  const [name, setName] = useState(surveyData.userName);
  
  const onClickPrev = () => {
    setProgress(progress - 1);
  };
  
  const onClickNext = () => {
    if (name === null || name.trim().length === 0) {
      return;
    }
    setSurveyData({
      ...surveyData,
      userName: name,
    });
    setProgress(progress + 1);
  };
  return (
    <>
      <TitleTypography
      >안녕하세요, 이름을 알려주세요.
      </TitleTypography>
      <SubTitleTypography
      >ex)홍길동
      </SubTitleTypography>
      <StyledTextField
        onChange={(e) => setName(e.target.value)}
        variant='standard' label='이름'
        value={name} />
      <PrevButton
        onClick={onClickPrev}
        variant='contained' size='large'
      >이전</PrevButton>
      <Button
        onClick={onClickNext}
        variant='contained' size='large'
      >다음</Button>
    </>
  );
};

export default SurveyName;
