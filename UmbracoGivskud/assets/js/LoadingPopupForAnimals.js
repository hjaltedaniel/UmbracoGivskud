function hidePopup () {
        $( "#popup" ).empty();
        $( "#popup" ).css('visibility', 'hidden');
        $ ( ".leaflet-top" ).css('visibility', 'visible');
}

function viewPopup(id) {
    $("#" + id).on("click", function () {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                document.getElementById("popup").innerHTML = GeneratePopupContent(myObj.Title, myObj.ImgSrc, myObj.ContentText, myObj.VideoLink);
            }
        };
        xmlhttp.open("GET", "/umbraco/api/map/get/" + id, true);
        xmlhttp.send();

        $("#popup").css('visibility', 'visible');
        $(".leaflet-top").css('visibility', 'hidden');
    })
}

function GeneratePopupContent(title, imgSrc, contentText, video) {
    var baseString = '<div class="container"> <div class="flex-row"> <h2 class="center">' + title + '</h2> <div onclick="hidePopup()" id="close" class="close"></div> </div> <img src="' + imgSrc + '" class="popup-img" alt="' + title + '">' + contentText;
    var buttons = '<div class="buttons"> <a href="#" class="btn">Navigate</a> <a href="#" class="btn">Report</a> </div></div>'

    if (video != null) {
        var YoutubeID = video.split('=').pop();
        baseString += '<div class="video"><iframe width="270" height="152" src="https://www.youtube.com/embed/' + YoutubeID + '?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    }

    var htmlString = baseString += buttons;

    return htmlString;
}

$(document).ready(function() {
    $(document).bind( "mouseup touchend", function(e){

        var container = $("#popup");
    
        if (!container.is(e.target) && container.has(e.target).length === 0){
    
            hidePopup();
            
        }
    }); 
});

