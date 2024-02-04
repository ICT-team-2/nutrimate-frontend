import React from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { TextField } from '@mui/material';
import { surveyDataAtom } from '@src/component/survey/atom.js';
import { useAtom } from 'jotai/react';
import styled from 'styled-components';

const TextFieldContainer = styled.div`
    margin: 20px 0;
`;
const StyledTextField = styled(TextField)`
    width: 100%;

    && input {
        font-size: 1.5rem;
    }
`;

const SurveyHeight = () => {
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  const inputHeight = (e) => {
    if (e.target.value > 1000 || e.target.value < 0) {
      return;
    }
    setSurveyData({
      ...surveyData,
      userHeight: e.target.value,
    });
  };
  return (
    <SurveyLayout
      title="키(cm)를 알려주세요."
      subtitle="ex) 175"
    >
      <TextFieldContainer>
        <StyledTextField
          onChange={inputHeight}
          variant="standard" label="키(cm)" type="number"
          inputProps={{ min: '0' }}  // 입력값 최소값 설정
          value={surveyData.userHeight}
        />
      </TextFieldContainer>
    </SurveyLayout>
  );
};

export default SurveyHeight;
