
(function($){

    //Page Preloader
    $(window).load(function() {
        var enaPreloader = Drupal.settings.enaPreloader ? Drupal.settings.enaPreloader : 1;
        if(enaPreloader == 1) {
            $("#intro-loader").delay(500).fadeOut();
            $(".mask").delay(1000).fadeOut("slow");
        }

    });

    $(document).ready(function() {
        $.loadingJS();
    });


    //Parallax
    $(window).on('load', function() {
        parallaxInit();
    });

     $.loadingJS = function () {
        //Back To Top

        $(window).scroll(function() {
            if ($(window).scrollTop() > 400) {
                $("#back-top").fadeIn(200);
            } else {
                $("#back-top").fadeOut(200);
            }
        });
        $('#back-top').click(function(event) {
            event.preventDefault();
            $('body, html').stop().animate({
                scrollTop : 0
            }, 1500, 'easeInOutExpo');
        });
        //Elements Appear from top

        $('.item_top').each(function() {
            $(this).appear(function() {
                $(this).delay(150).animate({
                    opacity : 1,
                    top : "0px"
                }, 1000);
            });
        });

        //Elements Appear from bottom
        $('.item_bottom').each(function() {
            $(this).appear(function() {
                $(this).delay(150).animate({
                    opacity : 1,
                    bottom : "0px"
                }, 1000);
            });
        });

        //Elements Appear from left
        $('.item_left').each(function() {
            $(this).appear(function() {
                $(this).delay(150).animate({
                    opacity : 1,
                    left : "0px"
                }, 1000);
            });
        });

        //Elements Appear from right
        $('.item_right').each(function() {
            $(this).appear(function() {
                $(this).delay(150).animate({
                    opacity : 1,
                    right : "0px"
                }, 1000);
            });
        });

        //Elements Appear in fadeIn effect
        $('.item_fade_in').each(function() {
            $(this).appear(function() {
                $(this).delay(150).animate({
                    opacity : 1,
                    right : "0px"
                }, 1000);
            });
        });

        var menuStickyEnable = Drupal.settings.menuStickyEnable;
        if(menuStickyEnable == '1') {
            if($("body").hasClass("logged-in") && $("body").hasClass("toolbar")) {
                $("#navigation").sticky({
                    topSpacing : 60
                });
            } else {
                $("#navigation").sticky({
                    topSpacing : 0
                });
            }

        }

        $(".container").fitVids();
        //Service and Client carousel
        jQuery(".owl-single").owlCarousel({
            autoPlay:true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem : true,
            stopOnHover : true,
            navigation:true,
            navigationText:["",""]
        });

        var owl = jQuery("#owl-client");
        owl.owlCarousel({
            items : 6,
            autoPlay:true,
            itemsDesktop : [1000, 5], //5 items between 1000px and 901px
            itemsDesktopSmall : [900, 3], // 3 items betweem 900px and 601px
            itemsTablet : [600, 2], //2 items between 600 and 0;
            itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
            autoHeight:true,
            navigation:false
        });
        //Owl Carousel Span
        /*$(".owl-pagination .owl-page span").each(function(){
         $(this).css('display','block');
         });*/
        // Portfolio Isotope
        var container = jQuery('#portfolio-wrap');
        container.imagesLoaded( function(){
            container.isotope({
                animationEngine : 'best-available',
                animationOptions : {
                    duration : 200,
                    queue : false
                }
            });
        });
        jQuery('#filters a').click(function() {
            jQuery('#filters a').removeClass('active');
            jQuery(this).addClass('active');
            var selector = jQuery(this).attr('data-filter');
            container.isotope({
                filter : selector
            });
            setProjects();
            return false;
        });
        function splitColumns() {
            var winWidth = jQuery(window).width() + 15, columnNumb = 1;
            if (winWidth > 1200) {
                columnNumb = 4;
            } else if (winWidth > 992) {
                columnNumb = 2;
            } else if (winWidth > 767) {
                columnNumb = 2;
            } else if (winWidth < 767) {
                columnNumb = 1;
            }
            return columnNumb;
        }

        function setColumns() {
            var winWidth = jQuery(window).width(), columnNumb = splitColumns(), postWidth = Math.floor(winWidth / columnNumb);
            container.find('.portfolio-item').each(function() {
                jQuery(this).css({
                    width : postWidth + 'px'
                });
            });
        }

        function setProjects() {
            setColumns();
            //container.isotope('reLayout');
        }

        container.imagesLoaded(function() {
            setColumns();
        });
        jQuery(window).bind('resize', function() {
            setProjects();
        });
        jQuery('#portfolio-wrap .portfolio-item .portfolio').each(function() {
            jQuery(this).hoverdir();
        });

        $('a.external').click(function() {
            var url = $(this).attr('href');
            $('.mask').fadeIn(250, function() {
                document.location.href = url;
            });
            $("#intro-loader").fadeIn("slow");
            return false;
        });

        $('.flexslider').flexslider({
            animation : "slide",
            controlNav : false
        });

        $('.intro-flexslider').flexslider({
            animation : "fade",
            touch: false,
            directionNav : false,
            controlNav : false,
            slideshowSpeed : 5000,
            animationSpeed : 600
        });
        $('#flexslider_left').on('click', function(){
            $('.intro-flexslider').flexslider('prev')
            return false;
        })

        $('#flexslider_right').on('click', function(){
            $('.intro-flexslider').flexslider('next')
            return false;
        });


        // Radial progress bar
        /* $(".cart .row .element-line").equalHeights();
        $(".cart .row .col-md-4").equalHeights();*/
        $('.cart').appear(function() {
            var easy_pie_chart = {};
            $('.circular-item').removeClass("hidden");
            $('.circular-pie').each(function() {
                var text_span = $(this).children('span');
                $(this).easyPieChart($.extend(true, {}, easy_pie_chart, {
                    scaleLength: 5,
                    lineCap: 'butt',
                    rotate: 0,
                    easing: 'easeOutBounce',
                    delay: 1000,
                    animate:  2000,
                    size : 250,
                    barColor : $(this).data('color'),
                    lineWidth : 20,
                    trackColor : '#2B2925',
                    scaleColor : false,
                    onStep : function(value) {
                        text_span.text(Math.round(value) + '%');
                    }
                }));
            });
        });

        // Webform Layout Box
        if($(".webform-client-form").size() > 0) {

            $(".webform-client-form").find(".webform-layout-box").each(function(){
                var classLayoutBox = $(this).attr("class");
                $(this).attr("class",classLayoutBox + " col-md-6 col-sm-6 col-md-6 col-xs-12 ");
            })
        }
        // Hide Node title and detail in node page
        if($("body").hasClass("page-node")) {
            $("#ajaxpage .section-title").hide();
        }
        //Comments Form
        /*if($("#comments").size() > 0) {
         $(".comment-formular textarea").attr('placeholder','Enter Message');
         $(".comment-formular textarea").attr('class','form-control input-lg');
         }*/
        var basePath = Drupal.settings.basePath;
        /* if($("body").hasClass("front")) {
         $("ul.navbar-nav li").each(function(){
         var link = $(this).find("a");
         link.removeClass("active");
         var href = link.attr('href');
         if(href.search("#") != -1) {
         var newHref = href.replace(basePath,'');
         link.attr('href',newHref);
         }
         })
         }*/
        //Navigation Scrolling
        $(function() {
            $('#brand, .nav li a, a.start-button').bind('click', function(event) {
                var $anchor = $(this);
                if($anchor.attr('href').search("#") != -1) {
                    if($($anchor.attr('href')).offset() != undefined) {
                        if($("body").hasClass("logged-in")) {
                            $('html, body').stop().animate({
                                scrollTop : $($anchor.attr('href')).offset().top -60
                            }, 1500, 'easeInOutExpo');
                        } else {
                            $('html, body').stop().animate({
                                scrollTop : $($anchor.attr('href')).offset().top
                            }, 1500, 'easeInOutExpo');
                        }
                    }
                    event.preventDefault();
                }


            });
        });

        //Navigation Dropdown
        $('.nav a.int-collapse-menu').click(function() {
            $(".navbar-collapse").collapse("hide")
        });
        $('.navbar-toggle').click(function(){
            $(".navbar.navbar-fixed-top").css("height",'auto');
        });
        $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
            e.stopPropagation();
        });

        var onMobile = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            onMobile = true;
        }



        if ((onMobile === false ) && ($('.parallax-slider').length )) {
            skrollr.init({
                edgeStrategy : 'set',
                smoothScrolling : false,
                forceHeight : false
            });

        }
        // Header Video Background
        //if( ( onMobile === false ) ) {
//            var headerVdAutoPlay = Drupal.settings.headerVideoAutoPlay;
//            var headerVideoRes = Drupal.settings.headerVideoRes;
//            // The videoplayer - controlled background video
//            $(".player").mb_YTPlayer({
//                containment: ".intro-video",
//                opacity: 1, // Set the opacity of the player;
//                mute: true, // Mute the audio;
//                // ratio: "4/3" or "16/9" to set the aspect ratio of the movie;
//                quality: headerVideoRes,// quality: "default" or "small", "medium", "large", "hd720", "hd1080", "highres";
//                // containment: The CSS selector of the DOM element where you want the video background; if not specified it takes the "body"; if set to "self" the player will be instanced on that element;
//                // optimizeDisplay: True will fit the video size into the window size optimizing the view;
//                loop: false, // True or false loops the movie once ended.
//                // vol: 1 to 100 (number) set the volume level of the video.
//                startAt: 0, // Set the seconds the video should start at.
//                autoPlay: headerVdAutoPlay, // True or false play the video once ready.
//                showYTLogo: false, // Show or hide the YT logo and the link to the original video URL.
//                showControls: false // Show or hide the controls bar at the bottom of the page.
//            });
//            //$('#home').addClass('video-section');
//            // Start the movie
//            if(headerVdAutoPlay == true) {
//                // First we're going to hide these elements
//                // Start the movie
//                $("#bgndVideo").on("YTPStart",function(){
//                    $('#home').removeClass('video-section');
//                    $("#video-play").hide();
//                    $("#video-pause").show();
//                    //$(".fullscreen-image").hide();
//                });
//
//                // Pause the movie
//                $("#bgndVideo").on("YTPPause",function(){
//                    $("#video-play").show();
//                    $("#video-pause").hide();
//                });
//                // After the movie
//                $("#bgndVideo").on("YTPEnd",function(){
//                    //$('#home').addClass('video-section');
//                    //$(".fullscreen-image").show();
//                });
//            }
//            if (headerVdAutoPlay == false){
//                // First we're going to show img fallback
//                $("#video-pause").hide();
//                $("#bgndVideo").on("YTPStart",function(){
//                    $("#video-play").hide();
//                    $("#video-pause").show();
//                });
//                //$(".fullscreen-image").hide();
//                // Pause the movie
//                $("#bgndVideo").on("YTPPause",function(){
//                    $("#video-play").show();
//                    $("#video-pause").hide();
//                });
//                // After the movie
//                $("#bgndVideo").on("YTPEnd",function(){
//                    //$('#home').addClass('video-section');
//                    //$(".fullscreen-image").show();
//                });
//            }
//
//        } else {
//            // Fallback for mobile devices
//            /* as a fallback we add a special class to the header which displays a poster image */
//            //$('#home').addClass('video-section');
//
//            /* hide player */
//            $(".player").hide();
//
//            $("#home #video-controls").hide();
//        }
        //FullScreen Slider
        var hdSlideEffect = Drupal.settings.hdSlideEffect;
        var hdAutoSlide = Drupal.settings.hdAutoSlide;

        //FullScreen Slider
        $('#fullscreen-slider').maximage({
            cycleOptions : {
                fx : 'fade',
                speed : 1500,
                timeout : 6000,
                prev : '#slider_left',
                next : '#slider_right',
                pause : 0,

                before : function(last, current) {
                    jQuery('.slide-content').fadeOut().animate({ top : '190px'}, {queue : false, easing : hdSlideEffect,duration : 550});
                    jQuery('.slide-content').fadeOut().animate({ top : '-190px'});
                },
                after : function(last, current) {
                    jQuery('.slide-content').fadeIn().animate({top : '0'}, {queue : false, easing : hdSlideEffect, duration : 450});
                }
            },
            onFirstImageLoaded : function() {
                jQuery('#cycle-loader').delay(800).hide();
                jQuery('#fullscreen-slider').delay(800).fadeIn('slow');
                jQuery('.slide-content').fadeIn().animate({
                    top : '0'
                });
                jQuery('.slide-content a').bind('click', function(event) {
                    var $anchor = $(this);
                    jQuery('html, body').stop().animate({
                        scrollTop : $($anchor.attr('href')).offset().top - 44
                    }, 1500, hdSlideEffect);
                    event.preventDefault();
                });
            }
        });
        //=============== IF IE ===================
        var rex = new RegExp(".NET");
        var trueIE = rex.test(navigator.userAgent);

        if(trueIE) {
            jQuery('.mybutton').addClass('btn-new');
            jQuery('.mybutton').removeClass('mybutton');
        }
        // Number Counter
        (function() {
            var Core = {
                initialized : false,
                initialize : function() {
                    if (this.initialized)
                        return;
                    this.initialized = true;
                    this.build();
                },
                build : function() {
                    this.animations();
                },
                animations : function() {
                    // Count To
                    $(".number-counters [data-to]").each(function() {
                        var $this = $(this);
                        $this.appear(function() {
                            $this.countTo({});
                        }, {
                            accX : 0,
                            accY : -150
                        });
                    });
                }
            };
            Core.initialize();
        })();
    }
    function parallaxInit() {
        $('#one-parallax').parallax("30%", 0.9);
        $('#two-parallax').parallax("30%", 0.9);
        $('#three-parallax').parallax("30%", 0.9);
        $('#four-parallax').parallax("30%", 0.9);
        $('#five-parallax').parallax("30%", 0.9);
        $('#six-parallax').parallax("30%", 0.9);
        $('#seven-parallax').parallax("30%", 0.9);
        /*add as necessary*/
    }


})(jQuery);

