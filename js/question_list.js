var __AcaQuestionsShown = new Array();
var __AcaQuestions = {
	"countCitizens" : new Question(
		{
			"name" : "countCitizens",
			"text" : "How many US citizens did you claim on your tax return last year?",
			"helpers" : new Array(
				"What if I'm not a citizen?",
				"What if I didn't file a tax return last year?"
			),
			"inputType" : "number",
			"placeholder" : "Family Size",
			"descendents" : {
				"*" : "countPre-insured"
			}
		}
	),
	"countPre-insured" : new Question(
		{
			"name" : "countPre-insured",
			"text" : "How many of them received insurance through an employer?",
			"inputType" : "number",
			"placeholder" : "Pre-insured",
			"descendents" : {
				"*" : "categoryIncomeTax"
			},
			"required" : new Array(
				"countCitizens"
			),
			"attributes" : {
				"min" : 0
			//	"max" : __AcaQuestions.countCitizens.savedAnswer
			}
		}
	)
	
/*,
	"categoryIncomeTax" : Question(
		new Array(
			"name" : "categoryIncomeTax",
			"text" : "Your family's annual income on your taxes last year:",
			"inputType" : "select",
			"options" : new Array(
				"less than $" + Math.round(((__AcaQuestions.countCitizens.answer.val() - 1) * 4020 + 11490) * 1.38, 0),
				"between $" + Math.round(((__AcaQuestions.countCitizens.answer.val() - 1) * 4020 + 11490) * 1.38, 0) + " and " + Math.round(((__AcaQuestions.countCitizens.answer.val() - 1) * 4020 + 11490) * 4.00,0),
				"more than $" + Math.round(((__AcaQuestions.countCitizens.answer.val() - 1) * 4020 + 11490) * 4.00,0)
			)
			"descendents" : new Array(
				"*" : "categoryIncomeTax"
			)
		)
	)
	*/
}