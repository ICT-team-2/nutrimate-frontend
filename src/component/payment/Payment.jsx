import React, { useState } from 'react';
import axios from 'axios';
import { Bootpay } from '@bootpay/client-js';

const PaymentComponent = ({ pay = null }) => {
    const payHandler = async () => {
        let response; 
        try {
            response = await Bootpay.requestPayment({
                "application_id":"회원 가입하고 받은 키",
                "price": pay,
                "order_name": "NutriMate 개인 맞춤형 식단",
                "order_id": "TEST_ORDER_ID",
                "tax_free": 0,
                "user": {
                    "id": "uujean",
                    "username": "김유진",
                    "phone": "01000000000",
                    "email": "test@test.com"
                },
                "items": [
                    {
                    "id": "item_id",
                    "name": "챌린지 참여비",
                    "qty": 1,
                    "price": pay
                    }
                ],
                "extra": {
                    "open_type": "iframe",
                    "card_quota": "0,2,3",
                    "escrow": false
                },
            });
            paycheck(response);
        } catch (error) {
            console.log(error.message); 
        }
    }

    const paycheck = (response) => {
        console.log(response);
        const status_locale = response.data.status_locale;
        const pay_name = response.data.order_name;
        const pay_price = response.data.price;
        const pay_date = response.data.purchased_at;
        const pay_method = response.data.pg;
        if (status_locale === '결제완료') {
            alert('결제가 완료되었습니다.');
            payListInsert('OSH', 1, pay_name, pay_price, pay_method);
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

        await axios.post('http://localhost:4000/Payment/Write.do', formData, { 
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
        <button onClick={payHandler}>결제</button>
    );
};

export default PaymentComponent;
