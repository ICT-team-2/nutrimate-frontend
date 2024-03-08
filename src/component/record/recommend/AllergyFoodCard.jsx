import React from 'react';
import Chip from '@mui/material/Chip';
import { Card } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const AllergyFoodCard = ({ diets, userAllergy  }) => {
    
    if (diets.error) {
        return <div>에러 발생: {diets.error}</div>;
    }

    if (!Array.isArray(diets)) { // 로딩중
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
        <div style={{ marginTop: '10px', marginLeft: '10px', display: 'flex', flexDirection: 'row' }}>           
            <div style={{flexGrow: 1}}>
                {diets.map((diet, index) => (
                    <Card key={index} style={{ marginTop: '10px', marginBottom: '10px', padding: '10px', width: '800px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '20px', marginTop: '10px'  }}>
                                <img src={diet.이미지} alt={diet.음식이름} />
                                <div>                      
                                    <p style={{fontSize: '20px', textAlign: 'center'}}>{Math.floor(diet.칼로리)}kcal</p>
                                </div>
                            </div>
                            <div>
                                <p style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>{diet.음식이름}</p>
                                <p style={{marginBottom: '10px'}}>
                                    음식 관련 정보 
                                    <br />
                                    {diet.건강관련정보?.join(', ')}
                                </p> 
                                <p>
                                영양소 정보
                                <br />  
                                {Object.entries(diet.영양소정보)
                                    .filter(([key]) => ['PROCNT', 'FAT', 'CHOCDF'].includes(key))
                                    .map(([key, value]) => {
                                        let color;
                                        let name;
                                        switch (key) {
                                            case 'PROCNT':
                                                color = 'green';
                                                name = '단백질';
                                                break;
                                            case 'FAT':
                                                color = 'orange';
                                                name = '지방';
                                                break;
                                            case 'CHOCDF':
                                                color = 'red';
                                                name = '탄수화물';
                                                break;
                                            default:
                                                color = 'black';
                                                break;
                                        }
                                        return (
                                            <span key={key}>
                                                <CircleIcon style={{color: color, fontSize: '10px', marginRight: '3px'}} />
                                                {`${name} ${Math.floor(value.quantity)}${value.unit} `}
                                                <br />
                                            </span>
                                        )
                                    })
                                }
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <Card style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px', padding: '10px', width: '500px', background: '#F6F6F6' }}>
                <p style={{textAlign: 'center', marginBottom: '10px'}}>나의 알레르기</p>
                {userAllergy?.split(',').map((allergy, index) => (
                    <Chip key={index} label={allergy.trim()} style={{background: "#B5C4A4",color:"white", marginRight: '10px', marginBottom: '5px'}} />
                ))}
            </Card>  
        </div>
        );
    };

    export default AllergyFoodCard;