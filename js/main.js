var globalData = {};
var tipsSheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/1ysA699MyXQSJJlSyMwcVsLyV71qSGQXLHYlc8ITwO5k/values/tips?key=AIzaSyDarLhb6rGyePmRz2oHAltaZSQYjElyATQ";

var tipsElm = "tips-list";
var tipsTemplate = $("#"+tipsElm).html();

//update tips data
getsheetData(tipsSheetUrl).then(function(data){
	var tempStr = updateTemplate(tipsTemplate, data),
		tempElm = document.getElementById(tipsElm);

	tempElm.innerHTML = tempStr.join(" ");
});

function getsheetData(url) {
	var getProm = new Promise(function(resolve, reject) {
		return $.get(url,function(data) {
			var arr = [], val = data.values, feilds = data.values[0];
			for(var i=1; i < val.length; i++) {
				var row = {};

				feilds.map(function(v,inner){
					row[v] = val[i][inner] || "N/A";
				});

				arr.push(row);
			}
			resolve(arr);
		});
	});
	return getProm;
};

function updateTemplate(template, data) {
	var tempArray = [];
	data.map(function(v,i){

		var allKeys = Object.keys(v), t = template;
		allKeys.map(function(k,inn){
			t = t.replace("{{"+k+"}}", v[k]);
		});
		tempArray.push(t);
	});
	return tempArray;
}
