jQuery(function($) {

  $('.dropdown__toggle').on('click', function(e) {
    $(this).parent().toggleClass('dropdown--active');
    e.preventDefault();
  });

  $(document).on('click', function(e) {
    $('.dropdown--active').each(function() {
      var container = $(this);
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('dropdown--active');
      }
    });
  });

});
