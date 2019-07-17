import Scrollbar from 'smooth-scrollbar';
import 'select2/dist/js/select2.full';
import 'slick-carousel/slick/slick.min.js';

let app = {
    init() {
        func.jsInitialSelect();
        func.jsSlider();
    }

};

let func = {
  jsInitialSelect() {

      if ($('.js-select').length > 0) {
          $('.js-select').each(function(idx, select){
              let $select = $(select);

              if (!$select.prop('sumo')) {
                  $select.SumoSelect({
                      csvDispCount: 20,
                      floatWidth: 0,
                      captionFormat: '{0} выбрано',
                      captionFormatAllSelected: '{0} выбраны все!',
                      nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
                      locale :  ['Ок', 'Отмена', 'Выбрать все']
                  });
              }
          });
      }
  },

  jsSlider() {

      // $('.js-slider').slick({
      //   slidesToShow: 1,
      //   slidesToScroll: 1,
      //   infinite: false,
      //   dots: false,
      //   appendArrows: $('.arrows'),
      //   prevArrow: '<img src="../images/arrow-right.svg" alt="" class="arrow-right">',
      //   nextArrow: '<img src="../images/arrow-left.svg" alt="" class="arrow-left">'
      // });
      $(".js-slider").on('afterChange', function(event, slick, currentSlide){
        $("#counter").text(currentSlide + 1);
      });
    },
}


$(function () {

    app.init();

});
