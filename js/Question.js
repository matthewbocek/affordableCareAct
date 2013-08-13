function Question(param) {
	this.label = param.label;
	
	this.text = param.text;
	
	this.inputType = param.inputType;
	this.answerOptions = [param.answerOptions] || '';
	this.placeholder = param.placeholder || param.text;
    this.cssClass = [param.cssClass] || [];
	
	this.savedAnswer = null;
}

Question.prototype.printTo = function(target) {
	var content = "";
		content += '<div id="' + this.label + '" class="question_block ' + this.cssClass.join(' ') + '">';
        content += '<p>' + this.text + '</p>';
        content += '<p>' + this.getInputElement() + '</p>';
        content += '</div>';
	target.append(content);
}

Question.prototype.print = function() {
	var content = "";
		content += '<div id="' + this.label + '" class="question_block ' + this.cssClass.join(' ') + '">';
        content += '<p>' + this.text + '</p>';
        content += '<p>' + this.getInputElement() + '</p>';
        content += '</div>';
    return content;
}

Question.prototype.getInputElement = function() {
    var content = '';
    switch(this.inputType) {      
        case 'select':
            content += '<select name="' + this.label + '">';
            for(var option in this.answerOptions) {
                content += '<option value="' + this.option + '">' + this.option + '</option>';     
            }
            content += '</select>';
            break;
        
        case 'radio':
        case 'checkbox':
            for(var option in this.answerOptions) {
                content += '<p><input type="' + this.inputType + '" name="' + this.label + '" value="' + this.option + '" /></p>';
            }
            break;
        
        case 'text':
        default:
            content += '<input type="' + this.inputType + '" placeholder="' + this.placeholder + '" name="' + this.label + '" />';
            break;
    }
    return content;
}


/*
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
   */