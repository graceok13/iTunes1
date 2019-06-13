var buttonCount = 0;
var buttonArtists = [];
var buttonResults = [];

$(document).ready(function(){

   $("#submit").click(function(){
       $('#displayTable').empty();

       $.ajax({
           url: "http://itunes.apple.com/search?term=" + $("#artistInput").val() + "&limit=" + $("#numResults").val(),
           dataType: "jsonp",
           success: submitPress
       });
    });

    $("body").on("click", "a.reSubmit", function(){
        $('#displayTable').empty();

        $.ajax({
            url: "http://itunes.apple.com/search?term=" + buttonArtists[document.getElementsByClassName('reButton').value] + "&limit=" + buttonResults[document.getElementsByClassName('reButton').value],
            dataType: "jsonp",
            success: buttonPress
        });
    });
});

function buttonPress(data) {
    buildTable(data);
}

function submitPress(data) {
    backToList();
    buildTable(data);
}


function buildTable(data){
    var table = document.getElementById("displayTable");

    console.log(data);

    var cells = "";

    var lim = $("#numResults").val();
    for (var i = 0; i < lim; i++) {
        cells += "<tr>";
        cells += "<td>";

        cells += "<span class='info'><img src='" + data.results[i].artworkUrl100 + "'></span>";
        cells += "<span class='info'> RANK: " + data.results[i].trackNumber + "</span>" ;
        cells += "<span class='info'> SONG: " + data.results[i].trackName + "</span>";
        cells += "<span class='info'> ALBUM: " + data.results[i].collectionName + "</span>";
        cells += "<span class='info'> ARTIST: " + data.results[i].artistName + "</span>";

        cells += "<span class='info'><audio controls='true' src=\" + data.results[i].previewUrl + \" id='audio' type='audio/m4a'></audio></span>";


        cells += "</td>";
        cells += "</tr>";
    }

    table.innerHTML = cells;
    buttonCount++;
}

function backToList(){
    var buttons = document.getElementById("backToButtons");
    buttons.innerHTML += "<a class='reSubmit'><button type='button' value='" + buttonCount + "' class='reButton'>" + $('#artistInput').val() + ' (' + $('#numResults').val()  + ')' + "</button></a>";
    buttonArtists.push($("#artistInput").val());
    buttonResults.push($("#numResults").val());
    console.log(buttonArtists);
}

