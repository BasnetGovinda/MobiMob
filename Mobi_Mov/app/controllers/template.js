// working with db
//function that does the insert of the data
// function insertInspections(dbData){
//
// Ti.Database.install('/datab/AutomobileService.sqlite','ListIns');
//
// var db = Ti.Database.open('ListInsg');
//
// // var query = "INSERT INTO Inspection (VIN,Version,OrgID,Manufacturer,Series,Model,Year) VALUES (?,?,?,?,?,?,?)',VIN.value,Version.value,OrgID.value,Manufacturer.value,Series.value,Model.value,Year.value";
//
// // var query = "INSERT INTO Inspection (VIN,Version) VALUES (5,'Version1')";
//
// var dbRows = db.execute('INSERT INTO Inspection (VIN,Version) VALUES (5,'Version');
//
// // var dbRows = db.execute(query);
//
// alert("Rows Inserted!!");
// dbRows.close();
// db.close();
//
// };

// working with db

var Barcode = require('ti.barcode');
Barcode.allowRotation = true;
Barcode.displayedMessage = '';
Barcode.useLED = true;
var scrollView = Ti.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	layout : 'vertical'
});

//An overlay for the barcode scanning

var overlay = Ti.UI.createView({
	backgroundColor : 'transparent',
	top : 0,
	right : 0,
	bottom : 0,
	left : 0
});

var cancelButton = Ti.UI.createButton({
	title : 'Cancel',
	textAlign : 'center',
	color : '#000',
	backgroundColor : '#45c2da',
	style : 0,
	font : {
		fontWeight : 'bold',
		fontSize : 16
	},
	borderColor : '#000',
	borderRadius : 10,
	borderWidth : 1,
	opacity : 0.5,
	width : 220,
	height : 30,
	top : 20
});
cancelButton.addEventListener('click', function() {
	Barcode.cancel();
});
overlay.add(cancelButton);

//Scanning barcode

var scanCode = Ti.UI.createButton({
	title : 'Scan Code',
	top : 10,
	color : '#FFFFFF',
	width : '85%',
	height : '8%',
	borderRadius : 5,
	backgroundColor : '#45c2da'
});

scanCode.addEventListener('click', function() {
	reset();
	Barcode.capture({
		animate : true,
		overlay : overlay,
		showCancel : false,
		showRectangle : false,
		keepOpen : true/*,
		 acceptedFormats: [
		 Barcode.FORMAT_QR_CODE
		 ]*/
	});
});
scrollView.add(scanCode);

var scannedBarcodes = {},
    scannedBarcodesCount = 0;

//This is function resets all params to start a new scannning
function reset() {
	scannedBarcodes = {};
	scannedBarcodesCount = 0;
	cancelButton.title = 'Cancel';

	scanResult.text = '';
	scanResult.text = 'Scanned Result: ';
}

Barcode.addEventListener('error', function(e) {
	scanResult.text += e.message;
});
Barcode.addEventListener('cancel', function(e) {
	Ti.API.info('Cancel received');
});
Barcode.addEventListener('success', function(e) {
	Ti.API.info('Success called with barcode: ' + e.result);
	if (!scannedBarcodes['' + e.result]) {
		scannedBarcodes[e.result] = true;
		scannedBarcodesCount += 1;

		cancelButton.title = 'Finished Scanning';
		scanResult.text += e.result + ' ';
	}
});

//showing the result of the scanned barcode!!
scrollView.add(Ti.UI.createLabel({
	text : 'Rotate the device to scan a barcode',
	top : 10,
	color : "#45c2da",
	height : Ti.UI.SIZE || 'auto',
	width : Ti.UI.SIZE || 'auto'
}));

var scanResult = Ti.UI.createLabel({
	text : '',
	textAlign : 'left',
	top : 10,
	left : 10,
	color : 'black',
	height : Ti.UI.SIZE || 'auto'
});
scrollView.add(scanResult);

//VIN,Make,Year,Series,Model and Note(long text field)
var VIN = Ti.UI.createTextField({
	hintText : 'VIN Number',
	top : 10,
	height : 40,
	width : "85%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var Version = Ti.UI.createTextField({
	hintText : 'Version',
	top : 10,
	height : 40,
	width : "85%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var OrgID = Ti.UI.createTextField({
	hintText : 'Org ID',
	top : 10,
	height : 40,
	width : "85%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var Manufacturer = Ti.UI.createPicker({

});

/*
 Ti.UI.createTextField({
 hintText:'Manufacturer',
 top: 10,
 height:40,
 width:"85%",
 borderWidth: 1,
 color:'black',
 font: {
 fontFamily:'Helvetica',
 fontSize: 14,
 fontStyle: 'normal',
 fontWeight: 'normal',
 //index:[i][j][m]
 },
 borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
 });
 */

var Series = Ti.UI.createTextField({
	hintText : 'Series',
	top : 10,
	height : 40,
	width : "85%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var Model = Ti.UI.createTextField({
	hintText : 'Model',
	top : 10,
	width : "85%",
	borderWidth : 1,
	height : 40,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var Year = Ti.UI.createTextField({
	hintText : 'Year',
	top : 10,
	height : 40,
	width : "85%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var btnListInsgection = Ti.UI.createButton({
	title : 'List Inspection',

	top : 10,

	color : '#FFFFFF',
	width : '85%',
	height : '8%',
	borderRadius : 5,
	backgroundColor : '#45c2da'
});

var btnSave = Ti.UI.createButton({
	title : 'Save Inspection',

	top : 10,

	color : '#FFFFFF',
	width : '85%',
	height : '8%',
	borderRadius : 5,
	buttom : 10,
	backgroundColor : '#45c2da'
});
var butheight = Ti.UI.createView({
	top : 10,
	height : 15,
	backgroundColor : '#FFFFFF'
});

btnSave.addEventListener('click', function() {

	if (VIN.value.length > 0 && Version.value.length > 0 && OrgID.value.length > 0 && Manufacturer.value.length > 0 && Series.value.length > 0 && Model.value.length > 0 && Year.value.length > 0) {

		var objVIN = VIN.value;
		var objVersion = Version.value;
		var objOrgID = OrgID.value;
		var objManufacturer = Manufacturer.value;
		var objSeries = Series.value;
		var objModel = Model.value;
		var objYear = Year.value;

		var dbs = Ti.Database.open('ListInsg');
		dbs.execute("INSERT INTO Inspection (VIN,Version,OrgID,Manufacturer,Series,Model,Year) VALUES (?,?,?,?,?,?,?)", objVIN, objVersion, objOrgID, objManufacturer, objSeries, objModel, objYear);
		// alert("Rows Inserted!!");
		// dbsRows.close();
		dbs.close();
		alert("Inspection Saved! Go to List Inspection");

		VIN.value = '';
		Version.value = '';
		OrgID.value = '';
		Manufacturer.value = '';
		Series.value = '';
		Model.value = '';
		Year.value = '';
	} else {
		alert("Empty Fields");
	};
});

btnListInsgection.addEventListener('click', function() {
	var testNew = Alloy.createController('InspectionList').getView();
	window.open(testNew);
});

//VIN,Make,Year,Series,Model and Note(long text field)

scrollView.add(VIN);
scrollView.add(Version);
scrollView.add(OrgID);
scrollView.add(Manufacturer);
scrollView.add(Series);
scrollView.add(Model);
scrollView.add(Year);
scrollView.add(btnSave);
scrollView.add(btnListInsgection);

scrollView.add(butheight);

window.add(scrollView);
window.open();

