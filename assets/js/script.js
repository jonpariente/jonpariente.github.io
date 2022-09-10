/**
 * Get a random number between min and max
 * 
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
function getRandomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

/**
 * Get options for Magnet instances
 * 
 * @param  {Element} elem
 * @return {Object}
 */
function getOptions( elem ) {
  var classNames = elem.attr( 'class' ).split( ' ' );

  for ( var className of classNames ) {
    if ( classNames.length > 1 && className === 'periodic-table' ) {
      continue;
    }

    switch ( className ) {
      case 'filter-nonmetal':
        return { itemSelector: '.element', filter: '.nonmetal' };
      case 'sort-by-all':
        return { itemSelector: '.element', sortData: { category: '[data-category]', name: '.name', number: '.number parseInt', symbol: '.symbol', weight: getWeight } };
      case 'sort-by-number':
        return { itemSelector: '.element', sortData: { number: '.number parseInt' }, sortBy: 'number' };
      case 'layout-mode-grid':
        return { itemSelector: '.element', layoutMode: 'grid', horizontal: true };
      case 'layout-mode-rows':
        return { itemSelector: '.element', layoutMode: 'rows' };
      case 'layout-mode-columns':
        return { itemSelector: '.element', layoutMode: 'columns' };
      case 'layout-mode-horizontal':
        return { itemSelector: '.element', layoutMode: 'horizontal' };
      case 'layout-mode-vertical':
        return { itemSelector: '.element', layoutMode: 'vertical' };
      case 'option-resize':
        return { itemSelector: '.element', resize: false };
      case 'option-resize-container':
        return { itemSelector: '.element', resizeContainer: false };
      case 'option-layout-instant':
        return { itemSelector: '.element', layoutInstant: true };
      case 'option-duration':
        return { itemSelector: '.element', duration: 250 };
      case 'option-easing':
        return { itemSelector: '.element', easing: 'ease-in-out' }; 
      case 'option-stagger':
        return { itemSelector: '.element', stagger: 50 };
      case 'option-hidden-visible-style':
        return { itemSelector: '.element', hiddenStyle: { opacity: 0 }, visibleStyle: { opacity: 1 } };
      default:
        return { itemSelector: '.element' };
    }
  }
}

/**
 * Get element size
 *
 * @return {Object}
 */
function getElementSize() {
  var random = getRandomNumber( 1, 30 );
  switch ( random ) {
    case 28:
      return { width: true };
    case 29:
      return { height: true };
    case 30:
      return { width: true, height: true };
    default:
      return;
  }
}

/**
 * Get parsed element weight
 * 
 * @param  {Element} elem
 * @return {Number}
 */
function getWeight( elem ) {
 var weight = $( elem ).find( '.weight' ).text(); 
 return parseFloat( weight.replace( /[()]/g, '' ) );
}

/**
 * Set element size
 *
 * @param {Element} elem
 */
function setElementSize( elem ) {
  var size = getElementSize();
  if ( size ) {
    if ( size.width && size.height ) {
      elem.addClass( 'element--width2 element--height2' );
    } else if ( size.width ) {
      elem.addClass( 'element--width2' );
    } else if ( size.height ) {
      elem.addClass( 'element--height2' );
    }
  }
}

var hydrogenium = '<div class="element non-metal nonmetal" data-category="nonmetal">' +
                    '<span class="name">Hydrogenium</span>' +
                    '<span class="number">1</span>' +
                    '<span class="symbol">H</span>' +
                    '<span class="weight">1.008</span>' +
                  '</div>';
var helium      = '<div class="element noble-gas nonmetal" data-category="noble-gas">' +
                    '<span class="name">Helium</span>' +
                    '<span class="number">2</span>' +
                    '<span class="symbol">He</span>' +
                    '<span class="weight">4.002</span>' +
                  '</div>';
var lithium     = '<div class="element alkali metal" data-category="alkali">' +
                    '<span class="name">Lithium</span>' +
                    '<span class="number">3</span>' +
                    '<span class="symbol">Li</span>' +
                    '<span class="weight">6.94</span>' +
                  '</div>';
var beryllium   = '<div class="element alkaline-earth metal" data-category="alkaline-earth">' +
                    '<span class="name">Beryllium</span>' +
                    '<span class="number">4</span>' +
                    '<span class="symbol">Be</span>' +
                    '<span class="weight">9.012</span>' +
                  '</div>';
var borium      = '<div class="element metalloid" data-category="metalloid">' +
                    '<span class="name">Borium</span>' +
                    '<span class="number">5</span>' +
                    '<span class="symbol">B</span>' +
                    '<span class="weight">10.81</span>' +
                  '</div>';
var carbonium   = '<div class="element non-metal nonmetal" data-category="nonmetal">' +
                    '<span class="name">Carbonium</span>' +
                    '<span class="number">6</span>' +
                    '<span class="symbol">C</span>' +
                    '<span class="weight">12.011</span>' +
                  '</div>';
var aluminium   = '<div class="element post-transition metal" data-category="post-transition">' +
                    '<span class="name">Aluminium</span>' +
                    '<span class="number">13</span>' +
                    '<span class="symbol">Al</span>' +
                    '<span class="weight">26.981</span>' +
                  '</div>';
var silicium    = '<div class="element metalloid" data-category="metalloid">' +
                    '<span class="name">Silicium</span>' +
                    '<span class="number">14</span>' +
                    '<span class="symbol">Si</span>' +
                    '<span class="weight">28.085</span>' +
                  '</div>';
var phosphorus  = '<div class="element non-metal nonmetal" data-category="nonmetal">' +
                    '<span class="name">Phosphorus</span>' +
                    '<span class="number">15</span>' +
                    '<span class="symbol">P</span>' +
                    '<span class="weight">30.973</span>' +
                  '</div>';
var sulphur     = '<div class="element non-metal nonmetal" data-category="nonmetal">' +
                    '<span class="name">Sulphur</span>' +
                    '<span class="number">16</span>' +
                    '<span class="symbol">S</span>' +
                    '<span class="weight">32.06</span>' +
                  '</div>';
var chlorum     = '<div class="element halogen nonmetal" data-category="halogen">' +
                    '<span class="name">Chlorum</span>' +
                    '<span class="number">17</span>' +
                    '<span class="symbol">Cl</span>' +
                    '<span class="weight">35.45</span>' +
                  '</div>';
var argon       = '<div class="element noble-gas nonmetal" data-category="noble-gas">' +
                    '<span class="name">Argon</span>' +
                    '<span class="number">18</span>' +
                    '<span class="symbol">Ar</span>' +
                    '<span class="weight">39.948</span>' +
                  '</div>';

$( document ).ready( function() {
  // Progress bar
  /*$('.site-header, .site-content, .site-footer').hide();
  $('body').append('<progress class="progress" value="0" max="100"></progress>');

  var loading = 0,
  interval = setInterval(function() {
    loading = Math.min(loading + Math.random() * 10, 100);
    
    $('.progress').attr('value', loading);


    if(loading === 100) {
      clearInterval(interval);
      $('.progress').fadeOut(400, function() {
        $(this).remove();
        $('.site-header, .site-content, .site-footer').fadeIn(400);
      });
    }
  }, 100);*/

  // Randomize Item size
  $( '.element' ).each( function() {
    setElementSize( $( this ) );
  });

  // Initialize Magnet
  $( '.periodic-table' ).each( function() {
    var options = getOptions( $( this ) );
    $( this ).magnet( options );
  });

  var listeners = {
    onFilterClick: function() {
      $( '.filter-group' ).on( 'click', 'button', function(e) {
        var filter = $( this ).data( 'filter' );
        var grid = $( this ).parent().next( '.periodic-table' );
        grid.magnet({ filter: filter });
      });
    },

    onSortClick: function() {
      $( '.sort-by-group' ).on( 'click', 'button', function() {
        var sortBy = $( this ).data( 'sort-by' );
        var grid = $( this ).parent().next( '.periodic-table' );
        grid.magnet({ sortBy: sortBy });
      });
    },

    onItemClick: function() {
      $( '.item-resizable' ).find( '.element' ).click( function() {
        $( this ).toggleClass( 'element--width2 element--height2' );
      });

      $( '.item-removable' ).find( '.element' ).click( function() {
        $( this ).remove();
      });
    }
  };

  var methods = {
    add: function() {
      var elems = [ aluminium, silicium, phosphorus, sulphur, chlorum, argon ];
      var index = 0;

      $( '.btn-add' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elem = $( elems[ index ] );
        
        setElementSize( elem );
        
        grid.append( elem )
            .magnet( 'addItems', elem );
        grid.magnet( 'arrange' );

        index++;
      });
    },

    append: function() {
      var elems = [ aluminium, silicium, phosphorus, sulphur, chlorum, argon ];
      var index = 0;

      $( '.btn-append' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elem = $( elems[ index ] );
        
        setElementSize( elem );
        
        grid.append( elem )
            .magnet( 'append', elem );

        index++;
      });
    },

    prepend: function() {
      var elems = [ carbonium, borium, beryllium, lithium, helium, hydrogenium ];
      var index = 0;

      $( '.btn-prepend' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elem = $( elems[ index ] );
        
        setElementSize( elem );

        grid.append( elem )
            .magnet( 'prepend', elem );

        index++;
      });
    },

    insert: function() {
      var elems = [ helium, beryllium, carbonium, aluminium, phosphorus, chlorum ];
      var index = 0;

      $( '.btn-insert' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elem = $( elems[ index ] );
        
        setElementSize( elem );
        
        grid.magnet( 'insert', elem );

        index++;
      });
    },

    remove: function() {
      $( '.btn-remove' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elems = grid.find( '.element' );
        var index = getRandomNumber( 0, elems.length - 1 );
        var elem = elems.eq( index );
        
        grid.magnet( 'remove', elem )
            .magnet( 'layout' );
      });
    },

    arrange: function() {
      var options = {
        filter: '.metal',
        sortBy: 'name'
      };

      $( '.btn-arrange' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        grid.magnet({ 'sortData': { name: '.name' } })
            .magnet( 'updateSortData' )
            .magnet( 'arrange', options );
      });
    },

    layout: function() {
      $( '.btn-layout' ).click( function() {
        var grid = $( this ).next().next( '.periodic-table' );
        grid.magnet( 'layout' );
      });
    },

    layoutItems: function(){
      var elements = [ aluminium, silicium, phosphorus, sulphur, chlorum, argon ];

      $( '.btn-layout-items' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elems = elements.map( function( element ) {
          return $( element )[0];
        });

        grid.append( elems )
            .magnet( 'addItems', elems );

        var items = grid.magnet( 'getItems', elems );
        grid.magnet( 'layoutItems', items, false );

        $( this ).off( 'click' );
      });
    },

    hide: function() {
      $( '.btn-hide' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elems = grid.find( '.element:visible' );
        var index = getRandomNumber( 0, elems.length - 1 );
        var elem = elems.eq( index );

        grid.magnet( 'hide', elem )
            .magnet( 'layout' );
      });
    },

    reveal: function() {
      $( '.btn-reveal' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        var elems = grid.find( '.element:hidden' );
        var index = getRandomNumber( 0, elems.length - 1 );
        var elem = elems.eq( index );

        grid.magnet( 'reveal', elem )
            .magnet( 'layout' );
      });
    },

    updateSortData: function() {
      var isUpdated = false;

      $( '.btn-update-sort-data' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        
        if ( isUpdated ) {
          grid.magnet({ sortBy: 'name' });
        } else {
          grid.magnet({ sortData: { name: '.name' } })
              .magnet( 'updateSortData' );
          
          $( this ).text( 'Sort by name' );

          isUpdated = true;
        }
      });
    },

    shuffle: function() {
      $( '.btn-shuffle' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        grid.magnet( 'shuffle' );
      });
    },

    reloadItems: function() {
      var elems = [ aluminium, silicium, phosphorus, sulphur, chlorum, argon ];

      $( '.btn-reload-items' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
       
        grid.append( elems )
            .magnet( 'reloadItems' )
            .magnet( 'arrange' );

        $( this ).off( 'click' );
      });
    },

    getItem: function() {
      $( '.btn-get-item' ).click( function() {
        var grid = $( this ).next().next( '.periodic-table' );
        var elems = grid.find( '.element' );
        var index = getRandomNumber( 0, elems.length - 1 );
        var elem = elems.eq( index )[0];
        var item = grid.magnet( 'getItem', elem );

        console.log( 'Item: ', item );
      });
    },

    getItems: function() {
      $( '.btn-get-items' ).click( function() {
        var grid = $( this ).next().next( '.periodic-table' );
        var elems = grid.find( '.element' );
        var items = grid.magnet( 'getItems', elems );

        console.log( 'Items: ', items );
      });
    },

    getItemsElements: function() {
      $( '.btn-get-items-elements' ).click( function() {
        var grid = $( this ).next().next( '.periodic-table' );
        var elems = grid.find( '.element' );
        var elements = grid.magnet( 'getItemsElements', elems );

        console.log( 'Elements: ', elements );
      });
    },

    getFilteredItems: function() {
      $( '.btn-get-filtered-items' ).click( function() {
        var grid = $( this ).next().next( '.periodic-table' );
        var elems = grid.find( '.element' );
        var items = grid.magnet( 'getFilteredItems', elems );

        console.log( 'Filtered items: ', items );
      });
    },

    getFilteredItemsElements: function() {
      $( '.btn-get-filtered-items-elements' ).click( function() {
        var grid = $( this ).next().next( '.periodic-table' );
        var elems = grid.find( '.element' );
        var elements = grid.magnet( 'getFilteredItemsElements', elems );

        console.log( 'Filtered elements: ', elements );
      });
    },

    destroy: function() {
      var isActive = true;

      $( '.btn-destroy' ).click( function() {
        var grid = $( this ).next( '.periodic-table' );
        
        if ( isActive ) {
          grid.magnet( 'destroy' );
          $( this ).text( 'Enable' );
        } else {
          grid.magnet();
          $( this ).text( 'Disable' );
        }

        isActive = !isActive;
      });
    }
  };

  // Call all listeners and methods
  for ( var listener in listeners ) {
    listeners[ listener ].call();
  }

  for ( var method in methods ) {
    methods[ method ].call();
  }
});