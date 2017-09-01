jQuery(function($) {
  $('.feature__faculty__slider').slick({
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: '<button aria-label="next" class="slick-next slick-arrow"><span class="svgstore svgstore--arrow_right"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow_right"></use></svg></span></button>',
    prevArrow: '<button aria-label="prev" class="slick-prev slick-arrow"><span class="svgstore svgstore--arrow_left"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow_left"></use></svg></span></button>',
    responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });

  //

  $('.feature__block__faculty--link a').each(function () {
    var slide = $(this).parent().parent();
    if (slide.attr('aria-describedby') != undefined) { // ignore extra/cloned slides
      $(this).attr('id', slide.attr('aria-describedby'));
    }
  });


  var facultyFeatureActive = function(elem) {
    if (window.innerWidth >= 1024) {
      $(elem).parent().parent().addClass('feature__block__faculty--is-active');
    }
  }


  var facultyFeatureInactive = function() {
    if (window.innerWidth >= 1024) {
      $('.feature__faculty__slider .feature__block').removeClass('feature__block__faculty--is-active');
    }
  }

  $('.feature__block__faculty--link a').on('mouseenter', function() {
    facultyFeatureInactive();
    facultyFeatureActive(this);
  });

  $('.feature__block__faculty--link a').on('mouseleave', function() {
    facultyFeatureInactive();
  });

  $('.feature__block__faculty--image img').on('mouseenter', function() {
    facultyFeatureInactive();
    facultyFeatureActive(this);
  });

  $('.feature__block__faculty--image img').on('mouseleave', function() {
    facultyFeatureInactive();
  });

  //

  $(window).on('load resize', function() {
    if (window.innerWidth >= 1024) {
      $('.feature__faculty__slider .feature__block').removeClass('feature__block__faculty--is-active');
    } else {
      $('.feature__faculty__slider .feature__block').addClass('feature__block__faculty--is-active');
    }
  });

//

var featureEventActive = function(elem) {
  $(elem).parent().parent().addClass('feature__event--active');
}

var featureEventInactive = function(elem) {
  $(elem).parent().parent().removeClass('feature__event--active');
}

$('.feature__event--link a').on('mouseenter', function() {
  featureEventActive(this);
});

$('.feature__event--link a').on('mouseleave', function() {
  featureEventInactive(this);
});

//

var featureBlockActive = function(elem) {
  $(elem).parent().parent().addClass('feature__block--active');
}

var featureBlockInactive = function(elem) {
  $(elem).parent().parent().removeClass('feature__block--active');
}


$('.feature__block__student--name a').on('mouseenter', function() {
  featureBlockActive(this);
});

$('.feature__block__student--name a').on('mouseleave', function() {
  featureBlockInactive(this)
});

$('.feature__block__residence--name a').on('mouseenter', function() {
  featureBlockActive(this);
});

$('.feature__block__residence--name a').on('mouseleave', function() {
  featureBlockInactive(this)
});
});