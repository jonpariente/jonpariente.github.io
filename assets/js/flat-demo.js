function setOptions(option) {
  var $iframe = $('iframe');
  var $content = $iframe.contents();
  var $navbar = $content.find('.navbar');

  switch(option) {
    case 'simple':
      $iframe.attr('src', 'simple.html');
      break;
    case 'mixed':
      $iframe.attr('src', 'mixed.html');
      break;
    case 'iconic':
      $iframe.attr('src', 'iconic.html');
      break;
    case 'top':
      $navbar.removeClass('navbar-static-top navbar-static-bottom navbar-fixed-bottom navbar-fixed-left navbar-fixed-right').addClass('navbar-fixed-top');
      break;
    case 'bottom':
      $navbar.removeClass('navbar-static-top navbar-static-bottom navbar-fixed-top navbar-fixed-left navbar-fixed-right').addClass('navbar-fixed-bottom');
      break;
    case 'left':
      $navbar.removeClass('navbar-static-top navbar-static-bottom navbar-fixed-top navbar-fixed-bottom navbar-fixed-right').addClass('navbar-fixed-left');
      break;
    case 'right':
      $navbar.removeClass('navbar-static-top navbar-static-bottom navbar-fixed-top navbar-fixed-bottom navbar-fixed-left').addClass('navbar-fixed-right');
      break;
    case 'navbar':
      $navbar.removeClass('navbar-offcanvas');
      break;
    case 'off canvas':
      $navbar.addClass('navbar-offcanvas');
      break;
    case 'default':
      $navbar.removeClass('navbar-inverse').addClass('navbar-default');
      break;
    case 'inverse':
      $navbar.removeClass('navbar-default').addClass('navbar-inverse');
      break;
  }
}


// function onOptionClick() {
//   var target = $(event.target);
//   target.parent().siblings().find('a').removeClass('active');
//   target.addClass('active');

//   var option = target.text().toLowerCase();
//   setOptions(option);
// }


$(document).ready(function() {
  var options = $('.options-group');


  $('.position-group, .display-group, .color-group').on('click', 'button', function() {
    var option = $(this).text().toLowerCase();

    switch(option) {
      case 'navbar':
        $('.position-group').find('.btn').first().text('Top');
        $('.position-group').find('.btn').last().text('Bottom');
        var opt = $('.position-group').find('.active').text().toLowerCase();
        setOptions(opt);
        break;
      case 'off canvas':
        $('.position-group').find('.btn').first().text('Left');
        $('.position-group').find('.btn').last().text('Right');
        var opt = $('.position-group').find('.active').text().toLowerCase();
        setOptions(opt);
        break;
    }
    setOptions(option)

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    // $(this).toggleClass('active');
  });


  $('.style-group').on('click', 'button', function() {
    var option = $(this).text().toLowerCase();
    setOptions(option);

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var actives = $('.position-group, .display-group, .color-group').find('.active');
    
    $('.position-group, .display-group, .color-group').find('.btn').removeClass('active');
    $('.position-group, .display-group, .color-group').find('.btn:first-of-type').addClass('active');

    $('.position-group').find('.btn').first().text('Top');
    $('.position-group').find('.btn').last().text('Bottom');

    
  });


function ButtonGroup(element) {
  this.element = element;
}



function replaceButtonText(text) {
  $('.btn').text(text);
}




});

$(document).on('click', 'a', function(e) {
  e.preventDefault();
});