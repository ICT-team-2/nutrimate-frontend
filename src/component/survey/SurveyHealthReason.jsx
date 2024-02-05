import React, { useState } from 'react';
import SurveyLayout from '@src/layout/SurveyLayout.jsx';
import { SURVEY_SELECT } from '@src/component/survey/const.js';
import { SurveyCheckList, SurveyList } from '@src/component/survey/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';

const SurveyHealthReason = () => {
  const [checkedHealthReason, setCheckedHealthReason] = useState({});
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  const onClickHealthReason = (reason) => {
    if (checkedHealthReason[reason.KEY]) {
      setCheckedHealthReason({
        ...checkedHealthReason,
        [reason.KEY]: false,
      });
      return;
    }
    setCheckedHealthReason({
      ...checkedHealthReason,
      [reason.KEY]: true,
    });
  };

  const onClickNext = () => {
    const selectedHealthReason = Object.keys(checkedHealthReason).filter(
      (key) => checkedHealthReason[key],
    );
    setSurveyData({
      ...surveyData,
      userHealthReason: selectedHealthReason,
    });
    return !!selectedHealthReason.length;
  };

  return (
    <SurveyLayout
      title="건강관리를 시작하게 된 계기는 무엇인가요?"
      clickNext={onClickNext}
    >
      {Object.values(SURVEY_SELECT.HEALTH_REASON).map(
        (reason) => (
          <SurveyCheckList
            onClick={() => onClickHealthReason(reason)}
            checked={checkedHealthReason[reason.LABEL]}
            key={reason.LABEL}>
            {`${reason.LABEL}. ${reason.VALUES}`}
          </SurveyCheckList>
        ))}
    </SurveyLayout>
  );
};

export default SurveyHealthReason;
