function PerPersonQuestionGroup(param,people){
    this.label = param.name;
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
    
    console.log('creating per person question group');
  
    //PerPersonQuestionGroup.prototype = new QuestionGroup(param);
    //attempt:
    QuestionGroup.call( this, param );
    //console.log("Parent.call has worked!")
}

//attempt cont.:
PerPersonQuestionGroup.prototype = Object.create( QuestionGroup.prototype );

PerPersonQuestionGroup.prototype.print = function(people){
    var group = this;
    var content = '';
	content += '<div class="row-fluid" id="group-row-' + this.label + '">';
    content += '<div class="' + this.cssClass + '"  id="group-content-' + this.label + '"> ';

    $.each(this.people,function(index,value){ //Troubles ahoy
        content += '<div id="' + group.label + '-person-' + index + '">';
        content += '<div>' + value + '</div>'
        $.each(group.questions,function(){
            content += this.print();
        });
    content += '</div>';
    });
        content += '</div>';
        content += '</div>';
        return content;
}
