jQuery(function($) {
/**
 * @fileoverview
 * Adds a div to capture mouse events. The main purpose of this is to
 * capture mouse scoll events over a embed map so users can scroll
 * the page and not get caught inside the map
 */

 $(document).ready(function() {
 	$('.map-no-scroll').each(function() {
 		var c = $('<div class="cover"></div>');
 		c.on('mousedown touchmove', function() {
 			$(this).parent().removeClass('map-no-scroll');
 		});
 		$(this).append(c);
 	});
 });

//

$('.residence__slider').slick({
	arrows: true,
	nextArrow: '<button aria-label="next" class="slick-next slick-arrow"><span class="svgstore svgstore--arrow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow"></use></svg></span></button>',
	prevArrow: '<button aria-label="prev" class="slick-prev slick-arrow"><span class="svgstore svgstore--arrow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow"></use></svg></span></button>',
	centerMode: true,
	centerPadding: '160px',
	variableWidth: true,
	slidestoShow: 1,
  responsive: [ {
    breakpoint: 480,
    settings: {
      centerMode: false,
      variableWidth: false
    }
  }]
});

$('.residence__slider__item img').each(function () {
  var slide = $(this).parent();
    if (slide.attr('aria-describedby') != undefined) { // ignore extra/cloned slides
      $(this).attr('id', slide.attr('aria-describedby'));
    }
  });

//

$(window).on("scroll",function(){
  var winTop = $(this).scrollTop();
  if ($('.block__line').length) {

    var blockTop = $(".block__line").offset().top;
    if(winTop >= blockTop - 400) {
     $('.block__line').animate({
      height: $('.block--sidetext').height()
    }, 1000);
   }
 }

 if ($('.residence__area__svg').length) {
  var svgMap = $('.residence__area__svg').offset().top;
  if (winTop >= svgMap - 400) {

    $('.residence__area__svg--pin').addClass('animated bounceInDown');



    setTimeout(function() {
      $('.pulsing').addClass('pulse').css('fill', '#CA4A24');
          $('.residence__area__svg--dots').each(function(i) {
      var dot = $(this);
      setTimeout(function() {
        dot.addClass('animated');
      }, 100 * i);
    });
    }, 1000);
  }
}
});


});