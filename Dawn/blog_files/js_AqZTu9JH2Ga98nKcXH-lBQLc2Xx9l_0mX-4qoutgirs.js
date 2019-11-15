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
