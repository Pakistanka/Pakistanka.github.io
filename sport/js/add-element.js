jQuery(document).ready(function($){
    $(".delete").hide();
    //when the Add Field button is clicked
    $("#add").click(function(e) {
      $(".delete").fadeIn("1500");
      //Append a new row of code to the "#items" div
      $("#items").append(
        ' <label class="control-label next-referral" for="textinput"><input id="textinput" name="textinput" type="text" placeholder="Введите социальную сеть" class="form-control input-md"></label>'
      );
    });
    $(".social_wrap").on("click", ".delete", function(e) {
      $(".next-referral").last().remove();
    });
  });

  jQuery(document).ready(function($){
    $('#colorselector').change(function(){
      $('.colors').hide();
      $('#' + $(this).val()).show();
    });
  });
