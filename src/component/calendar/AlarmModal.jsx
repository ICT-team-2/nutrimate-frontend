import React, { useState, useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { keyframes, css } from 'styled-components';
import { Button, Input, TextField, FormControlLabel,Checkbox, } from '@mui/material';
import { datePickerAtom } from './atom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 
import Clock from '@mui/icons-material/AccessTime'; 
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import axios from 'axios';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { Message } from '@mui/icons-material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { WEEK_CATEGORY} from '@src/component/calendar/const.js';
import { userIdAtom } from '@src/pages/login/atom.js';
import { useAtom } from 'jotai';

const LoadEffectAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

dayjs.locale('ko');

const ModalBg = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #ffffffe2;
    
    
    
`;


const ModalBox = styled.div`
    position: absolute;
    width: 500px;
    height: 600px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

`;


const ModalCloseBtn = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    color: rgba(0, 0, 0, 0.7);
    background-color: transparent;
    font-size: 20px;
`;

const ModalContent = styled.div`
    position: relative;
    top: 10px;  
    height:70%;
    padding:10px;
    padding-top:20px;
    overflow-y: auto;

`;

const StyledButton = styled(Button)`
    margin-top: 40px;
    width: 100%;
    height: 40px;


`;

const CategoryButtonContainer = styled.div`
    padding-top: 20px;
    margin-top:6px;
    width: 100%;
    background-color: #F8FBFA;
    animation: ${props =>
        props.checked ?
             css`
                  0.7s ease-in-out ${LoadEffectAnimation};
              ` : 'none'
           };
`;

const StyledButtonCate = styled(Button)`
    
    width: auto;
    height: auto;
    margin : 10px;
`;

// Styled-components로 CSS 스타일 정의


const ContainerTitle = styled.h1`
  margin-top: 10px;
  font-size: 24px;
  font-weight: 600;
`;

const InputItem = styled.input`
    width: 150px;
    height: 20px;
    padding: 0 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 5px;
`;

const TimeContainer = styled.div`
   margin-top:10px;
`;

const Tiltle= styled.span`
font-size: 20px;
margin-right: 10px;
flex-grow: 1;
`;


const CloseButton = styled(Button)`
      position: absolute;
      top: 35px;
      right: 15px;
      border: none;
      color: rgba(0, 0, 0, 0.7);
      font-size: 20px;
  
`;


const CustomDatePicker = styled(DatePicker)`
  width: 45%;
    margin-bottom:10px;

`;
const StyledTextField= styled(TextField)`
   width: 100%;
   margin-top:30px;

`;


const DatePickersContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  width: 5px;
  background-color: gray;
  margin: 10px; /* Adjust margin as needed */
`;

const AdditionalContainer = styled.div`
    display: flex;    
    margin-bottom: -15px;
`;



// 스크롤을 비활성화하는 함수
export function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// 스크롤을 다시 활성화하는 함수
export function enableScroll() {
  document.body.style.overflow = 'auto';
}


const ChallengeModal = (props) => {
  const { showChallengeModal, setChallengeModal } = props;
  const [inputValue, setInputValue] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [timeModal, setTimeModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setcontent] = useState('');
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState([]);
  const [userId, setUserId] = useAtom(userIdAtom);

  
 


  
  useEffect(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('firebase-messaging-sw.js')
              .then(registration => {
                  // 서비스 워커 등록 성공
                  console.log('Service Worker registered');
      
                  // 알림 수신 이벤트 핸들러 등록
                  registration.onnotificationclick = event => {
                      // 알림 클릭 이벤트 처리
                      console.log('Notification clicked');
                  };
              })
              .catch(error => {
                  // 서비스 워커 등록 실패
                  console.error('Service Worker registration failed:', error);
              });
      } else {
          console.log('Service Worker not supported');
      }



  }, []);



  const closeModal = () => {
    setChallengeModal(false);
  };

    // DatePicker를 표시하는 함수
    const datePickerOpen = () => {
      setShowDatePicker(true);
    };
  

  const handleModalClick = (e) => {
    // 모달 바깥 영역 클릭 시에는 모달을 닫지 않도록 이벤트 전파 막기
    e.stopPropagation();
  };
  const getDatesBetween= (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;

    while (currentDate.isBefore(endDate)) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}



  const TimeModal = () => {
    setTimeModal(true);
  };
  const AlarmSave = () => {
      const updatedAlarmWeek = [];
      const currentDate = dayjs().startOf('day');
      const startDateTime = dayjs(startDate);
      const endDateTime = dayjs(endDate);
      const currentTime = dayjs().format('HH:mm:ss');
      const selectTime = dayjs(time).format('HH:mm:ss');
      let count = 0;


      if (startDate.length === 0) {
          count++;
          window.alert('처음날짜를 선택해주세요.');
      }
      if (endDate.length === 0) {
          count++;
          window.alert('마지막 날짜를 선택해주세요.');
      }
      if (time.length === 0) {
          count++;
          window.alert('시간을 선택해주세요.');
      }

      if (count === 0) {
          if (startDateTime.isBefore(currentDate)) {
              window.alert('선택할 수 날짜입니다.');
          } else if (startDateTime.isAfter(endDateTime)) {
              window.alert('처음 날짜 이후의 날짜을 선택해주세요.');
          } else if (startDateTime.isSame(currentDate, 'day') && currentTime > selectTime) {
              window.alert('선택할 수 없는 시간입니다.');
          } else {
            const datesBetween = getDatesBetween(startDate, endDate+1);

            if(!checked){
                datesBetween.forEach(date => {
                  const dateTimeForDB =  date + 'T' + selectTime;
                  Alarm(dateTimeForDB,title,content)
                  updatedAlarmWeek.push(date+'T'+selectTime);
                });

                AlarmSaveData(updatedAlarmWeek);
             }else{
                  datesBetween.forEach(date => {
                    const dayOfWeek = (new Date(date)).getDay();
                    const weekdaysList = ['일', '월', '화', '수', '목', '금', '토'];
                    category.forEach(week =>{          
                      if(weekdaysList[dayOfWeek] === week){
                        console.log(date);
                        //Alarm(date+'T'+selectTime,title,content)
                        updatedAlarmWeek.push(date+'T'+selectTime);
                      }

                    })
                  }); 
                  
                  AlarmSaveData(updatedAlarmWeek);
             }
             
              
          }
      }

  

   







};
  
  // 이벤트 핸들러 등록은 컴포넌트 바깥에서 수행되어야 합니다.
  
  
  const showNotification = (data) => {
    const notification = new Notification(data.title, {
        body: data.body
    });

    notification.onclick = () => {
        // 알람을 클릭했을 때 수행할 동작 정의
        console.log('알람이 클릭되었습니다.');
        window.location.href = 'http://localhost:5555';
        // 원하는 동작을 여기에 추가
    };
}

const AlarmSaveData = (updatedAlarmWeek) =>{
  console.log('sdf',updatedAlarmWeek)
  axios.post('http://localhost:9999/alarm/list', {
                  'updatedAlarmWeek': updatedAlarmWeek,
                  'alarmCategory': title,
                  'userId':userId
              })
              .then(response => {
                  // 응답 데이터 처리
                  console.log(response);
                  
              })
              .catch(error => {
                  console.error('Error fetching chat data:', error);
              });
}


const Alarm = (dateTimeForDB,title,content) => {
   console.log(dateTimeForDB)
  axios.post('http://localhost:2222/serviceworker', {
                  'alarm_time': dateTimeForDB,
                  'title': title,
                  'body': content,
                  'image_url': ''
              })
              .then(response => {
                  // 응답 데이터 처리
                  console.log(response);
                  // 복제 가능한 형태로 데이터 변환
                  const data = JSON.parse(response.config.data);
                  
                  if (Notification.permission === "granted") {
                      // 이미 푸시 알람 권한이 허용되어 있는 경우
                      showNotification(data);
                  } else if (Notification.permission !== "denied") {
                      // 푸시 알람 권한 요청
                      Notification.requestPermission().then(permission => {
                          if (permission === "granted") {
                              showNotification(data);
                          }
                      });
                  }
              })
              .catch(error => {
                  console.error('Error fetching chat data:', error);
              });
}



const handleCategoryClick = (value) => {
  // 이미 선택된 카테고리인지 확인
  const isAlreadySelected = category.includes(value);
  
  // 이미 선택된 카테고리면 제거, 아니면 추가
  if (isAlreadySelected) {
    setCategory(category.filter((category) => category !== value));
  } else {
    setCategory([...category, value]);
  }

  console.log(category);
};


  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    disableScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, [showChallengeModal]);



  return (
    <ModalBg>
      <ModalBox onClick={handleModalClick}>
      <ContainerTitle>알람설정</ContainerTitle>
      <ModalCloseBtn onClick={closeModal}>
              ✖
      </ModalCloseBtn>
            <ModalContent>
                  <Input
                      type="text"
                      size="small"
                      placeholder="제목"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)
                      } 

                      style={{ marginBottom:'20px',width: '380px' }}
                      
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePickersContainer>
                          <CustomDatePicker 
                              className="custom-datepicker"
                              label="처음날짜를 선택해주세요."
                              selected={startDate}
                              onChange={(date) => {
                                setStartDate(date);
                              }} 
                              showYearDropdown 
                              scrollableYearDropdown
                              select={startDate}
                          />
                          <Divider />
                          
                         <CustomDatePicker 
                              className="custom-datepicker"
                              label="마지막날짜를 선택해주세요."
                              selected={endDate}
                              onChange={(date) => {
                                setEndDate(date);
                              }} 
                              showYearDropdown 
                              scrollableYearDropdown

                          />
                      </DatePickersContainer>
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['TimePicker']} >
                            <TimePicker
                              label="시간을 선택해주세요."
                              viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                              }}
                              onChange={(time) => {
                                setTime(time);
                              }} 
                              
                            />
                          </DemoContainer>
                    </LocalizationProvider>
                    <AdditionalContainer>
                    <FormControlLabel
                          label="알람주기"
                          control={<Checkbox
                              checked={checked}
                              onChange={() => {
                                setChecked(!checked);
                              }}
                          />}
                          
                      />
                        <FlexGrowDiv />
                    </AdditionalContainer>
                    {checked && 
                        <CategoryButtonContainer checked={checked}>
                            {Object.values(WEEK_CATEGORY).map((value) => {
                                return (
                                    <StyledButtonCate
                                        variant={category.includes(value) ? 'contained' : 'outlined'}
                                        onClick={() => handleCategoryClick(value)}
                                        key={value}
                                    >
                                        {value}
                                    </StyledButtonCate>
                                );
                            })}
                        </CategoryButtonContainer>
                    }

                      <StyledTextField
                              size="small"
                              label="알람내용을 입력해주세요."
                              multiline
                              value={content}
                              onChange={(event) => setcontent(event.target.value)}

                            />

                  
            </ModalContent>
            <StyledButton variant="contained" onClick={AlarmSave}>
                확인
            </StyledButton>

      </ModalBox>
    </ModalBg>


  );
};

export default ChallengeModal;
