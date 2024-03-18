import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthMeal = () => {
  // 상태 관리를 위한 useState 훅 사용
  const [resultInfo, setResultInfo] = useState({ meals: null });

  const fetchPrediction = async () => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/meal`);
      const data = response.data;
      setResultInfo({ meals: data.meals }); // meals 데이터만 상태에 저장
    } catch (error) {
      console.error('로딩 실패:', error);
      setResultInfo({ meals: null });
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 불러오도록 useEffect 훅 사용
  useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <div style={{ marginLeft: '10px' }}>
      {resultInfo.meals && (
        <>
          <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '10px' }}>
            당뇨/고혈압을 위한 식단
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {resultInfo.meals.map((meal, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '10px',
                borderRadius: '10px',
              }}>
                <a href={meal.URL} target="_blank" rel="noopener noreferrer">
                  <img src={meal.Image && `${import.meta.env.REACT_APP_FLASK_URL}${meal.Image}`} alt={meal.Title}
                       style={{ width: '300px', height: 'auto', borderRadius: '10px' }} />
                </a>
                <p style={{ textAlign: 'center', marginTop: '5px' }}>{meal.Title.replace(' 식단', '')}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HealthMeal;