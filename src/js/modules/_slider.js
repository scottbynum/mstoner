jQuery(function($) {
  $('.slider').slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<button aria-label="next" class="slick-next slick-arrow"><span class="svgstore svgstore--arrow_right"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow_right"></use></svg></span></button>',
    prevArrow: '<button aria-label="prev" class="slick-prev slick-arrow"><span class="svgstore svgstore--arrow_left"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow_left"></use></svg></span></button>',
    useTransform: false
  });

  $('.slider__text__quote').each(function () {
    var slide = $(this).parent().parent().parent().parent();
    if (slide.attr('aria-describedby') != undefined) { // ignore extra/cloned slides
      $(this).attr('id', slide.attr('aria-describedby'));
    }
  });
});