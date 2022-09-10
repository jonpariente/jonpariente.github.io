/* 
TIEMPO 1.0.1
HANDCRAFTED BY HAUNDO DESIGN
http://haundodesign.com
*/

(function ($) { 
  "use strict";

  var settings = {
    date            : 'September 1, 2023 09:00',
    url             : '',
    skin            : 'dark',
    background      : 'slides',
    backgroundEffect: 'overlay',
    backgroundColor : 'black',
    showControlPanel: true
  };

  var methods = {
    backingScale: function(ctx) {
      if('devicePixelRatio' in window) {
        if(window.devicePixelRatio > 1) {
          return window.devicePixelRatio;
        }
      }
      return 1;
    },

    daysBetweenDates: function(date1, date2) {
      var oneDay = 24 * 60 * 60 * 1000; // Miliseconds in a day 
      var diff = date1 - date2; // Days between dates in miliseconds

      return Math.round(diff / oneDay);
    },

    draw: function() {
      var width = $(window).width();
      var height = $(window).height();
      var requestAnimationFrame = window.requestAnimationFrame       ||
                                  window.mozRequestAnimationFrame    ||
                                  window.webkitRequestAnimationFrame || 
                                  window.msRequestAnimationFrame;
      
      ctx.lineWidth = 1;                           
      
      if(skin == 'light') {
        ctx.strokeStyle = '#121619';
      }else{
        ctx.strokeStyle = '#FFF';
      }
      
      if(width >= 768) {
        // Days
        ctx.clearRect(x - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x, y, radius, start, days_end, false);
        ctx.stroke();
        // Hours
        ctx.clearRect(x * 3 - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x * 3, y, radius, start, hours_end, false);
        ctx.stroke();
        // Minutes
        ctx.clearRect(x * 5 - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x * 5, y, radius, start, minutes_end, false);
        ctx.stroke();
        // Seconds
        ctx.clearRect(x * 7 - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x * 7, y, radius, start, seconds_end, false);
        ctx.stroke();
      }else{
        // Days
        ctx.clearRect(x - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x, y, radius, start, days_end, false);
        ctx.stroke();
        // Hours
        ctx.clearRect(x * 3 - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x * 3, y, radius, start, hours_end, false);
        ctx.stroke();
        // Minutes
        ctx.clearRect(x - radius - 2, y * 3 - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x, y * 3, radius, start, minutes_end, false);
        ctx.stroke();
        // Seconds
        ctx.clearRect(x * 3 - radius - 2, y * 3 - radius - 2, radius * 2 + 4, radius * 2 + 4);
        ctx.beginPath();
        ctx.arc(x * 3, y * 3, radius, start, seconds_end, false);
        ctx.stroke();
      }

      days_end = start + ($('.days').html() * 2 * Math.PI / 365);
      hours_end = start + ($('.hours').html() * 2 * Math.PI / 24);
      minutes_end = start + ($('.minutes').html() * 2 * Math.PI / 60);
      seconds_end = start + ($('.seconds').html() * 2 * Math.PI / 60);
      
      requestAnimationFrame(methods.draw);
    },

    getFormResult: function(form, result, status) {
      var message = {
        'success'   : {
          'sent'         : 'Message has been sent.',
          'subscribed'   : 'Thank you for subscribing to our newsletter. You will receive an email to confirm the subscription.'
        },

        'error'  : { 
          'empty'        : 'Some required fields are empty.',
          'email'        : 'Invalid email address.',
          'unsent'       : 'Message was not send. Try again.',
          'unknown'      : 'There was an error: '
        }
      };

      var type = {
        'success': 'success',
        'error'  : {
          'warning': 'warning',
          'danger' : 'danger'
        }
      };

      if(status === 'success') {
        if(result === 'sent') {  
          $(form).find('.form-control').val(''); // Empty input fields
          type = type.success;
          status = '<i class="fa fa-check"></i>';
          message = message.success.sent;
        }else if(result === 'subscribed') {
          $(form).find('.form-control').val(''); // Empty input fields
          type = type.success;
          status = '<i class="fa fa-check"></i>';
          message = message.success.subscribed;
        }else{
          status = '<i class="fa fa-warning"></i>';
          type = type.error.danger;

          if(result === 'empty') {
            message = message.error.empty;
          }else if(result === 'email') {
            message = message.error.email;
          }else if (result === 'unsent') {
            message = message.error.unsent;
          }else{
            message = message.error.unknown + result;
          }
        }
      }else{
        message = message.error.unknown + result;
        type = type.error.danger;
        status = '<i class="fa fa-remove"></i>';
      }

      methods.printAlertMessage(form, message, type, status);
    },

    hideLoadingScreen: function() {
      $('.animated').hide();

      setTimeout(function() {
        $('.loading').fadeOut(500, function() {
          $('.animated').show();
        });        
      }, 100);
    },

    printAlertMessage: function(form, message, type, status) {      
      $(form).find('.alert').remove();
      $('<div class="alert alert-' + type + '">' +
          '<button type="button" class="close" data-dismiss="alert">' +
            '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
          '</button>' + 
          status + ' ' + message + 
        '</div>').hide().prependTo(form).fadeIn('500');
      
      $('.alert').on('close.bs.alert', function(event) {
        event.preventDefault();
        $(this).fadeOut(500, function() {      
          $(this).remove();
        });
      });
    },

    renderText: function(days, hours, minutes, seconds) {
      if(days == 1){
        $('.daysText').html('Day');
      }else{
        $('.daysText').html('Days');
      }

      if(hours == 1){
        $('.hoursText').html('Hour');
      }else{
        $('.hoursText').html('Hours');
      }

      if(minutes == 1){
        $('.minutesText').html('Minute');
      }else{
        $('.minutesText').html('Minutes');
      }

      if(seconds == 1){
        $('.secondsText').html('Second');
      }else{
        $('.secondsText').html('Seconds');
      }

      $('.days').html(days);
      $('.hours').html(hours);
      $('.minutes').html(minutes);
      $('.seconds').html(seconds);
    },

    setCanvas: function() {
      var width = $(window).width();
      var height = $(window).height();
      var baseWidth = $('#content').width();
      var baseHeight;
      
      if(width >= 768) {
        radius = 75;
        baseHeight = radius * 2 + 2;
        x = baseWidth / 8;
        y = baseHeight / 2;   
      }else{
        radius = 60;
        baseHeight = radius * 5;
        x = baseWidth / 4;
        y = baseHeight / 4;
      }

      canvas = document.getElementById('canvas');  
      canvas.width = baseWidth;
      canvas.height = baseHeight;
      ctx = canvas.getContext("2d");

      var scaleFactor = methods.backingScale(ctx);
       
      if (scaleFactor > 1) {
        canvas.width = canvas.width * scaleFactor;
        canvas.height = canvas.height * scaleFactor;
        // update the ctx for the new canvas scale
        ctx = canvas.getContext("2d");
        ctx.scale(scaleFactor, scaleFactor);
      }

      $('#canvas').css({
        'width': baseWidth,
        'height': baseHeight
      });
    },

    setClock: function() {
      var date    = new Date(settings.date);
      var now     = new Date();
      var days    = methods.daysBetweenDates(date.getTime(), now.getTime());
      var hours   = date.getHours() - now.getHours();
      var minutes = date.getMinutes() - now.getMinutes();
      var seconds = date.getSeconds() - now.getSeconds();

      if(seconds < 0) {
        seconds += 60;
        minutes--;
      }
          
      if(minutes < 0) {
        minutes += 60;
        hours--;
      }
 
      if(hours < 0) {
        hours += 24;
        days--;
      }

      if(days < 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      }

      methods.startCountdown(days, hours, minutes, seconds);
    },

    setConfiguration: function() {
      switch(skin) {
        case 'light':
        case 'dark':
          $('#light, #dark').attr('rel', 'alternate stylesheet');
          $('#' + skin).attr('rel', 'stylesheet');
          $('body').removeClass().addClass(skin);
          break;
      }

      switch(bg) {
        case 'solid':
        case 'image':
        case 'slides':
        case 'video':
          $('body').removeClass().addClass(skin).addClass(bg);

          if(bg === 'video') {
            methods.startBackgroundVideo();
          }
          break;
      }

      switch(bgEffect) {
        case 'none':
          $('.filter').removeClass().addClass('filter');
          $('.slide').removeClass('blur');
          break;
        case 'overlay':
        case 'pattern':
        case 'blur':
          if(bg === 'slides' && bgEffect === 'blur') {
            $('.filter').removeClass().addClass('filter');
            $('.slide').removeClass().addClass('slide ' + bgEffect);
          }else{
            $('.filter').removeClass().addClass('filter ' + bgEffect);
            $('.slide').removeClass('blur');
          }
          break;
      }

      if(bg === 'solid' || bgEffect === 'overlay') {
        switch(bgColor) {
          case 'purple':
          case 'blue':
          case 'light-blue':
          case 'light-green':
          case 'green':
          case 'yellow':
          case 'orange':
          case 'red':
          case 'brown':
          case 'black':
            if(bg === 'solid') {
              $('body').addClass(bgColor);
            }else if (bg === 'image' || bg === 'slides') {
              $('.filter').addClass('solid').addClass(bgColor);
            }
            break;
        }
      }
    },

    setControlPanel: function() {
      var show = settings.showControlPanel;

      if(show) {   
        $('.control-panel').addClass('animated fadeIn delay-2s').show(); // Show control panel

        $('.btn-control-panel').click(function() { // Open/Close control panel
          $(this).parent().toggleClass('control-panel-open control-panel-close');
        });

        $('.control-panel-section .btn').each(function() { // Add/Remove active buttons
          if($(this).html().toLowerCase() === skin || $(this).html().toLowerCase() === bg || $(this).html().toLowerCase() === bgEffect || $(this).html().toLowerCase() === bgColor) {
            $(this).addClass('active');
          }
        });

        $('.control-panel-section button').click(function() { // Add/Remove active buttons on click
          $(this).closest('.control-panel-section').find('.active').removeClass('active');
          $(this).addClass('active');
        });

        $('.control-panel .btn').click(function() {
          var parent = $(this).parent();

          if(parent.hasClass('skin')) {
            skin = $(this).html().toLowerCase();
          }else if(parent.hasClass('bg')) {
            bg = $(this).html().toLowerCase();
          }else if(parent.hasClass('bg-effect')) {
            bgEffect = $(this).html().toLowerCase();
          }else if(parent.hasClass('bg-color')) {
            bgColor = $(this).html().toLowerCase();
          }

          methods.setConfiguration();
          methods.setCanvas();
        });
      }
    },

    setTextStyle: function() {
      var width = $(window).width();
      var height = $(window).height();
      var i = 1;
      var j = 1;

      $('.countdown div').each(function() {
        if(width >= 768) {
          $(this).css({
            'top': '50%',
            'left': x * i - radius,
            'width': radius * 2
          });

          i+=2;
        }else{
          if(j < 2) {
            $(this).css({
              'top': y,
              'left': x * i - radius,
              'width': radius * 2
            });

            i+=2;

            if(i > 4) {
              i = 1;
              j++;
            }
          }else{
            $(this).css({
              'top': y * 3,
              'left': x * i - radius,
              'width': radius * 2
            });

            i+=2;
          }
        }        
      });
    },

    startBackgroundVideo: function() {
      $('#video').mb_YTPlayer();
    },

    startCountdown: function(days, hours, minutes, seconds) {  
      var countdown = setInterval( function() { 
        methods.renderText(days, hours, minutes, seconds);

        if(days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
          clearInterval(countdown);
          if(settings.url){
            window.location.href = settings.url;
          }
        }else if(hours == 0 && minutes == 0 && seconds == 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
          days--;
        }else if(minutes == 0 && seconds == 0) {
          minutes = 59;
          seconds = 59;
          hours--;
        }else if(seconds == 0) {
          seconds = 59;
          minutes--;
        }else{
          seconds--;
        }        
      }, 1000);
    },

    submitContactForm: function() {
      $('#contact').submit(function(event) {
        var form = $(this);
        var btn = form.find(':submit');
        var formData = {
          'to'     : $('.email').html(),
          'name'   : $('input[name="name"]').val(),
          'email'  : $('input[name="email"]').val(),
          'message': $('textarea[name="message"]').val()
        };

        btn.button('loading');

        $.ajax({
          type: form.attr('method'),
          url: form.attr('action'),
          data: formData,
          success: function(result, status) {
            methods.getFormResult(form, result, status);
          },
          error: function(xhr, status, error) {
            methods.getFormResult(form, error, status);
          },
          complete: function(xhr, status) {
            btn.button('reset');
          }
        });

        event.preventDefault();
      });
    },

    submitSuscribeForm: function() {
      $('#subscribe').submit(function(event) {
        var form = $(this);
        var btn = form.find(':submit');

        btn.button('loading');

        $.ajax({
          type: form.attr('method'),
          url: form.attr('action'),
          data: $('#subscribe').serialize(),
          success: function(result, status) {
            methods.getFormResult(form, result, status);
          },
          error: function(xhr, status, error) {
            methods.getFormResult(form, error, status);
          },
          complete: function(xhr, status) {
            btn.button('reset');
          }
        });

        event.preventDefault();
      });
    },    

    toggleMenuClass: function() {
      $('.btn-menu').click(function() {
        if($(this).data('toggle') === 'menu') {
          $(this).parent().toggleClass('menu-open menu-close');
        }else if($(this).data('toggle') === 'modal') {
          $(this).parent().toggleClass('modal-open modal-close');
        }
      });

      $('.menu-items [data-toggle="modal-section"]').click(function() {
        var id = $(this).data('target');

        $(id).toggleClass('modal-open modal-close');
      });
    }
  };
  
  /* Variables */
  var skin = settings.skin;
  var bg = settings.background;
  var bgEffect = settings.backgroundEffect;
  var bgColor = settings.backgroundColor;
  var start = 1.5 * Math.PI;
  var end = 2 * Math.PI;
  var canvas;
  var ctx;
  var x;
  var y;
  var days_end = end;
  var hours_end = end;
  var minutes_end = end;
  var seconds_end = end;
  var radius = 75;

  methods.setClock();

  $(document).ready(function() {
    methods.setCanvas();
    methods.setConfiguration();
    methods.setControlPanel();
    methods.setTextStyle();
    methods.draw();
    methods.submitContactForm();
    methods.submitSuscribeForm();
    methods.toggleMenuClass();
  });

  $(window).load(function() {
    methods.hideLoadingScreen();
  });

  $(window).resize(function() {
    methods.setCanvas();
    methods.setTextStyle();
    methods.draw();
  });

})( jQuery );