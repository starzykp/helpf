const firebaseConfig = {
  apiKey: "AIzaSyAEf-z7ZCVZyioUnVzuwZ-xJgjumSIDRao",
  authDomain: "helpfulldriver.firebaseapp.com",
  projectId: "helpfulldriver",
  storageBucket: "helpfulldriver.appspot.com",
  messagingSenderId: "985179028063",
  appId: "1:985179028063:web:2ceff6217979b7f0bfb9ea"
};

firebase.initializeApp(firebaseConfig);


document.getElementById('loginG').addEventListener('click', GoogleLogin)
document.getElementById('loginF').addEventListener('click', FacebookLogin)

var provider1 = new firebase.auth.GoogleAuthProvider()
var provider2 = new firebase.auth.FacebookAuthProvider()
var patt1 = /.+(?=@)/;

const usersRef = firebase.firestore().collection('Users');


function register(){

  var emailr = document.getElementById("email_reg").value;
  var passr = document.getElementById("password_reg").value;
  var passr2 = document.getElementById("password_reg2").value;
  var default_name = emailr.match(patt1);

  if (passr !== passr2) {
    window.alert("Password eror");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(emailr, passr)
  .then((userCredential) => {


      usersRef
      .doc(`${userCredential.user.uid}`)
      .set({

          uid: userCredential.user.uid,
          email: emailr,
          name: default_name[0]
      
      })
      .then(() => {
        window.location.assign('/front/2_main/index.html');
        sessionStorage.setItem('uid', `${userCredential.user.uid}`);
      })

  })
  .catch((error) => {
    var errorMessage = error.message;

    console.log(error.code);
    console.log(error.message);

    window.alert("Error : " + errorMessage);
    // ..
  });
}

function login(){

    var elog = document.getElementById("email_log").value;
    var plog = document.getElementById("password_log").value;

    firebase.auth().signInWithEmailAndPassword(elog, plog)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.assign('/front/2_main/index.html');
    sessionStorage.setItem('uid', `${userCredential.user.uid}`);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    

  });
}

function GoogleLogin(){
    firebase.auth().signInWithPopup(provider1).then((userCredential) => {

      var user = firebase.auth().currentUser;
      var emailg = user.email;
      var default_name = emailg.match(patt1);
      
      usersRef
      .doc(`${userCredential.user.uid}`)
      .set({

          uid: userCredential.user.uid,
          email: emailg,
          name: default_name[0]
      
      })
      .then(() => {
      window.location.assign('/front/2_main/index.html');
      sessionStorage.setItem('uid', `${userCredential.user.uid}`);
      })
  })
    .catch(error => {
      console.error(error);
    })
  }

function FacebookLogin(){
    firebase.auth().signInWithPopup(provider2).then((userCredential) => {

      var user = firebase.auth().currentUser;
      var emailf = user.email;
      var default_name = emailf.match(patt1);
      
      usersRef
      .doc(`${userCredential.user.uid}`)
      .set({

          uid: userCredential.user.uid,
          email: emailf,
          name: default_name[0]
      
      })
      .then(() => {
        window.location.assign('/front/2_main/index.html');
        sessionStorage.setItem('uid', `${userCredential.user.uid}`);
      })

  })
    .catch(error => {
      console.error(error);
    })
  }