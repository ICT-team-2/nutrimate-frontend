import React, { useState, useEffect } from 'react';
import { Card, Typography, Box } from '@mui/material';
import Image from './foodtray.jpg';  
import PaymentComponent from './PaymentButton';
import MyDietRecommend from './MyDietRecommend'; 

function MyDietPayment() {
  const [isPaid, setIsPaid] = useState(false);

  // const handlePayment = () => {
  //     setIsPaid(true);
  // }

  useEffect(() => {
    const paymentStatus = localStorage.getItem('isPaid');
    if (paymentStatus) {
      setIsPaid(JSON.parse(paymentStatus)); // isPaid 상태를 로컬 스토리지에 저장
    }
  }, []);

  const handlePayment = () => {
    setIsPaid(true);
    localStorage.setItem('isPaid', 'true'); // 결제 완료 상태를 로컬 스토리지에 저장
  }

  if(isPaid) {
    return <MyDietRecommend />;
  }

  return (
    <Card style={{ marginTop: '30px', marginLeft: '10px', padding: '10px', height: '500px' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ width: '40%' }}>
          <Typography variant="h6" gutterBottom style={{ marginTop: '40px', textAlign: 'center', fontFamily: 'NanumMyeongjo' }}>
            나만의 식단 구독하기
          </Typography>
          <Card style={{ margin: '10px', padding: '10px', backgroundColor: '#DCE9DE', height: '350px', borderRadius: '20px' }}>
            <br/>
            <Typography variant="body2" gutterBottom style={{ fontSize: '13px', fontFamily: 'NanumGothic', marginLeft: '5px' }}>
              NUTRIMATE는 사용자들 개인에 맞춰 원하는 식단을 지원합니다.
              <br/><br/>
              저희 NUTRIMATE를 이용해 주셔서 감사합니다.
              <br/>
              서비스를 구독하시기 전에 몇 가지 안내 말씀 드리겠습니다.
              <br/><br/>
              우리는 고객들의 건강과 웰빙을 최우선으로 생각하며, 맞춤형 식단을 통해 최상의 서비스를 제공하기 위해 노력하고 있습니다.
              구독 서비스를 통해 고객들은 저희가 설계한 맞춤형 식단을 받을 수 있습니다. 
              또한 식단의 영양 정보들을 알 수 있을 뿐더러 영양 상담 등 다양한 부가 서비스도 누릴 수 있습니다.
              <br/><br/>
              맞춤형 식단으로 건강에 한 발자국 다가가세요.
            </Typography>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PaymentComponent onPayment={handlePayment} />
            </div>
          </Card>
        </Box>
        <img src={Image} alt="식판" style={{ width: '600px', height: '450px', marginTop: '15px', marginRight: '10px', borderRadius: '20px' }} />
      </Box>
    </Card>
  );
}

export default MyDietPayment;