import React, { useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import List from '@mui/material/List';
import { SurveyCheckList, SurveyList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';
import { SURVEY_SELECT } from '@src/component/survey/const.js';


const SurveyGender = () => {
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  const onClickMan = () => {
    if (surveyData.userGender === SURVEY_SELECT.GENDER.MALE) {
      setSurveyData({
        ...surveyData,
        userGender: null,
      });
      return;
    }
    setSurveyData({
      ...surveyData,
      userGender: SURVEY_SELECT.GENDER.MALE,
    });
  };
  const onClickWoman = () => {
    if (surveyData.userGender === SURVEY_SELECT.GENDER.FEMALE) {
      setSurveyData({
        ...surveyData,
        userGender: null,
      });
      return;
    }
    setSurveyData({
      ...surveyData,
      userGender: SURVEY_SELECT.GENDER.FEMALE,
    });
  };

  const onClickNext = () => {
    return !!(surveyData.userGender === SURVEY_SELECT.GENDER.MALE
      || surveyData.userGender === SURVEY_SELECT.GENDER.FEMALE);
  };


  return (
    <SurveyLayout
      title="성별을 알려주세요."
      clickNext={onClickNext}
    >
      <List>
        <SurveyCheckList
          onClick={onClickMan}
          checked={surveyData.userGender === SURVEY_SELECT.GENDER.MALE}
        >1. 남성</SurveyCheckList>
        <SurveyCheckList
          onClick={onClickWoman}
          checked={surveyData.userGender === SURVEY_SELECT.GENDER.FEMALE}
        >2. 여성</SurveyCheckList>
      </List>
    </SurveyLayout>
  );
};

export default SurveyGender;