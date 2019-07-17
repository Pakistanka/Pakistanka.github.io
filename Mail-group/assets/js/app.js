import '@fancyapps/fancybox';


let app = {
    init() {
        func.jsTabs();
        func.jsInnerTabs();
    }
};

let func = {

/**
 * That makes the first level tabs
 */
  jsTabs() {
	
    $('.tabs-elem').on('click', function(){
      let tab_id = $(this).attr('data-tab');
        
      $('.tabs-elem').removeClass('tabs-elem__active');
      $('.tabs-content').removeClass('tabs-elem__active');
        
      $(this).addClass('tabs-elem__active');
      $("#"+tab_id).addClass('tabs-elem__active');

    });
  },
  /**
 * That makes the second level tabs
 */
  jsInnerTabs() {

    $('.innerTabs-elem').on('click', function(){
      let tab_id = $(this).attr('data-num');
        
      $('.innerTabs-elem').removeClass('innerTabs-active');
      $('.innerTabs-content').removeClass('innerTabs-active active');
        
      $(this).addClass('innerTabs-active');
      $("#"+tab_id).addClass('innerTabs-active active');

    });
  }

};

$(function () {

    app.init();

});
