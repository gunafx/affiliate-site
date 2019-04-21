var globalData = {};
var sheetKey = "1ysA699MyXQSJJlSyMwcVsLyV71qSGQXLHYlc8ITwO5k";
var apiKey = "AIzaSyDarLhb6rGyePmRz2oHAltaZSQYjElyATQ";
var sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/"+sheetKey+"/values/";

var tipsElm = "tips-list";
var discountElm = "discount-list";
var couponElm = "coupon-list";


//update tips data
getsheetData(sheetUrl+"tips").then(function(data){
	var tempStr = updateTemplate($("#"+tipsElm).html(), data),
		tempElm = document.getElementById(tipsElm);

	tempElm.innerHTML = tempStr.join(" ");
});

//discount data
getsheetData(sheetUrl+"discounts").then(function(data){
	var tempStr = updateTemplate($("#"+discountElm).html(), data),
		tempElm = document.getElementById(discountElm);

	tempElm.innerHTML = tempStr.join(" ");
});

//discount data
getsheetData(sheetUrl+"coupons").then(function(data){
	var tempStr = updateTemplate($("#"+couponElm).html(), data),
		tempElm = document.getElementById(couponElm);

	tempElm.innerHTML = tempStr.join(" ");
});




function getsheetData(url) {
	var getProm = new Promise(function(resolve, reject) {
		return $.get(url+"?key="+apiKey,function(data) {
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
