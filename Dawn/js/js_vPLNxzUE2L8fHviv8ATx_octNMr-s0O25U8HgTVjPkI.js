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
/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c("object"==typeof exports?require("jquery"):a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(window),function(){"use strict";function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a,b){function c(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function d(){}function e(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=h.length;c>b;b++){var d=h[b];a[d]=0}return a}function f(b){function d(){if(!m){m=!0;var d=a.getComputedStyle;if(j=function(){var a=d?function(a){return d(a,null)}:function(a){return a.currentStyle};return function(b){var c=a(b);return c||g("Style returned "+c+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),c}}(),k=b("boxSizing")){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[k]="border-box";var f=document.body||document.documentElement;f.appendChild(e);var h=j(e);l=200===c(h.width),f.removeChild(e)}}}function f(a){if(d(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var b=j(a);if("none"===b.display)return e();var f={};f.width=a.offsetWidth,f.height=a.offsetHeight;for(var g=f.isBorderBox=!(!k||!b[k]||"border-box"!==b[k]),m=0,n=h.length;n>m;m++){var o=h[m],p=b[o];p=i(a,p);var q=parseFloat(p);f[o]=isNaN(q)?0:q}var r=f.paddingLeft+f.paddingRight,s=f.paddingTop+f.paddingBottom,t=f.marginLeft+f.marginRight,u=f.marginTop+f.marginBottom,v=f.borderLeftWidth+f.borderRightWidth,w=f.borderTopWidth+f.borderBottomWidth,x=g&&l,y=c(b.width);y!==!1&&(f.width=y+(x?0:r+v));var z=c(b.height);return z!==!1&&(f.height=z+(x?0:s+w)),f.innerWidth=f.width-(r+v),f.innerHeight=f.height-(s+w),f.outerWidth=f.width+t,f.outerHeight=f.height+u,f}}function i(b,c){if(a.getComputedStyle||-1===c.indexOf("%"))return c;var d=b.style,e=d.left,f=b.runtimeStyle,g=f&&f.left;return g&&(f.left=b.currentStyle.left),d.left=c,c=d.pixelLeft,d.left=e,g&&(f.left=g),c}var j,k,l,m=!1;return f}var g="undefined"==typeof console?d:function(a){console.error(a)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],f):"object"==typeof exports?module.exports=f(require("desandro-get-style-property")):a.getSize=f(a.getStyleProperty)}(window),function(a){function b(a){"function"==typeof a&&(b.isReady?a():g.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==f.readyState;b.isReady||c||d()}function d(){b.isReady=!0;for(var a=0,c=g.length;c>a;a++){var d=g[a];d()}}function e(e){return"complete"===f.readyState?d():(e.bind(f,"DOMContentLoaded",c),e.bind(f,"readystatechange",c),e.bind(a,"load",c)),b}var f=a.document,g=[];b.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],e):"object"==typeof exports?module.exports=e(require("eventie")):a.docReady=e(a.eventie)}(window),function(a){"use strict";function b(a,b){return a[g](b)}function c(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function d(a,b){c(a);for(var d=a.parentNode.querySelectorAll(b),e=0,f=d.length;f>e;e++)if(d[e]===a)return!0;return!1}function e(a,d){return c(a),b(a,d)}var f,g=function(){if(a.matches)return"matches";if(a.matchesSelector)return"matchesSelector";for(var b=["webkit","moz","ms","o"],c=0,d=b.length;d>c;c++){var e=b[c],f=e+"MatchesSelector";if(a[f])return f}}();if(g){var h=document.createElement("div"),i=b(h,"div");f=i?b:e}else f=d;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return f}):"object"==typeof exports?module.exports=f:window.matchesSelector=f}(Element.prototype),function(a,b){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(c,d){return b(a,c,d)}):"object"==typeof exports?module.exports=b(a,require("doc-ready"),require("desandro-matches-selector")):a.fizzyUIUtils=b(a,a.docReady,a.matchesSelector)}(window,function(a,b,c){var d={};d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.modulo=function(a,b){return(a%b+b)%b};var e=Object.prototype.toString;d.isArray=function(a){return"[object Array]"==e.call(a)},d.makeArray=function(a){var b=[];if(d.isArray(a))b=a;else if(a&&"number"==typeof a.length)for(var c=0,e=a.length;e>c;c++)b.push(a[c]);else b.push(a);return b},d.indexOf=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},d.removeFrom=function(a,b){var c=d.indexOf(a,b);-1!=c&&a.splice(c,1)},d.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1==a.nodeType&&"string"==typeof a.nodeName},d.setText=function(){function a(a,c){b=b||(void 0!==document.documentElement.textContent?"textContent":"innerText"),a[b]=c}var b;return a}(),d.getParent=function(a,b){for(;a!=document.body;)if(a=a.parentNode,c(a,b))return a},d.getQueryElement=function(a){return"string"==typeof a?document.querySelector(a):a},d.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},d.filterFindElements=function(a,b){a=d.makeArray(a);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f];if(d.isElement(h))if(b){c(h,b)&&e.push(h);for(var i=h.querySelectorAll(b),j=0,k=i.length;k>j;j++)e.push(i[j])}else e.push(h)}return e},d.debounceMethod=function(a,b,c){var d=a.prototype[b],e=b+"Timeout";a.prototype[b]=function(){var a=this[e];a&&clearTimeout(a);var b=arguments,f=this;this[e]=setTimeout(function(){d.apply(f,b),delete f[e]},c||100)}},d.toDashed=function(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()};var f=a.console;return d.htmlInit=function(c,e){b(function(){for(var b=d.toDashed(e),g=document.querySelectorAll(".js-"+b),h="data-"+b+"-options",i=0,j=g.length;j>i;i++){var k,l=g[i],m=l.getAttribute(h);try{k=m&&JSON.parse(m)}catch(n){f&&f.error("Error parsing "+h+" on "+l.nodeName.toLowerCase()+(l.id?"#"+l.id:"")+": "+n);continue}var o=new c(l,k),p=a.jQuery;p&&p.data(l,e,o)}})},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(c,d,e,f){return b(a,c,d,e,f)}):"object"==typeof exports?module.exports=b(a,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(a.Outlayer={},a.Outlayer.Item=b(a,a.EventEmitter,a.getSize,a.getStyleProperty,a.fizzyUIUtils))}(window,function(a,b,c,d,e){"use strict";function f(a){for(var b in a)return!1;return b=null,!0}function g(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}function h(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}var i=a.getComputedStyle,j=i?function(a){return i(a,null)}:function(a){return a.currentStyle},k=d("transition"),l=d("transform"),m=k&&l,n=!!d("perspective"),o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[k],p=["transform","transition","transitionDuration","transitionProperty"],q=function(){for(var a={},b=0,c=p.length;c>b;b++){var e=p[b],f=d(e);f&&f!==e&&(a[e]=f)}return a}();e.extend(g.prototype,b.prototype),g.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.getSize=function(){this.size=c(this.element)},g.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=q[c]||c;b[d]=a[c]}},g.prototype.getPosition=function(){var a=j(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=a[c?"left":"right"],f=a[d?"top":"bottom"],g=this.layout.size,h=-1!=e.indexOf("%")?parseFloat(e)/100*g.width:parseInt(e,10),i=-1!=f.indexOf("%")?parseFloat(f)/100*g.height:parseInt(f,10);h=isNaN(h)?0:h,i=isNaN(i)?0:i,h-=c?g.paddingLeft:g.paddingRight,i-=d?g.paddingTop:g.paddingBottom,this.position.x=h,this.position.y=i},g.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={},d=b.isOriginLeft?"paddingLeft":"paddingRight",e=b.isOriginLeft?"left":"right",f=b.isOriginLeft?"right":"left",g=this.position.x+a[d];c[e]=this.getXValue(g),c[f]="";var h=b.isOriginTop?"paddingTop":"paddingBottom",i=b.isOriginTop?"top":"bottom",j=b.isOriginTop?"bottom":"top",k=this.position.y+a[h];c[i]=this.getYValue(k),c[j]="",this.css(c),this.emitEvent("layout",[this])},g.prototype.getXValue=function(a){var b=this.layout.options;return b.percentPosition&&!b.isHorizontal?a/this.layout.size.width*100+"%":a+"px"},g.prototype.getYValue=function(a){var b=this.layout.options;return b.percentPosition&&b.isHorizontal?a/this.layout.size.height*100+"%":a+"px"},g.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={};j.transform=this.getTranslate(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},g.prototype.getTranslate=function(a,b){var c=this.layout.options;return a=c.isOriginLeft?a:-a,b=c.isOriginTop?b:-b,n?"translate3d("+a+"px, "+b+"px, 0)":"translate("+a+"px, "+b+"px)"},g.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},g.prototype.moveTo=m?g.prototype._transitionTo:g.prototype.goTo,g.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},g.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},g.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var r="opacity,"+h(q.transform||"transform");g.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:r,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(o,this,!1))},g.prototype.transition=g.prototype[k?"_transition":"_nonTransition"],g.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},g.prototype.onotransitionend=function(a){this.ontransitionend(a)};var s={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};g.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,c=s[a.propertyName]||a.propertyName;if(delete b.ingProperties[c],f(b.ingProperties)&&this.disableTransition(),c in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[c]),c in b.onEnd){var d=b.onEnd[c];d.call(this),delete b.onEnd[c]}this.emitEvent("transitionEnd",[this])}},g.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(o,this,!1),this.isTransitioning=!1},g.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var t={transitionProperty:"",transitionDuration:""};return g.prototype.removeTransitionStyles=function(){this.css(t)},g.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},g.prototype.remove=function(){if(!k||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.once("transitionEnd",function(){a.removeElem()}),this.hide()},g.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("visibleStyle");b[c]=this.onRevealTransitionEnd,this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},g.prototype.getHideRevealTransitionEndProperty=function(a){var b=this.layout.options[a];if(b.opacity)return"opacity";for(var c in b)return c},g.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("hiddenStyle");b[c]=this.onHideTransitionEnd,this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},g.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},g}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,d,e,f,g){return b(a,c,d,e,f,g)}):"object"==typeof exports?module.exports=b(a,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):a.Outlayer=b(a,a.eventie,a.EventEmitter,a.getSize,a.fizzyUIUtils,a.Outlayer.Item)}(window,function(a,b,c,d,e,f){"use strict";function g(a,b){var c=e.getQueryElement(a);if(!c)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(c||a)));this.element=c,i&&(this.$element=i(this.element)),this.options=e.extend({},this.constructor.defaults),this.option(b);var d=++k;this.element.outlayerGUID=d,l[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var h=a.console,i=a.jQuery,j=function(){},k=0,l={};return g.namespace="outlayer",g.Item=f,g.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e.extend(g.prototype,c.prototype),g.prototype.option=function(a){e.extend(this.options,a)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},g.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},g.prototype._filterFindItemElements=function(a){return e.filterFindElements(a,this.options.itemSelector)},g.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=d(this.element)},g.prototype._getMeasurement=function(a,b){var c,f=this.options[a];f?("string"==typeof f?c=this.element.querySelector(f):e.isElement(f)&&(c=f),this[a]=c?d(c)[b]:f):this[a]=0},g.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},g.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},g.prototype._layoutItems=function(a,b){if(this._emitCompleteOnItems("layout",a),a&&a.length){for(var c=[],d=0,e=a.length;e>d;d++){var f=a[d],g=this._getItemLayoutPosition(f);g.item=f,g.isInstant=b||f.isLayoutInstant,c.push(g)}this._processLayoutQueue(c)}},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},g.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},g.prototype._postLayout=function(){this.resizeContainer()},g.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},g.prototype._getContainerSize=j,g.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},g.prototype._emitCompleteOnItems=function(a,b){function c(){e.dispatchEvent(a+"Complete",null,[b])}function d(){g++,g===f&&c()}var e=this,f=b.length;if(!b||!f)return void c();for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h];j.once(a,d)}},g.prototype.dispatchEvent=function(a,b,c){var d=b?[b].concat(c):c;if(this.emitEvent(a,d),i)if(this.$element=this.$element||i(this.element),b){var e=i.Event(b);e.type=a,this.$element.trigger(e,c)}else this.$element.trigger(a,c)},g.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},g.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},g.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},g.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e.removeFrom(this.stamps,d),this.unignore(d)}},g.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=e.makeArray(a)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},g.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},g.prototype._manageStamp=j,g.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,e=d(a),f={left:b.left-c.left-e.marginLeft,top:b.top-c.top-e.marginTop,right:c.right-b.right-e.marginRight,bottom:c.bottom-b.bottom-e.marginBottom};return f},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.bindResize=function(){this.isResizeBound||(b.bind(a,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){this.isResizeBound&&b.unbind(a,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},g.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},g.prototype.needsResizeLayout=function(){var a=d(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},g.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},g.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},g.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},g.prototype.reveal=function(a){this._emitCompleteOnItems("reveal",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.reveal()}},g.prototype.hide=function(a){this._emitCompleteOnItems("hide",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.hide()}},g.prototype.revealItemElements=function(a){var b=this.getItems(a);this.reveal(b)},g.prototype.hideItemElements=function(a){var b=this.getItems(a);this.hide(b)},g.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},g.prototype.getItems=function(a){a=e.makeArray(a);for(var b=[],c=0,d=a.length;d>c;c++){var f=a[c],g=this.getItem(f);g&&b.push(g)}return b},g.prototype.remove=function(a){var b=this.getItems(a);if(this._emitCompleteOnItems("remove",b),b&&b.length)for(var c=0,d=b.length;d>c;c++){var f=b[c];f.remove(),e.removeFrom(this.items,f)}},g.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize();var e=this.element.outlayerGUID;delete l[e],delete this.element.outlayerGUID,i&&i.removeData(this.element,this.constructor.namespace)},g.data=function(a){a=e.getQueryElement(a);var b=a&&a.outlayerGUID;return b&&l[b]},g.create=function(a,b){function c(){g.apply(this,arguments)}return Object.create?c.prototype=Object.create(g.prototype):e.extend(c.prototype,g.prototype),c.prototype.constructor=c,c.defaults=e.extend({},g.defaults),e.extend(c.defaults,b),c.prototype.settings={},c.namespace=a,c.data=g.data,c.Item=function(){f.apply(this,arguments)},c.Item.prototype=new f,e.htmlInit(c,a),i&&i.bridget&&i.bridget(a,c),c},g.Item=f,g}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],b):"object"==typeof exports?module.exports=b(require("outlayer")):(a.Isotope=a.Isotope||{},a.Isotope.Item=b(a.Outlayer))}(window,function(a){"use strict";function b(){a.Item.apply(this,arguments)}b.prototype=new a.Item,b.prototype._create=function(){this.id=this.layout.itemGUID++,a.Item.prototype._create.call(this),this.sortData={}},b.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var a=this.layout.options.getSortData,b=this.layout._sorters;for(var c in a){var d=b[c];this.sortData[c]=d(this.element,this)}}};var c=b.prototype.destroy;return b.prototype.destroy=function(){c.apply(this,arguments),this.css({display:""})},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],b):"object"==typeof exports?module.exports=b(require("get-size"),require("outlayer")):(a.Isotope=a.Isotope||{},a.Isotope.LayoutMode=b(a.getSize,a.Outlayer))}(window,function(a,b){"use strict";function c(a){this.isotope=a,a&&(this.options=a.options[this.namespace],this.element=a.element,this.items=a.filteredItems,this.size=a.size)}return function(){function a(a){return function(){return b.prototype[a].apply(this.isotope,arguments)}}for(var d=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],e=0,f=d.length;f>e;e++){var g=d[e];c.prototype[g]=a(g)}}(),c.prototype.needsVerticalResizeLayout=function(){var b=a(this.isotope.element),c=this.isotope.size&&b;return c&&b.innerHeight!=this.isotope.size.innerHeight},c.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},c.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},c.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},c.prototype.getSegmentSize=function(a,b){var c=a+b,d="outer"+b;if(this._getMeasurement(c,d),!this[c]){var e=this.getFirstItemSize();this[c]=e&&e[d]||this.isotope.size["inner"+b]}},c.prototype.getFirstItemSize=function(){var b=this.isotope.filteredItems[0];return b&&b.element&&a(b.element)},c.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},c.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},c.modes={},c.create=function(a,b){function d(){c.apply(this,arguments)}return d.prototype=new c,b&&(d.options=b),d.prototype.namespace=a,c.modes[a]=d,d},c}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],b):"object"==typeof exports?module.exports=b(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):a.Masonry=b(a.Outlayer,a.getSize,a.fizzyUIUtils)}(window,function(a,b,c){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}var d=this.columnWidth+=this.gutter,e=this.containerWidth+this.gutter,f=e/d,g=d-e%d,h=g&&1>g?"round":"floor";f=Math[h](f),this.cols=Math.max(f,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c.indexOf(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],b):"object"==typeof exports?module.exports=b(require("../layout-mode"),require("masonry-layout")):b(a.Isotope.LayoutMode,a.Masonry)}(window,function(a,b){"use strict";function c(a,b){for(var c in b)a[c]=b[c];return a}var d=a.create("masonry"),e=d.prototype._getElementOffset,f=d.prototype.layout,g=d.prototype._getMeasurement;
c(d.prototype,b.prototype),d.prototype._getElementOffset=e,d.prototype.layout=f,d.prototype._getMeasurement=g;var h=d.prototype.measureColumns;d.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,h.call(this)};var i=d.prototype._manageStamp;return d.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,i.apply(this,arguments)},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],b):"object"==typeof exports?module.exports=b(require("../layout-mode")):b(a.Isotope.LayoutMode)}(window,function(a){"use strict";var b=a.create("fitRows");return b.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},b.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth+this.gutter,c=this.isotope.size.innerWidth+this.gutter;0!==this.x&&b+this.x>c&&(this.x=0,this.y=this.maxY);var d={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+a.size.outerHeight),this.x+=b,d},b.prototype._getContainerSize=function(){return{height:this.maxY}},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],b):"object"==typeof exports?module.exports=b(require("../layout-mode")):b(a.Isotope.LayoutMode)}(window,function(a){"use strict";var b=a.create("vertical",{horizontalAlignment:0});return b.prototype._resetLayout=function(){this.y=0},b.prototype._getItemLayoutPosition=function(a){a.getSize();var b=(this.isotope.size.innerWidth-a.size.outerWidth)*this.options.horizontalAlignment,c=this.y;return this.y+=a.size.outerHeight,{x:b,y:c}},b.prototype._getContainerSize=function(){return{height:this.y}},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(c,d,e,f,g,h){return b(a,c,d,e,f,g,h)}):"object"==typeof exports?module.exports=b(a,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("./item"),require("./layout-mode"),require("./layout-modes/masonry"),require("./layout-modes/fit-rows"),require("./layout-modes/vertical")):a.Isotope=b(a,a.Outlayer,a.getSize,a.matchesSelector,a.fizzyUIUtils,a.Isotope.Item,a.Isotope.LayoutMode)}(window,function(a,b,c,d,e,f,g){function h(a,b){return function(c,d){for(var e=0,f=a.length;f>e;e++){var g=a[e],h=c.sortData[g],i=d.sortData[g];if(h>i||i>h){var j=void 0!==b[g]?b[g]:b,k=j?1:-1;return(h>i?1:-1)*k}}return 0}}var i=a.jQuery,j=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^\s+|\s+$/g,"")},k=document.documentElement,l=k.textContent?function(a){return a.textContent}:function(a){return a.innerText},m=b.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});m.Item=f,m.LayoutMode=g,m.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),b.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var a in g.modes)this._initLayoutMode(a)},m.prototype.reloadItems=function(){this.itemGUID=0,b.prototype.reloadItems.call(this)},m.prototype._itemize=function(){for(var a=b.prototype._itemize.apply(this,arguments),c=0,d=a.length;d>c;c++){var e=a[c];e.id=this.itemGUID++}return this._updateItemsSortData(a),a},m.prototype._initLayoutMode=function(a){var b=g.modes[a],c=this.options[a]||{};this.options[a]=b.options?e.extend(b.options,c):c,this.modes[a]=new b(this)},m.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?void this.arrange():void this._layout()},m.prototype._layout=function(){var a=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,a),this._isLayoutInited=!0},m.prototype.arrange=function(a){function b(){d.reveal(c.needReveal),d.hide(c.needHide)}this.option(a),this._getIsInstant();var c=this._filter(this.items);this.filteredItems=c.matches;var d=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(b):b(),this._sort(),this._layout()},m.prototype._init=m.prototype.arrange,m.prototype._getIsInstant=function(){var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=a,a},m.prototype._bindArrangeComplete=function(){function a(){b&&c&&d&&e.dispatchEvent("arrangeComplete",null,[e.filteredItems])}var b,c,d,e=this;this.once("layoutComplete",function(){b=!0,a()}),this.once("hideComplete",function(){c=!0,a()}),this.once("revealComplete",function(){d=!0,a()})},m.prototype._filter=function(a){var b=this.options.filter;b=b||"*";for(var c=[],d=[],e=[],f=this._getFilterTest(b),g=0,h=a.length;h>g;g++){var i=a[g];if(!i.isIgnored){var j=f(i);j&&c.push(i),j&&i.isHidden?d.push(i):j||i.isHidden||e.push(i)}}return{matches:c,needReveal:d,needHide:e}},m.prototype._getFilterTest=function(a){return i&&this.options.isJQueryFiltering?function(b){return i(b.element).is(a)}:"function"==typeof a?function(b){return a(b.element)}:function(b){return d(b.element,a)}},m.prototype.updateSortData=function(a){var b;a?(a=e.makeArray(a),b=this.getItems(a)):b=this.items,this._getSorters(),this._updateItemsSortData(b)},m.prototype._getSorters=function(){var a=this.options.getSortData;for(var b in a){var c=a[b];this._sorters[b]=n(c)}},m.prototype._updateItemsSortData=function(a){for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.updateSortData()}};var n=function(){function a(a){if("string"!=typeof a)return a;var c=j(a).split(" "),d=c[0],e=d.match(/^\[(.+)\]$/),f=e&&e[1],g=b(f,d),h=m.sortDataParsers[c[1]];return a=h?function(a){return a&&h(g(a))}:function(a){return a&&g(a)}}function b(a,b){var c;return c=a?function(b){return b.getAttribute(a)}:function(a){var c=a.querySelector(b);return c&&l(c)}}return a}();m.sortDataParsers={parseInt:function(a){return parseInt(a,10)},parseFloat:function(a){return parseFloat(a)}},m.prototype._sort=function(){var a=this.options.sortBy;if(a){var b=[].concat.apply(a,this.sortHistory),c=h(b,this.options.sortAscending);this.filteredItems.sort(c),a!=this.sortHistory[0]&&this.sortHistory.unshift(a)}},m.prototype._mode=function(){var a=this.options.layoutMode,b=this.modes[a];if(!b)throw new Error("No layout mode: "+a);return b.options=this.options[a],b},m.prototype._resetLayout=function(){b.prototype._resetLayout.call(this),this._mode()._resetLayout()},m.prototype._getItemLayoutPosition=function(a){return this._mode()._getItemLayoutPosition(a)},m.prototype._manageStamp=function(a){this._mode()._manageStamp(a)},m.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},m.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},m.prototype.appended=function(a){var b=this.addItems(a);if(b.length){var c=this._filterRevealAdded(b);this.filteredItems=this.filteredItems.concat(c)}},m.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){this._resetLayout(),this._manageStamps();var c=this._filterRevealAdded(b);this.layoutItems(this.filteredItems),this.filteredItems=c.concat(this.filteredItems),this.items=b.concat(this.items)}},m.prototype._filterRevealAdded=function(a){var b=this._filter(a);return this.hide(b.needHide),this.reveal(b.matches),this.layoutItems(b.matches,!0),b.matches},m.prototype.insert=function(a){var b=this.addItems(a);if(b.length){var c,d,e=b.length;for(c=0;e>c;c++)d=b[c],this.element.appendChild(d.element);var f=this._filter(b).matches;for(c=0;e>c;c++)b[c].isLayoutInstant=!0;for(this.arrange(),c=0;e>c;c++)delete b[c].isLayoutInstant;this.reveal(f)}};var o=m.prototype.remove;return m.prototype.remove=function(a){a=e.makeArray(a);var b=this.getItems(a);o.call(this,a);var c=b&&b.length;if(c)for(var d=0;c>d;d++){var f=b[d];e.removeFrom(this.filteredItems,f)}},m.prototype.shuffle=function(){for(var a=0,b=this.items.length;b>a;a++){var c=this.items[a];c.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},m.prototype._noTransition=function(a){var b=this.options.transitionDuration;this.options.transitionDuration=0;var c=a.call(this);return this.options.transitionDuration=b,c},m.prototype.getFilteredItemElements=function(){for(var a=[],b=0,c=this.filteredItems.length;c>b;b++)a.push(this.filteredItems[b].element);return a},m});

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

jQuery(document).ready(function ($) {

    var $container = $('.sl-grid');
    
    // $container.find('.sl-grid-item').each(function() {
    //   var filterable = $(this).find('.sl-filterable').text();
    //   var terms = $.trim(filterable);

    //   terms = terms.replace(/\s+/g, '-').toLowerCase();
    //   terms = terms.split(',-').join(' ');

    //   $(this).addClass(terms);
    // });

    $container.isotope({
      itemSelector: '.sl-grid-item',
			masonry: {
				columnWidth: '.sl-grid-item'
			}
    });

    $('.sl-filter li a').click(function () {
        var selector = $(this).attr('data-filter');

        $('.sl-filter li a').removeClass('active');
        $(this).addClass('active');

        $container.isotope({
          filter: selector
        });

        return false;
    });

		$container.imagesLoaded().progress(function() {
			$container.isotope('layout');
		});

    $('body').bind('touchstart', function(e) {
      if (!e.target.classList.contains('sl-grid-hover')) {
        $('.sl-grid-hover').removeClass('sl-grid-hover');
      }
    });
		$('.sl-hover').bind('touchstart', function(e) {
      e.preventDefault();
      $('.sl-grid-hover').removeClass('sl-grid-hover');
      $(this).addClass('sl-grid-hover');
    });

		$('.sl-hover a').bind('touchstart touchend', function(e) {
			if($(this).hasClass('spotlite'))
				$(this).click();
			else if($(this).hasClass('sl-link-hover'))
				window.location.href = $(this).attr('href');

			$(this).toggleClass('sl-link-hover');
    });

});
;
  /*
   * Spotlite jQuery Plugin v1.0
   * Requires: jQuery v1.7+
   * Copyright 2014, Theme Boutique
   * License Terms: http://themeforest.net/licenses/terms/regular
   *
   */

jQuery(document).ready(function(t){function i(i,s){this.$slider=t(i),this.settings=t.extend({},a,s),this.$slides=this.$slider.find("> li"),this.totalSlides=this.$slides.length,this.currentPlace=this.settings.startSlide,this.$active=t(this.$slides[this.currentPlace]),this.inProgress=!1,this.$sliderWrap=this.$slider.wrap('<div class="sl-wrap" />').parent(),this.$sliderBG=this.$slider.parent(),this.settings.carousel=this,this.init()}function s(t,i,s){var e=this;e.spotlite=t,e.spotlite.inProgress=!0,e.forward=s,e.transition=i,e.fallback3d=e.spotlite.settings.fallback3d,e.init()}var e="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";t.fn.imagesLoaded=function(i){function s(){var s=t(c),e=t(h);o&&(h.length?o.reject(l,s,e):o.resolve(l)),t.isFunction(i)&&i.call(n,l,s,e)}function a(i,a){i.src!==e&&-1===t.inArray(i,d)&&(d.push(i),a?h.push(i):c.push(i),t.data(i,"imagesLoaded",{isBroken:a,src:i.src}),r&&o.notifyWith(t(i),[a,l,t(c),t(h)]),l.length===d.length&&(setTimeout(s),l.unbind(".imagesLoaded")))}var n=this,o=t.isFunction(t.Deferred)?t.Deferred():0,r=t.isFunction(o.notify),l=n.find("img").add(n.filter("img")),d=[],c=[],h=[];return l.length?l.bind("load.imagesLoaded error.imagesLoaded",function(t){a(t.target,"error"===t.type)}).each(function(i,s){var n=s.src,o=t.data(s,"imagesLoaded");return o&&o.src===n?void a(s,o.isBroken):s.complete&&void 0!==s.naturalWidth?void a(s,0===s.naturalWidth||0===s.naturalHeight):void((s.readyState||s.complete)&&(s.src=e,s.src=n))}):s(),o?o.promise(n):n},function(t){t.fn.touchwipe=function(i){var s={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:!0};return i&&t.extend(s,i),this.each(function(){function t(){this.removeEventListener("touchmove",i),a=null,o=!1}function i(i){if(s.preventDefaultEvents&&i.preventDefault(),o){var e=i.touches[0].pageX,r=i.touches[0].pageY,l=a-e,d=n-r;Math.abs(l)>=s.min_move_x?(t(),l>0?s.wipeLeft():s.wipeRight()):Math.abs(d)>=s.min_move_y&&(t(),d>0?s.wipeDown():s.wipeUp())}}function e(t){1==t.touches.length&&(a=t.touches[0].pageX,n=t.touches[0].pageY,o=!0,this.addEventListener("touchmove",i,!1))}var a,n,o=!1;"ontouchstart"in document.documentElement&&this.addEventListener("touchstart",e,!1)}),this}}(jQuery);var a={type:"slider",transition:"fade",fallback3d:"fade",controls:"null",timer:"null",autoPlay:!1,delay:5e3,transitionDuration:300,startSlide:0,keyNav:!0,onInit:function(){},onChange:function(){},afterChange:function(){}};i.prototype={init:function(){var i=this;i.ie()<9&&t("body").addClass("ie8"),i.settings.onInit(),i.captions(),"thumbs"===i.settings.controls&&this.setArrows(),i.settings.timer&&this.setTimer(this.settings.timer),i.settings.keyNav&&this.setKeys();for(var s=0;s<this.totalSlides;s++)t(i.$slides[s]).attr("class","sl-slide-"+s);i.settings.autoPlay&&(i.setAutoPlay(),i.$slider.on("mouseenter",function(){i.pause()}),i.$slider.on("mouseleave",function(){0==i.$active.hasClass("animate-out")&&i.resume()}));var e=t(this.$slides).find("img:eq(0)").addClass("sl-slide-image"),a=[];t(e).imagesLoaded(function(){for(var s=0;s<i.totalSlides;s++)a.push(t(e[s]).clone().css({position:"absolute",visibility:"hidden",display:"block"}).appendTo(i.$slider));setTimeout(function(){i.setup(a)},0),setTimeout(function(){t("body").removeClass("images-loading")},0)}),i.$active.addClass("first-slide"),i.videos(),"lightbox"==this.settings.type?(t(window).resize(function(){i.setHeight()}),i.initLightbox()):t(window).resize(function(){i.setSlideHeight()})},initLightbox:function(){var i=this;i.$slider.parent().addClass("sl-lightbox-wrap"),i.$slider.append('<div class="sl-navbar"><div class="sl-controls"><div class="sl-icon-cancel" /></div></div><div class="sl-loading" />'),t("body").addClass("sl-initialized")},setup:function(i){var s=this;1==s.touchDevice()&&t("html").addClass("sl-touch-enabled"),"lightbox"==s.settings.type?s.setHeight():s.setSlideHeight(),"thumbs"===this.settings.controls&&this.setThumbs(i),setTimeout(function(){s.$active.css({"z-index":2}).addClass("active").removeClass("first-slide"),t("body").removeClass("images-loading")},1),t(".sl-icon-cancel").click(function(){clearTimeout(s.cycling),s.$sliderWrap.remove(),t("html").removeClass("sl-noscroll"),t("body").removeClass("sl-enabled sl-initialized")})},setArrows:function(){var i=this;i.$sliderWrap.append('<a href="#" class="sl-icon-left-open"></a><a href="#" class="sl-icon-right-open"></a>'),t(".sl-icon-right-open",i.$sliderWrap).on("click",function(t){t.preventDefault(),i.next()}),t(".sl-icon-left-open",i.$sliderWrap).on("click",function(t){t.preventDefault(),i.prev()})},setHeight:function(){var i=this;"thumbs"===i.settings.controls&&t(".sl-lightbox").css("height",t(window).height()-76),i.$slides.each(function(){caption=t(this).find(".sl-caption"),left=t(window).width()/2-caption.outerWidth()/2,height=t(this).find("img").height(),width=t(this).find("img").width(),t(this).find("img").css({"margin-top":"-"+height/2+"px"}),t(this).find(".sl-youtube").css({"margin-top":"-"+height/2+"px",height:height}),t(this).find(".sl-vimeo").css({"margin-top":"-"+height/2+"px",height:height}),caption.css("left",left+"px"),0==i.touchDevice()&&t(this).find(".sl-video").css({"margin-top":"-"+height/2+"px","margin-left":"-"+width/2+"px",height:height,width:width})})},setSlideHeight:function(){_sl=this,screenSize=window.innerWidth,width=1280,height=500,screenSize<width?(percentage=screenSize/width,newHeight=Math.floor(height*percentage),_sl.$sliderWrap.css("height",newHeight)):_sl.$sliderWrap.css("height",height)},touchDevice:function(){return"ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.MaxTouchPoints>0},ie:function(){for(var t,i=3,s=document.createElement("div"),e=s.getElementsByTagName("i");s.innerHTML="<!--[if gt IE "+ ++i+"]><i></i><![endif]-->",e[0];);return i>4?i:t},next:function(){this.currentPlace==this.totalSlides-1?this.transition(0,!0):this.transition(+this.currentPlace+1,!0)},prev:function(){0==this.currentPlace?this.transition(this.totalSlides-1,!1):this.transition(this.currentPlace-1,!1)},setKeys:function(){var i=this;t(document).on("keydown",function(t){39===t.keyCode?i.next():37===t.keyCode&&i.prev()})},setAutoPlay:function(){var i,s=this,e=s.settings.delay;t(".sl-timer").stop(!0,!1).css("width","0%"),s.pause=function(){clearTimeout(s.timerId),e-=new Date-i,perc=t(".sl-timer").css("width"),t(".sl-timer").stop(!0,!1).css("width",perc+"%")},s.resume=function(){i=new Date,t(".sl-timer").animate({width:"101%"},e,"linear"),clearTimeout(s.timerId),s.timerId=setTimeout(function(){s.next()},e)},s.resume()},setTimer:function(t){_sl=this,type=t,"bar"==t&&_sl.$sliderWrap.append('<div class="sl-timer-wrap"><div class="sl-timer"/></div>')},setThumbs:function(i){var s=this,e=0;this.$thumbWrap=t('<div class="sl-thumb-wrap" />').appendTo(this.$sliderWrap);for(var a=0;a<this.totalSlides;a++){var n=t('<a class="sl-slide-link-'+a+'" />').css({width:"92px",height:"70px","background-image":"url("+t(i[a]).attr("src")+")"}).attr({href:"#","data-thumb-id":a});t(i[a]).remove(),n.appendTo(this.$thumbWrap),e++}t(this.$thumbWrap.find("a")[this.settings.startSlide]).addClass("active"),this.$thumbWrap.hover(function(){t(document).bind("mousemove",function(i){var a=t(window).width()+i.pageX,n=94*e;n>=a&&s.$thumbWrap.css({left:-i.pageX,marginLeft:0,width:"auto"})})},function(){t(document).unbind("mousemove")}),this.$thumbWrap.css({"margin-left":"-"+t(this.$thumbWrap).outerWidth()/2+"px"}).on("click","a",function(i){i.preventDefault();var e=parseInt(t(this).attr("class").split("-")[3]);s.transition(e)})},videos:function(){_sl=this,t(".sl-vimeo, .sl-youtube").each(function(){var i=t(this),s=i.parent(),e=i.parent().find("img").hide(),a=i.attr("class"),n=i.attr("data-src");"sl-vimeo"==a&&(API=n+".json?callback=?",e.addClass("sl-vimeo-thumb"),vPath="https://player.vimeo.com/video/"+n+"?title=0&byline=0&portrait=0&autoplay=1",lastVimeo=t(".sl-lightbox").find(".sl-vimeo").last().parent().attr("data-sl-id")),"sl-youtube"==a&&(API="https://gdata.youtube.com/feeds/api/videos/"+n+"?v=2&alt=json-in-script&callback=?",e.addClass("sl-youtube-thumb"),yPath="http://www.youtube.com/embed/"+n+"?rel=0&autoplay=1",lastYoutube=t(".sl-lightbox").find(".sl-youtube").last().parent().attr("data-sl-id")),0==_sl.touchDevice()?(i.css({"background-image":"url("+e.attr("src")+")"}),i.click(function(){i.css("display","none"),width=s.find("img").width(),height=s.find("img").height(),url="sl-youtube"==a?yPath:vPath,t(this).css("visibility","hidden"),t(this).after('<iframe width="'+width+'" height="'+height+'" src="'+url+'" style="margin-top: -'+height/2+"px; margin-left: -"+width/2+'px;" class="sl-video" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')})):(t(".sl-play").hide(),url="sl-youtube"==a?yPath:vPath,s.find("img").replaceWith('<iframe class="sl-video" src="'+url+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')),"sl-vimeo"==a&&s.attr("data-sl-id")==lastVimeo&&(t("body").removeClass("vimeo-preloader"),t("body").hasClass("youtube-preloader")||t("body").addClass("sl-initialized")),"sl-youtube"==a&&s.attr("data-sl-id")==lastYoutube&&(t("body").removeClass("youtube-preloader"),t("body").hasClass("vimeo-preloader")||t("body").addClass("sl-initialized"))})},captions:function(){_sl=this,captions=_sl.$slides.find(".sl-caption"),captions.each(function(){caption=t(this),"slider"==_sl.settings.type&&caption.css({left:caption.attr("data-x")+"px",top:caption.attr("data-y")+"px"})})},setAnimationIn:function(){},setAnimationOut:function(){},transition:function(i,e){if(!this.inProgress&&i!==this.currentPlace&&(void 0===e&&(e=i>this.currentPlace?!0:!1),this.$next=t(this.$slides[i]),this.currentPlace=i,this.settings.onChange(),new s(this,this.settings.transition,e),"thumbs"===this.settings.controls)){{this.$thumbWrap.find("a.active").attr("data-thumb-id"),t(this.$thumbWrap.find("a")[i]).attr("data-thumb-id")}this.$thumbWrap.find("a").removeClass("active"),t(this.$thumbWrap.find("a")[i]).addClass("active")}}},s.prototype={fallback:"fade",anims:["fade","slideV","slideH","fan","scale","blindH","blindV"],init:function(){this[this.transition]()},before:function(i){function s(){return"ontouchstart"in window||"onmsgesturechange"in window}var e=this,a=e.spotlite.$active.find(".sl-video");if(a&&(vidWrap=a.parent(),vidWrap.find(".sl-vimeo").css({visibility:"visible",display:"block"}),vidWrap.find(".sl-youtube").css({visibility:"visible",display:"block"}),vidWrap.find("img").css("visibility","visible"),0==s()&&a.remove()),e.spotlite.$active.css("z-index",2),e.spotlite.$next.css({"z-index":1}),t(".sl-timer").stop(!0,!1),t("body").hasClass("ie8")?(e.spotlite.$active.find(".sl-caption").animate({opacity:0},e.spotlite.settings.transitionDuration),e.spotlite.$next.find(".sl-caption").animate({opacity:1},e.spotlite.settings.transitionDuration)):(e.spotlite.$active.addClass("animate-out"),e.spotlite.$active.find(".sl-caption").css({opacity:1})),"function"==typeof e.setup){var n=e.setup();setTimeout(function(){i(n)},40)}else e.execute();t("body").hasClass("ie8")||t(e.listenTo).one("webkitTransitionEnd transitionend oTransitionEnd msTransitionend MSTransitionEnd",function(){e.after()})},after:function(){var i=this;i.spotlite.$slider.removeAttr("style"),i.spotlite.$active.removeAttr("style").removeClass("active"),i.spotlite.$next.removeAttr("style").addClass("active").css({"z-index":2});var s=(i.spotlite.$next.find(".sl-caption").outerHeight(),t(window).height()-76);t("#images").css("height",s),setTimeout(function(){t(".animate-out").removeClass("animate-out")},300),"function"==typeof i.reset&&i.reset(),i.spotlite.settings.autoPlay&&(i.spotlite.setAutoPlay(),clearTimeout(i.timerId)),i.spotlite.$active=i.spotlite.$next,i.spotlite.$active.find(".sl-caption").css({opacity:1}),i.spotlite.inProgress=!1,i.spotlite.settings.afterChange()},fade:function(){var i=this;t("body").hasClass("ie8")?(i.setup=function(){i.listenTo=i.spotlite.$active},i.execute=function(){i.spotlite.$active.css({opacity:0})}):i.execute=function(){i.spotlite.$active.animate({opacity:0},i.spotlite.settings.transitionDuration,function(){i.after()})},i.before(function(){i.execute()})},grid:function(i,s,e,a,n,o,r){var l=this;this.setup=function(){function e(i,s,e,a,n,r,d,c,h){var u=(c+h)*o;return t('<div class="rs-gridlet" />').css({width:i,height:s,top:e,left:a,"background-image":"url("+n+")","background-position":"-"+a+"px -"+e+"px","background-size":r+"px "+d+"px"}).prefixes({transition:"all "+l.spotlite.settings.transitionDuration+"ms ease-in-out "+u+"ms",transform:"none"})}var o=l.spotlite.settings.transitionDuration/(i+s);l.$img=l.spotlite.$active.find("img.sl-slide-image"),l.$grid=t("<div />").addClass("rs-grid"),l.spotlite.$active.prepend(l.$grid);var r=l.$img.width(),d=l.$img.height(),c=l.$img.attr("src"),h=Math.floor(r/i),u=Math.floor(d/s),p=r-i*h,f=Math.ceil(p/i),m=d-s*u,g=Math.ceil(m/s),v=0;a="auto"===a?r:a,a="min-auto"===a?-r:a,n="auto"===n?d:n,n="min-auto"===n?-d:n;for(var b=0;i>b;b++){var y=0,w=h;if(p>0){var $=p>=f?f:p;w+=$,p-=$}for(var x=0;s>x;x++){var C=u,k=m;k>0&&($=k>=g?g:m,C+=$,k-=$),l.$grid.append(e(w,C,y,v,c,r,d,b,x)),y+=C}v+=w}l.listenTo=l.$grid.children().last(),l.$grid.show(),l.$img.css("opacity",0)},this.execute=function(){l.spotlite.$active.removeClass("active"),l.$grid.children().css("opacity",r).prefixes({transform:"rotate("+e+"deg) translateX("+a+"px) translateY("+n+"px) scale("+o+")"})},this.before(function(){l.execute()}),this.reset=function(){l.$img.css("opacity",1),l.$grid.remove()}},sliceH:function(){this.grid(1,15,0,"min-auto",0,1,0)},sliceV:function(){this.grid(15,1,0,0,"auto",1,0)},slideV:function(){this.grid(1,1,0,0,"auto",1,1)},slideH:function(){this.grid(1,1,0,"min-auto",0,1,1)},scale:function(){this.grid(1,1,0,0,0,1.5,0)},blockScale:function(){this.grid(8,6,0,0,0,.6,0)},kaleidoscope:function(){this.grid(10,10,0,0,0,1,0)},fan:function(){this.grid(1,15,45,100,0,1,0)},blindV:function(){this.grid(1,15,0,0,0,.8,0)},blindH:function(){this.grid(15,1,0,0,0,.8,0)},random:function(){this[this.anims[Math.floor(Math.random()*this.anims.length)]]()}},t.fn.spotlite=function(s){return this.each(function(){t.data(this,"spotlite")||t.data(this,"spotlite",new i(this,s))})};var n={browserVendors:["","-webkit-","-moz-","-ms-","-o-","-khtml-"],domPrefixes:["","Webkit","Moz","ms","O","Khtml"]};t.fn.prefixes=function(t){var i=[];for(var s in t)if(t.hasOwnProperty(s))for(var e=n.browserVendors.length;e--;)i[n.browserVendors[e]+s]=t[s];return this.css(i),this},t(".sl-slider").each(function(){slider=t(this),start=slider.attr("data-start"),pause=slider.attr("data-pause"),loop=slider.attr("data-loop"),arrows=slider.attr("data-arrows"),thumbs=slider.attr("data-thumbs"),t(slider).spotlite({type:"slider",startSlide:start,controls:"thumbs",autoPlay:!0,timer:"bar"})}),t("a.spotlite").click(function(i){if(!t("body").hasClass("sl-enabled")){i.preventDefault(),t(".sl-grid").each(function(){t(this).find("a.spotlite").attr("data-parent",t(this).attr("id")),t(this).find("a.spotlite").each(function(i){t(this).attr("data-sl-id",i)})}),container=t(this).attr("data-parent"),t("html").addClass("sl-noscroll"),t("body").addClass("sl-enabled images-loading").append('<ul id="images" class="sl-lightbox" />');var s=t(this).attr("data-sl-id");t("a.spotlite").each(function(){if(t(this).attr("data-parent")===container){var i=t(this).attr("data-sl-id"),s=t(this).attr("data-caption"),e=t(this).attr("data-youtube"),a=t(this).attr("data-vimeo"),n=t(this).attr("data-src"),o=t(this).find("img"),r=o.attr("src"),l=t(this).attr("title"),d=t(this).attr("alt"),c='<li class="group" data-sl-id="'+i+'">';if(e){var h=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,u=e.match(h);u&&11==u[2].length&&(c+='<div class="sl-youtube" data-src="'+u[2]+'"><span class="sl-play"/></div>')}if(a){var h=/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/,u=a.match(h);u&&u[3]&&(c+='<div class="sl-vimeo" data-src="'+u[3]+'"><span class="sl-play"/></div>')}imgSrc=n?n:r,c+='<img src="'+imgSrc+'" alt="'+d+'" title="'+l+'"/>',s&&(c+='<div class="sl-caption"><span class="title">'+l+"</span> - <p>"+d+"</p></div>"),c+="</li>",t("ul.sl-lightbox").append(c)}}),t("ul.sl-lightbox").spotlite({type:"lightbox",controls:t(this).attr("data-exclude")?"":"thumbs",startSlide:s,autoPlay:!1})}})});
;
/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 */

if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
      window.setTimeout( callback, 1000 / 60 );
    };
  } )();
}

/**
 * Saga Slider Object Contructor
 */
var Saga = function(settings) {

  var saga = {},
      delta = 0,
      index = 0,
      threshold = settings.threshold,
      parent = settings.container,
      delay = settings.container.dataset.delay,
      startW = settings.container.dataset.startWidth,
      startH = settings.container.dataset.startHeight,
      children = parent.querySelectorAll('.sg-slide'),
      captions = parent.querySelectorAll('.sg-caption'),
      captionGroups = parent.querySelectorAll('.sg-captions');
      timer = parent.querySelector('.sg-timer-wrap'),
      nav = parent.querySelector('.sg-navigation'),
      count = children.length;

  saga.init = function() {
    settings.container.classList.add('sg-initialized');
    settings.container.style.width = startW + 'px';
    
    saga.current = children[0];
    saga.settings = settings;
    saga.setSlides();
    // saga.setCaptionStyles();
    setTimeout(saga.setCaptions, 100);
    settings.container.dataset.autoplay && saga.autoplay();
    settings.container.dataset.bullets && saga.setNavigation();
    window.requestAnimationFrame(saga.resize);

    [].map.call(captions, function(caption) {
      var percentage = window.innerWidth / startW;
      var left = caption.dataset.x * percentage;
      if(!isNaN(caption.dataset.x * percentage)) {
        caption.style.left = left + 'px';
      }
    });

    window.onblur = function () {
      // do some stuff after tab was changed e.g.
      // console.log('pause');
    }

    window.onfocus = function () {
      // console.log('resume');
    }

    /* window.addEventListener('wheel', saga.scroll, false);
    window.addEventListener('touchstart', saga.touchstart, false);
    window.addEventListener('touchmove', saga.touchmove, false);
    window.addEventListener('touchend', saga.touchend, false); */
  }

  saga.resize = function() {
    var percentage = window.innerWidth / startW;
    saga.setVendor(settings.container, 'Transform', "scale(" + percentage + ")");
    settings.container.parentNode.style.height = (startH * percentage) + 'px';
    window.requestAnimationFrame(saga.resize);
  }

  saga.scrollUp = function() {
    delta--;
    Math.abs(delta) >= threshold && saga.prevSlide();
  }

  saga.scrollDown = function() {
    delta++;
    delta >= threshold && saga.nextSlide()
  }

  saga.prevSlide = function() {
    index--;
    index < 0 && (index = 0);
    saga.showSlide();
  }

  saga.nextSlide = function() {
    index++;
    delta = 0;
    saga.showSlide();
  }

  saga.showSlide = function() {
    settings.container.dataset.autoplay && saga.autoplay();
    
    // new SagaTransition(saga, 'random', true);

    for(var i in children)
      count >= i && saga.transition(children[i], i);

    index >= count && (index = count);
  }

  saga.transition = function(item, i) {
    var bullet = bullets[i].classList,
        captions = item.querySelectorAll('.sg-caption');

    saga.next = children[index];
    saga.next.classList.add('next');

    new SagaTransition(saga, saga.next.dataset.transition, true);
    
    i == index ? bullet.add('active') : bullet.remove('active');

    [].map.call(captions, function(caption) {
      i == index ? new SagaAnimation(saga, caption, settings) : saga.transitionOut(caption, caption.dataset)
    })
  }

  saga.transitionIn = function(caption, data) {x
    caption.classList.remove(data.animOut);
    caption.classList.add(data.animIn);
    saga.setVendor(caption, 'AnimationDuration', '100ms');
    saga.setVendor(caption, 'AnimationDelay', data.delay + 'ms');
  }

  saga.transitionOut = function(caption, data) {
    caption.classList.remove(data.animIn);
    caption.classList.add(data.animOut);
    saga.setVendor(caption, 'AnimationDelay', '0ms');
  }

  saga.setSlides = function() {
    [].map.call(children, function(child, i) {
      settings.container.dataset.bullets && saga.setBullets(i);
    });
    bullets = parent.querySelectorAll('.sg-bullet');
  }

  saga.setCaptions = function() {
    [].map.call(captions, function(caption) {
      var data = caption.dataset;
      caption.style.left = saga.setAxis(data.x, caption.offsetWidth);
      caption.style.top = saga.setAxis(data.y, caption.offsetHeight);
    })
  }

  saga.setActive = function(item, i) {
    var bullet = bullets[i].classList;
    i == index ? bullet.add('active') : bullet.remove('active');
  }

  saga.setNavigation = function() {
    [].map.call(bullets, function(bullet) {
      bullet.onclick = function() {
        index = this.dataset.index;
        if (!saga.inProgress) saga.showSlide();
      }
    });

    bullets[0].classList.add('active');
  }

  saga.setBullets = function(i) {
    var bullet = document.createElement('li');

    bullet.setAttribute('data-index', i);
    bullet.classList.add('sg-bullet');
    nav.appendChild(bullet);
  }

  saga.setAxis = function(value, offset) {
    switch(value) {
      case 'left' || 'top':
        value = 0;
      break;
      case 'center':
        value = (startW / 2) - (offset / 2);
      break;
      case 'right':
        value = startW - offset;
      break;
      case 'middle':
        value = (startH / 2) - (offset / 2);
      break;
      case 'bottom':
        value = startH - offset;
      break;
    }

    return value + 'px';
  }

  saga.autoplay = function() {
    if (timer) timer.innerHTML = '<div class="sg-timer"/>';
    index === count && (index = 0);
    clearTimeout(saga.timerId);
    saga.resume();
  }

  saga.resume = function() {
    time = new Date();
    clearTimeout(saga.timerId);

    saga.timerId = setTimeout(function() {
      saga.nextSlide();
    }, delay);
  };

  saga.pause = function() {
    clearTimeout(saga.timerId);
    delay -= new Date() - time;
  };

  saga.scroll = function(e) {
    var dir = e.detail < 0 || e.wheelDelta > 0 || e.deltaY < 0;

    if(window.pageYOffset <= 0) {
      dir ? saga.scrollUp() : saga.scrollDown(); // Up or down?
      if (index < count) return false;
    }
  }

  saga.setVendor = function(el, property, value) {
    el.style["Webkit" + property] = value;
    el.style["Moz" + property] = value;
    el.style["ms" + property] = value;
    el.style["o" + property] = value;
  }

  saga.transitionEnd = function(el) {
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions)
      if( el.style[t] !== undefined )
        return transitions[t];
  }

  saga.touchstart = function(e) {
    e.preventDefault();
  }

  saga.touchmove = function(e) {
    var startY,
        currentY = e.targetTouches[0].clientY;

    dir = currentY > startY ? 'down' : 'up';
    startY = currentY;

    e.preventDefault();
  }

  saga.touchend = function(e) {
    dir == 'up' ? saga.prevSlide() : saga.nextSlide();
    e.preventDefault();
  }

  saga.setCaptionStyles = function() {
    var styles = '';
    var settings = typeof drupalSettings !== 'undefined' ? drupalSettings : Drupal.settings;

    settings.saga.captions.map(function (caption) {
      var css = JSON.parse(caption.data);
      styles += '.' + caption.name + saga.parseCaptionStyle(css);
    });

    document.write('<style>' + styles + '</styles>');
  }

  saga.parseCaptionStyle = function (css) {
    var props = '';

    for (var prop in css)
      props += prop + ':' + css[prop] + ';';

    return '{' + props + '}';
  }

  saga.init();
};

// SagaAnimation object constructor
var SagaAnimation = function(saga, caption, settings) {
  this.saga = saga; // Parent (Saga) object
  this.caption = caption; // Name of transition requested
  this.data = this.caption.dataset;
  this.settings = settings;
  this.animationEvent = this.animationEnd(this.caption);
  this.init(); // Call transition init method
}

SagaAnimation.prototype = {
  animationEnd: function(el) {
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'transitionend',
      'WebkitAnimation':'webkitAnimationEnd'
    }

    for(t in animations)
      if( el.style[t] !== undefined )
        return animations[t];
  },
  animateIn: function() {
    var self = this;
    this.caption.classList.remove(this.data.animOut);
    this.caption.classList.add(this.data.animIn);
    this.saga.setVendor(this.caption, 'AnimationDelay', this.data.startTime + 'ms');
    this.saga.setVendor(this.caption, 'AnimationDuration', this.data.startSpeed + 'ms');
    
    this.animationEvent &&
    this.caption.addEventListener(this.animationEvent, function(e) {
      self.settings.container.dataset.autoplay && self.animateOut(e);
    }, false);
  },
  animateOut: function(e) {
    this.caption.removeEventListener(e.type, arguments.callee, false);
    
    this.caption.classList.remove(this.data.animIn);
    this.caption.classList.add(this.data.animOut);

    if (this.caption.style['animationDelay'] !== '0ms') {
      var timeElapsed = +this.data.startTime + +this.data.startSpeed;

      this.saga.setVendor(this.caption, 'AnimationDelay', (this.data.endTime - timeElapsed) + 'ms');
      this.saga.setVendor(this.caption, 'AnimationDuration', this.data.endSpeed + 'ms');
    }
  },
  init: function() {
    this.animateIn();
  }
}

// SagaTransition object constructor
var SagaTransition = function(saga, transition, forward) {
  this.saga = saga; // Parent (Saga) object
  this.saga.inProgress = true; // Prevent creation of additional transition objects until transitionEnd
  this.forward = forward; // True for forward, false for backward
  this.transition = transition; // Name of transition requested
  this.grid = document.createElement('div');
  this.init(); // Call transition init method
}

SagaTransition.prototype = {
  // Fallback to use if CSS transitions are unsupported
  fallback: 'fade',
  // Array of possible animations
  anims: [
    'sliceH', 'sliceV', 'slideL', 'slideR', 'slideT', 'slideB',
    'fan', 'scale', 'blindH', 'blindV', 'blockScale', 'blockFade'
  ],
  // Call requested transition method
  init: function() {
    this[this.transition]();
  },
  // Call before transition
  before: function(callback) {
    var self = this;
    if (typeof self.setup === 'function') {
      // Setup required by transition
      var setup = self.setup();
      setTimeout(function() {
        callback(setup);
      }, 10);
    } else {
      // Transition execution
      self.execute();
    }

    // Listen for CSS transition end on elem (set by transition)
    var transitionEvent = self.saga.transitionEnd(self.saga.current);
    transitionEvent && this.listenTo.addEventListener(transitionEvent, function() {
      self.saga.current && self.after();
    });
  },
  // Call after transition
  after: function() {
    // Reset current slide
    this.saga.current.classList.remove('active');
    // Assign active slide
    this.saga.next.classList.remove('next');
    this.saga.next.classList.add('active');
    // Additional reset steps required by transition (if any exist)
    if (typeof this.reset === 'function') this.reset();
    // Assign new slide position
    this.saga.current = this.saga.next;
    // Allow new SagaTransition to be instantiated
    this.saga.inProgress = false;
    // User-defined callback function, fires after transition has ended
    this.saga.settings['onComplete']();
  },
  matrix: function (cols, rows, ro, tx, ty, sc, op) {
    var self = this;
    // Setup grid and append to current slide
    this.setup = function () {
      this.img = this.saga.current.querySelector('.sg-slide-img')
      this.overlay = this.saga.current.querySelector('.gradient-overlay');

      // vars to calculate positioning/size of gridlets
      var count = this.saga.settings.transitionSpeed / (cols + rows),
          src = this.img.src, // imgSrc
          w = this.img.clientWidth, // imgWidth
          h = this.img.clientHeight, // imgHeight
          cw = Math.floor(w / cols), // colWidth
          rh = Math.floor(h / rows), // rowHeight
          cr = w - (cols * cw), // colRemainder
          ca = Math.ceil(cr / cols), //colAdd
          rr = h - (rows * rh), // rowRemainder
          ra = Math.ceil(rr / rows), // rowAdd
          ld = 0; // leftDist
      // tx/ty args can be passed as 'left/right/top/bottom' (use slide width/height
      // or negative slide width/height)
      tx = tx === 'right' ? w : tx;
      tx = tx === 'left' ? - w : tx;
      ty = ty === 'bottom' ? h : ty;
      ty = ty === 'top' ? - h : ty;
      // Create and append grid to the next slide (so it's above the slide image)
      this.grid.classList.add('sg-grid');
      this.saga.current.appendChild(this.grid);
      // Loop through cols
      for (var i = 0; i < cols; i++) {
        var td = 0, // topDist
            ncw = cw; // newColWidth
        // If width (px) does not divide cleanly into the specified number of cols,
        // adjust individual col widths to create correct total
        if (cr > 0) {
          var add = cr >= ca ? ca : cr;
          ncw += add;
          cr -= add;
        }
        // Nested loop to create row gridlets for each col
        for (var j = 0; j < rows; j++)  {
          var nrh = rh, // newRowHeight
              nrr = rr; // newRowRemainder
          // If height (px) does not divide cleanly into the specified number of rows,
          // adjust individual row heights to create correct total
          if (nrr > 0) {
            add = nrr >= ra ? ra : rr;
            nrh += add;
            nrr -= add;
          }
          // Create & append gridlet to grid
          this.gridlet(ncw, nrh, td, ld, src, w, h, i, j, count);
          // Update top distribution
          td += nrh;
        }
        // Update left distribution
        ld += ncw;
      }
      // Set event listener on last gridlet
      this.listenTo = this.saga.current.querySelector('.sg-gridlet:last-child');
      this.img.style.opacity = 0;
      if (this.overlay) this.overlay.style.opacity = 0;
    };
    // Gridlet creator (divisions of the image grid, positioned with background-images
    // to replicate the look of an entire slide image when assembled)
    this.gridlet = function(width, height, top, left, src, w, h, c, r, count) {
      // Gridlet transition delay
      var delay = (c + r) * count;
      // Create gridlet element
      var el = document.createElement('div');
      // Set gridlet styles
      el.classList.add('sg-gridlet');
      el.style.width = width + 'px';
      el.style.height = height + 'px';
      el.style.top = top + 'px';
      el.style.left = left + 'px';
      el.style.backgroundImage = 'url(' + src + ')';
      el.style.backgroundPosition = '-' + left + 'px -' + top + 'px';
      el.style.backgroundSize = w + 'px ' + h + 'px';

      // Set gridlet transition properties
      this.saga.setVendor(el, 'TransitionProperty', 'all');
      this.saga.setVendor(el, 'TransitionDuration', this.saga.settings.transitionSpeed + 'ms');
      this.saga.setVendor(el, 'TransitionDelay', delay + 'ms');
      this.saga.setVendor(el, 'Transform', 'none');
      // Return a gridlet elem with styles for specific transition
      this.grid.appendChild(el);
    };
    // Execution steps
    this.execute = function () {
      var transform = 'rotate('+ ro +'deg) translateX('+ tx +'px) translateY('+ ty +'px) scale('+ sc +')';

      // var activeOverlay = self.saga.current.querySelector('.gradient-overlay');
      // if (activeOverlay) activeOverlay.style.opacity = 0;
  
      // var nextOverlay = self.saga.next.querySelector('.gradient-overlay');
      // if (nextOverlay) nextOverlay.style.opacity = 0.8;
      
      [].map.call(this.grid.children, function(gridlet) {
        gridlet.style.opacity = op;
        self.saga.setVendor(gridlet, 'Transform', transform);
      })
    };
    this.before(function() {
      // Fire on setup callback
      self.execute();
    });
    // Reset steps
    this.reset = function () {
      if (this.overlay) this.overlay.style.opacity = 0.9;
      this.img.style.opacity = 1;
      this.grid.remove();
    };
  },
  fade: function() {
    this.matrix(1, 1, 0, 0, 0, 1, 0);
  },
  sliceH: function() {
    this.matrix(1, 15, 0, 'left', 0, 1, 0);
  },
  sliceV: function() {
    this.matrix(15, 1, 0, 0, 'bottom', 1, 0);
  },
  slideL: function() {
    this.matrix(1, 1, 0, 'left', 0, 1, 1);
  },
  slideR: function() {
    this.matrix(1, 1, 0, 'right', 0, 1, 1);
  },
  slideT: function() {
    this.matrix(1, 1, 0, 0, 'top', 1, 1);
  },
  slideB: function() {
    this.matrix(1, 1, 0, 0, 'bottom', 1, 1);
  },
  blindV: function() {
    this.matrix(1, 20, 0, 0, 0, .9, 0);
  },
  blindH: function() {
    this.matrix(20, 1, 0, 0, 0, .9, 0);
  },
  scale: function() {
    this.matrix(1, 1, 0, 0, 0, 1.5, 0);
  },
  blockScale: function() {
    this.matrix(8, 6, 0, 0, 0, .6, 0);
  },
  blockFade: function() {
    this.matrix(10, 10, 0, 0, 0, 1, 0);
  },
  fan: function() {
    this.matrix(1, 10, 45, 0, 0, 1.5, 0);
  },
  random: function () {
    // Pick a random transition from the anims array
    this[this.anims[Math.floor(Math.random() * this.anims.length)]]();
  },
}

function sagaInit() {
  var sagas = document.querySelectorAll('.sg-wrap');

  [].map.call(sagas, function(saga) {
    var container = document.querySelector('.' + saga.classList[0]);

    if (container && !container.classList[1])
    new Saga({
      container: container, // selector
      transitionSpeed: 700, // slide transition speed
      threshold: 35, // scroll threshold
      bullets: true, // show bullets?
      fullscreen: true,
      startWidth: '1280',
      startHeight: '600',
      delay: 7000,
      autoplay: false,
      breakpoints: { 'xs': 420, 'sm': 768, 'lg': 992, 'xl': 1140 },
      onLoad: function() {}, // onLoad callback
      onChange: function() {}, // before transition callback
      onComplete: function() {}, // after transition callback
      onResize: function() {},
    });
  });
}

sagaInit();

Drupal.behaviors.saga = {
  attach: function (context, settings) {
    console.log('here');
    sagaInit();
  }
};

// var saga = new Saga({
//   container: document.querySelector('.sg-wrap'), // selector
//   transitionSpeed: 700, // slide transition speed
//   threshold: 35, // scroll threshold
//   bullets: true, // show bullets?
//   fullscreen: true,
//   startWidth: '1280',
//   // startHeight: '600',
//   delay: 7000,
//   autoplay: false,
//   breakpoints: { 'xs': 420, 'sm': 768, 'lg': 992, 'xl': 1140 },
//   onLoad: function() {}, // onLoad callback
//   onChange: function() {}, // before transition callback
//   onComplete: function() {}, // after transition callback
//   onResize: function() {},
// });
;
