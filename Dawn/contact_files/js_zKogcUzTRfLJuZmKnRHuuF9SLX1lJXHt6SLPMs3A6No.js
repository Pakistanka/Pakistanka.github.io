jQuery(document).ready(function($){
  
    var dawn = {
  
      init: function() {
        this.mobileMenu();
        // this.googleFonts();
        this.googleMaps();
        this.menuCollision();
        this.searchDialog();
        this.toTop();
        this.stickyHeader();
      },
  
      /* Google Web Fonts */
      googleFonts: function() {
        WebFontConfig = {
          classes: false,
          active: function() {
            $('body').addClass('dawn-wf-loaded');
          },
          inactive: function() {
            $('body').addClass('dawn-wf-inactive');
          },
          google: {
            families: ['Poppins:400,500,600,700', 'Merriweather:400i']
          }
        };
  
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js';
        wf.type = 'text/javascript';
  
        var lib = document.getElementsByTagName('script')[0];
        lib.parentNode.insertBefore(wf, lib);
      },
  
      /* Sticky Header */
      stickyHeader: function() {

        $(window).on('scroll', function() {
        var top = $(this).scrollTop(),
            nav = $('.dawn-page-header .navbar'),
            height = nav.outerHeight();
          console.log(height);
          if(top >= (height * 1.5)) {
            $('.dawn-page-header').css('marginBottom', (height + 'px'));
            nav.addClass('navbar-fixed').delay(0).queue(function() {
              $(this).css({
                'transform' : 'translateY(0px)',
                'transition' : 'all 0.3s ease-in-out 0.1s'
              }).dequeue();
            });
          } else {
            $('.dawn-page-header').css('marginBottom', '0px');
            nav.removeAttr("style").removeClass('navbar-fixed');
          }
        });
      },
  
      mobileMenu: function() {
        var mobile = $('.mobile-menu > select'),
            main = $('.primary-menu nav'),
            navbar = main.outerWidth() + $('.logo').outerWidth(),
            toggleMenu = function() {
              var wrap = $('.navbar-wrap').width() - 50;
  
              if(navbar > wrap) {
                main.addClass('mobile-active');
              } else {
                main.removeClass('mobile-active');
              }
            };
        
        /* Mobile menu listeners */
        toggleMenu();
        $(window).resize(toggleMenu);
  
        /* Build select menu */
        main.find('.nav-item a').each(function() {
          var depth = $(this).parents('li').length,
              href = $(this).attr('href'),
              text = Array(depth).join('-') + ' ' + $(this).text(),
              link = $('<option/>').attr('value', href).html(text);
  
          mobile.append(link);
        });
  
        /* Mobile menu submit event */
        mobile.change(function(){
          window.location.href = this.value;
        })
  
        /* If touch device, require two clicks for parent links */
        if(this.touchDevice() == true) {
          $('.expanded > a').on('click', function(e) {
            var menuOpen = $(this).hasClass('dropdown-open');
            if(!menuOpen) {
              $('a').removeClass('dropdown-open');
              $(this).addClass('dropdown-open');
              e.preventDefault();
              e.stopPropagation()
            }
          });
  
          $('body').on('click', function(e) {
            var isNav = $(e.target).parent().hasClass('.nav-item');
            if(!isNav)
              $('a').removeClass('dropdown-open');
          });
        }
      },
  
      /* Menu collision detection */
      menuCollision: function() {
        $("#main-menu li.expanded").on("mouseenter", function() {
          var link = $(this), // menu link
              offset = link.offset(), // menu link offset
              menu = link.find('.dropdown-menu').first(), // dropdown menu
              width = offset.left + menu.outerWidth(),
              edge = $(window).width(),
              left = (width - edge) + 10;
  
          // If menu collides width right edge, adjust left margin
          if(width > edge)
            link.find('.dropdown-menu').first().css('left', '-' + left + 'px');
        }).on("mouseleave", function() {
          // Reset left value on mouseleave
          var link = $(this);
          link.find('.dropdown-menu').first().css('left', '');
        });
      },
  
      /* Search dialog */
      searchDialog: function() {
        $(".dawn-search").on("click", function(e) {
          console.log('here');
          $(this).addClass('search-active');
          $('.search-block-form').addClass('search-active');
          e.stopPropagation();	
        })
  
        $('body').on('click', function(e) {
          var isSearch = $(e.target).parents().addBack().hasClass('search-block-form');
          if(!isSearch)
            $('.search-active').removeClass('search-active');
        });
      },
  
      /* Google Maps */
      googleMaps: function() {
        if ($('.dawn-gmap').length)
          mapInner = $('.dawn-gmap'),
          coordinate = new google.maps.LatLng(
            mapInner.data("lat"), 
            mapInner.data("lon")
          ),
          mapOptions = {
            center: coordinate,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            scrollwheel: false,
            styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
          },
          map = new google.maps.Map(
            mapInner.get(0), 
            mapOptions
          ),
          myMarker = new google.maps.Marker({
            position: coordinate,
            map: map,
          });
      },
  
      /* Return to top button */
      toTop: function() {
        $(window).scroll(function() {
          if ($(this).scrollTop() >= 150)
            $('.to-top').css('opacity', 0.5);
          else
            $('.to-top').css('opacity', 0);
        });
    
        $('.to-top').click(function(){
          $('html, body').animate({scrollTop:0}, 300);
          return false;
        });
      },
  
      touchDevice: function() {
        return (('ontouchstart' in window)
          || (navigator.maxTouchPoints > 0)
          || (navigator.msMaxTouchPoints > 0));
      }
  
    }
  
    dawn.init();
  
  });
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout = void 0;
  var result = void 0;
  return function () {
    var context = this;
    var args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};;
/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  $.fn.drupalGetSummary = function () {
    var callback = this.data('summaryCallback');
    return this[0] && callback ? $.trim(callback(this[0])) : '';
  };

  $.fn.drupalSetSummary = function (callback) {
    var self = this;

    if (typeof callback !== 'function') {
      var val = callback;
      callback = function callback() {
        return val;
      };
    }

    return this.data('summaryCallback', callback).off('formUpdated.summary').on('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    }).trigger('summaryUpdated');
  };

  Drupal.behaviors.formSingleSubmit = {
    attach: function attach() {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');
        if (previousValues === formValues) {
          e.preventDefault();
        } else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $('body').once('form-single-submit').on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  function triggerFormUpdated(element) {
    $(element).trigger('formUpdated');
  }

  function fieldsList(form) {
    var $fieldList = $(form).find('[name]').map(function (index, element) {
      return element.getAttribute('id');
    });

    return $.makeArray($fieldList);
  }

  Drupal.behaviors.formUpdated = {
    attach: function attach(context) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      var $forms = (contextIsForm ? $context : $context.find('form')).once('form-updated');
      var formFields = void 0;

      if ($forms.length) {
        $.makeArray($forms).forEach(function (form) {
          var events = 'change.formUpdated input.formUpdated ';
          var eventHandler = debounce(function (event) {
            triggerFormUpdated(event.target);
          }, 300);
          formFields = fieldsList(form).join(',');

          form.setAttribute('data-drupal-form-fields', formFields);
          $(form).on(events, eventHandler);
        });
      }

      if (contextIsForm) {
        formFields = fieldsList(context).join(',');

        var currentFields = $(context).attr('data-drupal-form-fields');

        if (formFields !== currentFields) {
          triggerFormUpdated(context);
        }
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      if (trigger === 'unload') {
        var $forms = (contextIsForm ? $context : $context.find('form')).removeOnce('form-updated');
        if ($forms.length) {
          $.makeArray($forms).forEach(function (form) {
            form.removeAttribute('data-drupal-form-fields');
            $(form).off('.formUpdated');
          });
        }
      }
    }
  };

  Drupal.behaviors.fillUserInfoFromBrowser = {
    attach: function attach(context, settings) {
      var userInfo = ['name', 'mail', 'homepage'];
      var $forms = $('[data-user-info-from-browser]').once('user-info-from-browser');
      if ($forms.length) {
        userInfo.map(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          var browserData = localStorage.getItem('Drupal.visitor.' + info);
          var emptyOrDefault = $element.val() === '' || $element.attr('data-drupal-default-value') === $element.val();
          if ($element.length && emptyOrDefault && browserData) {
            $element.val(browserData);
          }
        });
      }
      $forms.on('submit', function () {
        userInfo.map(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          if ($element.length) {
            localStorage.setItem('Drupal.visitor.' + info, $element.val());
          }
        });
      });
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e) {
    var url = void 0;
    if (e.type === 'click') {
      url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
    } else {
      url = location;
    }
    var hash = url.hash.substr(1);
    if (hash) {
      var $target = $('#' + hash);
      $('body').trigger('formFragmentLinkClickOrHashChange', [$target]);

      setTimeout(function () {
        return $target.trigger('focus');
      }, 300);
    }
  };

  var debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);

  $(window).on('hashchange.form-fragment', debouncedHandleFragmentLinkClickOrHashChange);

  $(document).on('click.form-fragment', 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
})(jQuery, Drupal, Drupal.debounce);;
