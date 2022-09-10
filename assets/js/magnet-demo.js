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
 * Set element size
 */
function setElementSize() {
	var random = getRandomNumber( 1, 10 );
	switch( random ) {
		case 8:
			return { width: true };
		case 9:
		 	return { height: true };
		case 10:
			return { width: true, height: true };
		default:
			return;
	}
}


function initMagnet() {

}



// $(document).ready(function() {
// 	var elements = document.querySelectorAll('.element');
// 	for ( var element of elements ) {
// 		if ( size.width && size.height ) {
// 			$(element).addClass('--width2 --height2');
// 		} else if ( size.width ) {
// 			$(element).addClass('--width2');
// 		} else if ( size.height ) {
// 			$(element).addClass('--height2');
// 		}
// 	}
// });



$(document).ready(function() {
	$('.element').each(function(elem) {
		var random = Math.floor((Math.random() * 10) + 1);
		if ( random === 8 ) {
			$(this).addClass('element--width2');
		} else if ( random === 9 ) {
			$(this).addClass('element--height2');
		} else if ( random === 10 ) {
			$(this).addClass('element--width2 element--height2');
		}
	});

	var $magnet = $('.periodic-table').magnet({
		itemSelector: '.element'
	});	
	
	$('.filter-group').on('click', 'button', function() {
		var filter = $(this).data('filter');
		$magnet.magnet({ filter: filter });
		
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	$('.btn-destroy').click(function() {
		$magnet.magnet('destroy');
		$('.filter-group').off('click');
	});
});

