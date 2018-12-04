//Adding tooltip to the DOM. One for each animal avalaible.
var animals = document.getElementsByClassName("map-icon");
var accent = "#E7873C";
var blue = "#7DA7D6";

for (i = 0; i < animals.length; i++) {
    var animalID = animals[i].id;
    var animalTitle = animals[i].title;

    var tooltip = document.createElement("span");
    tooltip.setAttribute('class', 'tooltiptext');
    var text = document.createTextNode(animalTitle);

    tooltip.appendChild(text);

    document.getElementById(animalID).appendChild(tooltip);
}
//Creating the functions to view and hide the tooltips

function viewTooltip (value){
    $( "#" + value ).on( "taphold", function() {
        $( "#" + value + " .tooltiptext" ).css('visibility', 'visible');
        $( "#" + value + " .icon-background" ).css('background-color', accent);
    });
};

function hideTooltip (value){
    $( "#" + value ).on( "mouseup", function() {
        $( "#" + value + " .tooltiptext" ).css('visibility', 'hidden');
        $( "#" + value + " .icon-background" ).css('background-color', blue);
    });
    $( "#" + value ).on( "touchend", function() {
        $( "#" + value + " .tooltiptext" ).css('visibility', 'hidden');
        $( "#" + value + " .icon-background" ).css('background-color', blue);
    });
};

//Instansiating the tooltip functionality for every animal.

for (i = 0; i < animals.length; i++) {
    var animalID = animals[i].id;
    viewTooltip(animalID);
    hideTooltip(animalID);
}