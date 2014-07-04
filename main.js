
localStorage.wanderingdiv = true;

var dayCurrent = {'day': 2, 'month': 'July', 'year': 2014, 'appointments': [] };
var totalValuesObj = {};
var monthNumberOfDaysDict = { 'June': 30, 'April': 30, 'September': 30, 
	'November': 30, 'January': 31, 'March': 31, 'May': 31, 'July': 31, 
	'August': 31, 'October': 31, 'December': 31, 'February': 28 };

var yearOrder = [ 'January', 'February', 'March', 'April', 'May', 'June', 
	'July', 'August', 'September', 'October', 'November', 'December' ];

var createDayKey = function(dayObj) {
	var day = dayObj.day;
	var month = dayObj.month;
	var year = dayObj.year;
	var dayString = day.toString();
	var monthNumberString = yearOrder.indexOf(month) + 1;
	var yearString = year.toString();
	var outputString = monthNumberString + '-' + dayString + '-' + yearString;
	return outputString;
};

var turnDateStringToObj = function(inString) {

	var dayObj = {}
	var dateArray = inString.split(' ');
	var month = dateArray[ 0 ];
	var year = dateArray[ 2 ];
	var dayTemp = dateArray[ 1 ];
	var day = dayTemp.slice(0, dayTemp.length - 1);

	dayObj.day = day;
	dayObj.month = month;
	dayObj.year = year;

	return dayObj;
};

var turnObjStringLocalStorage = function(inObj) {
	var objectString = JSON.stringify(inObj);
	localStorage.totalvalues = objectString;
	return objectString;
};

var turnLocalStorageStringObj = function() {
	var objectString = localStorage.totalvalues;
	return $.parseJSON(objectString);
};

var getTotalNumberDays = function() {
	return Object.keys(totalValuesObj).length;
};

var getPreviousDay = function(dayObj) {

	var day = dayObj.day;
	var month = dayObj.month;
	var year = dayObj.year;

	if (day === 1) {
		if (month === 'January') {
			dayObj.year = year -1;
		}
		var currentMonthIndex = yearOrder.indexOf(month);
		if (currentMonthIndex === 0) {
			var newMonthIndex = yearOrder.length - 1;
		}
		else {
			var newMonthIndex = currentMonthIndex - 1;
		}
		var newMonth = yearOrder[ newMonthIndex ];
		dayObj.month = newMonth;
		var monthDayNumber = monthNumberOfDaysDict[ newMonth ];
		dayObj.day = monthDayNumber;
	}
	else {
		dayObj.day = day - 1;
	}
	return dayObj;
};

var getNextDay = function(dayObj) {

	var day = dayObj.day;
	var month = dayObj.month;
	var year = dayObj.year;

	var totalDaysThisMonth = monthNumberOfDaysDict[ month ];

	if (day == totalDaysThisMonth) {
		if (month === 'December') {
			month = 'January';
			year += 1;
		}
		else {
			var currentMonthIndex = yearOrder.indexOf(month);
			var newMonthIndex = currentMonthIndex + 1;
			var newMonth = yearOrder[ newMonthIndex ];
			month = newMonth;
		}
		day = 1;
	}
	else {
		day += 1;
	}
	dayObj.day = day;
	dayObj.month = month;
	dayObj.year = year;
	return dayObj;
};


var dayToHtml = function(dayObj) {

	var tempString = dayObj.month + ' ' + dayObj.day + ', ' + dayObj.year;
	/*
	var tempHtml = '<div class="day-container">' + tempString + '<button class="appointment-add">Add Appointment' +'</div>';
	*/
	
	var tempHtml = '<div class="day-container"><div class="date-button-container">' + tempString + '<div class="button-container"><button class="appointment-add">Add Appointment</button>' + '</div>' + '</div>' + '</div>';
	

	return tempHtml;
};

var createDayContainer = function(dateInObj) {

	var outHtml = dayToHtml(dateInObj);
	addHtmlToPage(outHtml);

	var dayKey = createDayKey(dateInObj);
	var copyDateInObj = $.extend(true, {}, dateInObj);
	totalValuesObj[dayKey] = copyDateInObj;
	var resultString = turnObjStringLocalStorage(totalValuesObj);
};

var addHtmlToPage = function(htmlIn) {
	console.log("addHtmlToPage function has fired");
	$('#main-container').append(htmlIn);
};

var createNewDayAndStore = function(dayObject) {
	createDayContainer(dayObject);
	return getNextDay(dayObject);
};

var sideDivMove = function() {

	console.log('button has fired');
	console.log($(this));
	var windowBool = localStorage.wanderingdiv;
	windowBool = (windowBool === "true");
	
	console.log("localStorage.wanderingdiv: " + localStorage.wanderingdiv);
	console.log("tempBool: " + windowBool);
	/*
	$(this).find('.rel').css('left', '0px');
	
	$('#fun').css('left', '0px');
	*/
	
	if (windowBool) {
		//$('#fun').animate({left: '0px'}, 'slow');

		$('.slide-left').animate({left: '0'}, 'slow');
		$('.show-calendar').text('Hide Calendar');
	}
	else {
		//$('#fun').animate({left: '-210px'}, 'slow');
		$('.slide-left').animate({left: '-920px'}, 'slow');
		$('.show-calendar').text('Show Calendar');
	}
	var tempBool = !(windowBool);
	localStorage.wanderingdiv = tempBool;
	console.log("localStorage.wanderingdiv: " + localStorage.wanderingdiv);
	console.log("tempBool: " + tempBool);
	
};


$(document).on('ready', function() {

	var lastScroll = 0;

	var addHtml = '<div class="page-text">Adding text</div>';
	var insertHtmlObject = $(addHtml);

	$(function() {
    	$("form").submit(function() { return false; });
	});

	$(document).on('click', '.appointment-entry', function () {
		$(this).remove();
	});

	$('.show-calendar').click(function() {	
		sideDivMove();
	});

	// $('.slide-left').mouseenter(function() {
	// 	sideDivMove();
	// });

	// $('.slide-left').mouseleave(function() {
	// 	sideDivMove();
	// });

	$('.total-days').click( function () { alert( getTotalNumberDays() ) } );

	$(window).on('scroll', function() {


		var docHeight = $(document).height();
		var winHeight = $(window).height();
		var scrollDoc = $(document).scrollTop();
		var scrollWin = $(window).scrollTop();
		console.log('document height: ' + docHeight);
		console.log('window height: ' + winHeight);
		console.log('document scroll position: ' + scrollDoc);
		console.log('window scroll position: ' + scrollWin);
		var winHeightPlusScrollPos = scrollWin + winHeight;
		console.log('window height + scroll position: ' + winHeightPlusScrollPos);
		var distanceFromBottom = docHeight - winHeightPlusScrollPos;
		console.log('distance from the bottom: ' + distanceFromBottom);

		if ( (distanceFromBottom < 40 && scrollWin > lastScroll) || (distanceFromBottom === 0 && scrollDoc === scrollWin) ) {
			console.log('Adding text');
			
			/*
			dayCurrent = getPreviousDay(dayCurrent);
			*/
			// dayCurrent = getNextDay(dayCurrent);
			// // var outHtml = dayToHtml(dayCurrent);

			// // addHtmlToPage(outHtml);
			// createDayContainer(dayCurrent);
			
			/*
			$("#main-container").append('<div class="page-text">Adding text</div>');
			*/

			dayCurrent = createNewDayAndStore(dayCurrent);


			
		}
		lastScroll = scrollWin;
	});

	$(document).on('mouseenter', '.day-container', function() {
		
		/*
		var tempButtonObject = $(this).find('.button-container');
		*/
		var tempButtonObject = $(this).find('.appointment-add');
		
		// // console.log( tempButtonObject.css('visibility') );
		// // console.log( tempButtonObject.attr('class') );
		// // console.log( tempButtonObject );

		// tempButtonObject.toggle('fast');

		// // tempButtonObject.fadeToggle('fast');
		

		tempButtonObject.slideToggle('fast');
		console.log( tempButtonObject.css('visibility') );
	});

	$(document).on('mouseleave', '.day-container', function() {
		
		/*
		var tempButtonObject = $(this).find('.button-container');
		*/
		var tempButtonObject = $(this).find('.appointment-add');
		
		/*
		console.log( tempButtonObject.css('visibility') );
		console.log( tempButtonObject.attr('class') );
		console.log( tempButtonObject );
		tempButtonObject.toggle('fast');
		
		tempButtonObject.fadeToggle('fast');
		tempButtonObject.slideToggle('fast');
		*/
		tempButtonObject.fadeOut('slow', "linear" );
		
		console.log( tempButtonObject.css('visibility') );
	});

	$(document).on('click', '.appointment-add', function() {

		console.log($(this).attr('class'));
		var tempContainer = $(this).closest('.day-container');
		console.log(tempContainer.attr('class'));
		console.log(tempContainer);
		tempForm = $('<form class="appointment-form" onsubmit="function() {return false}"></form>');
		tempForm.append($('<input class="form-input" size="30">'));
		tempContainer.append(tempForm);

	});

	$(document).keypress('.form-input', function(event) {

		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.preventDefault();
			var currentElement = $(document.activeElement);
			var inputValue = currentElement.val();
			var dayContainer = currentElement.closest('.day-container');
			var buttonContainer = dayContainer.find('.date-button-container');
			var dateStringTotal = buttonContainer.text();
			var parentElement = currentElement.parent();
			var dateEnd = dateStringTotal.indexOf('Add');
			var dateString = dateStringTotal.slice(0, dateEnd);
			var dayObj = turnDateStringToObj(dateString);
			var dayKey = createDayKey(dayObj);
			var dayObj = totalValuesObj[ dayKey ];
			var dayObjArray = dayObj.appointments;
			dayObjArray.push( inputValue );
			dayObj.appointments = dayObjArray;
			totalValuesObj[ dayKey ] =  dayObj;
			var jsonStorageString = turnObjStringLocalStorage( totalValuesObj );			
			var dayContainer = parentElement.parent();
			parentElement.remove();
			dayContainer.append('<p class="appointment-entry">' + inputValue + '</p>');
		}
	});

});


// Create the first week of days

for(var i=0; i < 7; i++) {

	dayCurrent = createNewDayAndStore(dayCurrent);

	// createDayContainer(dayCurrent);
	// dayCurrent = getNextDay(dayCurrent);
}