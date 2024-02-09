import React, { useEffect, useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { SURVEY_SELECT } from '@src/component/survey/const.js';
import { SurveyCheckList, SurveyList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';

const initialCheckedHealthReason = Object.keys(SURVEY_SELECT.HEALTH_REASON)
  .map((key) => ({ [key]: false }));

const SurveyHealthReason = () => {
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);
  const [checkedHealthReason, setCheckedHealthReason] = useState({});

  useEffect(() => {
    surveyData.userHealthReason.forEach((reason) => {
      setCheckedHealthReason((prevState) => ({
        ...prevState,
        [reason]: true,
      }));
    });
  }, [surveyData.userHealthReason]);


  const onClickHealthReason = (reason) => {
    if (checkedHealthReason[reason.KEYS]) {
      setCheckedHealthReason({
        ...checkedHealthReason,
        [reason.KEYS]: false,
      });
      return;
    }
    setCheckedHealthReason({
      ...checkedHealthReason,
      [reason.KEYS]: true,
    });
  };

  const onClickNext = () => {
    const selectedHealthReason = Object.keys(checkedHealthReason).filter(
      (key) => checkedHealthReason[key],
    );
    if (selectedHealthReason.length === 0) return false;
    setSurveyData({
      ...surveyData,
      userHealthReason: selectedHealthReason,
    });
    return true;
  };

  return (
    <SurveyLayout
      title="건강관리를 시작하게 된 계기는 무엇인가요?"
      clickNext={onClickNext}
    >
      {Object.values(SURVEY_SELECT.HEALTH_REASON).map(
        (reason, index) => (
          <SurveyCheckList
            onClick={() => onClickHealthReason(reason)}
            checked={checkedHealthReason[reason.KEYS]}
            key={reason.KEYS}>
            {`${String.fromCharCode('A'.charCodeAt(0) + index)}. 
            ${reason.VALUES}`}
          </SurveyCheckList>
        ))}
    </SurveyLayout>
  );
};

export default SurveyHealthReason;
