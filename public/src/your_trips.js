var UID = sessionStorage.getItem('uid');
var your_trips_table = document.getElementById("your_trips_table");
var i = 0;

tripsRef.where("uid", "==", `${UID}`).orderBy("when").limit(3)
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        var i =+ 1;
        var from = doc.get("from");
        var to = doc.get("to");
        var when = doc.get("when").toDate().toLocaleDateString();
        //var how = doc.get("how");
        var row = your_trips_table.insertRow(i);
        var t_from = row.insertCell(0);
        var t_to = row.insertCell(1);
        var t_when = row.insertCell(2);
        t_from.innerHTML = from;
        t_to.innerHTML = to;
        t_when.innerHTML = when;
    });
}).catch((error) => {
    console.log("Error getting document:", error);
});
