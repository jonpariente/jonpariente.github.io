$(document).ready(function() {
  $('.docs').find('.nav-link').click(function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  $('#docs-sorting').magnet({
    itemSelector: '.element',
    sortData: {
      symbol: '.symbol'
    },
    sortBy: 'symbol'
  });
});