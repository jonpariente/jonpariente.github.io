/**
 * Ristretto - v.1.0.0
 *
 * Copyright 2016 by Haundo Design
 */
(function ($) {
  var settings = {
    date:              '09/05/2023 09:00:00', // Set target date
    background:        false,                 // false, 'image', 'slides', 'video'
    showTitle:         true,                  // true, false
    showCountdownTags: true                   // true, false
  };

  var methods = {
    delayAnimations: function() {
      $('.animated[data-delay]').each(function() {
        var delay = $(this).data('delay');
        $(this).css('animation-delay', delay);
      });
    },

    setSettings: function() {
      if(!settings.background) {
        settings.background = 'image';
      }

      if(!settings.showTitle) {
        $('h1').addClass('hidden');
      }

      if(!settings.showCountdownTags) {
        $('.days-ref, .hours-ref, .minutes-ref, .seconds-ref').addClass('hidden');
      }
    },

    preloadImages: function() {
      var images = ['image', 'slide-1', 'slide-2', 'slide-3', 'slide-4'];
      var slides = $('<ul></ul>').attr('class', 'slides').css('visibility', 'hidden').appendTo('body');

      $.each(images, function(index, value) {
        var slide = $('<li></li>').attr('class', value).appendTo(slides);
      });
    }
  };

  var events = {
    ready: function() {
      events.onMenuClick();
      events.onInputFocus();
      events.onFormSubmit();
      
      methods.preloadImages();
      methods.setSettings();
      methods.delayAnimations();

      $('.countdown').countDown({date: settings.date});
      $('.nav-item').changePage();
      $('nav, main, .btn-menu').addClass('hidden');    
    },

    load: function() {
      changeBackground(settings.background);
      
      $('header').addClass('animated fadeOut').on(events.onAnimationEnd(), function() {
        $(this).addClass('hidden');
        $('nav, main, .btn-menu').removeClass('hidden');
        $('ul.slides').remove();
      });
    },

    onMenuClick: function() {
      $('.nav-link, .btn-menu').click(function(event) {
        $('nav, main').toggleClass('open');
      });
    },

    onInputFocus: function() {
      $('input, textarea').keyup(function() {
        var input = $(this);

        if(input.val() === "") {
          input.removeClass('filled');
        }else{
          input.addClass('filled');
        }
      });
    },

    onFormSubmit: function() {
      $('form').submit(function(e) {
        e.preventDefault();
        
        var form = $(this),
            btn = form.find('.btn:submit'),
            btnText = btn.text();

        btn.prop('disabled', true)
           .text(btn.data('loading'))
           .append('<span class="icon icon-circle-o animated zoomOut infinite"></span>');

        $.ajax({
          type: form.attr('method'),
          url: form.attr('action'),
          data: form.serialize(),
          complete: function(xhr, status) {            
            var alert = $('.alert'),
                body  = $('body'),
                newAlert = '<section class="alert animated slideInRight"><h3 class="alert-title"></h3><p class="alert-body"></p><button class="btn btn-close"><span>Close</span></button></section>';

            // Remove existing alerts
            if(alert.length) {
              alert.removeClass('slideInRight').addClass('slideOutRight').on(events.onAnimationEnd(), function() {
                $(this).remove();
              });
            }

            body.append(newAlert); // Add new alert

            // Format alert title and message
            alert = $('.alert');
            alert.find('.alert-title').text(status);
            alert.find('.alert-body').text(xhr.responseText);

            // Check AJAX result to create an according alert type
            if(status === 'success') {
              alert.addClass('alert-success');
              methods.emptyForm();
            }else{
              alert.addClass('alert-error');
            }

            btn.prop('disabled', false)
               .text(btnText); // Enable back submit button 

            // Remove alert
            function removeAlert() {
              var alert = $('.alert');

              alert.removeClass('slideInRight').addClass('slideOutRight').on(events.onAnimationEnd(), function() {
                $(this).remove();
              });
            }

            // Remove alert after 10 seconds
            var interval = setTimeout(removeAlert, 5000);
            
            // Remove alert and clear interval if close button is clicked
            alert.find('.btn-close').click(function(event) {
              clearTimeout(interval);
              removeAlert();
            });
          }
        });
      });
    },

    onAnimationEnd: function() {
      var el = document.createElement('div'),
          animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
          };

      for(var name in animations) {
        if(el.style[name] !== 'undefined') {
          return animations[name];
        }
      }
    },

    onTransitionEnd: function() {
      var el = document.createElement('div'),
          transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
          };

      for(var name in transitions) {
        if(el.style[name] !== 'undefined') {
          return transitions[name];
        }
      }
    }
  };

  changeBackground = function(type) {
    var body = $('body'),
        video = $('.player');

    body.removeClass();
    
    if($.isFunction($.fn.slideShow.stop)) { body.slideShow.stop(); } // Stop the plugin if is initialized and background type changes
    if(!video.is('.hidden')) { video.addClass('hidden').get(0).pause();  }// Stop the video

    switch(type) {
      case 'slides':
        body.addClass(type + ' slide-1');
        body.slideShow();
        break;
      case 'video':
        body.addClass(type);
        video.removeClass('hidden').get(0).play();
        break;
      default:
        body.addClass(type);
        break;
    }  
  }

  $.fn.countDown = function(options, callback) {
    // Settings
    var settings = $.extend({
      date:   null,
      offset: +2
    }, options);

    var container = $(this); // Save the container where the plugin is called

    // To miliseconds
    const second = 1000,
          minute = second * 60,
          hour   = minute * 60,
          day    = hour * 24;

    // Throw error if date is not set
    if (!settings.date) {
      $.error("Date is not defined");
    }

    // Throw error if date is set incorrectly
    if(!Date.parse(settings.date)) { 
      $.error("Incorrect date format, should be MM/DD/YYYY hh:mm:ss");
    }

    var currentDate = function() {
      // Get client's current date
      var date = new Date();
      // Turn date to UTC +0000
      var utc = date.getTime() + (date.getTimezoneOffset() * minute);
      // Set date to client's time zone
      var now = new Date(utc + (hour * settings.offset));

      return now;
    };

    var countdown = function() {
      var target_date = new Date(settings.date), // Set target date
          current_date = currentDate(); // Get current date

      // Difference between dates
      var difference = target_date - current_date;

      // If difference is negative between dates
      if(difference < 0) {
        // Stop the countdown
        clearInterval(interval);

        // Call a function after the plugin has finish and exit
        if (callback && typeof callback === typeof Function) callback();
        return;
      }

      // Calculate dates
      var days    = Math.floor(difference / day),
          hours   = Math.floor((difference % day) / hour),
          minutes = Math.floor((difference % hour) / minute),
          seconds = Math.floor((difference % minute) / second);

      var ref_days = (days === 1) ? 'Day' : 'Days',
          ref_hours = (hours === 1) ? 'Hour' : 'Hours',
          ref_minutes = (minutes === 1) ? 'Minute' : 'Minutes',
          ref_seconds = (seconds === 1) ? 'Second' : 'Seconds';

          // Fix dates to always show 2 digits
          days    = (String(days).length >= 2) ? days : '0' + days;
          hours   = (String(hours).length >= 2) ? hours : '0' + hours;
          minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
          seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

      // Set time to DOM
      container.find('.days').text(days);
      container.find('.hours').text(hours);
      container.find('.minutes').text(minutes);
      container.find('.seconds').text(seconds);

      container.find('.days-ref').text(ref_days);
      container.find('.hours-ref').text(ref_hours);
      container.find('.minutes-ref').text(ref_minutes);
      container.find('.seconds-ref').text(ref_seconds);
    };
    
    // Start countdown
    var interval = setInterval(countdown, 1000);
  }

  $.fn.changePage = function() {
    function changePage(el) {
      this.el = el;

      this.init();
    }
    
    changePage.prototype.init = function() {
      this.handleClick();
    }

    changePage.prototype.handleClick = function() {
      this.el.click(function(event) {
        var elem = $(this);

        if(!elem.hasClass('active')) {
          var currentElem = elem.siblings('.active');

          if(elem.index() > currentElem.index()) {
            $('nav, main').one(events.onTransitionEnd(), function() {
              page.next(elem, currentElem);
            });
          }else{
            $('nav, main').one(events.onTransitionEnd(), function() {
              page.previous(elem, currentElem);
            });
          }

          page.update(elem);
        }

        event.preventDefault();
      });
    }

    changePage.prototype.previous = function(elem, currentElem) {
      var i = currentElem.index(),
          j = elem.index();

      // Current Page
      $('section').eq(i).addClass('animated fadeOutRight').one(events.onAnimationEnd(), function() {
        $(this).addClass('hidden').removeClass('animated fadeOutRight');

        // Next Page
        $('section').eq(j).removeClass('hidden').addClass('animated fadeIn').one(events.onAnimationEnd(), function() {
          $(this).removeClass('animated fadeIn');
        });
      });
    }    

    changePage.prototype.next = function(elem, currentElem) {
      var i = currentElem.index(),
          j = elem.index();

      // Current Page
      $('section').eq(i).addClass('animated fadeOutLeft').one(events.onAnimationEnd(), function() {
        $(this).addClass('hidden').removeClass('animated fadeOutLeft');

        // Next Page
        $('section').eq(j).removeClass('hidden').addClass('animated fadeIn').one(events.onAnimationEnd(), function() {
          $(this).removeClass('animated fadeIn');
        });
      });
    }

    /*changePage.prototype.previous = function(elem, currentElem) {
      var i = currentElem.index(),
          j = elem.index();

      // Current Page
      $('section').eq(i).addClass('animated fadeOutDown').one(events.onAnimationEnd(), function() {
        $(this).addClass('hidden').removeClass('animated fadeOutDown');

        // Next Page
        $('section').eq(j).removeClass('hidden').addClass('animated fadeInDown').one(events.onAnimationEnd(), function() {
          $(this).removeClass('animated fadeInDown');
        });
      });
    }    

    changePage.prototype.next = function(elem, currentElem) {
      var i = currentElem.index(),
          j = elem.index();

      // Current Page
      $('section').eq(i).addClass('animated fadeOutUp').one(events.onAnimationEnd(), function() {
        $(this).addClass('hidden').removeClass('animated fadeOutUp');

        // Next Page
        $('section').eq(j).removeClass('hidden').addClass('animated fadeInBottom').one(events.onAnimationEnd(), function() {
          $(this).removeClass('animated fadeInBottom');
        });
      });
    }*/

    changePage.prototype.update = function(elem) {
      elem.siblings().removeClass('active');
      elem.addClass('active');
    }
    
    var page = new changePage(this);
  }

  $.fn.slideShow = function() {
    function SlideShow(el) {
      this.el = el;
      this.interval = null;

      this.init();
    }

    SlideShow.prototype.init = function() {
      this.slide(8000, 4);
    }

    SlideShow.prototype.slide = function(interval, frames) {
      var i = 2;

      function swap() {
        instance.el.removeClass().addClass('slides slide-' + i);
        i++;
        if(i > frames) { i = 1; }
      }

      this.interval = setInterval(swap, interval);
    }

    $.fn.slideShow.stop = function() {
      clearInterval(instance.interval);
    }

    var instance = new SlideShow(this);
  }

  $(document).ready(function() {
    events.ready();
  });

  $(window).on('load', function() {
    events.load();
  });
})(jQuery);