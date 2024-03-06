import React, { useState } from 'react';
import axios from 'axios';
import { Bootpay } from '@bootpay/client-js';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import { Button } from '@mui/material';

const PaymentComponent = ({ pay = null, onPayment  }) => {
    const [userId, setUserId] = useAtom(userIdAtom);
    const [isPaid, setIsPaid] = useState(false);

    const payHandler = async () => {
        let response; 
        try {
            response = await Bootpay.requestPayment({
                "application_id":"65c22b2100be04001c1f28e3",
                "price": "100",
                "order_name": "NutriMate 개인 맞춤형 식단",
                "order_id": "TEST_ORDER_ID",
                "tax_free": 0,
                
                "user": {
                    "id": userId,
                    // "username": "김유진",
                    // "phone": "01072957204",
                    // "email": "uujean12@gmail.com"
                },
                "items": [
                    {
                    "id": "item_id",
                    "name": "식단 구독료",
                    "qty": 1,
                    "price": 100,
                    }
                ],
                "extra": {
                    "open_type": "iframe",
                    "card_quota": "0,2,3",
                    "escrow": false,
                },
            });
            paycheck(response);
        } catch (error) {
            console.log(error.message); 
        }
    }

    // 테스트용
    // const payHandler = async () => {
    //     onPayment(); // 결제를 가정하고 isPaid 상태를 true로 변경
    //     alert('결제가 완료되었습니다.');
    // }

    const paycheck = (response) => {
        console.log(response);
        const status_locale = response.data.status_locale;
        const pay_name = response.data.order_name;
        const pay_price = response.data.price;
        //const pay_date = response.data.date;
        const pay_method = response.data.pg;
        if (status_locale === '결제완료') {
            alert('결제가 완료되었습니다.');
            payListInsert(userId, 1, pay_name, pay_price, pay_method);
            setIsPaid(true); // 결제가 완료되면 isPaid 상태를 true로 변경
        } else {
            alert('결제에 실패하였습니다.');
        }
    }

    const payListInsert = async (id, pay_type, pay_name, pay_price, pay_method) => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('pay_type', pay_type)
        formData.append('pay_name', pay_name)
        formData.append('pay_price', pay_price)
        formData.append('pay_method', pay_method)

        await axios.post('/payment/insert', formData, { 
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
            console.log('성공')
            console.log(response.data)        
        }).catch(error => {
            console.log('실패')
        })    
    }

    return (
        <Button onClick={payHandler} variant="contained" color="primary" style={{ width: '360px' }}>결제하기</Button>
    );
};

export default PaymentComponent;