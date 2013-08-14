function QuestionGroup(param){   
    this.label = param.label;
    this.meta = param.meta || '';
    this.questions = [];
    this.cssClass = []; // non-functional
    
    for(var i=0;i<param.questions.length;i++){
        this.questions.push( new Question( param.questions[i] ) );
    }
}

QuestionGroup.prototype.printTo = function(target){
    target.append(this.print());
}

QuestionGroup.prototype.print = function(){
    var content = '';
	content += '<div class="row-fluid" id="group_row_' + this.label + '">';
    content += '<div class="' + this.cssClass + '"  id="group_content_' + this.label + '"> ';

    $.each(this.questions,function(){
        content += this.print();
    });
    
    content += '</div>';
    content += '</div>';
    return content;
}