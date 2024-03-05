import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import { useAtom } from 'jotai';
import { selectedRecordTabsAtom } from '@src/component/record/atom.js';
import FoodRecordList from '@src/component/record/diet/FoodRecordList.jsx';
import { RECORD_TABS } from '@src/component/record/const.js';
import SportRecordList from '@src/component/record/sport/SportRecordList.jsx';
import axios from 'axios';
import { calAtom } from '../setting/atom';
import { isTotalIntakeUpdatedAtom, foodCalAtom } from '@src/component/record/atom.js';

const StyledPaper = styled(Paper)`
    padding: 20px 30px;
    margin-bottom: 40px;
`;
const TitleContainer = styled.div`
    display: flex;
`;
const TitleTypography = styled(Typography)`
    display: inline-block;
`;
const CaloryTypography = styled(TitleTypography)`
    color: ${(theme) => theme.theme['gray-light-text']};
`;

const FoodRecordProgress = styled(LinearProgress)`
    width: ${({ width }) => width}%;
    display: inline-block;
    border-radius: 30px 0 0 30px / 30px 0 0 30px;
    height: 10px;
`;
const ProgressContainer = styled.div`

`;
const SportRecordProgress = styled(LinearProgress)`
    width: ${({ width }) => width}%;
    display: inline-block;
    border-radius: 0 30px 30px 0 / 0 30px 30px 0;
    height: 10px;

    & .MuiLinearProgress-barColorPrimary {
        background-color: ${(theme) => theme.theme['info-hover']};
    }
`;

const RecordResults = ({ selectedRecordTab }) => {
    const [progress, setProgress] = useState(0);
    const [overCal, setOverCal] = useState(0);
    const [userCal, setUserCal] = useAtom(calAtom);
    const [isTotalIntakeUpdated, setIsTotalIntakeUpdated] = useAtom(isTotalIntakeUpdatedAtom);
    const [foodCal, setFoodCal] = useAtom(foodCalAtom);

    useEffect(() => {
        axios.get('/record/food/calories', {
            params: {
                userId: sessionStorage.userId
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Response:', response.data);
                const { userCal, foodCal } = response.data;
                setUserCal(userCal);
                // 현재 날짜의 foodCal을 0으로 설정합니다.
                setFoodCal(foodCal);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    // useEffect(() => {
    //     axios.get('/member/mypage', {
    //         params: {
    //             userId: sessionStorage.userId,
    //         },
    //     })
    //         .then(response => {
    //             console.log('Response:', response.data);
    //             const userCal = response.data.memberDto.userCal;
    //             setUserCal(userCal);
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }, []);

    useEffect(() => {
        if (isTotalIntakeUpdated) {
            axios.post('/record/food/calories', {
                userId: sessionStorage.userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
                .then(response => {
                    const { foodCal, userCal } = response.data;
                    setFoodCal(foodCal);
                    setUserCal(userCal);
                    const calProgress = (foodCal / userCal) * 100;
                    setProgress(calProgress);
                    if (foodCal > userCal) {
                        setOverCal(foodCal - userCal);
                    }
                    // 요청이 끝나면 isTotalIntakeUpdated를 다시 false로 설정합니다.
                    setIsTotalIntakeUpdated(false);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [isTotalIntakeUpdated]);

    // progress 바의 색상을 결정하는 함수입니다.
    const getProgressColor = () => {
      if (overCal > 0) {
        return '#bf0000'; // overCal이 존재하면 빨간색 반환
      } else {
        return progress > 100 ? '#bf0000' : '#3f51b5'; // progress가 100을 초과하면 빨간색, 아니면 기본 색상 반환
      }
    };
    const getProgressWidth = () => {
        return progress > 100 ? 100 : progress;
    };

    return (
        <StyledPaper>
            <TitleContainer>
                <TitleTypography variant="h6">총 섭취량</TitleTypography>
                <FlexGrowDiv />
                <CaloryTypography variant="h6">{`${foodCal}/${userCal}kcal ${overCal > 0 ? `(+${overCal}kcal)` : ''}`}</CaloryTypography>
            </TitleContainer>
            <ProgressContainer>
                {progress <= 100 ? (
                    <FoodRecordProgress
                        variant="determinate"
                        value={progress}
                        width={getProgressWidth()}
                        style={{ backgroundColor: getProgressColor() }}
                    />
                ) : (
                    <SportRecordProgress
                        variant="determinate"
                        value={0}
                        width={100}
                        style={{ backgroundColor: '#bf0000' }}
                    />
                )}
                <SportRecordProgress
                    variant="determinate"
                    value={0}
                    width={100 - getProgressWidth()}
                />
            </ProgressContainer>
            {selectedRecordTab === RECORD_TABS.FOOD_RECORD && <FoodRecordList />}
            {selectedRecordTab === RECORD_TABS.SPORT_RECORD && <SportRecordList />}
        </StyledPaper>
    );
};

export default RecordResults;