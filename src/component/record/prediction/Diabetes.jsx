import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const DiabetesPrediction = ({ surveyInput }) => {
    const [userId] = useAtom(userIdAtom);
    const [resultInfo, setResultInfo] = useState({ prediction: null });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    // surveyInput에서 값을 직접 할당
    const [age, setAge] = useState(surveyInput.age || '');
    const [pregnancies, setPregnancies] = useState(surveyInput.pregnancies || '1');
    const [glucose, setGlucose] = useState(surveyInput.glucose || '');
    const [bloodPressure, setBloodPressure] = useState(surveyInput.bloodPressure || '');
    const [skinThickness, setSkinThickness] = useState(surveyInput.skinThickness || '1');
    const [insulin, setInsulin] = useState(surveyInput.insulin || '1');
    const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState(surveyInput.diabetesPedigreeFunction || '1');

    useEffect(() => {
        // surveyInput 변경 시 자동으로 fetchPrediction 실행
        fetchPrediction();
    }, [surveyInput.age, surveyInput.pregnancies, surveyInput.glucose, surveyInput.bloodPressure, surveyInput.skinThickness, surveyInput.insulin, surveyInput.diabetesPedigreeFunction]);

    const fetchPrediction = async () => {
        setIsLoading(true); // 데이터 요청 전 로딩 상태를 true로 설정
        try {
            const response = await axios.get(`http://localhost:2222/health?userId=${userId}&age=${age}&pregnancies=${pregnancies}&glucose=${glucose}`
                + `&bloodPressure=${bloodPressure}&skinThickness=${skinThickness}&insulin=${insulin}&diabetesPedigreeFunction=${diabetesPedigreeFunction}`);
            const data = response.data; 
            setResultInfo({prediction: data.prediction});
        } catch (error) {
            console.error('예측 실패:', error);
            setResultInfo({prediction: null});
        } finally {
            setIsLoading(false); // 요청 완료 후 로딩 상태를 false로 설정
        }
    };

    if (isLoading) { // 로딩중
        return (
          <div style={{ marginTop: '30px' }}>
            <style>{`
                  .spinner{
                      position: relative;
                      width: 150px;
                      height: 20px;
                    
                      top: 45%;
                      top: -webkit-calc(50% - 10px);
                      top: calc(50% - 10px);
                      left: 25%;
                      left: -webkit-calc(50% - 75px);
                      left: calc(50% - 75px);
                    }
                    
                    .spinner:after{
                      text-align: center;
                      content: "LOADING";
                      color: #134F2C;
                      font-family:  Lato,"Helvetica Neue" ;
                      font-weight: 200;
                      font-size: 16px;
                      position: absolute;
                      width: 100%;
                      height: 20px;
                      line-height: 20px;
                      left: 0;
                      top: 0;
                      background-color: #F8F9FB;
                      z-index: 1;
                    }
                    
                    .spinner:before{
                      content: "";
                      position: absolute;
                      background-color: #134F2C;
                      top: -5px;
                      left: 0px;
                      height: 30px;
                      width: 0px;
                      z-index: 0;
                      opacity: 1;
                      -webkit-transform-origin:  100% 0%;
                          transform-origin:  100% 0% ;
                      -webkit-animation: loader3 10s ease-in-out infinite;
                          animation: loader3 10s ease-in-out infinite;
                    }
                    
                    @-webkit-keyframes loader3{
                        0%{width: 0px;}
                        70%{width: 100%; opacity: 1;}
                        90%{opacity: 0; width: 100%;}
                        100%{opacity: 0;width: 0px;}
                    }
                    
                    @keyframes loader3{
                        0%{width: 0px;}
                        70%{width: 100%; opacity: 1;}
                        90%{opacity: 0; width: 100%;}
                        100%{opacity: 0;width: 0px;}
                    }
              `}</style>
            <div className="spinner"></div>
          </div>
        );
    }

    const renderAlert = () => {
        const prediction = parseFloat(resultInfo.prediction[0]);
        if (prediction <= 30) {
            return (
                <Alert severity="success">
                    <AlertTitle>{`당뇨병 발병 확률은 ${parseFloat(resultInfo.prediction[0]).toFixed(1)}%입니다.`}</AlertTitle>
                    당뇨병 발병 위험이 낮습니다. 현재 생활 습관을 유지하세요.<br/>
                    현재 식단을 유지하며 혈당을 급격하게 높일 수 있는 음식은 피하세요.<br/>
                    당뇨병은 인슐린 부족, 인슐린 저항으로 인해 혈당 조절이 어렵기 때문에 발생해요.<br/>
                    매일 일정한 시간에 알맞은 양의 음식을 규칙적으로 먹고 식이섬유소를 충분히 섭취하세요.<br/>
                    소금 섭취를 줄이고, 단순당의 섭취를 주의하고, 술은 피하는 것이 좋아요.<br/>
                    지방을 적정량 섭취하며 콜레스테롤의 섭취를 제한하세요.
                </Alert>
            );
        } else if (prediction <= 65) {
            return (
                <Alert severity="warning">
                    <AlertTitle>{`당뇨병 발병 확률은 ${parseFloat(resultInfo.prediction[0]).toFixed(1)}%입니다.`}</AlertTitle>
                    당뇨병 발병 위험이 있습니다. 규칙적인 운동과 건강한 식습관을 유지하며, 정기적인 건강 검진을 받으세요.<br/>
                    당뇨병은 우리 몸에서 혈당을 조절하는 호르몬은 인슐린의 생성과 분비가 떨어지거나, 인슐린은 정상적으로 분비되더라도 반응성이 떨어지는 경우 나타나는 질병이에요.<br/>
                    당뇨는 선천적으로 인슐린 기능에 문제가 있는 경우도 있지만, 비만, 나쁜 식습관, 스트레스, 운동부족 등으로 후천적으로 발생하는 '제 2형 당뇨'가 대부분이에요.<br/>
                    만약 당뇨가 진행되기 전인 '당뇨전단계'라면, 관리만 잘해도 당뇨로 진행되지 않고 정상으로 돌아갈 수 있으니 꼭 적절한 식단과 생활습관으로 혈당 관리를 시작해야 해요.<br/>
                    따라서 혈당이 급격히 상승하지 않게 돕는 음식으로 식단을 구성하는 것이 중요해요.<br/>
                    식이섬유가 풍부한 음식을 자주 드시는 것이 좋고, 이런 식품들을 먼저 드셔서 식사 순서를 바꾸는 것만으로도 혈당 개선에 도움이 될 수 있어요.
                </Alert>
            );
        } else {
            return (
                <Alert severity="error">
                    <AlertTitle>{`당뇨병 발병 확률은 ${parseFloat(resultInfo.prediction[0]).toFixed(1)}%입니다.`}</AlertTitle>
                    당뇨병 발병 위험이 높습니다. 전문가와 상담하고 적극적인 관리가 필요합니다.<br/>
                    이미 당뇨가 진행된 상태라면 적절한 치료는 필수입니다.<br/>
                    인슐린 작용을 돕는 영양제, 운동, 혈당 조절과 함께 식단을 잘 선택하는 것이 도움이 될 수 있어요.<br/>
                    혈당을 조절하기 위해서는 당류 섭취를 줄이고, 식이섬유를 충분히 섭취하시는 것이 좋아요.<br/>
                    또 혈당의 변동을 줄이기 위해, 한 끼에 많은 양을 드시는 것보다는 조금씩 나눠서 드시는 게 좋아요.<br/>
                    하루 칼로리 섭취량을 조절해, 적절한 체중을 유지하는 것도 아주 중요해요.
                </Alert>
            );
        }
    };

    return (
        <div>
            <Stack sx={{ width: '100%', marginTop: '30px', marginBottom: '30px', marginRight: '10px', marginLeft: '10px' }} spacing={2}>
                {resultInfo.prediction && renderAlert()}
            </Stack>
        </div>
    );
};

export default DiabetesPrediction;