window.onload = function() {
    if ($('.js-range-slider').length > 0) {
        findSlider();
    }
}

let findSlider = ()  => {
    $('.js-range-slider').each(function () {
        let $elem = $(this).find('.filterSlider__slider');
        initSliderUi($elem);
    });
}

let initSliderUi = $element  => {
	if ($element.length > 0) {
        let container     =  $element.closest('.js-range-slider');
		let $minRangeItem = container.find('.js-rangeMin');
		let	$maxRangeItem = container.find('.js-rangeMax');

		$element.slider({
			min:    $element.data('min'),
			max:    $element.data('max'),
			step:   $element.data('step'),
			values: [$element.data('min'), $element.data('max')],
			range:  true,

			slide: function(event, ui) {
				$minRangeItem.text(ui.values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
				$maxRangeItem.text(ui.values[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
			}

		});
	}
}
