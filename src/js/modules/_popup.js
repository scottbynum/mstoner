jQuery(function($) {
  $('.popup-image').each(function() {
    $(this).attr('data-mfp-src', $(this).find('img').attr('src'));
    $(this).magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom',
      zoom: {
        enabled: true,
        duration: 320,
        easing: 'ease',
        opener: function(openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });
  $('.popup-video').magnificPopup({
    type: 'iframe',
    removalDelay: 320,
    mainClass: 'mfp-fade'
  });

  $('.popup-modal').magnificPopup({
    type: 'inline',
    removalDelay: 320,
    mainClass: 'mfp-fade'
  });

  $('.popup-gallery').each(function() {
    var getAttrs = function(elem) {
      return {
        src:   $(elem).attr('src'),
        alt:   $(elem).attr('alt'),
        title: $(elem).attr('title'),
      };
    }

    var linkImage     = getAttrs($(this).find('a img'));
    var galleryImages = $(this).find('.popup-gallery-items')
      .children()
      .map(function(idx, img) {
        return getAttrs(img);
      })
      .get();

    var allImgs = [linkImage].concat(galleryImages);

    $(this).magnificPopup({
      type: 'image',
      mainClass: 'data-mfp-src',
      items: allImgs,
      gallery: {
        enabled: true,
        navigateByImgClick: true,
      },
      image: {
        titleSrc: function(item) {
          return item.title;
        }
      }
    });
  });

});
