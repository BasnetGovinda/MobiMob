var v = "";
v = Titanium.App.Properties.getString("head");

var winNewForm = Ti.UI.createWindow({
	title : "Completed Data",
	backgroundColor : "#CCCCCC"
});
var json = "";
json = JSON.parse(Titanium.App.Properties.getString("entryjson"));
var len = json.length;
var scrollView = Ti.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	layout : 'vertical'
});
var line = Ti.UI.createView({
	backgroundColor : '#CCCCCC',
	width : "100%",
	bottom : 0,
	height : 5,
	left : 0,

});
for ( i = 0; i < json.length; i++) {
	var c = 0;
	if (json[i].eType == "Group") {
		a = json[i].eCheckItem;
		g++;
		c = 0;
		b = "";
	}
	if (json[i].eType == "CheckItem") {
		c++;
		b = json[i].eCheckItem;
		alert(b);
		//alert(json[i].evaluetype);
		var vt = json[i].evaluetype;
		alert(vt);

		if (vt == "checkbox") {
			alert(json[i].eValue);
			if (json[i].eValue == "true") {
				//alert(json[i].evaluetype);

				self.checkview[a + "" + b].checked = true;
				self.checkview[a + "" + b].backgroundImage = '/image/checked1.png';
			}
		} else if (vt == "Edit") {
			self.checkview[a + "" + b].value = json[i].eValue;
		} else if (vt == "Numeric") {
			self.checkview[a + "" + b].value = json[i].eValue;
		} else if (vt == "ListChoice") {

			var listdata = self.data[g].groupItems[c].valueOption;
			for (var i = 0; i < listdata.length; i++) {
				if (listdata[i] == json[i].eValue) {

					self.checkview[a + "" + b].setSelectedRow(0, i, true);
				}
			}

		}

	}
	if (json[i].eComment != "") {
		c = "comment";
		self.controls[a + "" + b + "" + c].value = json[i].eComment;
	}

}

winNewForm.add(scrollView);
winNewForm.open();
