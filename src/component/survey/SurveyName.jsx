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
import SurveyLayout from '@src/layout/SurveyLayout.jsx';

const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;
`;

const PrevButton = styled(Button)`
    margin-right: 10px;
`;

const SurveyName = () => {

  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);
  const [name, setName] = useState(surveyData.userName);

  const onClickNext = () => {
    if (name === null || name.trim().length === 0) {
      return false;
    }
    setSurveyData({
      ...surveyData,
      userName: name,
    });
  };
  return (
    <SurveyLayout
      title="안녕하세요, 이름을 알려주세요."
      subtitle="ex)홍길동"
      clickNext={onClickNext}
    >
      <StyledTextField
        onChange={(e) => setName(e.target.value)}
        variant="standard" label="이름"
        value={name} />
    </SurveyLayout>
  );
};

export default SurveyName;
