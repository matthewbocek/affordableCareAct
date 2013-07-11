function Question(param,parent) {
	/* Parameter object Structure
	parameter {
		name
		text
		helpers {
			helper 1,
			helper 2
		}
		inputType
		placeholder
		options {
			option 1,
			option 2,
			option 3
		}
		descendents {
			answer 1 : descendent 1,
			answer 2 : descendent 1,
			answer 3 : descendent 2,
			answer 4 : descendent 3
		}
		required {
			requirement 1,
			requirement 2
		}
	}
	*/
	/* Question API
		name : returns the question's name, also its index in __AcaQuestions array
		text : returns the questions's default text
		helpers { : returns object containing helper links. Currently no functionality.
			helper 1,
			helper 2
		}
		inputType : returns a string describing the answer's html object. usually an <input> type but also "select" for <select> or others.
		placeholder : returns text you want to show before any answer is provided
		options { : returns an object containing options for <select>, radio buttons, check boxes, etc.
			option 1,
			option 2,
			option 3
		}
		descendents { : returns descendents in an object structure like: 
			answer 1 : descendent 1,
			answer 2 : descendent 1,
			answer 3 : descendent 2,
			"*" : default descendent 
		}
		
		required { : returns the questions required for this question to make sense.
			requirement 1,
			requirement 2
		}
		
		savedAnswer: returns the last answer to a question, even if it is not valid or the question is deleted
		
		question : returns html <p> object containing the question text
		answer : returns html (usually <input>) object containing the answer
		row : returns html <div> object containing the entire question/answer set
	
	
	METHODS:
		print(target) : prints the question/answer set BELOW the target.
		printFirstQuestion() : prints the question to the beginning of #questionnaire and adds a "submit" button
		nextQuestion() : uses .descendents to look up the next question
		keys(obj) : returns an a array of key values for an object in the form obj = {key1 : val1}
		onAnswer() : default behavior for answering a question: check for validity, check position in survey, advance to next question.
		IsValid() : checks validity of answers
		IsLast() : checks position in __AcaQuestionsShown array
		getValue() : inserts "placeholder" or "value" tag as required.
*/
	
	this.name = param.name;
	
	this.text = param.text;
	this.helpers = param.helpers;
	
	this.inputType = param.inputType;
	this.options = param.options;
	this.placeholder = param.placeholder;
	
	this.parent = parent;
	this.savedAnswer = null;
	
	this.descendents = param.descendents;
}

Question.prototype.print = function(target) {
	var content = "";
		content += '<div class="row-fluid" id="row_' + this.name + '">';
			content += '<div class="span7">';
				content += '<p class="text-right" id="question_' + this.name + '">' +  this.text + '</p>';
				content += '<p class="text-right more-help">';
					console.log( typeof(this.helpers) );
					if (typeof(this.helpers) != 'undefined') {
						for(i=0;i<this.helpers.length;i++) {
							content += '<a href="#" onclick="">' + this.helpers[i] + '</a>';
							if (i+1 < this.helpers.length) {
								content += ' &#8226; ';
							}
						}
					}
				content += '</p>';
            content += '</div>';
            content += '<div class="span5">';
				switch (this.inputType) {
					case 'select':
						content += '<select id="answer_' + this.name + '" ' + this.getValue() + '">'; //not tested
						for(i=0;i<this.options.length;i++) {
							content += '<option>' + this.options[i] + '</option>';
						}						
					break;
				
					case 'text':
					case 'number':
						content += '<input type="' + this.inputType + '" min="0" id="answer_' + this.name + '" ' + this.getValue() + ' />';
					break;
				}
			content += '</div>';
		content += '</div>';
	target.after(content);
	
	this.changeBtn($("#submit"),this.name);
	
	this.question = $("#question_" + this.name);
	this.answer = $("#answer_" + this.name);
	this.row = $("#row_" + this.name);
	
	if (this.attributes != "undefined") {
		var keys = this.keys(this.attributes);
		for(k in keys) {
			this.answer.attr(k,this.attributes[k]);
		}
	}
}

Question.prototype.printFirstQuestion = function() {
	__AcaQuestionsShown.push(this);

	$('#questionnaire').prepend('<a id="temp"></a>');
		this.print( $("#temp") );
	$("#temp").remove();
	$("#row_" + this.name).after(
		'<div class="row-fluid"><div class="span12"><p class="text-center"><a class="btn btn-primary btn-large" id="submit" href="#" onclick="__AcaQuestions.' + this.name + '.onAnswer()">Submit</a></p></div></div>'
	);
}

Question.prototype.nextQuestion = function() {
	this.savedAnswer = this.answer.val();
	var answerKeys = this.keys(this.descendents)
	console.log('answerKeys:',answerKeys);
	
	var i =0;
	
	for(var key in answerKeys){
		console.log(i,key,this.descendents[key]);
		i++
		if (this.savedAnswer === key) {
			console.log("MATCH:",key,this.descendents[key]);
			__AcaQuestions[this.descendents[key]].print(this.row);
			return;
		}
	}
	console.log('this.descendents["*"]',this.descendents["*"])
	__AcaQuestions[this.descendents["*"]].print(this.row); //TODO: cannot find property name of undefinted
	
}

Question.prototype.keys = function(obj) {
	var keys = new Array();
	for(var k in obj) {
		keys.push(k);
	}
	return keys;
}

Question.prototype.changeBtn = function(button,name){
	button.attr("onclick","__AcaQuestions." + name + ".onAnswer()");
}

Question.prototype.onAnswer = function() {
	if (this.isValid() ){
		if (this.isLast() ) {
			this.nextQuestion();
		}
	}
}

Question.prototype.isValid = function() { //TODO: add validation and UI for invalid answers
	return true;
}

Question.prototype.isLast = function() {
	if(this === __AcaQuestionsShown.length-1) {
		return true;
	} else { //TODO: handle people going back and changing their answers. Determine if new answer causes different questions to appear. When possible, pre-populate with Question.savedAnswer
		console.log("not last question");
		return true;
	}
}

Question.prototype.getValue = function() {
	if (this.savedAnswer === null) {
		return 'placeholder="' + this.placeholder + '"';
	} else {
		return 'value="' + this.savedAnswer + '"';
	}
}