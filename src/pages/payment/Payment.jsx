// import { Bootpay } from '@bootpay/client-js'



// <button size="medium" text="결제하기" onClick={payHandler}>버튼</button> 


// //결제요청예제 코드 추가하기 
// const payHandler = async () => {    //await과 함께 사용하는 함수
// const response = await Bootpay.requestPayment({
//   "application_id":process.env.REACT_APP_PAY_APPLICATION_ID ,  
//   //최초회원가입한 사람 연동키 암호화
//   "price": 1000,
//   "order_name": "테스트결제",
//   "order_id": "TEST_ORDER_ID",
//   "pg": "카카오페이",       //밑의 그림과 같이 변경해야 함
//   "method": "간편",      //밑의 그림과 같이 변경해야 함
//   "user": {
//     "id": "회원아이디",
//     "username": "회원이름",
//     "phone": "01000000000",
//     "email": "test@test.com"
//     },
//     "items": [
//     {
//     "id": "item_id",
//     "name": "테스트아이템",
//     "qty": 1,
//     "price": 1000
//     }
//     ],
//     "extra": {
//     "open_type": "iframe",
//     "card_quota": "0,2,3",
//     "escrow": false
//     }
//     })}