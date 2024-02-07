import React, { useEffect, useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import SurveyAllergyCard from '@src/component/survey/SurveyAllergyCard.jsx';
import { ALLERGY_LIST } from '@src/component/survey/const.js';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';

const GridContainer = styled.div`
    margin: 50px 0;
`;

const SurveyAllergy = () => {

  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);
  const [allergyList, setAllergyList] = useState({});

  useEffect(() => {
    surveyData.userAllergy.forEach((allergy) => {
      setAllergyList((prevState) => ({
        ...prevState,
        [allergy]: true,
      }));
    });
  }, [surveyData.userAllergy]);

  const onClickNext = () => {
    setSurveyData({
      ...surveyData,
      userAllergy: Object.keys(allergyList).filter((key) => allergyList[key] === true),
    });
    console.log(surveyData.userAllergy);
    return true;
  };

  const onClickAllergy = (index) => {
    setAllergyList((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <SurveyLayout
      title="해당되는 알레르기를 모두 선택해주세요 (해당 사항이 없다면 선택하지 않아도 됩니다)."
      clickNext={onClickNext}
    >
      <GridContainer>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="center"
          columns={60}
        >
          {Object.keys(ALLERGY_LIST).map((key, index) => (
            <Grid item xs={60} sm={30} md={20} lg={12} key={key}>
              <SurveyAllergyCard
                key={key} index={index}
                onClick={() => onClickAllergy(key)}
                checked={allergyList[key]}
              />
            </Grid>
          ))}
        </Grid>
      </GridContainer>
    </SurveyLayout>
  );
};

export default SurveyAllergy;