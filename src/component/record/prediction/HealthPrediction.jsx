import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { PREDICTION_CATEGORY } from '../const';
import {
    InfoContentContainer,
  } from '@src/component/infomation/CommonComponents.jsx';
import DiabetesPrediction from './Diabetes';
import HighBloodPressurePrediction from './HighBloodPressure';
import HealthSurvey from './HealthSurvey';
import HealthMeal from './HealthMeal'; 

const StyledButton = styled(Button)`
    margin-left: 10px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between; // 버튼들을 양끝으로 정렬
`;

const HealthPrediction = () => {
    const [category, setCategory] = useState(PREDICTION_CATEGORY.DIABETES);
    const [showPrediction, setShowPrediction] = useState(false);
    // 설문조사 입력값을 저장할 상태
    const [surveyInput, setSurveyInput] = useState({});

    const handlePredictionSubmit = (inputData) => {
        setSurveyInput(inputData); // 설문조사 입력값 업데이트
        setShowPrediction(true);
    };

    return (
        <InfoContentContainer style={{ marginTop: '0px' }}>
            {!showPrediction && <HealthSurvey onPredictionSubmit={handlePredictionSubmit} />}
            {showPrediction && (
                <>
                <ButtonsContainer>
                    <div>
                        {Object.values(PREDICTION_CATEGORY).map((value) => (
                            <StyledButton
                                onClick={() => {
                                setCategory(value);
                                }}
                                variant={value === category ? 'contained' : 'outlined'}
                                key={value}>
                                {value}
                            </StyledButton>
                        ))}
                    </div>
                    <StyledButton
                        onClick={() => setShowPrediction(false)}>
                        {/* variant="outlined"> */}
                        설문 다시 하기
                    </StyledButton>
                </ButtonsContainer>
                {category === PREDICTION_CATEGORY.DIABETES && (
                    <>
                        <DiabetesPrediction surveyInput={surveyInput} />
                        <HealthMeal />
                    </>
                )}
                {category === PREDICTION_CATEGORY.HIGH_BLOOD_PRESSURE && (
                    <>
                        <HighBloodPressurePrediction surveyInput={surveyInput} />
                        <HealthMeal />
                    </>
                )}
                </>
            )}
        </InfoContentContainer>
    );
};
 
export default HealthPrediction;