import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export const SurveyContainer = styled.div`
    margin: auto;
    display: inline-block;


`;
export const SurveyFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

export const StyledTitleTypography = styled(Typography)`
    margin-bottom: 20px;
`;
export const TitleTypography = ({ children }) => {
  return <Typography variant="h4">
    {children}
  </Typography>;
};
export const StyledSubTitleTypography = styled(Typography)`
    margin-bottom: 20px;
    color: ${({ theme }) => theme['extra-light-text']};
`;
export const SubTitleTypography = ({ children }) => {
  return <StyledSubTitleTypography
    variant="h6">{children}
  </StyledSubTitleTypography>;
};

export const SurveyList = styled(ListItemButton)`
    background-color: white;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme['primary-color']};
    margin-bottom: 10px;
    display: flex;
    height: 42px;

    &:last-child {
        margin-bottom: 0;
    }
`;
/**
 * @param checked {boolean}  - 체크 여부
 * @param onClick {function}  - 클릭 이벤트
 * @param children {React.ReactNode}  - 내용
 * @return {JSX.Element}
 */
export const SurveyCheckList = (props) => {
  const { children, checked, onClick } = props;
  return (
    <SurveyList
      onClick={onClick}
      checked={checked}
    >
      {children}
      <FlexGrowDiv />
      {checked && <CheckRoundedIcon />}
    </SurveyList>
  );
};
SurveyCheckList.defaultProps = {
  checked: false,
  onClick: () => {
  },
};

