import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RankTable from '@src/component/challenge/RankTable.jsx';
import axios from 'axios';

const ChallengeContainer = styled(Paper)`
    padding: 30px;
    display: flex;
    margin: 30px 0 40px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme['primary-color']};
`;
const IconContainer = styled.div`
    background-color: ${({ theme }) => theme['primary-transparent']};
    padding: 10px 25px;
    border-radius: 10px;
    width: 36px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const ChallengeTableContainer = styled.div`
    display: flex;
    margin: 30px 0 40px;
    //padding: 20px;
    flex-direction: column;
    align-items: flex-start;
`;

const ChallengeRank = () => {
  const [chatroomId, setChatroomId] = React.useState(1); // 1: 하루에 한 번 물마시기, 3: 샐러드 챌린지
  const [value, setValue] = React.useState(0);
  const [challengeListData, setChallengeListData] = React.useState(undefined);
  //랭크 리스트를 부르는 함수
  const ChallengeRankList = () => {
    axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/challenge/success?chatroomId=${chatroomId}`)
      .then(datas => {
        console.log(datas.data);
        setChallengeListData(datas.data);

      })
      .catch(error => {
        console.error('Error fetching chat data:', error);
      });
  };

  useEffect(() => {
    if (value === 0) {
      setChatroomId(1);
    } else {
      setChatroomId(3);
    }
  }, [value]);

  useEffect(() => {
    ChallengeRankList();
  }, [chatroomId]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <ChallengeContainer>
        <div>
          <Typography variant="h5">오늘의 순위</Typography>
          <Typography variant="body1">챌린지 이름</Typography>
        </div>
        <FlexGrowDiv />
        <IconContainer>
          <StyledIcon icon={faAward} size="2x" />
        </IconContainer>
      </ChallengeContainer>
      <ChallengeTableContainer>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="하루에 한 번 물마시기" />
          <Tab label="샐러드 챌린지" />
        </Tabs>
        <br />
        <RankTable data={challengeListData} />
      </ChallengeTableContainer>
    </>);

};

export default ChallengeRank;
