// customized modernizr build
require('./util/_modernizr');

// fastclick eliminates click delay in certain browsers
var fastclick = require('fastclick');
fastclick(document.body);

// svg polyfill for better xlink support
var svg4everybody = require('svg4everybody');
svg4everybody();

// global jquery
global.jQuery = require('jquery');

// placeholder attribute polyfill
require('jquery-placeholder');
jQuery('input, textarea').placeholder();

require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js');


// Plugin to collapse tabs to accordion on mobile
require('./util/_bootstrap-tabcollapse.js');

// Image/Video popup
require('magnific-popup');

// Zoom effect
require('./util/_zoomin.js');

// Slick slider
require('slick-carousel-browserify');

// automatically require all modules
require('./modules/**/*.js', {mode: 'expand'});

jQuery(function($) {

  // Fix IE background-attachment: fixed bug
  if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
    $('body').on("mousewheel", function () {
      // remove default behavior
      event.preventDefault();

      //scroll without smoothing
      var wheelDelta = event.wheelDelta;
      var currentScrollPosition = window.pageYOffset;
      window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
  }


  if (Modernizr.touchevents) {
    $('body').addClass('no-touch');
  }
});

