var filterItem = '.header-filter .category';

$(document).ready(function () {
    $('.animals').addClass('active');

    $('#map').find('.map-icon').hide();
    $('#map').find('.animals').show();
});

$(filterItem).click(function () {

    var category = $(this).find('div').attr('class');

    if($(this).find('div').hasClass('active')) {
        // Nothing to see here
    } else {
        $(filterItem).find('div').removeClass('active');
        $(this).find('div').addClass('active');

        $('#map').find('.map-icon').hide();
        $('#map').find('.' + category).show();
    }
});