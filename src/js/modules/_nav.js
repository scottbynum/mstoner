jQuery(function($) {
  $('.subnav__list').each(function() {
    var parent = $(this).parent();
    parent.find('> a').attr('aria-haspopup', 'true');
    parent.prepend('<a href="#" class="nav__toggle"><span class="hide">Toggle</span><span class="svgstore svgstore--arrow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow"></use></svg></span></a>');
    $(this).attr('aria-hidden', 'true');
    $(this).attr('aria-label', 'submenu');
  });


  $('.nav__toggle').on('click', function(e) {
    var item = $(this).parent();
    if ($('> .subnav__list', item).length) {

      $('.subnav__list .expanded').not(item).removeClass('expanded');
      if (item.hasClass('expanded')) {
        item.removeClass('expanded');
        item.find('ul').attr('aria-hidden', 'true');
      } else {
        item.addClass('expanded');
        item.find('ul').attr('aria-hidden', 'false');
      }
      e.preventDefault();
    }
  });

  var pendingClose = undefined;

  var closeMegaMenu = function(e) {
    if (window.innerWidth >= 1024) {

      if (!pendingClose) {
        pendingClose = setTimeout(function() {
          $('.nav__list > li').removeClass('nav__link--active');
          $('.nav__list > li').find('ul').attr('aria-hidden', 'true');
          pendingClose = undefined;
        }, 100);
      }
    }
  }

  var openMegaMenu = function(e) {
    if (window.innerWidth >= 1024) {

      if (pendingClose) {
        clearTimeout(pendingClose);
        pendingClose = undefined;
      }
      var item = $(e.currentTarget).parent();

      $('.nav__list > li').removeClass('nav__link--active');
      $('.nav__list > li').find('ul').attr('aria-hidden', 'true');
      if ($('> .subnav__list', item).length) {
        $('.subnav__list .nav__link--active').not(item).removeClass('nav__link--active');
        if (item.hasClass('nav__link--active')) {
          item.removeClass('nav__link--active');
          item.find('ul').attr('aria-hidden', 'true');
        } else {
          item.addClass('nav__link--active');
          item.find('ul').attr('aria-hidden', 'false');
        }
        e.preventDefault();
      }
    }
  }

  $('.nav__link').on('mouseenter', openMegaMenu);

  $('.nav__link').on('touchstart', function(e) {
    if (window.innerWidth >= 1024) {
      if (!$(e.currentTarget).parent().hasClass('nav__link--active')) {
        openMegaMenu(e);
        return false;
      }
    }
  });

  $('.subnav__list').on('mouseenter', openMegaMenu);
  $('.nav__link').on('focusin', openMegaMenu);

  $('.nav__link').on('mouseleave', closeMegaMenu);
  $('.subnav__list').on('mouseleave', closeMegaMenu);

  $(window).on('touchstart', closeMegaMenu);

});