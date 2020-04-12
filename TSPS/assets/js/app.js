import Scrollbar from 'smooth-scrollbar';
import '@fancyapps/fancybox';
import 'select2/dist/js/select2.full';
import 'jquery-ui-slider/jquery-ui.min.js'
import "jquery-ui/ui/widgets/selectmenu.js";


let app = {
    init() {
        func.jsShowMenu();
        func.jsShowResults();
        func.jsSelect();
        func.jsCheckAll();
        func.jsPopup();
        func.jsHeaderMenu();
        func.jsShowTimetable();
    }
};

let func = {
    jsShowMenu() {
      $( ".folder_1, .nav_folder_1" )
        .mouseover(function() {
          $( ".nav_folder_1" ).css("opacity", "1");
          $( ".nav_folder_1" ).css("display", "flex");
          $('.folder_1').css('background-color', 'rgb(17, 79, 219)');
          $('.menu__item1').css('color', 'rgb(255, 255, 255)');
          $('.js-arrow').addClass('menu__item-whiteArrow');
          $('.js-arrow').removeClass('menu__item-arrow');
        })
        .mouseout(function() {
          $( ".nav_folder_1" ).css("opacity", "0");
          $( ".nav_folder_1" ).css("display", "none");
          $('.folder_1').css('background-color', 'rgb(255, 255, 255)');
          $('.menu__item1').css('color', 'rgb(17, 79, 219)');
          $('.js-arrow').addClass('menu__item-arrow');
          $('.js-arrow').removeClass('menu__item-whiteArrow');
        });

        $( ".folder_2, .nav_folder_2" )
        .mouseover(function() {
            $( ".nav_folder_2" ).css("opacity", "1");
            $( ".nav_folder_2" ).css("display", "flex");
            $('.folder_2').css('background-color', 'rgb(17, 79, 219)');
            $('.menu__item2').css('color', 'rgb(255, 255, 255)');
            $('.js-arrow2').addClass('menu__item-whiteArrow');
            $('.js-arrow2').removeClass('menu__item-arrow');
          })
        .mouseout(function() {
          $( ".nav_folder_2" ).css("opacity", "0");
          $( ".nav_folder_2" ).css("display", "none");
          $('.folder_2').css('background-color', 'rgb(255, 255, 255)');
          $('.menu__item2').css('color', 'rgb(17, 79, 219)');
          $('.js-arrow2').addClass('menu__item-arrow');
          $('.js-arrow2').removeClass('menu__item-whiteArrow');
        });


        $( ".folder_4, .nav_folder_4" )
          .mouseover(function() {
            $( ".nav_folder_4" ).css("opacity", "1");
            $( ".nav_folder_4" ).css("display", "flex");
          })
          .mouseout(function() {
            $( ".nav_folder_4" ).css("opacity", "0");
            $( ".nav_folder_4" ).css("display", "none");
          });

    },
    jsShowResults() {
      let $result = $('.qualification__wrap-text--head');

      $result.on('click', function(){

        let $hiddenResult = $('.qualification__wrap-text--hide');
        $hiddenResult.toggleClass('qualification__wrap-text--show');

        let $arrow = $('.qualification__wrap-text--image');
        $arrow.toggleClass('qualification__wrap-text--imageRotate');
      });
    },
    jsSelect() {
        $('.js-select').selectmenu();
    },
    jsCheckAll() {
      let $selectAll = $('.js-checkboxAll');

      $selectAll.each(function() {
        $(this).on('click', function(){
          $('.js-checkbox').prop('checked', true);


          if($('.js-checkbox').prop('checked' == true)) {
            $('.js-checkbox').removeAttr('checked');
          }
        })
      })
    },
    jsPopup() {
      $('.js-popup').on('click', function(){
        $('.popup, .popup__overlay').fadeIn(400);
      })
      $('.js-overlay, .js-formButton').on('click', function(){
        $('.popup, .popup__overlay').fadeOut(400);
      })
    },
    jsHeaderMenu() {
      $('.sf-with-ul').on('mouseenter', function(){
        $('.sf-menu2 ul').css('display', 'block');
        $('.head__arrow').addClass('changeArrow');
      });
      $('.sf-with-ul').on('mouseleave', function(){
        $('.sf-menu2 ul').css('display', 'none');
        $('.head__arrow').removeClass('changeArrow');
      });
    },
    jsShowTimetable() {
      let $button = $('.js-timetableButton');

      $button.on('click', function(){
        $('.hidden__timetable').fadeIn(200);
      })
    }
};

$(function () {
    app.init();
});
