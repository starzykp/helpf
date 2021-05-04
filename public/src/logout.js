const firebaseConfig = {
    apiKey: "AIzaSyAEf-z7ZCVZyioUnVzuwZ-xJgjumSIDRao",
    authDomain: "helpfulldriver.firebaseapp.com",
    projectId: "helpfulldriver",
    storageBucket: "helpfulldriver.appspot.com",
    messagingSenderId: "985179028063",
    appId: "1:985179028063:web:2ceff6217979b7f0bfb9ea"
  };
  
  firebase.initializeApp(firebaseConfig);

  const usersRef = firebase.firestore().collection('Users');
  const tripsRef = firebase.firestore().collection('Trips');

  function logOut(){
    
    firebase.auth().signOut().then(() => {
      window.location.assign('../../index.html');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}