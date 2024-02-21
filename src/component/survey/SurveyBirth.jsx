import React, { useState } from 'react';
import { TitleTypography } from '@src/component/survey/CommonComponents.jsx';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { surveyDataAtom, surveyProgressAtom } from '@src/component/survey/atom.js';
import { useAtom } from 'jotai/react';
import SurveyBirthPicker from '@src/component/survey/SurveyBirthPicker.jsx';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';


const PickerContainer = styled.div`
    margin: 20px 0;
`;

const SurveyBirth = () => {

  return (
    <SurveyLayout
      title="반갑습니다! 생년월일을 알려주세요."
    >
      <PickerContainer>
        <SurveyBirthPicker />
      </PickerContainer>
    </SurveyLayout>
  );
};

export default SurveyBirth;
