// Import the functions you need from the SDKs you need

//importScript는 worker파일에서 외부 라이브러리를 불러올 때 사용        
          
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6KWPGG7UN89xYXmSePtVmtxhXXvYDYo0",
  authDomain: "ictproject-9d0ad.firebaseapp.com",
  projectId: "ictproject-9d0ad",
  storageBucket: "ictproject-9d0ad.appspot.com",
  messagingSenderId: "259657088015",
  appId: "1:259657088015:web:64ccb91a32dc9b0df4f77a",
  measurementId: "G-JN8XTLMFCQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//messaging객체 생성
const messaging = firebase.messaging();
//백그라우드로 수신(브라우저를 닫거나 다른 사이트로 이동시)
//테스트시 크롬 닫고 다시 열어야 알림창이 뜬다


messaging.onBackgroundMessage((payload) => 
{  
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {body: payload.notification.body,icon: 'https://postfiles.pstatic.net/MjAyNDAzMTBfOTkg/MDAxNzEwMDY0MDUzMzE4.wgdcQyqtIlfHfh4rg3JvOdLr4gOxPoUSb5qmyKBFNlog.xPfA62occvpnnHTrs2bi-gUL7SFxjkod6zhC7-vKVjIg.PNG/LogoWhite.png?type=w966' };
  return self.registration.showNotification(notificationTitle,notificationOptions);
});


//알림창 클릭시
self.addEventListener('notificationclick', event => {
  console.log(event);
  event.notification.close(); // 알림창 닫기

  // 클라이언트(브라우저 탭)를 열거나 포커스
  event.waitUntil(
    self.clients.matchAll({type: 'window'}).then(clientList => {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ('focus' in client)
          return client.focus();
      }
      if (self.clients.openWindow)
        return self.clients.openWindow('http://localhost:5555');
    })
  );
});
