(function ($) {
  // $( 'body' ).children( 'header, nav, main, footer ').addClass( 'd-none' );

  $(document).ready(function () {
    var listeners = {
      onButtonGroupClick: function () {
        $('.btn-group').on('click', '.btn', function () {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
        });
      },

      onButtonToolbarClick: function () {
        $('.btn-toolbar').on('click', '.btn', function () {
          $(this).closest('.btn-toolbar').find('.btn').removeClass('active');
          $(this).addClass('active');
        });
      },

      onFilterClick: function () {
        $('.portfolio-filter').on('click', 'button', function () {
          var filter = $(this).data('category');
          $(this).closest('.portfolio-filter').next('.portfolio-grid').magnet({ filter: filter });
        });
      },

      createAlert: ($form, status, message) => {
        $('.alert').remove();
        console.log(status, message);
        var $alert = $(`
            <div class="alert alert-dismissible alert-${status} mt-1">
                <h5 class="alert-heading">${status}</h5>
                ${message}
            </div>
        `);
        // Add alert after form
        $alert.appendTo($form);
        // Remove alert on close button click
        // $alert.find('alert-dismissible').click('alert-close-btn', () => $alert.remove());
      },

      onSubmit: () => {
        $('form').submit(event => {
          const $form = $(event.currentTarget);
          const $submit = $form.find('button:submit');

          // Disable submit button until completion
          $submit.prop('disabled', true);
          // $submit.data('text', $submit.text());
          // $submit.text('Subscribing...');

          $.ajax({
            method: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: (result, status) => {
              listeners.createAlert($form, status, result);
              $form.trigger('reset');
            },
            error: (xhr, status, error) => {
              listeners.createAlert($form, status, error);
              console.log(`Error: ${error} => ${xhr.responseText}`);
            },
            complete: (xhr, status) => {
              console.log(`Complete: ${xhr.responseText}, ${status}`);
              // Enable submit button back
              $submit.prop('disabled', false);
              // $submit.text($submit.data('text'));
            }
          });

          /* fetch("php/contact.php")
              .then(data => {
                  createAlert($form, data.status, data.result);
                  $form.trigger('reset');
              }).catch(error => {
                  createAlert($form, error, error.responseText);
                  console.log(`Error: ${error} => ${xhr.responseText}`);
              }); */

          event.preventDefault();
        });
      },

      onInputType: () => {
        $('.form-control').on('keyup', function () {
          if ($(this).val() != "") {
            $(this).addClass('is-filled');
          } else {
            $(this).addClass('is-empty').removeClass('is-filled');
          }
        });
      },

      onAlertCloseButtonClick: () => {
        $('.alert-dismissible').on('click', '.alert-close-btn', function () {
          $(this).parent('.alert').remove(); // TODO fadeOut animation
        });
      },

      onScroll: function () {
        var $sidebar = $('main').find('.sidebar');
        var isSidebar = $sidebar.length && true;
        if (isSidebar) {
          $('body').scrollspy({ target: $sidebar });
        }
      },

      onReady: function () {
        //   methods.addProgress();
        methods.progressComplete();
      }
    };

    var methods = {
      addProgress: function () {
        $('body').append('<progress class="progress progress-primary" value="0" max="100"></progress>');

        var $progress = $('.progress');
        var loading = 0,
          interval = setInterval(function () {
            loading = Math.min(loading + Math.random() * 20, 100);

            $progress.attr('value', loading);

            if (loading === 100) {
              clearInterval(interval);
              // $progress.fadeOut( function() {
              //   methods.progressComplete();
              //   $( this ).remove();
              // });
            }
          }, 100);
      },

      progressComplete: function () {
        // Make not displayed elements visible
        $('body').children('header, nav, main, footer ').addClass('animated fadeIn').removeClass('d-none');

        // Emit progress complete
        var event = new Event('progressComplete');
        document.dispatchEvent(event);
      }
    };

    // Call all listeners
    for (var listener in listeners) {
      listeners[listener].call();
    }
  });

  $(window).on('load', () => {
    const isPortfolio = $('.portfolio-grid').length;
    if (isPortfolio > 0) {
      const $grid = $('.portfolio-grid');
      $grid.magnet({ itemSelector: '.portfolio-item' });

      console.log(isPortfolio);
    }
  })

  $(document).on('progressComplete', function () {
    // var methods = {
    //   initMagnet: function() {
    //     var $grid = $( '.portfolio-grid' );
    //     console.log($grid)
    //     $grid.magnet({ itemSelector: '.portfolio-item' });
    //   }
    // };
    // // Init Magnet if portfolio
    // var isPortfolio = $( '.portfolio-grid' ).length;
    // console.log(isPortfolio)
    // if ( isPortfolio ) {
    //   methods.initMagnet();
    // }
  });

})(jQuery);