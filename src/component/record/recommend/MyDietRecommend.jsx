import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';
import { Card } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const MyDietRecommend = () => {
  const [diet, setDiet] = useState(null);
  const [userId, setUserId] = useAtom(userIdAtom);

  const dietTypes = {
    'NORMAL': '일반',
    'EXERCISE': '고단백',
    'KITO': '키토',
    'VEGAN': '비건'
  };
 
  useEffect(() => {
    const getDietRecommendation = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await axios.get(`http://localhost:2222/diet?user_id=${userId}`);
        setDiet(response.data);
      } catch (error) {
        console.error('식단 추천을 불러오는데 실패했습니다.', error);
      }
    };

    getDietRecommendation();
  }, []);

  if (!diet) { // 로딩중
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

  return (
    <div style={{ marginLeft: '10px', marginTop: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '40px' }}>
          <img src={diet.image} style={{ width: '700px', height: '600px' }} />
          <Card style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', padding: '10px' }}>
            <p><CircleIcon style={{color:'red',fontSize:'10px',marginRight:'3px'}}/>CARB {diet.food_carbo}g</p>
            <p><CircleIcon style={{color:'green',fontSize:'10px',marginRight:'3px'}}/>PROTEIN {diet.food_protein}g</p>
            <p><CircleIcon style={{color:'orange',fontSize:'10px',marginRight:'3px'}}/>FAT {diet.food_provi}g</p>
          </Card>
        </div>
        <div>
          <Card style={{ marginBottom: '40px', padding: '10px', height: '350px' }}>
            <p style={{ marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>{dietTypes[diet.user_diet]} 식단이 당신에게 맞는군요!</p>
            <p>{diet.summary}</p>
            <p style={{ marginTop: '5px' }}>올바른 식습관과 생활습관을 지속하면 좋은 건강상태를 유지할 수 있다는 장점이 있습니다. 건강한 음식들을 제때 골고루 섭취하는 것은 우리 몸에 필요한 영양소들이 균형을 잘 이룰 수 있도록 돕는 역할을 합니다.  규칙적인 시간에, 한쪽에 치우치지 않고 자연적인 식품을 골고루, 식사하는 것이 올바른 식생활 입니다. 건강한 내일에의 어렵지 않은 해법! 올바른 식생활에서 찾을 수 있습니다.</p>
          </Card>
          <Card style={{ padding: '10px', height: '150px' }}>
            <p style={{ marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>오늘의 추천 식단</p>
            <p>{diet.food_name}</p>
            <p style={{ marginTop: '30px' }}>총 칼로리 {diet.food_cal}kcal</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyDietRecommend;