jQuery(function($) {

	var scrollCTA = function(e) {
		$('html, body').animate({
			scrollTop: $('.hero__giving__tabs__wrap').offset().top},
			'slow');
		e.preventDefault();
	}

	$('.hero__explore__arrow').on('click', scrollCTA);



  $(window).on('scroll', function() {
    if (window.innerWidth >= 768) {

  require('../util/_parallax-element.js');

  $('.parallax-img').parallaxElement();
  $('.parallax-card').parallaxElement();
      $('.parallax-img-copy').attr('style', $('.parallax-img').attr('style'));
      $('.parallax-card-copy').attr('style', $('.parallax-card').attr('style'));
    }


  });

});