jQuery(function($) {
  $('.media__slider').slick({
    nextArrow: '<button aria-label="next" class="slick-next slick-arrow"><span class="svgstore svgstore--arrow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow"></use></svg></span></button>',
    prevArrow: '<button aria-label="prev" class="slick-prev slick-arrow"><span class="svgstore svgstore--arrow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow"></use></svg></span></button>'
  });

    $('.media__slider__item .media__caption').each(function () {
    var slide = $(this).parent();
    if (slide.attr('aria-describedby') != undefined) { // ignore extra/cloned slides
      $(this).attr('id', slide.attr('aria-describedby'));
    }
  });
});