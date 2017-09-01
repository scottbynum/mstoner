jQuery(function($) {
  var body = $('body');
  $('.header__small__menu--toggle').attr('aria-expanded', 'false');

  $('.header__small__menu--toggle').on('click', function(e) {
    body.toggleClass('menu-active');
    if (body.hasClass('menu-active')) {
      $(this).attr('aria-expanded', 'true');
    } else {
      $(this).attr('aria-expanded', 'false');
    }
    if (body.hasClass('search-active')) {
      body.removeClass('search-active');
    }
    e.preventDefault();
  });

  $('.header__small__search--toggle').attr('aria-expanded', 'false');

  $('.header__small__search--toggle').on('click', function(e) {
    body.toggleClass('search-active');
    $('#query').focus();
    if (body.hasClass('search-active')) {
      $(this).attr('aria-expanded', 'true');

    } else {
      $(this).attr('aria-expanded', 'false');
    }
    if (body.hasClass('menu-active')) {
      body.removeClass('menu-active');
    }
    e.preventDefault();
  });

  $('.search__close').on('click', function(e) {
    body.toggleClass('search-active');
    if (body.hasClass('search-active')) {
      $(this).attr('aria-expanded', 'true');
    } else {
      $(this).attr('aria-expanded', 'false');
    }
    if (body.hasClass('menu-active')) {
      body.removeClass('menu-active');
    }
    e.preventDefault();
  })
});
