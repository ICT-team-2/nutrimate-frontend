import React from 'react';
import { SubTitleTypography, TitleTypography } from '@src/component/survey/CommonComponents.jsx';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';

const PrevButton = styled(Button)`
    margin-right: 10px;
`;
const ChildrenContainer = styled.div`
    margin: 20px 0;
`;

const ButtonContainer = styled.div`
    margin-bottom: 40px;
`;

const SurveyLayout = (props) => {
  const { children, title, subtitle, clickNext } = props;
  const [progress, setProgress] = useAtom(surveyProgressAtom);


  const onClickPrev = () => {
    setProgress(progress - 1);
  };

  const onClickNext = () => {
    if (clickNext() === false) return;
    setProgress(progress + 1);
  };

  return (
    <>
      <TitleTypography>
        {title}
      </TitleTypography>
      {subtitle && <SubTitleTypography>{subtitle}</SubTitleTypography>}
      <ChildrenContainer>
        {children}
      </ChildrenContainer>
      <ButtonContainer>
        <PrevButton
          onClick={onClickPrev}
          variant="contained" size="large"
        >이전</PrevButton>
        <Button
          onClick={onClickNext}
          variant="contained" size="large"
        >다음</Button>
      </ButtonContainer>
    </>
  );
};

SurveyLayout.defaultProps = {
  title: 'title',
  clickNext: () => {
  },
};

export default SurveyLayout;
