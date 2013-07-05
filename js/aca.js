//$("#submit").on("click",{num:0},checkAnswers);
$("#questionnaire").css("visibility", "hidden");
$("#question_1").css("visibility", "hidden");
$("#question_2").css("visibility", "hidden");
$("#question_3").css("visibility", "hidden");


/*
 * showAndHideElements function
 * parameters:
 *		elementsToShow accepts an id or an array of id's of elements to show.
 *		elementsToHide accepts an id or an array of id's of elements to hide.
 * NOTE: Elements hidden with this function still take up space on the page.
 */
function showAndHideElements(elementsToShow, elementsToHide) {
	if(elementsToShow.isArray) {
		for(var i = 0; i < elementsToShow.length; i++)
		{
			$(elementsToShow[i]).css("visibility", "visible");
		}
	} else {
		$(elementsToShow).css("visibility", "visible");
	};
	
	if(elementsToHide.isArray) {
		for(var j = 0; j < elementsToHide.length; j++) {
			$(elementsToHide[j]).css("visibility", "hidden");
		}
	} else {
		$(elementsToHide).css("visibility", "hidden");
	};
};


/*
 * showElements function
 * parameter:
 *		elements accepts an id or an array of id's of elements to show.
 */
function showElement(element) {
	if(element.isArray) {
		for(var i = 0; i < element.length; i++) {
			$(element[i]).css("visibility", "visible");
		}
	} else {
		$(element).css("visibility", "visible");
	};
};


/*
 * hideElements function
 * parameters:
 *		elements accepts an id or an array of id's of elements to hide.
 * NOTE: Elements hidden with this function still take up space on the page.
 */
function hideElement(element) {
	if(element.isArray) {
		for(var i = 0; i < element.length; i++) {
			$(element[i]).css("visibility", "hidden");
		}
	} else {
		$(element).css("visibility", "hidden");
	};
};


function checkAnswers(event){
	console.log("checkAnswers called");
	//var questionNum = event.data.num;
	var questionNum = event;

	if( $("#answer_" + questionNum).val() == "" ) {
	  console.log("you need to enter an answer");
	  return false;
	}	

	switch(questionNum) {
		case 0:
		//special treatment for each question

		case 2:
		var familySize;
		var insured;
		var incomeLevel;
		var federalPovertyLine;
		var minIncome;
		var maxIncome;
		familySize = $("#answer_0").val();
		insured = $("#answer_1").val();
		incomeLevel = $("#answer_2").val();
		federalPovertyLine = (($("#answer_0").val() - 1) * 4020 + 11490);
		minIncome = Math.round(federalPovertyLine * 1.38, 0);
		maxIncome = Math.round(federalPovertyLine * 4.00,0);
		$("#a2_low").text("Below $" + minIncome);
		$("#a2_med").text("Between $" + minIncome + " and $" +maxIncome);
		$("#a2_high").text("Over $" + maxIncome);
		
		if((incomeLevel == "low" ) && (familySize - insured > 0)) {
			//alert("hello");
			$("#medicaid").css("display", "block");
			$("#landingHead").css("display", "none");
			$("#applyNowButton").css("display", "block");
		} else if ((incomeLevel == "med") && (familySize - insured > 0)) {
			$("#subsidy").css("display", "block");
			$("#applyNowButton").css("display", "block");
			$("#landingHead").css("display", "none");
		} else  if (incomeLevel != "placeholder"){
			$("#none").css("display", "block");
			$("#applyNowButton").css("display", "block");
			$("#landingHead").css("display", "none");
		};

		default:
		showNextQuestion(questionNum);
	
	}
}

function showNextQuestion(questionNum){
	$("#question_" + (questionNum + 1) ).css("visibility", "visible");
	$("#submit").off("click").attr("onclick","checkAnswers(" + (questionNum + 1) + ")");
}

