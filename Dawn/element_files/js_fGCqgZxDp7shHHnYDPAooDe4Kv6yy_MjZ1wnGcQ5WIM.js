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

(function ($, Drupal, drupalSettings) {
  $(document).ready(function () {
    $.ajax({
      type: 'POST',
      cache: false,
      url: drupalSettings.statistics.url,
      data: drupalSettings.statistics.data
    });
  });
})(jQuery, Drupal, drupalSettings);;
!function(a,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):a.CountUp=n()}(this,function(a,n,t){var e=function(a,n,t,e,i,r){function o(a){var n,t,e,i,r,o,s=a<0;if(a=Math.abs(a).toFixed(l.decimals),a+="",n=a.split("."),t=n[0],e=n.length>1?l.options.decimal+n[1]:"",l.options.useGrouping){for(i="",r=0,o=t.length;r<o;++r)0!==r&&r%3===0&&(i=l.options.separator+i),i=t[o-r-1]+i;t=i}return l.options.numerals.length&&(t=t.replace(/[0-9]/g,function(a){return l.options.numerals[+a]}),e=e.replace(/[0-9]/g,function(a){return l.options.numerals[+a]})),(s?"-":"")+l.options.prefix+t+e+l.options.suffix}function s(a,n,t,e){return t*(-Math.pow(2,-10*a/e)+1)*1024/1023+n}function u(a){return"number"==typeof a&&!isNaN(a)}var l=this;if(l.version=function(){return"1.9.3"},l.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:s,formattingFn:o,prefix:"",suffix:"",numerals:[]},r&&"object"==typeof r)for(var m in l.options)r.hasOwnProperty(m)&&null!==r[m]&&(l.options[m]=r[m]);""===l.options.separator?l.options.useGrouping=!1:l.options.separator=""+l.options.separator;for(var d=0,c=["webkit","moz","ms","o"],f=0;f<c.length&&!window.requestAnimationFrame;++f)window.requestAnimationFrame=window[c[f]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[c[f]+"CancelAnimationFrame"]||window[c[f]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,n){var t=(new Date).getTime(),e=Math.max(0,16-(t-d)),i=window.setTimeout(function(){a(t+e)},e);return d=t+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),l.initialize=function(){return!!l.initialized||(l.error="",l.d="string"==typeof a?document.getElementById(a):a,l.d?(l.startVal=Number(n),l.endVal=Number(t),u(l.startVal)&&u(l.endVal)?(l.decimals=Math.max(0,e||0),l.dec=Math.pow(10,l.decimals),l.duration=1e3*Number(i)||2e3,l.countDown=l.startVal>l.endVal,l.frameVal=l.startVal,l.initialized=!0,!0):(l.error="[CountUp] startVal ("+n+") or endVal ("+t+") is not a number",!1)):(l.error="[CountUp] target is null or undefined",!1))},l.printValue=function(a){var n=l.options.formattingFn(a);"INPUT"===l.d.tagName?this.d.value=n:"text"===l.d.tagName||"tspan"===l.d.tagName?this.d.textContent=n:this.d.innerHTML=n},l.count=function(a){l.startTime||(l.startTime=a),l.timestamp=a;var n=a-l.startTime;l.remaining=l.duration-n,l.options.useEasing?l.countDown?l.frameVal=l.startVal-l.options.easingFn(n,0,l.startVal-l.endVal,l.duration):l.frameVal=l.options.easingFn(n,l.startVal,l.endVal-l.startVal,l.duration):l.countDown?l.frameVal=l.startVal-(l.startVal-l.endVal)*(n/l.duration):l.frameVal=l.startVal+(l.endVal-l.startVal)*(n/l.duration),l.countDown?l.frameVal=l.frameVal<l.endVal?l.endVal:l.frameVal:l.frameVal=l.frameVal>l.endVal?l.endVal:l.frameVal,l.frameVal=Math.round(l.frameVal*l.dec)/l.dec,l.printValue(l.frameVal),n<l.duration?l.rAF=requestAnimationFrame(l.count):l.callback&&l.callback()},l.start=function(a){l.initialize()&&(l.callback=a,l.rAF=requestAnimationFrame(l.count))},l.pauseResume=function(){l.paused?(l.paused=!1,delete l.startTime,l.duration=l.remaining,l.startVal=l.frameVal,requestAnimationFrame(l.count)):(l.paused=!0,cancelAnimationFrame(l.rAF))},l.reset=function(){l.paused=!1,delete l.startTime,l.initialized=!1,l.initialize()&&(cancelAnimationFrame(l.rAF),l.printValue(l.startVal))},l.update=function(a){if(l.initialize()){if(a=Number(a),!u(a))return void(l.error="[CountUp] update() - new endVal is not a number: "+a);l.error="",a!==l.frameVal&&(cancelAnimationFrame(l.rAF),l.paused=!1,delete l.startTime,l.startVal=l.frameVal,l.endVal=a,l.countDown=l.startVal>l.endVal,l.rAF=requestAnimationFrame(l.count))}},l.initialize()&&l.printValue(l.startVal)};return e});;
var saga = {
  scrollY: 0,
  init: function() {
    saga.initCounters();
  },
  initCounters: function() {
    var counters = document.querySelectorAll('.sg-counter');

    var options = {
        useEasing: false, 
        useGrouping: true, 
        separator: ',', 
        decimal: '.', 
      };

    [].map.call(counters, function(counter, i) {
      var start = counter.dataset.start;
      var end = counter.dataset.end;
      var duration = ((counter.dataset.duration % 60000) / 1000).toFixed(0);

      var demo = new CountUp(counter, start, end, 0, duration, options);

      window.addEventListener('scroll', function(e) {
        if (saga.isElementVisible(counter)) demo.start();
      }, false);
    });
  },
  // parallax: function() {
  //   if (window.scrollY !== dawn.scrollY) {
  //     dawn.scrollY = window.scrollY;
  //     var parallax = testimonials;
      
  //     if (dawn.isElementVisible(parallax)) {
  //       parallax.style.backgroundPositionY = (window.pageYOffset - parallax.offsetTop) / 5 + 'px';
  //     } 
  //     else {
  //       parallax.style.backgroundPositionY= '0';
  //     }
  //   }
  //   window.requestAnimationFrame(dawn.parallax);
  // },
  isElementVisible: function(el) {
    var scrolledHeight = window.pageYOffset;
    var posFromTop = el.getBoundingClientRect().top

    return posFromTop - window.innerHeight <= 0;
  }
}

saga.init();;
