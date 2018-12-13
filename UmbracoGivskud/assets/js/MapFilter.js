var filterItem = '.header-filter .category';

$(document).ready(function () {
    $('.animals').addClass('active');
});

$(filterItem).click(function() {

    if($(this).find('div').hasClass('active')) {
        // Nothing to see here
    } else {
        $(filterItem).find('div').removeClass('active');
        $(this).find('div').addClass('active');
    }
});