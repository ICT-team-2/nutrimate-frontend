import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { TextField } from '@mui/material';

const HealthSurvey = ({ onPredictionSubmit }) => {
    //공통
    const [userId] = useAtom(userIdAtom);
    const [age, setAge] = useState('');
    const [glucose, setGlucose] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    //당뇨병
    const [pregnancies, setPregnancies] = useState('1');
    const [skinThickness, setSkinThickness] = useState('1');
    const [insulin, setInsulin] = useState('1');
    const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState('1');
    //고혈압
    const [cp, setCp] = useState('1');
    const [chol, setChol] = useState('');
    const [restecg, setRestecg] = useState('1');
    const [thalach, setThalach] = useState('');
    const [exang, setExang] = useState('1');
    const [oldpeak, setOldpeak] = useState('1');
    const [slope, setSlope] = useState('1');
    const [ca, setCa] = useState('1');
    const [thal, setThal] = useState('1');

    const fetchPrediction = () => {
        const surveyInput = {
            userId,
            age,
            glucose,
            bloodPressure,
            pregnancies,
            skinThickness,
            insulin,
            diabetesPedigreeFunction,
            cp,
            chol,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal,
        };
        
        // 부모 컴포넌트로 surveyInput 객체 전달
        onPredictionSubmit(surveyInput);
    };

    return (
        <div style={{ padding: '30px', marginLeft: '80px', marginRight: '80px', backgroundColor: 'white'}}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>설문조사</p>
           {/* 직접 입력 */}
           <FormLabel component="legend" style={{ marginLeft: '10px' }}>나이를 입력해주세요</FormLabel>
           <TextField label="나이" variant="outlined" value={age} onChange={(e) => setAge(e.target.value)} style={{ marginTop: '10px', marginLeft: '10px' }}/>
           <br/>
           <FormLabel component="legend" style={{ marginTop: '20px', marginLeft: '10px' }}>혈당과 혈압을 입력해주세요</FormLabel>
           <TextField label="혈당" variant="outlined" value={glucose} onChange={(e) => setGlucose(e.target.value)} style={{ marginTop: '10px', marginLeft: '10px' }}/>
           <TextField label="혈압" variant="outlined" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} style={{ marginTop: '10px', marginLeft: '30px' }}/>
            <FormLabel component="legend" style={{ marginTop: '20px', marginLeft: '10px' }}>최근 진단받은 콜레스테롤 수치를 입력해주세요</FormLabel>
            <TextField label="콜레스테롤" variant="outlined" value={chol} onChange={(e) => setChol(e.target.value)} style={{ marginTop: '10px', marginLeft: '10px' }}/>
            <br/>
            <FormLabel component="legend" style={{ marginTop: '20px', marginLeft: '10px' }}>평소 가장 높은 심장박동수를 입력해주세요</FormLabel>
            <TextField label="최대심장박동수" variant="outlined" value={thalach} onChange={(e) => setThalach(e.target.value)} style={{ marginTop: '10px', marginLeft: '10px' }}/>
            <br/>
            {/* 각 항목별 선택지를 라디오 버튼으로 제공 */}
            <FormControl component="fieldset" style={{ marginTop: ' 10px', marginLeft: '10px' }}>
                <FormLabel component="legend">임신 경험이 있나요?</FormLabel>
                <RadioGroup row aria-label="pregnancies" name="row-radio-buttons-group" value={pregnancies} onChange={(e) => setPregnancies(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">당뇨병을 가진 가족이 있나요?</FormLabel>
                <RadioGroup row aria-label="diabetesPedigreeFunction" name="row-radio-buttons-group" value={diabetesPedigreeFunction} onChange={(e) => setDiabetesPedigreeFunction(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">팔 두께가 정상 범위에 해당하나요?</FormLabel>
                <RadioGroup row aria-label="skinThickness" name="row-radio-buttons-group" value={skinThickness} onChange={(e) => setSkinThickness(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">인슐린 수치가 정상 범위에 있는지 확인했나요?</FormLabel>
                <RadioGroup row aria-label="insulin" name="row-radio-buttons-group" value={insulin} onChange={(e) => setInsulin(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">가슴에 통증 또는 불편함을 느낀 적이 있나요?</FormLabel>
                <RadioGroup row aria-label="cp" name="row-radio-buttons-group" value={cp} onChange={(e) => setCp(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">심전도 검사에서 특이 사항을 발견한 적이 있나요?</FormLabel>
                <RadioGroup row aria-label="restecg" name="row-radio-buttons-group" value={restecg} onChange={(e) => setRestecg(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                
                <FormLabel component="legend">운동을 할 때 가슴에 통증을 느낀 적이 있나요?</FormLabel>
                <RadioGroup row aria-label="exang" name="row-radio-buttons-group" value={exang} onChange={(e) => setExang(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">심한 운동 후에 특별히 더 피곤하거나 불편함을 느낀 적이 있나요?</FormLabel>
                <RadioGroup row aria-label="oldpeak" name="row-radio-buttons-group" value={oldpeak} onChange={(e) => setOldpeak(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">운동 후에도 오랫동안 피로하거나 기운이 없는 경우가 많나요?</FormLabel>
                <RadioGroup row aria-label="slope" name="row-radio-buttons-group" value={slope} onChange={(e) => setSlope(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">심장 검사에서 혈관에 문제가 있다고 들은 적이 있나요?</FormLabel>
                <RadioGroup row aria-label="ca" name="row-radio-buttons-group" value={ca} onChange={(e) => setCa(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
                <FormLabel component="legend">혈액과 관련된 특별한 질병을 진단받은 적이 있나요?</FormLabel>
                <RadioGroup row aria-label="thal" name="row-radio-buttons-group" value={thal} onChange={(e) => setThal(e.target.value)}>
                    <FormControlLabel value="1" control={<Radio />} style={{ marginRight: '150px' }} label="예" />
                    <FormControlLabel value="2" control={<Radio />} label="아니요" />
                </RadioGroup>
            </FormControl>
            <br/>
            <Button onClick={fetchPrediction} variant="contained" color="primary" style={{ marginLeft: '10px', marginTop: '10px' }}>제출하기</Button>
        </div>
    );
};

export default HealthSurvey;