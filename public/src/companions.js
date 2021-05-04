var UID = sessionStorage.getItem('uid');

//your trips data from storage
var yt_from = sessionStorage.getItem('from');
var yt_to = sessionStorage.getItem('to');
var yt_when = sessionStorage.getItem('when');
var yt_how = sessionStorage.getItem('how');

var companions_table = document.getElementById("companions_table");
var i = 0;

tripsRef.where("from", "==", `${yt_from}`).where("to", "==", `${yt_to}`)
//.where("when", "==", yt_when)
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((trip) => {
        // doc.data() is never undefined for query doc snapshots       
        var when = trip.get("when").toDate().toLocaleDateString();
        var uid = trip.get("uid");
        if (when == yt_when && uid != UID){           
            usersRef.doc(`${uid}`).get()
            .then((user) => {
                console.log(trip.id, " => ", trip.data());
                console.log(user.id, " => ", user.data());
                var i =+ 1;
                var how = trip.get("how");
                var name = user.get("name");
                var license =  user.get("driving_license") 
                if(license == true){
                    license = "Yes"
                }else{
                    license == "No"
                }

                var row = companions_table.insertRow(i);
                var t_name = row.insertCell(0);
                var t_to = row.insertCell(1);
                var t_license = row.insertCell(2);
                var t_chat = row.insertCell(3).appendChild(document.createElement('a'));
                t_name.innerHTML = name;
                if(how == "by car"){
                    t_to.appendChild(document.createElement('i')).classList.add("fas", "fa-car"); 
                }else{
                    t_to.appendChild(document.createElement('i')).classList.add("fas", "fa-shoe-prints"); 
                }
                t_chat.setAttribute("href", "#");
                t_license.innerHTML = license;
                t_chat.appendChild(document.createElement('i')).classList.add("fas", "fa-comments");         
            });
        }
    });
}).catch((error) => {
    console.log("Error getting document:", error);
});