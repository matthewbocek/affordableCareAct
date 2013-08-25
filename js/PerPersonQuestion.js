function PerPersonQuestion(param){
    this.label = param.label;
	
	this.text = param.text;
	
	this.inputType = param.inputType;
	this.answerOptions = param.answerOptions || [];
	this.placeholder = param.placeholder || param.text;
    this.cssClass = param.cssClass + ' perPerson' || 'perPerson';
	
    this.animateIn = param.animateIn || 'slideDown';
    this.animateOut = param.animateIn || 'slideUp';
    
    this.htmlInputs = null;
	this.savedAnswer = {};
}

PerPersonQuestion.prototype = new Question();