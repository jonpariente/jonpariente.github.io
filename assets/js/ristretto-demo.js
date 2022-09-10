/*
Ristretto
Handcrafted by Haundo Design
*/
function onLoad() {
  if($('body').hasClass('image')) {
    $('#radio-1').prop('checked', true);
  }else if($('body').hasClass('slides')) {
    $('#radio-2').prop('checked', true);
  }else{
    $('#radio-3').prop('checked', true);
  }

  if($('h1').hasClass('hidden')) {
    $('#checkbox-1').prop('checked', false);
  }else{
    $('#checkbox-1').prop('checked', true);
  }

  if($('.days-ref, .hours-ref, .minutes-ref, .seconds-ref').hasClass('hidden')) {
    $('#checkbox-2').prop('checked', false);
  }else{
    $('#checkbox-2').prop('checked', true);
  }
}

function onCheckboxClick() {
  $('.checkbox, .checkbox-inline').find('input').click(function(event) {
    var id = $(this).attr('id');

    if(id === 'checkbox-1') {
      $('h1').toggleClass('hidden');
    }else{
      $('.days-ref, .hours-ref, .minutes-ref, .seconds-ref').toggleClass('hidden');
    }
  });
}

function onRadioClick() {
  $('.radio, .radio-inline').find('input').click(function(event) {
    var data = $(this).next().data('background');

    if(!$('body').hasClass(data)) {
      changeBackground(data);
    }
  });
}

function onToggleClick() {
  $('.btn-panel').click(function(event) {
    $('.control-panel').toggleClass('open');
  });
}

$(document).ready(function() {
  onToggleClick();
  onCheckboxClick();
  onRadioClick()
});

$(window).on('load', function() {
  onLoad();
});
