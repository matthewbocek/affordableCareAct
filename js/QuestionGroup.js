function QuestionGroup(param){   
    this.label = param.label;
    this.meta = param.meta || '';
    this.questions = [];
    this.cssClass = param.cssClass || '';
    
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