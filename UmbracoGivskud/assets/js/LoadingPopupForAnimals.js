
var animals = document.getElementsByClassName("map-icon");

function hidePopup () {
        $( "#popup" ).empty();
        $( "#popup" ).css('visibility', 'hidden');
        $ ( ".leaflet-top" ).css('visibility', 'visible');
}

function viewPopup (value)  {
    $( "#" + value ).on( "click", function() {
        var dbPath = "../assets/popup-db/" + value + ".txt";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("popup").innerHTML = this.responseText;
                }
        };
        xhttp.open("GET", dbPath, true);
        xhttp.send();

        $( "#popup" ).css('visibility', 'visible');
        $ ( ".leaflet-top" ).css('visibility', 'hidden');
    });
}

$(document).ready(function() {
    for (i = 0; i < animals.length; i++) {
        var animalID = animals[i].id;
        viewPopup(animalID);
    }
    $(document).bind( "mouseup touchend", function(e){

        var container = $("#popup");
    
        if (!container.is(e.target) && container.has(e.target).length === 0){
    
            hidePopup();
            
        }
    }); 
});

