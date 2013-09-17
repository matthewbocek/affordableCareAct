function QuestionGroup(param){   
    this.label = param.name;
    this.meta = param.meta || '';
    this.required = param.required || '';
    this.multiple = '';
    this.questions = [];
    this.cssClass = param.cssClass || '';
    
    this.animateIn = param.animateIn || 'slideDown';
    this.animateOut = param.animateIn || 'slideUp';
    
    this.htmlRow;
    
    for(var i=0;i<param.questions.length;i++){
        this.questions.push( new Question( param.questions[i] ) );
    }
}

QuestionGroup.prototype.printTo = function(target){
    target.append(this.print());
    this.htmlRow = $("#group-row-" + this.label);
    $.each(this.questions,function(){
        this.setHtmlInputs();
    });
    this.htmlRow.hide();
    this.htmlRow.slideDown(400,function(){

    });
}

QuestionGroup.prototype.print = function(){
    var content = '';
	content += '<div class="row-fluid" id="group-row-' + this.label + '">';
    content += '<div class="' + this.cssClass + '"  id="group-content-' + this.label + '"> ';

    $.each(this.questions,function(){
        content += this.print();
    });
    
    content += '</div>';
    content += '</div>';
    return content;
}

QuestionGroup.prototype.prepareReport = function(){
    var report = [];
    $.each(this.questions,function(){
            this.saveAnswer();
            report[this.label] = this.savedAnswer;
    });
    console.log(report);
    return report;
}