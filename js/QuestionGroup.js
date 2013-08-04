function QuestionGroup(param,label){
	this.meta = param.meta;
	this.label = param.label;
}

this.prototype.print = function(target){
	var content = '';
	content += '<div class="row-fluid" id="group_row_' + this.label + '">';
		content += '<div class="' + this.cssClass.join(' ') + '"  id="group_content_' + this.label + '"> ';

		
}