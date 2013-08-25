function PerPersonQuestionGroup(param,people){   
    this.label = param.label;
    this.meta = param.meta || '';
    this.questions = [];
    this.cssClass = param.cssClass + ' perPersonGroup' || 'perPersonGroup';
    
    this.animateIn = param.animateIn || 'slideDown';
    this.animateOut = param.animateIn || 'slideUp';
    
    this.htmlRow;
    
    this.people = param.people;
    
    for(var i=0;i<param.questions.length;i++){
        this.questions.push( new PerPersonQuestion( param.questions[i] ) );
    }
}

PerPersonQuestionGroup.prototype = new QuestionGroup(param);

PerPersonQuestionGroup.prototype.print = function(people){
    var group = this;
    var content = '';
	content += '<div class="row-fluid" id="group-row-' + this.label + '">';
    content += '<div class="' + this.cssClass + '"  id="group-content-' + this.label + '"> ';

    $.each(index,this.people){
        content += '<div id="' + group.label + '-person-' + index + '">';
        content += '<div>' + this + '</div>'
        $.each(this.questions,function(){
            content += this.print();
        });
    content += '</div>';
    });
        content += '</div>';
        content += '</div>';
        return content;
}
