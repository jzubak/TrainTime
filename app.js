$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDDdf2wp3PkYivhEkPmPI8_ARkOVQHvdgc",
        authDomain: "trains-e203c.firebaseapp.com",
        databaseURL: "https://trains-e203c.firebaseio.com",
        projectId: "trains-e203c",
        storageBucket: "trains-e203c.appspot.com",
        messagingSenderId: "151513516906"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    
    var name = $("#Train-Name").val();
    var destination = $("#Destination").val();
    var frequency = $("#Frequency").val();
    var first = $("#First-Arrival").val();
    var next = moment().endOf(frequency).fromNow("#Next-Arrival");
    var away = moment().endOf(next).fromNow("#Minutes-Away");
    console.log(name);



    database.ref().on("child_added", function (snapshot) {
        var newtrain = snapshot.val().name;
        var newdestination = snapshot.val().destination;
        var newfreq = snapshot.val().frequency;
        var newnext = snapshot.val().first;

        var trainrow = $("<tr></tr>")
        var tdata1 = $("<td>" + newtrain + "</td>");
        var tdata2 = $("<td>" + newdestination + "</td>");
        var tdata3 = $("<td>" + newfreq + "</td>");
        var tdata4 = $("<td>" + newnext + "</td>");
        var tdata5 = $("<td>" + away + "</td>");

        trainrow.append(tdata1, tdata2, tdata3, tdata4, tdata5);
        $("#tablebody").append(trainrow);


    })

    $("#submit-button").on("click", (event) => {
        event.preventDefault();
        // Create Variables with all the form information
        var trainname = $("#Train-Name").val();
        var traindestination = $("#Destination").val();
        var trainfreq = $("#Frequency").val();
        var trainnext = $("#First-Arrival").val();

        // var nTrain = {
        //     name: trainname,
        //     destination: traindestination,
        //     frequency: trainfreq,
        //     next: trainnext
        // }
        database.ref().push(
            {
                name: trainname,
                destination: traindestination,
                frequency: trainfreq,
                first: trainnext
            }
        );

    });

});

