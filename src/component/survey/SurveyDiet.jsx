import React, { useEffect, useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { SurveyCheckList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';
import { SURVEY_SELECT } from '@src/component/survey/const.js';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
`;
const StyledColonContainer = styled.div`
    margin: auto 10px;
`;
const StyledTextField = styled(TextField)`
    width: 100px;
    margin-bottom: 20px;
`;

const SurveyDiet = () => {

  const [checkedDiet, setCheckedDiet] = useState(null);
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);
  const [carbo, setCarbo] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  const onClickDiet = (diet) => {
    if (checkedDiet === diet) {
      setCheckedDiet(null);
    } else {
      setCheckedDiet(diet);
      if (diet === SURVEY_SELECT.DIET.CUSTOM.KEYS) return;
      setCarbo(SURVEY_SELECT.DIET[diet].CARBO);
      setProtein(SURVEY_SELECT.DIET[diet].PROTEIN);
      setFat(SURVEY_SELECT.DIET[diet].FAT);
    }
  };


  useEffect(() => {
    setCheckedDiet(surveyData.userDiet);
    setCarbo(surveyData.carbo);
    setProtein(surveyData.protein);
    setFat(surveyData.fat);
  }, [surveyData]);


  const onClickNext = () => {
    if (!checkedDiet) return false;
    if (checkedDiet === SURVEY_SELECT.DIET.CUSTOM.KEYS) {
      if (carbo === 0 || protein === 0 || fat === 0) {
        alert('탄수화물, 단백질, 지방을 입력해주세요.');
        return false;
      }
    }
    setSurveyData({ ...surveyData, userDiet: checkedDiet, carbo, protein, fat });
    return true;
  };

  return (
    <SurveyLayout
      title="당신의 식단은 어떤 것인가요?"
      clickNext={onClickNext}
    >
      {SURVEY_SELECT.DIET.KEYS.map((diet, index) => (
        <SurveyCheckList
          onClick={() => onClickDiet(diet)}
          checked={checkedDiet === diet}
          key={diet}
        >
          {`${String.fromCharCode('A'.charCodeAt(0) + index)}. ${SURVEY_SELECT.DIET.VALUES[index]}`}
        </SurveyCheckList>
      ))}
      {checkedDiet === SURVEY_SELECT.DIET.CUSTOM.KEYS && (<StyledContainer>
        <StyledTextField
          variant="standard"
          label="탄수화물"
          type="number"
          value={carbo}
        /><StyledColonContainer>:</StyledColonContainer>
        <StyledTextField
          variant="standard"
          label="단백질"
          type="number"
          value={protein}
        /><StyledColonContainer>:</StyledColonContainer>
        <StyledTextField
          variant="standard"
          label="지방"
          type="number"
          value={fat}
        />
      </StyledContainer>)
      }
    </SurveyLayout>
  );
};

export default SurveyDiet;
