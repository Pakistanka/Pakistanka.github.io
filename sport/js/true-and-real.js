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

// jQuery(document).ready(function($) {
//   console.log('wow');
//   $(".add-row").click(function() {
//       var markup = "<input type='text' class='form-control'>";
//       $(".social_wrap").append(markup);
//   })
// });
// $(document).ready(function() {
//   $(".delete").hide();
//   //when the Add Field button is clicked
//   $("#add").click(function(e) {
//     $(".delete").fadeIn("1500");
//     //Append a new row of code to the "#items" div
//     $("#items").append(
//       '<div class="next-referral col-4"><input id="textinput" name="textinput" type="text" placeholder="Enter name of referral" class="form-control input-md"></div>'
//     );
//   });
//   $(".social_wrap").on("click", ".delete", function(e) {
//     $(".next-referral").last().remove();
//   });
// });
// jQuery(document).ready(function($){

// })

