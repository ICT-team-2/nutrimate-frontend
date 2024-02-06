import React from 'react';
import AllergyImage from '@src/asset/image/Allergy.png';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { ALLERGY_IMG } from '@src/component/survey/const.js';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';


const StyledPaper = styled(Paper)`
    width: ${ALLERGY_IMG.PAPER_SIZE};
    height: ${ALLERGY_IMG.PAPER_SIZE};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const AllergyImg = styled.div`
    background-image: url("${AllergyImage}");
    background-position: ${({ index }) =>
            ALLERGY_IMG.START[0] + ALLERGY_IMG.NEXT_X * (index % 5)}% ${({ index }) =>
            ALLERGY_IMG.START[1] + ALLERGY_IMG.NEXT_Y * (Math.floor(index / 5))}%;
    width: ${ALLERGY_IMG.IMG_SIZE};
    height: ${ALLERGY_IMG.IMG_SIZE};
    border-radius: 10px;
`;

const AbsoluteDiv = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.09);
    width: ${ALLERGY_IMG.PAPER_SIZE};
    height: ${ALLERGY_IMG.PAPER_SIZE};
    border-radius: 10px;
    text-align: right;
`;


const SurveyAllergyCard = ({ checked, index, onClick }) => {

  return (
    <StyledPaper onClick={onClick}>
      {
        checked && (
          <AbsoluteDiv>
            <CheckRoundedIcon fontSize="large" color="primary" />
          </AbsoluteDiv>
        )
      }
      <AllergyImg index={index} />
    </StyledPaper>
  );
};

SurveyAllergyCard.defaultProps = {
  checked: false,
  index: 0,
};

export default SurveyAllergyCard;
