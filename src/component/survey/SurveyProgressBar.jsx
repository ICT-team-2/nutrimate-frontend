import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';

export default function SurveyProgressBar () {
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant='determinate'
        value={progress * 100 / Object.keys(SURVEY_PROGRESS).length}
      />
    </Box>
  );
}
