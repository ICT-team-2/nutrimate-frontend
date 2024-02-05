import React, { useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { SurveyCheckList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';
import { SURVEY_SELECT } from '@src/component/survey/const.js';

const SurveyDiet = () => {

  const [checkedDiet, setCheckedDiet] = useState({});
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  const onClickDiet = (diet) => {
    if (checkedDiet[diet.KEYS]) {
      setCheckedDiet({
        ...checkedDiet,
        [diet.KEYS]: false,
      });
      return;
    }
    setCheckedDiet({
      ...checkedDiet,
      [diet.KEYS]: true,
    });
  };

  return (
    <SurveyLayout
      title="당신의 현재 식습관은 무엇인가요?"
    >
      {SURVEY_SELECT.DIET.KEYS.map((diet, index) => (
        <SurveyCheckList
          onClick={() => onClickDiet(diet)}
          checked={checkedDiet[diet.KEYS]}
          key={diet}
        >
          {`${String.fromCharCode('A'.charCodeAt(0) + index)}. ${SURVEY_SELECT.DIET.VALUES[index]}`}
        </SurveyCheckList>
      ))}
    </SurveyLayout>
  );
};

export default SurveyDiet;
