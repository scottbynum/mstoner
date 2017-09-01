jQuery(window).bind("load", function() {

  jQuery(function($) {

    var calcDonut = function() {
      var getDonutPercent = $('.figure__donut').attr('data-calc-donut');
      var setDonutPercent = Math.floor(754 * (1 - getDonutPercent));
      setTimeout(function() {
        jQuery('.figure__donut').addClass('filled');
        $('.filled .circle-front').css({
          "stroke-dashoffset": setDonutPercent + "px"
        });
      }, 11);
    }
    calcDonut();
  });



  var CountUp = require('countup.js');

  function countupRun(target) {
    var number = target.textContent;
    var decimal = 0;
    if (target.classList.contains('countup--decimal')) {
      decimal = 1;
    }
    var separator = ',';
    if (target.classList.contains('countup--no-separator')) {
      separator = '';
    }
    var animation = new CountUp(target, 0, number, decimal, 3, {
      useEasing: false,
      separator: separator
    });
    setTimeout(function() {
      jQuery('.figure__donut').addClass('filled');

    }, 10);
    animation.start();
  }

  function countupCheck() {
    var scroll = window.scrollY || window.pageYOffset;
    var targets = document.querySelectorAll('.countup');
    for (var i = 0, len = targets.length; i < len; i++) {
      var target = targets[i];
      var position = target.getBoundingClientRect().top - window.innerHeight;
      if (position < 0) {
        target.classList.remove('countup');
        countupRun(target);
      }
    }

    requestAnimationFrame(countupCheck);
  }

  countupCheck();

});


