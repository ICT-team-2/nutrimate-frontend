import React, { useEffect, useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { SURVEY_SELECT } from '@src/component/survey/const.js';
import { SurveyCheckList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';

const SurveyEatingHabits = () => {
  const [checkedEatingHabit, setCheckedEatingHabit] = useState({});
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  useEffect(() => {
    surveyData.eatingHabit.forEach((key) => {
      setCheckedEatingHabit((prevState) => ({
        ...prevState,
        [key]: true,
      }));
    });
  }, [surveyData.eatingHabit]);

  const onClickNext = () => {
    setSurveyData({
      ...surveyData,
      eatingHabit: Object.keys(checkedEatingHabit).filter(
        (key) => checkedEatingHabit[key]),
    });
    return true;
  };

  const onClickSurveyList = (key) => {
    if (checkedEatingHabit[key]) {
      setCheckedEatingHabit({
        ...checkedEatingHabit,
        [key]: false,
      });
      return;
    }
    setCheckedEatingHabit({
      ...checkedEatingHabit,
      [key]: true,
    });
  };
  return (
    <SurveyLayout
      title="당신의 평소 식생활은 무엇인가요?"
      clickNext={onClickNext}
    >
      {Object.keys(SURVEY_SELECT.EATING_HABIT).map((key, index) => (
        <SurveyCheckList
          onClick={(e) => onClickSurveyList(key)}
          checked={checkedEatingHabit[key]}
          key={key}>
          {`${String.fromCharCode('A'.charCodeAt(0) + index)}. 
          ${SURVEY_SELECT.EATING_HABIT[key].VALUES}`}
        </SurveyCheckList>
      ))}
    </SurveyLayout>
  );
};

export default SurveyEatingHabits;
