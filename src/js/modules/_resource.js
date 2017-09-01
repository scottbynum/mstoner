jQuery(function($) {

  // add custom easing
  $.extend( $.easing, {
    easeInOutQuint: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
    }
  });

    // variables
    var windowWidth = window.innerWidth;
    var transitionEasing = 'easeInOutQuint';
    var transitionSpeed = 250;

  // block grid edge items
  function blockGridEdge() {
    $('.block-grid__item a').attr('tabindex', '-1');
    $('.block-grid__item').removeClass('block-grid__item--edge');

    var count =  $('.block-grid__item')
    .not('.block-grid__item--inactive')
    .not('.resource__search__hidden').length;

    $('.block-grid__item')
    .not('.block-grid__item--inactive')
    .not('.resource__search__hidden').each(function(index) {
      var current = index + 1;
      $(this).children().attr('tabindex', '0');
      // 1n
      $(this).addClass('block-grid__item--edge');
      // 2n
      if (window.innerWidth >= 512) {
        $(this).removeClass('block-grid__item--edge');
        var edge = current / 2;
        if (edge % 1 == 0) {
          $(this).addClass('block-grid__item--edge');
        }
      }
      // 3n
      if (window.innerWidth >= 768) {
        $(this).removeClass('block-grid__item--edge');
        var edge = current / 3;
        if (edge % 1 == 0) {
          $(this).addClass('block-grid__item--edge');
        }
      }
      // last
      if (index === count - 1) {
        $(this).addClass('block-grid__item--edge');
      }
    });
  }

  // block grid expanded item
  function blockGridExpanded() {
    $('.block-grid__expanded').each(function() {
      var active = $(this).prevAll('.block-grid__item--active').first();
      var target = active.nextAll('.block-grid__item--edge').first();
      if (active.hasClass('block-grid__item--edge')) {
        target = active;
      }
      target.after($(this));
    });
  }

  // block grid load, resize
  $(window).on('load resize', function() {
    blockGridEdge();
    blockGridExpanded();
  });

  // button grid filters
  $('.button-grid__link').on('click', function(e) {
    e.preventDefault();
    $('.filter-showing').show();
    if ( windowWidth < 768 ) {
      $('html, body').animate({
        scrollTop: $('.resource__container').offset().top - 50},
        'slow');
    }
    else {
      $('html, body').animate({
        scrollTop: $('.resource__container').offset().top},
        'slow');
    }
    e.preventDefault();
    var filter = $(this).attr('data-filter');
    if (filter !== undefined) {
      var label = $(this).text();
      $('.filter-showing__active').text(label);
      // set grid filter
      $('.block-grid__item').each(function() {
        $(this).addClass('block-grid__item--inactive');
        if ($(this).hasClass('filter-' + filter)) {
          var blockGridItem = $(this);
          blockGridItem.addClass('block-grid__item--placeholder');
          setTimeout(function() {
            blockGridItem.removeClass('block-grid__item--inactive')
            .removeClass('resource__search__hidden');
            $('.block-grid__item').removeClass('block-grid__item--placeholder');
          }, 50);
        }
      });
    }
    $('.block-grid__expanded').remove();
    $('.block-grid').removeClass('block-grid--expanded');
    $('.block-grid__item').removeClass('block-grid__item--active');
    setTimeout(function() {
      blockGridEdge();
    }, 50);
  });


    // button grid reset
    var resetGrid = function(elem) {
      var label = $(elem).text();
      $('.button-grid__item').removeClass('button-grid__item--active');
      $('.filter-showing__active').text(label);
    // reset filter
    $('.block-grid__item').addClass('block-grid__item--inactive');
    $('.block-grid__item').addClass('block-grid__item--placeholder');
    setTimeout(function() {
      $('.block-grid__item').removeClass('block-grid__item--inactive');
      $('.block-grid__item').removeClass('block-grid__item--placeholder');
    }, 50);
    $('.block-grid__expanded').remove();
    $('.block-grid').removeClass('block-grid--expanded');
    $('.block-grid__item').removeClass('block-grid__item--active');
    setTimeout(function() {
      blockGridEdge();
    }, 50);
  }


  // button grid reset
  $('.button-grid__reset').on('click', function(e) {
    resetGrid(this);
    $('.resource').parent().removeClass('resource__search__filter--active');
    e.preventDefault();
  });

  $('.button-grid__results').on('click', function(e) {
    resetGrid(this);
    $('.resource').parent().removeClass('resource__search__filter--active');
    e.preventDefault();
  });

  $('.button-grid__search').on('click', function(e) {
    resetGrid(this);
    $('.resource').parent().addClass('resource__search__filter--active');
    e.preventDefault();

  });

  $('.button-grid__viewall').on('click', function(e) {
    resetGrid(this);
    e.preventDefault();
  });


  // Make filter search work
  var resourceFilterbySearchText = function(elem) {
    var resourceSearchText = $(elem).val().toLowerCase();

    $('.block-grid__item').removeClass('resource__search__hidden');

    if (resourceSearchText.length === 0) {
      $('.filter-showing__active').text('');
    }
    else {
      $('.filter-showing__active').text(
        'Search Results for: "'+resourceSearchText + '"');

      $('.block-grid__item').each(function(index, item) {
        var itemText = $(item).find('a').text().toLowerCase();

        if (itemText.indexOf(resourceSearchText) === -1) {
          $(item).addClass('resource__search__hidden');
        }
      });
    }

    blockGridEdge();
  }
  $('.resource__search__filter input').on('propertychange change click keyup input paste', function() {
    resourceFilterbySearchText(this);
  });



  // button block expand
  $('.button-block').on('click', function() {
    var ajax = $(this).attr('data-ajax');
    var parent = $(this).closest('.block-grid__item');
    var target = parent.nextAll('.block-grid__item--edge').first();
    if (parent.hasClass('block-grid__item--edge')) {
      target = parent;
    }
    if (parent.hasClass('block-grid__item--active')) {
      $('.block-grid__item').removeClass('block-grid__item--active');
      $('.block-grid__expanded').remove();
      $('.block-grid').removeClass('block-grid--expanded');
    } else {
      parent.addClass('block-grid__item--active');
      if (ajax !== undefined) {
        $('.block-grid__item').removeClass('block-grid__item--active');
        parent.addClass('block-grid__item--active');
        $('.block-grid').addClass('block-grid--expanded');
        $('.block-grid__expanded').remove();
        var offset = $('.header').height();
        if ( windowWidth < 768 ) {
          offset = 50;
          var parentTop = parent.offset().top - offset;
          $('html, body').animate({
            scrollTop: parentTop
          }, transitionSpeed * 2, transitionEasing);
        }
        else {
          var parentTop = parent.offset().top;
          $('html, body').animate({
            scrollTop: parentTop
          }, transitionSpeed * 2, transitionEasing);
        }

        $.get(ajax, function(data) {
          target.after(data);
          $('.block-grid__expanded').slideDown(transitionSpeed * 2, transitionEasing, function() {
            $('.block-grid__expanded').addClass('block-grid__expanded--active');
          });
        });
      }
    }
  });

  // block grid expanded close
  $('.block-grid').on('click', '.block-grid__expanded__close', function() {
    $('.block-grid__item').removeClass('block-grid__item--active');
    $('.block-grid__expanded').remove();
    $('.block-grid').removeClass('block-grid--expanded');
  });

  var tabbedItemAngleActive = function(elem) {
    if (window.innerWidth >= 768) {
      $(elem).addClass('tabbed__item__angle--active');
    }
  }

  var tabbedItemAngleInactive = function() {
    if (window.innerWidth >= 768) {
      $('.button-grid__link').removeClass('tabbed__item__angle--active');
    }
  }

  $('.button-grid__link').on('mouseenter', function() {
    tabbedItemAngleInactive();
    tabbedItemAngleActive(this);
  });

  $('.button-grid__link').on('mouseleave', function() {
    tabbedItemAngleInactive();
  });



  $('.resource__tabs .tab-link').click(function() {
    if ($(this).attr('data-filter') === 'all') {
      $('.block-grid__item')
      .removeClass('block-grid__item--inactive')
      .removeClass('resource__search__hidden');
      $('.filter-showing').hide();
    }
    else {
      $('.block-grid__item')
      .addClass('block-grid__item--inactive')
      .addClass('resource__search__hidden');
      $('.filter-showing').hide();
    }
  });


  $('.tab-prefilter').trigger('click');


  $(window).on('load resize', function() {
    if (window.innerWidth >= 768) {
      $('.button-grid__link').removeClass('tabbed__item__angle--active');
    } else {
      $('.button-grid__link').addClass('tabbed__item__angle--active');
    }
  });

});