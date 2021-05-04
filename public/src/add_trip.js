var UID = sessionStorage.getItem('uid');

//dane from when i to trzeba bedzie przekazać do sessionStorage - żeby użyc w zapytaniu o companów
  function add_trip_and_search(){

    var vv_from = document.getElementById("fromId").value;
    var vv_destination = document.getElementById("destinationId").value;
    var vd_when = firebase.firestore.Timestamp.fromDate(new Date(document.getElementById("dateId").value));
    var by_car = document.getElementById("inlineRadio1");
    var vv_how;

    if (by_car.checked){
        vv_how = 'by car';
    }else{  
        vv_how = 'on foot';
    }
    tripsRef
    .add({
        uid: UID,
        from: vv_from,
        to: vv_destination,
        when: vd_when,
        how: vv_how,
    
    })
    .then((docRef) => {
        //console.log(vd_when.toDate().toLocaleDateString());
        console.log("Trip successfully added!", docRef.id);

        sessionStorage.setItem('from', `${vv_from}`);
        sessionStorage.setItem('to', `${vv_destination}`);
        sessionStorage.setItem('when', `${vd_when.toDate().toLocaleDateString()}`);
        sessionStorage.setItem('how', `${vv_how}`);

        window.location.assign('../4_companions/index.html');
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error adding document: ", error);
    });
  }

  function add_trip_and_go_home(){

    var vv_from = document.getElementById("fromId").value;
    var vv_destination = document.getElementById("destinationId").value;
    var vd_when = document.getElementById("dateId").value;
    var by_car = document.getElementById("inlineRadio1");
    var vv_how;

    if (by_car.checked){
        vv_how = 'by car';
    }else{  
        vv_how = 'on foot';
    }
    tripsRef
    .add({
        uid: UID,
        from: vv_from,
        to: vv_destination,
        when: firebase.firestore.Timestamp.fromDate(new Date(vd_when)),
        how: vv_how,
    
    })
    .then((docRef) => {
        console.log(UID);
        console.log("Trip successfully added!", docRef.id);

        window.location.assign('../2_main/index.html');
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error adding document: ", error);
    });
  }