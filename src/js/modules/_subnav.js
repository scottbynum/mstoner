jQuery(function($) {

  var subnavLoad = function() {
    $('.sidebar-subnav > li').addClass('sidebar-subnav__item');
    $('.sidebar-subnav > li > a').addClass('sidebar-subnav__link');
    $('.sidebar-subnav li ul li a').addClass('sidebar-subnav__link--nested');
    $('.sidebar-subnav li ul').addClass('sidebar-subnav--nested');
    $('.sidebar-subnav').fadeIn(1);
  }

  var subnavAddToggleBtn = function() {
    $('.sidebar-subnav li').children('ul').parent().prepend(
      '<a href="#" class="sidebar-subnav__toggle">' +
      '<span class="hide">Toggle</span>' +
      '<span class="sidebar-subnav__toggle--open"><span class="svgstore svgstore--arrow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svgstore.svg#arrow"></use></svg></span></span>'
      );
  }

  var subnavToggleAction = function() {
    var sidebarSubnavToggles = document.querySelectorAll('.sidebar-subnav__toggle');
    for (var i = 0, len = sidebarSubnavToggles.length; i < len; i++) {
      var sidebarSubnavToggle = sidebarSubnavToggles[i];
      sidebarSubnavToggle.addEventListener('click', function(e) {
        this.parentNode.classList.toggle('sidebar-subnav__item--active');
        e.preventDefault();
      });
    }
  }

  var activateSubnavMenu = function() {
    $('.sidebar-subnav__item')
    .find('[class^="currentbranch"]')
    .parent().addClass('sidebar-subnav__item--active');
  }


  $(window).on('load', function() {
    subnavLoad();
    subnavAddToggleBtn();
    subnavToggleAction();
    activateSubnavMenu();
  });

});



