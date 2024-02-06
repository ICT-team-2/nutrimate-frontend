import React, { useEffect, useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { SURVEY_SELECT } from '@src/component/survey/const.js';
import { SurveyCheckList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';

const SurveySportHard = () => {

  const [checkedSportHard, setCheckedSportHard] = useState(null);
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  useEffect(() => {
    setCheckedSportHard(surveyData.userSportHard);
  }, [surveyData.userSportHard]);


  const onClickSportHard = (sportHard) => {
    if (checkedSportHard === sportHard) {
      setCheckedSportHard(null);
    } else {
      setCheckedSportHard(sportHard);
    }
  };

  const onClickNext = () => {
    if (!checkedSportHard) return false;
    setSurveyData({ ...surveyData, userSportHard: checkedSportHard });
    return true;
  };
  return (
    <SurveyLayout
      title="일주일에 운동을 얼마나 하시나요?"
      clickNext={onClickNext}
    >
      {SURVEY_SELECT.EXERCISE_COUNT.KEYS.map((key, index) => (
        <SurveyCheckList
          key={key}
          onClick={() => onClickSportHard(key)}
          checked={checkedSportHard === key}
        >{`${String.fromCharCode('A'.charCodeAt(0) + index)}.
          ${SURVEY_SELECT.EXERCISE_COUNT.VALUES[index]}
        `}</SurveyCheckList>
      ))}

    </SurveyLayout>
  );
};

export default SurveySportHard;
