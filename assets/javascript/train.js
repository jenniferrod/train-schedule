$(document).ready(function () {

    // initialize Firebase
    var config = {
        apiKey: "AIzaSyB-qrxljw2QRS3uhK68117IuH54a2548Dg",
        authDomain: "train-schedule-28870.firebaseapp.com",
        databaseURL: "https://train-schedule-28870.firebaseio.com",
        projectId: "train-schedule-28870",
        storageBucket: "train-schedule-28870.appspot.com",
        messagingSenderId: "806844867088"
    };

    firebase.initializeApp(config);

    // create a variable to reference the database
    var database = firebase.database();

    // capture button click
    $("#add-train").on("click", function () {
        event.preventDefault();

        // variables for user-inputs
        var name = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTime = $("#firstTime").val().trim();
        var freq = $("#freq").val().trim();

        // new train info
        var newTrain = {
            name: name,
            destination: destination,
            firstTime: firstTime,
            freq: parseInt(freq),
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        };

        // uploads train data to the database
        database.ref().push(newTrain);

        // clear inputs
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTime").val("");
        $("#freq").val("");
    });

    // on click child function 
    database.ref().on("child_added", function (childSnapshot) {
    
    // Append info to table 
        $("#trainTable").append(
            "<tr><td>" + childSnapshot.val().name +
            "</td><td>" + childSnapshot.val().destination +
            "</td><td>" + childSnapshot.val().freq+ " mins" +
            "</td>");
         })

    // calulate next train times
        var name = $("#trainName").val().name;
        var destination = $("#destination").val().destination;
        var firstTime = $("#firstTime").val().firstTime;
        var freq = $("#freq").val().freq;
        
        var a = parseInt(freq);
        console.log(a);
        
        // convert first train time 
        var firstTrain = moment(firstTime, "hh:mm");
        console.log("first train time" + firstTrain); 
        // find difference between times
            // timeDiff = moment().diff(firstTrain, "minutes");
        // find time apart
            // tRemainder = timeDiff % freq;
        // find time til next train
            // minsAway = freq - tRemainder
            // nextTrain = moment().add(minsAway, "minutes");
        
}); // document.ready close
