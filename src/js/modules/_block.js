jQuery(function($) {

var skewSize = function() {
  var tg_skew = 0.05729;
  var top_pad = 35;
  var skew_w = $('.skew').width() + 200;
  var skew_h = Math.floor(skew_w*tg_skew);

  var main_cont_pad =  Math.floor(skew_h/2);

  $(".skew-after, .skew-before").css({
    'width' : skew_w + 'px',
    'height' : skew_h + 'px'
  });


  $(".skew-before").css({'top' : -main_cont_pad + 'px'});
  $(".skew-after").css({'bottom' : -main_cont_pad + 'px'});


  var window_w = $('body').width();
  var main_h = Math.floor($(".block").outerHeight());


  $(".block").css({
    'margin-top' : -main_cont_pad + 'px'
  });
}

  $(window).on('resize load', function() {
    skewSize();
  });


});