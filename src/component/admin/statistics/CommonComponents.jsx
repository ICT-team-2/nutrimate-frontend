import React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const ChartContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 30px
`;
export const ChartOuterContainer = styled.div`
    width: 90%;
    height: 0;
    padding-bottom: 50%; // 가로 세로 비율 1.5:1에 맞는 padding-bottom 값
    position: relative; // 내부 요소를 absolute positioning하기 위해
    top: -20px;
    margin: 0 auto;
`;

export const ChartPaper = styled(Paper)`
    width: 100%;
    height: 0;
    padding-bottom: 55%; // 가로 세로 비율 1.5:1에 맞는 padding-bottom 값
    position: relative; // 내부 요소를 absolute positioning하기 위해
`;

export const ChartTitleTypo = styled(Typography)`
    padding: 20px 0 0 20px;
    color: #333;
`;
