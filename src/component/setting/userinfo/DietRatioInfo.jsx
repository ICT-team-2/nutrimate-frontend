import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { useAtom } from 'jotai/react';
import { carboAtom, dietStateAtom, fatAtom, proteinAtom } from '@src/component/setting/atom.js';
import { USERINFOS } from '@src/component/setting/const.js';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/UserViewInfo.jsx';


const StyledTextField = muiStyled(TextField)`
    width: 30%;
    margin: auto 15px;
    &:first-of-type{
        margin-left: 30px;
    }
    &:last-of-type {
        margin-right: 30px;
    }
    & .MuiOutlinedInput-input.Mui-disabled{
      color: black;
      -webkit-text-fill-color: black;
    }

`;
const StyledDiv = styled.label`
    margin: auto 0;
    width: 35%;
    text-align: center;
`;
const TextFieldContainer = styled.div`
    width: 60%;
    margin-right: 30px;
    display: flex;
    align-items: center;
`;
const ColonDiv = styled.div`
    margin: auto 0px;
`;
const StyledLabel = styled.div`
    margin: auto 0 0 10px;
    text-align: center;
    color: ${({ theme, focus }) => focus ? theme['primary-color'] : 'black'};

`;
const LabelContainerDiv = styled.div`
    width: 100%;
    display: flex;
    margin-left: 30px;

`;
const DietRatioInfo = ({ disabled }) => {
  const [isCarboFocused, setIsCarboFocused] = useState(undefined);
  const [isProteinFocused, setIsProteinFocused] = useState(undefined);
  const [isFatFocused, setIsFatFocused] = useState(undefined);

  const [carbo, setCarbo] = useAtom(carboAtom);
  const [protein, setProtein] = useAtom(proteinAtom);
  const [fat, setFat] = useAtom(fatAtom);

  const [diet, setDiet] = useAtom(dietStateAtom);


  return (<>
      <UserInfoContainerDiv>
        <LabelContainerDiv>
          권장하는
          <StyledLabel
            focus={isCarboFocused}
          >탄수화물</StyledLabel>,
          <StyledLabel
            focus={isProteinFocused}
          >단백질</StyledLabel>,
          <StyledLabel
            focus={isFatFocused}
          >지방</StyledLabel>의 비율
        </LabelContainerDiv>
      </UserInfoContainerDiv>
      <UserInfoContainerDiv>
        <StyledTextField
          label="탄수화물" id="carbo"
          onFocus={() => setIsCarboFocused('true')}
          onBlur={() => setIsCarboFocused(undefined)}
          value={carbo}
          disabled={disabled || diet !== USERINFOS.DIET.CUSTOM.KEYS}
        ></StyledTextField>
        <ColonDiv>:</ColonDiv>
        <StyledTextField
          label="단백질" id="protein"
          onFocus={() => setIsProteinFocused('true')}
          onBlur={() => setIsProteinFocused(undefined)}
          value={protein}
          disabled={disabled || diet !== USERINFOS.DIET.CUSTOM.KEYS}

        ></StyledTextField>
        <ColonDiv>:</ColonDiv>
        <StyledTextField
          label="지방" id="province"
          onFocus={() => setIsFatFocused('true')}
          onBlur={() => setIsFatFocused(undefined)}
          value={fat}
          disabled={disabled || diet !== USERINFOS.DIET.CUSTOM.KEYS}
        ></StyledTextField>
      </UserInfoContainerDiv>
    </>
  );
};

export default DietRatioInfo;
