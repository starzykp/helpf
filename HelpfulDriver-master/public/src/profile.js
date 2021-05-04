var UID = sessionStorage.getItem('uid');

usersRef.doc(`${UID}`).get()
.then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("nameId").defaultValue = doc.get("name");
        var dl =  doc.get("driving_license")
        if(dl == true){
            document.getElementById("checkLicense").checked = true;
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

function update_profile(){
    var vv_name = document.getElementById("nameId").value;
    var car = document.getElementById("checkLicense");
    var vb_license;

    if (car.checked){
        vb_license = true;
    }else{  
        vb_license = false;
    }

    console.log(vb_license);

    usersRef
    .doc(`${UID}`)
    .update({
        name: vv_name,
        driving_license: vb_license
    })
    .then(() => {
        console.log("User updated!", UID);
        window.location.assign('../2_main/index.html');
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}
