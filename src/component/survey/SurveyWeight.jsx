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

const SurveyWeight = () => {
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  const inputWeight = (e) => {
    if (e.target.value > 1000 || e.target.value < 0) {
      return;
    }
    setSurveyData({
      ...surveyData,
      userWeight: e.target.value,
    });
  };
  return (
    <SurveyLayout
      title="몸무게(kg)를 알려주세요."
      subtitle="ex) 68"
    >
      <TextFieldContainer>
        <StyledTextField
          onChange={inputWeight}
          variant="standard" label="몸무게(kg)" type="number"
          inputProps={{ min: '0' }}  // 입력값 최소값 설정
          value={surveyData.userWeight}
        />
      </TextFieldContainer>
    </SurveyLayout>
  );
};

export default SurveyWeight;
