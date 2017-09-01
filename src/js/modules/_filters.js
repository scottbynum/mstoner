jQuery(function($) {


	const queryString = require('query-string');
	var currentQuery = window.location.search;
	var parsedQuery = queryString.parse(currentQuery);

	$('#filter__search').val(parsedQuery.search);

//


var toggleCheckbox = function(elem) {
	if ($(elem).attr('aria-checked') == 'false') {
		$(elem).attr('aria-checked', 'true');
	} else {
		$(elem).attr('aria-checked', 'false');
	}
}

var checkForActiveCheckboxes = function() {
	if ($('.checkbox[aria-checked="true"]')) {
		$('.checkbox[aria-checked="true"]').parent().parent().addClass('filter__dropdown--is-active');
	}
	return true;
}

var checkForActiveButtons = function() {
	if ($('.filter__button').hasClass('filter__button--active')) {
		return true;
	}
}

var toggleFilterButton = function(elem) {
	$(elem).toggleClass('filter__button--active');
}

var toggleFilterDropdown = function(elem) {
	$(elem).parent().toggleClass('filter__dropdown--is-active');
}

var inputSelect = function(elem) {
	var searchString = $(elem).val().toUpperCase();
}


var filterByProgram = function(elem) {
	var activeFilterPrograms = $('.filter__button--active');

	if (activeFilterPrograms.length === 0) {
		return true;
	}
	else {
		var elementProgram = $(elem)
		.find('.filter__list__result--link a')
		.attr('data-filter-program');

		var returnValue = false;

		activeFilterPrograms.each(function() {
			var filterProgram = $(this).attr('data-filter-program');

			if (elementProgram.indexOf(filterProgram) >=0) {
				returnValue = true;
			}
		});

		return returnValue;
	}
}

var filterBySearchText = function(elem) {
	function cleanText(text) {
		return text
		.toUpperCase()
		.replace(/[^a-z ]/ig, '');
	};

	var searchText = cleanText($('.filter__search__input').val());

	if (searchText.length === 0) {
		$('.search__results__title').text('');
		return true;
	}
	else {
		$('.search__results__title').text(
			'Showing search results for: '+searchText);

		var elemTitleText = cleanText(
			$(elem).find('.filter__list__result--link a').text());
		var locationText  = cleanText(
			$(elem).find('.filter__list__result__location--link a').text());

		var elemTitleMatch = elemTitleText.indexOf(searchText) >= 0;
		var locationMatch  = locationText.indexOf(searchText) >= 0;

		return elemTitleMatch || locationMatch;
	}
}

var filterByAreaOfStudy = function(elem) {
	var activeFilterAreaOfStudies = $('.filter__areaofstudy[aria-checked="true"]');

	if (activeFilterAreaOfStudies.length === 0) {
		return true;
	}
	else {
		var elementAreaOfStudy = $(elem)
		.find('.filter__list__result--link a')
		.attr('data-filter-areaofstudy');
		var returnValue = false;

		activeFilterAreaOfStudies.each(function() {
			var filterAreaOfStudy = $(this).attr('data-filter-areaofstudy');
			if (elementAreaOfStudy.indexOf(filterAreaOfStudy) >= 0) {
				returnValue = true;
			}
		});

		return returnValue;
	}
}

var filterByCollege = function(elem) {
	var activeFilterColleges = $('.filter__college[aria-checked="true"]');

	if (activeFilterColleges.length === 0) {
		return true;
	}
	else {
		var elementCollege = $(elem)
		.find('.filter__list__result--link a')
		.attr('data-filter-college');
		var returnValue = false;

		activeFilterColleges.each(function() {
			var filterCollege = $(this).attr('data-filter-college');
			if (elementCollege.indexOf(filterCollege) >= 0 ) {
				returnValue = true;
			}
		});

		return returnValue;
	}
}

var filterByLocation = function(elem) {
	var activeFilterLocations = $('.filter__location[aria-checked="true"]');

	if (activeFilterLocations.length === 0) {
		return true;
	}
	else {
		var elementLocations = $(elem).find('.filter__list__result__location--link span')
		var returnValue = false;


		activeFilterLocations.each(function() {
			var filterLocation = $(this).attr('data-filter-location');

			elementLocations.each(function() {
				var elementLocation = $(this).attr('data-filter-location');

				if (filterLocation === elementLocation) {
					returnValue = true;
				}
			});
		});
		return returnValue;
	}
}
var itemCount = $('.filter__list__result__item').length;
var applyFilters = function() {

	var shownItemCount = 0;
	$('.filter__list__result__item').each(function() {
		if (
			filterByProgram(this) &&
			filterBySearchText(this) &&
			filterByAreaOfStudy(this) &&
			filterByCollege(this) &&
			filterByLocation(this)
			) {
			$(this).fadeIn();
		shownItemCount++;
	}
	else {
		$(this).fadeOut();
	}
});
	if (shownItemCount === 0) {
		$('.search__results__title').text('No results');
	}

	if (itemCount === shownItemCount) {
		$('.filter__main').removeClass('filter--is-active');
	}
	else {
		$('.filter__main').addClass('filter--is-active');
	}

}

var clearFilters = function() {
	$('.filter__location').attr('aria-checked', 'false');
	$('.filter__college').attr('aria-checked', 'false');
	$('.filter__areaofstudy').attr('aria-checked', 'false');
	$('.filter__search__input').val('');
	$('.filter__button').removeClass('filter__button--active');
	$('.filter__main').removeClass('filter--is-active');
	$('.search__results__title').text('');
	$('.filter__list__result__item').fadeIn();
}


$('.filter__dropdown__link').on('click', function(e) {
	toggleFilterDropdown(this);
	e.preventDefault();
});

$('.filter__button').on('click', function(e) {
	toggleFilterButton(this);
	applyFilters();
	e.preventDefault();
});

$('.filter__search__input').on('propertychange change click keyup input paste', function() {
	applyFilters();
});


$('.filter__list__item').on('click', function() {
	toggleCheckbox(this);
	applyFilters();
});

$('.filter__list__item').bind('keypress', function(e) {
	if (e.keyCode == 32) {
		toggleCheckbox(this);
		applyFilters();
	}
	e.preventDefault();
});

$('.clear__filter').on('click', function(e) {
	clearFilters();
	e.preventDefault();
});

$(window).on('load', function() {
	checkForActiveCheckboxes();
	checkForActiveButtons();
	if ($('.filter__search__input').val()) {
		applyFilters();
	}

});


});