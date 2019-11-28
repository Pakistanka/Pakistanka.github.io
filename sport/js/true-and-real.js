jQuery(document).ready(function($){
  $('.slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed:3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1,
          infinite: true,
          speed: 300
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          speed: 300
        }
      }
    ]
  });
});
