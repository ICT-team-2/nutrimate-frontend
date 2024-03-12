import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { genderAtom } from '@src/component/setting/atom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const HighBloodPressurePrediction = ({ surveyInput }) => {
    const [gender] = useAtom(genderAtom);
    const [hypertensionResult, setHypertensionResult] = useState({ prediction: null });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    // 나머지 상태값들
    const [age] = useState(surveyInput.age || '');
    const [bloodPressure] = useState(surveyInput.bloodPressure || '');
    const [glucose] = useState(surveyInput.glucose || '');
    const [cp] = useState(surveyInput.cp || '1');
    const [chol] = useState(surveyInput.chol || '1');
    const [restecg] = useState(surveyInput.restecg || '1');
    const [thalach] = useState(surveyInput.thalach || '');
    const [exang] = useState(surveyInput.exang || '1');
    const [oldpeak] = useState(surveyInput.oldpeak || '1');
    const [slope] = useState(surveyInput.slope || '1');
    const [ca] = useState(surveyInput.ca || '1');
    const [thal] = useState(surveyInput.thal || '1');
    
    useEffect(() => {
        fetchPrediction();
    }, [surveyInput.age, 
        surveyInput.glucose, 
        surveyInput.bloodPressure,
        surveyInput.cp,
        surveyInput.chol,
        surveyInput.restecg,
        surveyInput.thalach,
        surveyInput.exang,
        surveyInput.oldpeak,
        surveyInput.slope,
        surveyInput.ca,
        surveyInput.thal
    ]);

    console.log('hypertensionResult', hypertensionResult);

    const fetchPrediction = async () => {
        setIsLoading(true);


        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            // gender 값에 따라 0 또는 1로 변환
            const genderValue = gender === 'M' ? 0 : 1;
            const glucoseValue = glucose > 120 ? 1 : 0;
            const cpValue = cp === 2 ? 0 : 2;
            const thalValue = thal === 2 ? 1 : 3;
            
            const response = await axios.get(
                `http://localhost:2222/hypertension?sex=${genderValue}&age=${age}&fbs=${glucoseValue}&trestbps=${bloodPressure}`
                + `&cp=${cpValue}&chol=${chol}&restecg=${restecg}&thalach=${thalach}&exang=${exang}&oldpeak=${oldpeak}&slope=${slope}&ca=${ca}&thal=${thalValue}`
            );
            const { no_hypertension_proba, hypertension_proba } = response.data;
            setHypertensionResult({prediction: {"no_hypertension_proba": no_hypertension_proba, "hypertension_proba": hypertension_proba}});
        } catch (error) {
            console.error('예측 실패:', error);
            setHypertensionResult({prediction: null});
        } finally {
            setIsLoading(false);
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
        if (hypertensionResult.prediction) {
            const prediction = hypertensionResult.prediction.hypertension_proba;
            if (prediction <= 30) {
                return (
                    <Alert severity="success">
                        <AlertTitle>{`고혈압 발병 확률은 ${prediction.toFixed(1)}%입니다.`}</AlertTitle>
                        고혈압 발병 위험이 낮습니다. 현재 생활 습관을 유지하세요. 
                        <br/>당신이 지금까지 해온 건강한 생활 습관이 훌륭한 결과를 가져온 것입니다. 균형 잡힌 식습관, 꾸준한 운동, 충분한 수면, 그리고 스트레스 관리는 계속해서 중요합니다. 
                        식습관 면에서는, 신선한 과일과 채소를 많이 섭취하고, 전곡류와 저지방 단백질을 꾸준히 먹는 것이 좋아요. 소금과 설탕 섭취는 계속해서 적게 유지하고, 가공식품과 패스트푸드는 가급적 피하세요.
                        운동은 주 150분의 중등도 신체 활동 또는 75분의 고강도 신체 활동, 또는 이 둘의 조합을 목표로 하세요. 스트레칭이나 요가 같은 활동을 통해 유연성도 증진시키고, 
                        마음의 안정을 찾는 시간도 가지는 것이 좋습니다. 수면은 매일 밤 최소 7-9시간을 목표로 하고, 규칙적인 수면 습관을 유지하는 것이 중요해요.
                        스트레스는 고혈압에 큰 영향을 줄 수 있으므로, 스트레스를 관리하는 방법을 찾고, 긍정적인 사고방식을 유지하는 것도 중요합니다. 
                        친구나 가족과 시간을 보내고, 취미 활동에 참여하며, 필요하다면 전문가와의 상담을 통해 정서적 지원을 받는 것도 좋아요.
                        현재의 건강한 생활 습관을 유지하면서, 끊임없이 자신을 돌보고, 건강 상태를 주기적으로 체크하는 것이 중요합니다. 당신의 건강한 라이프스타일이 앞으로도 계속해서 당신을 지켜줄 것입니다.
                    </Alert>
                );
            } else if (prediction <= 65) {
                return (
                    <Alert severity="warning">
                        <AlertTitle>{`고혈압 발병 확률은 ${prediction.toFixed(1)}%입니다.`}</AlertTitle>
                        고혈압 발병 위험이 있습니다. 규칙적인 운동과 건강한 식습관을 유지하며, 정기적인 건강 검진을 받으세요. 
                        <br/>건강에 더 많은 관심을 기울일 수 있는 기회로 삼을 수 있습니다. 지금은 생활 습관의 변화와 관리를 통해 크게 개선될 수 있는 상태입니다. 
                        영양가 있는 식사, 규칙적인 운동, 스트레스 관리, 충분한 수면 등 건강한 생활 습관을 유지하는 것이 중요합니다.
                        또한, 정기적인 건강 검진과 전문가의 조언을 구하는 것도 중요합니다. 의사나 건강 전문가에게 직접 도움을 받는 것도 좋은 방법입니다. 
                        혹시 이미 고혈압이나 다른 건강 문제가 있다면, 의사의 지시에 따라 약물 치료를 병행하는 것도 고려해야 할 수 있습니다.
                        중요한 것은, 지금부터라도 건강한 생활 습관을 통해 고혈압의 위험을 줄이고, 더 건강한 삶을 위해 노력하는 것입니다. 
                        자신의 건강을 챙기는 일이 결코 쉽지 않다는 것을 알고 있지만, 여러분이 할 수 있습니다. 지금 이 순간부터 고혈압 예방을 위해 노력하세요.
                        
                    </Alert>
                );
            } else {
                return (
                    <Alert severity="error">
                        <AlertTitle>{`고혈압 발병 확률은 ${prediction.toFixed(1)}%입니다.`}</AlertTitle>
                        고혈압 발병 위험이 높습니다. 전문가와 상담하고 적극적인 관리가 필요합니다.
                        <br/>고혈압 발병 위험이 높습니다. 전문가와 상담하고 적극적인 관리가 필요합니다. 
                        이제부터 시작하는 건강한 식습관이 당신의 삶에 큰 변화를 가져올 수 있어요. 일상에서 소금 섭취를 줄이고, 가공식품과 패스트푸드는 가능한 피하도록 해보세요. 
                        신선한 과일과 채소를 충분히 섭취하고, 전곡류, 견과류와 같은 심장에 좋은 음식을 식단에 포함시키는 것이 중요합니다. 
                        또한, 규칙적인 식사 시간을 지키고, 과식을 피하는 것도 고혈압 관리에 도움이 됩니다. 
                        이 모든 변화가 처음에는 어렵게 느껴질 수 있지만, 건강을 위한 작은 선택이 모여 큰 결과를 만들어낼 수 있습니다. 
                        당신의 건강을 위한 노력이 결국 더 행복하고 활기찬 삶으로 이끌 것입니다. 적극적인 관리를 위해 노력하세요.
                    </Alert>
                );
            }
        }
    };

    return (
        <div>
            { (
                <Stack sx={{ width: '100%', marginTop: '30px', marginBottom : '30px', marginRight: '10px', marginLeft: '10px' }} spacing={2}>
                    {hypertensionResult.prediction && renderAlert()}
                </Stack>
            )}
        </div>
    );    
};

export default HighBloodPressurePrediction;