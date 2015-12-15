var VIN;
var man;
var templetetype;
var tempname;
var Model;
var Year;
var Category;
var note;
var progressIndicator = Ti.UI.Android.createProgressIndicator({
	message : 'Loading Please wait ...',
	location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
	type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,

	cancelable : false,
	max : 10,
	min : 0

});

function convertUTCDateToLocalDate(date) {
	var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

	var offsethr = parseInt(date.getTimezoneOffset() / 60, 10);
	var hours = date.getHours();
	var min = date.getMinutes();
	var offsermin = date.getTimezoneOffset() % 60;
	newDate.setHours(hours - offsethr);
	newDate.setMinutes(min - offsermin);

	return newDate;
}

$.win.addEventListener('open', function(e) {
	$.win.activity.actionBar.hide();
});
var myvinid = Titanium.App.Properties.getString("vinid");
$.vin.text = "Report No:" + myvinid;
var v = "";
v = Titanium.App.Properties.getString("head");
//alert(v);
var testmmm = Titanium.App.Properties.getString("mannufact");
//alert(testmmm);
//self.data=JSON.stringify(testmmm);
var btnview = Ti.UI.createView({
	button : "10%",
	height : Ti.UI.SIZE,
	width : "100%",
	backgroundColor : "#CCCCCC"

});

function toastMsg(msg) {
	var toast = Ti.UI.createNotification({
		message : msg,
		duration : Ti.UI.NOTIFICATION_DURATION_LONG
	});
	toast.show();
}

//alert(v);
var da = [];
var self = {};
self.controls = {};
self.checkview = {};
self.Views = [];
self.view = {};
self.images = {};
self.data = "";
var sadsddata = [{
	"group" : "Visual Inspection ",
	"groupItems" : [{
		"group" : "Exterior",
		"groupItems" : [{
			"valueType" : "checkbox",
			"controls" : ["Pic", "video", "comment"],
			"valueOption" : [""],
			"checkItem" : "Check Dent",
			"textInstruction" : "This is very good test.",
			"pictureInstruction" : "x:\\sdjl.png",
			"videoInstruction" : "youtube:\\kjdfl.com"
		}, {
			"valueType" : "ListChoice",
			"controls" : ["Pic", "video", "comment"],
			"valueOption" : ["White", " Black", " Red"],
			"checkItem" : "Check Color",
			"textInstruction" : "This is very good test.",
			"pictureInstruction" : "x:\\sdjl.png",
			"videoInstruction" : "youtube:\\kjdfl.com"
		}, {
			"valueType" : "Numeric",
			"controls" : ["Pic", "video", "comment"],
			"valueOption" : [""],
			"checkItem" : "Check tire pressure",
			"textInstruction" : "",
			"pictureInstruction" : "",
			"videoInstruction" : ""
		}]
	}, {
		"group" : "Interior",
		"groupItems" : [{
			"valueType" : "checkbox",
			"controls" : ["comment"],
			"valueOption" : [""],
			"checkItem" : "Check dash board",
			"textInstruction" : "",
			"pictureInstruction" : "",
			"videoInstruction" : ""
		}]
	}]
}, {
	"group" : "Operation Inspection ",
	"groupItems" : [{
		"group" : "Exterior",
		"groupItems" : [{
			"valueType" : "checkbox",
			"controls" : ["Pic", "video", "comment"],
			"valueOption" : [""],
			"checkItem" : "Check Dent",
			"textInstruction" : "This is very good test.",
			"pictureInstruction" : "x:\\sdjl.png",
			"videoInstruction" : "youtube:\\kjdfl.com"
		}, {
			"valueType" : "ListChoice",
			"controls" : ["Pic", "video", "comment"],
			"valueOption" : ["White", " Black", " Red"],
			"checkItem" : "Check Color",
			"textInstruction" : "This is very good test.",
			"pictureInstruction" : "x:\\sdjl.png",
			"videoInstruction" : "youtube:\\kjdfl.com"
		}, {
			"valueType" : "Numeric",
			"controls" : ["Pic", "video", "comment"],
			"valueOption" : [""],
			"checkItem" : "Check tire pressure",
			"textInstruction" : "",
			"pictureInstruction" : "",
			"videoInstruction" : ""
		}]
	}, {
		"group" : "Interior",
		"groupItems" : [{
			"valueType" : "Edit",
			"controls" : ["comment"],
			"valueOption" : [""],
			"checkItem" : "Check dash board",
			"textInstruction" : "",
			"pictureInstruction" : "",
			"videoInstruction" : ""
		}]
	}]
}];

//self.data=testmmm;

self.data = JSON.parse(testmmm);

var Accordion = function(mainRoot) {

	//the object where
	var checkedData = [];

	function makeHeader(text, size, col, index, bgcol) {//function making both ssection and group
		var vue = Ti.UI.createView({
			layout : "horizontal",
			backgroundColor : bgcol,
			top : 0,
			height : 45,
			index : index,
			width : "100%"

		});
		//alert(text);
		var lab = Titanium.UI.createLabel({
			width : "86%",
			height : Ti.UI.SIZE,
			text : text,
			left : "2%",
			// textalign:

			font : {
				fontFamily : 'Arial',
				fontSize : size,
			},
			color : col,
			index : index
		});

		var image = Ti.UI.createImageView({
			top : 5,
			image : '/image/plu.png',
			width : "10%",
			right : "0db",
			index : index
		});

		vue.add(lab);
		vue.add(image);

		self.images[index] = image;

		/*
		 lab.addEventListener('click', click);
		 image.addEventListener('click', click);*/

		vue.addEventListener('click', function(e) {
			//console.log(e);

			var index = e.source.index;
			//console.log(index);

			var view = self.view[index];
			var imageView = self.images[index];

			view.visible = !view.visible;
			self.view[index] = view;
			if (view.visible) {

				//console.log(view);
				view.height = Ti.UI.SIZE;
				imageView.image = '/image/minus.png';

			} else {
				view.height = 0;
				imageView.image = '/image/plu.png';

			}

			//console.log(e);

		});
		return vue;

	}

	function createCheckbox(specs, i, j, d) {//function making the checkbox

		if ( typeof specs != "object")
			specs = {};

		specs.parentIndex = i;

		specs.index = j;
		specs.width = specs.width || 25;
		specs.backgroundImage = '/image/unchecked.png';
		specs.height = specs.height | 25;
		specs.border = specs.border || 2;
		specs.borderColor = specs.borderColor || "#3B77AB";
		var x = self.data[i].group;
		var y = self.data[i].groupItems[j].group;
		var z = d.checkItem;
		self.checkview[x + "" + y + "" + z] = Ti.UI.createView(specs);

		function togglecheck(e) {
			if (!self.checkview[x + "" + y + "" + z].checked) {
				self.checkview[x + "" + y + "" + z].checked = true;
				self.checkview[x + "" + y + "" + z].backgroundImage = '/image/checked1.png';
				// checkedData.push(tx);
				// alert(checkedData.length);
			} else {
				self.checkview[x + "" + y + "" + z].checked = false;
				self.checkview[x + "" + y + "" + z].backgroundImage = '/image/unchecked.png';
				//var indexhead=e.source.parentIndex;
				//var indexbody=e.source.index;
				// var tx =self.data[indexhead].body[indexbody];
				// var a = checkedData.indexOf(tx);
				//checkedData.splice(tx,1);
				// alert(checkedData.length);
			}
		};

		self.checkview[x + "" + y + "" + z].addEventListener("click", togglecheck);
		if (specs.view) {
			specs.view.addEventListener("click", togglecheck);
		}
		return self.checkview[x + "" + y + "" + z];

	}

	function makeControl(d, i, j, k) {//function making the controls

		var vu = Ti.UI.createView({
			layout : "horizontal",
			height : Ti.UI.SIZE,
			top : 5,
			left : 50

		});
		//alert(d.controls.length);
		var len = d.controls.length;
		for (var m = 0; m < len; m++) {
			var a = self.data[i].group;
			var b = self.data[i].groupItems[j].group;
			var d = self.data[i].groupItems[j].groupItems[k].checkItem;
			var c = self.data[i].groupItems[j].groupItems[k].controls[m];
			//console.log(".........+++++++++..........................");
			//console.log(a + b + c + d);
			//console.log(".........+++++++++..........................");
			//alert(a+b+c);
			//alert(contrl);

			if (c == "comment") {
				var view123 = Ti.UI.createView({
					width : "90%",
					height : 85,
				});

				// Create a Label.
				var aLabel = Ti.UI.createLabel({
					text : 'Comment',
					width : "100%",
					height : 30,
					color : 'black',
					left : 2,
					top : 0,
					textAlign : 'left'
				});

				self.controls[a + "" + b + "" + d + "" + c] = Ti.UI.createTextArea({
					hintText : "Textarea",
					//width : "100%",
					top : 35,
					backgroundColor : '#F3F3F3',
					height : 50,
					width : "100%",
					borderWidth : 1,
					borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
					verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
					color : 'black',
					font : {
						fontFamily : 'Helvetica',
						fontSize : 16,
						fontStyle : 'normal',
						fontWeight : 'normal',
						//index:[i][j][m]
					}
				});
				view123.add(aLabel);
				view123.add(self.controls[a + "" + b + "" + d + "" + c]);
				vu.add(view123);

				// vu.add(lab);
			} else if (c == "Button") {
				self.controls[a + "" + b + "" + d + "" + c] = Ti.UI.createButton({
					title : "Button",
					top : 10,
					color : '#FFFFFF',
					width : '85%',
					height : '8%',
					borderRadius : 5,
					buttom : 10,
					backgroundColor : '#45c2da',
					font : {
						fontFamily : 'Helvetica',
						fontSize : 14,
						fontStyle : 'normal',
						fontWeight : 'normal',
						//index:[i][j][m]
					}
				});
				vu.add(self.controls[a + "" + b + "" + d + "" + c]);
				//vu.add(lab);
			}
			//vu.add(self.controls[a+""+b+""+c]);
			else if (c == "Checkbox") {
				self.controls[a + "" + b + "" + d + "" + c] = Ti.UI.createSwitch({
					style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					title : 'Dynamic chkbox',
					value : true,
					width : 300,
					height : 100
				});
				vu.add(self.controls[a + "" + b + "" + d + "" + c]);
			} else if (c == "List") {
				var viw = Ti.UI.createView({
					layout : "horizontal",
					backgroundColor : "White",
					height : 40
				});
				var btn = Ti.UI.createButton({
					title : 'Color Option',
					height : 40,
					width : '40%',
					backgroundColor : '#45c2da',
					borderRadius : 5,
					color : '#FFFFFF',
					left : "0db"
					// textalign:
				});
				// Create a TextField.
				self.controls[a + "" + b + "" + d + "" + c] = Ti.UI.createTextField({
					height : 40,
					width : '50%',
					backgroundColor : '#F3F3F3',
					hintText : 'color',
					editable : false,
					right : "0db"
				});
				viw.add(btn);
				viw.add(self.controls[a + "" + b + "" + d + "" + c]);
				var myArray = ["White", "Black", "Red"];
				var opts = {
					cancel : 2,
					options : myArray,
					selectedIndex : 2,
					destructive : 0,
				};
				vu.add(viw);
				var dialog;
				btn.addEventListener('click', function() {
					dialog = Ti.UI.createOptionDialog(opts);
					dialog.show();
					dialog.addEventListener('click', onSelectDialog);
				});
				function onSelectDialog(event) {
					var selectedIndex = event.source.selectedIndex;
					//OR
					//var selectedIndex = dialog.selectedIndex();
					//alert(myArray[selectedIndex]);
					c = "List";
					self.controls[a + "" + b + "" + d + "" + c].value = myArray[selectedIndex];
					//self.controls[a+""+b+""+c].text=myArray[selectedIndex];
				}

			} else if (c == "Pic") {
				// Create a Button for video
				//alert(a+b+c);
				//alert("i m here");
				var vie1 = Ti.UI.createView({
					height : 40,
					width : "90%",
					top : 10,
				});

				// Create a Label.
				var aLabel = Ti.UI.createLabel({
					text : 'Attach Pic',
					color : 'black',
					left : 2,
					//backgroundColor:"red",
					width : "30%",
					font : {
						fontFamily : 'Helvetica',
						//fontSize : ,
						fontStyle : 'normal',
						fontWeight : 'normal',
						//				index : [i][j]
					}

				});

				var getvedio = Ti.UI.createImageView({
					top : 10,
					image : '/image/camera.png',
					left : "31%"
				});
				vie1.add(aLabel);
				vie1.add(getvedio);
				self.controls[a + "" + b + "" + d + "" + c] = Ti.UI.createImageView({
					top : 10,
					width : "90%",
					height : 0,
					image : ""
				});
				// Listen for click events.
				getvedio.addEventListener('click', function() {
					c = "Pic";
					Titanium.Media.showCamera({
						success : function(event) {
							if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
								//alert(event.media.nativePath);
								var newBlob = event.media.imageAsResized(600, 400);
								self.controls[a + "" + b + "" + d + "" + c].image = newBlob;
								self.controls[a + "" + b + "" + d + "" + c].height = 160;
							} else {
								alert("got the wrong type back =" + event.mediaType);
							}
						},
						cancel : function() {
							// called when user cancels taking a picture
						},
						error : function(error) {
							// called when there's an error
							var a = Titanium.UI.createAlertDialog({
								title : 'Camera'
							});
							if (error.code == Titanium.Media.NO_CAMERA) {
								a.setMessage('Please run this test on device');
							} else {
								a.setMessage('Unexpected error: ' + error.code);
							}
							a.show();
						},
						saveToPhotoGallery : true,
						// allowEditing and mediaTypes are iOS-only settings
						allowEditing : true,
						mediaTypes : [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
					});
				});
				// Add to the parent view.
				// Add to the parent view.
				vu.add(vie1);
				vu.add(self.controls[a + "" + b + "" + d + "" + c]);
			}

		}
		return vu;

	}

	function getInternalBody(d, size, col, i, j) {//function creating the checkitems
		var vu = Ti.UI.createView({
			layout : "horizontal",
			height : 'auto',
			top : 5,
			left : 50

		});
		//alert(text);

		var text = "";
		text = d.checkItem;
		//console.log('makebody for accrodion->text: ' + text);

		var lab = Ti.UI.createLabel({
			text : text,
			width : "90%",
			color : 'black',
			left : 2,
			font : {
				fontFamily : 'Helvetica',
				fontSize : size,
				fontStyle : 'normal',
				fontWeight : 'bold',
				//				index : [i][j]
			}

		});
		//alert(self.data[i].groupItems[j].valueType);
		vu.add(lab);
		//var chk= createCheckbox({view:lab},i,j);

		if (d.valueType == "Checkbox") {

			var chk = createCheckbox({
				view : lab
			}, i, j, d);

			vu.add(chk);

		}

		var x = self.data[i].group;
		var y = self.data[i].groupItems[j].group;
		var z = d.checkItem;
		//alert(x + y + z);

		if (d.valueType == "Numeric") {

			var x = self.data[i].group;
			var y = self.data[i].groupItems[j].group;
			var z = d.checkItem;
			self.checkview[x + "" + y + "" + z] = Ti.UI.createTextField({
				hintText : "Numeric",
				top : 10,
				keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
				height : 40,
				backgroundColor : '#F3F3F3',
				width : "90%",
				borderWidth : 1,
				borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				color : 'black',
				font : {
					fontFamily : 'Helvetica',
					fontSize : 14,
					fontStyle : 'normal',
					fontWeight : 'normal',
				}

			});
			vu.add(self.checkview[x + "" + y + "" + z]);

		}

		if (d.valueType == "Edit") {
			var x = self.data[i].group;
			var y = self.data[i].groupItems[j].group;
			var z = d.checkItem;
			self.checkview[x + "" + y + "" + z] = Ti.UI.createTextField({
				hintText : "edit",
				top : 10,
				height : 40,
				backgroundColor : '#F3F3F3',
				width : "90%",
				borderWidth : 1,
				borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				color : 'black',
				font : {
					fontFamily : 'Helvetica',
					fontSize : 14,
					fontStyle : 'normal',
					fontWeight : 'normal',
					//index:[i][j][m]
				}

			});
			vu.add(self.checkview[x + "" + y + "" + z]);

		}

		if (d.valueType == "ListChoice") {
			var x = self.data[i].group;
			var y = self.data[i].groupItems[j].group;
			var z = d.checkItem;
			self.checkview[x + "" + y + "" + z] = Ti.UI.createPicker({
				//top:50,
				backgroundColor : '#6a7369',

				//borderColor : "#45C2DA",
				visibleItems : 3,
				font : {
					fontFamily : 'Helvetica',
					fontSize : size,
					fontColor : "Black",
					fontStyle : 'normal',
					fontWeight : 'normal'
				},
				width : "90%",
				//									index : [i][j],

			});
			var data = [];
			var listdata = d.valueOption;
			for (var i = 0; i < listdata.length; i++) {
				data[i] = Ti.UI.createPickerRow({
					title : listdata[i]
				});
			}

			self.checkview[x + "" + y + "" + z].add(data);
			self.checkview[x + "" + y + "" + z].selectionIndicator = true;
			vu.add(self.checkview[x + "" + y + "" + z]);

		}

		return vu;
	}

	function init() {
		var view = testMethod(self.data);
		var vue = Ti.UI.createView({
			layout : "horizontal",
			backgroundColor : "#99d9ea",
			top : 0,
			height : 45,

			width : "100%"

		});
		//alert(text);
		var lab = Titanium.UI.createLabel({
			width : "86%",
			height : Ti.UI.SIZE,
			text : "Inspection Information",
			left : "2%",
			font : {
				fontFamily : 'Arial',
				fontSize : 20,
			},
			color : "#000000",

		});

		var image = Ti.UI.createImageView({
			top : 5,
			image : '/image/plu.png',
			width : "10%",
			right : "0db",

		});

		vue.add(lab);
		vue.add(image);
		var spacermain = Titanium.UI.createView({
			height : 4,
			width : "100%",
			//top : 1,
			backgroundColor : "#CCCCCC"
		});
		var topView = Titanium.UI.createView({
			height : Ti.UI.SIZE,
			width : "100%",
			top : 0,
			layout : 'vertical',
			accordion : "true",
			backgroundColor : "#CCCCCC"
		});
		topView.add(vue);

		vue.addEventListener('click', function() {
			if (data.visible) {
				data.visible = false;
				data.height = 0;
				image.image = '/image/plu.png';
			} else {
				data.visible = true;
				data.height = Ti.UI.SIZE;
				image.image = '/image/minus.png';
			}
		});
		var data = InspectionData();
		topView.add(data);
		data.height = 0;
		data.visible = false;
		mainRoot.add(topView);
		mainRoot.add(spacermain);
		mainRoot.add(view);

	}

	function InspectionData() {
		var headerdata = self.data;
		var spacermain = Titanium.UI.createView({
			height : 4,
			width : "100%",
			//top : 1,
			backgroundColor : "#CCCCCC"
		});
		var view1 = Ti.UI.createView({
			left : 50,
			right : 5,
			height : Ti.UI.SIZE,
			layout : "horizontal"
		});
		var view2 = Ti.UI.createView({
			//top:5,
			left : 5,
			right : 5,
			height : Ti.UI.SIZE,
			layout : "horizontal",
			backgroundColor : "white",
			touchEnabled : false

		});

		// Create a TextField.
		var lblVim = Ti.UI.createLabel({
			text : 'Report No',
			color : 'black',
			font : {
				fontSize : 16,
				fontWeight : 'bold',
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		VIN = Ti.UI.createTextField({
			hintText : 'Report No',
			top : 10,
			height : 40,
			//value:headerdata.vin,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {
				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		var lblmfg = Ti.UI.createLabel({
			text : 'Type of Building',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		man = Ti.UI.createTextField({
			hintText : 'Type of Building',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			editable : false,
			font : {
				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		var lbltempname = Ti.UI.createLabel({
			text : 'Inspection Type',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		tempname = Ti.UI.createTextField({
			hintText : 'Inspection Type',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			editable : false,
			color : 'black',
			font : {
				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		var lbltemptype = Ti.UI.createLabel({
			text : 'Form Name',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		templetetype = Ti.UI.createTextField({
			hintText : 'Form Name',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "90%",
			editable : false,
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {
				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			//	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		var lblCategory = Ti.UI.createLabel({
			text : 'Customer Name',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		Category = Ti.UI.createTextField({
			hintText : 'Customer Name',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {
				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		var lblModel = Ti.UI.createLabel({
			text : 'Address',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		Model = Ti.UI.createTextField({
			hintText : 'Address',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {

				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			//	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});

		var lblYear = Ti.UI.createLabel({
			text : 'Year Built',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		Year = Ti.UI.createTextField({
			hintText : 'Year Built',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {
				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});

		var lblnote = Ti.UI.createLabel({
			text : ' Property Desc',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : "100%",
			top : 10,

		});

		note = Ti.UI.createTextArea({
			hintText : ' Property Desc',
			top : 10,
			height : 60,
			backgroundColor : '#F3F3F3',
			width : "90%",
			//left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {

				fontFamily : 'Helvetica',
				fontSize : 16,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			//	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});

		// Add to the parent view.
		view2.add(spacermain);
		view1.add(lblVim);
		view1.add(VIN);
		//view1.add(spacermain);
		view1.add(lblmfg);
		view1.add(man);
		//view1.add(spacermain);
		view1.add(lbltemptype);
		view1.add(templetetype);
		//view1.add(spacermain);
		view1.add(lbltempname);
		view1.add(tempname);
		//view1.add(spacermain);
		view1.add(lblCategory);
		view1.add(Category);
		view1.add(lblModel);
		view1.add(Model);
		//view1.add(spacermain);
		view1.add(lblYear);
		view1.add(Year);
		view1.add(lblnote);
		view1.add(note);
		var abc = Ti.UI.createView({
			height : 5,
			backgroundColor : "white"
		});
		view1.add(abc);
		view2.add(view1);
		return view2;

	};

	function testMethod(d) {
		var topLevelView = Titanium.UI.createView({
			height : Ti.UI.SIZE,
			width : "100%",
			top : 0,
			layout : 'vertical',
			accordion : "true",
			//backgroundColor : "red"
		});

		for (var i = 0; i < d.length; i++) {

			//console.log("-----------------------");
			var node = d[i].groupItems;
			//console.log(d[i].group);
			//console.log("*******************************");

			var header = makeHeader(d[i].group, 20, "#000000", i, "#99d9ea");
			//creating the section

			var par1 = Titanium.UI.createView({
				height : Ti.UI.SIZE,
				top : 0,
				layout : 'vertical',
				borderWidth : 0,
				accordion : "true",
				width : "100%"
				//backgroundColor:"#99d9ea"

			});

			par1.add(header);

			//par1.add(spacer2);

			var body1 = Titanium.UI.createView({
				height : Ti.UI.SIZE,
				top : 0,
				layout : 'vertical',
				borderWidth : 0,
				accordion : "true",
				visible : false,

			});
			for (var j = 0; j < node.length; j++) {
				//console.log(node[j].group);
				//console.log("..........................");
				var iNode = node[j].groupItems;

				var header1 = makeHeader(node[j].group, 20, "#007f97", i + '' + i + '' + j, "white");
				//creating group
				var par2 = Titanium.UI.createView({
					height : Ti.UI.SIZE,
					top : 0,
					width : "100%",
					layout : 'vertical',
					borderWidth : 0,
					accordion : "true"
				});
				var spacer = Titanium.UI.createView({
					height : 3,
					width : "100%",
					top : 0,
					backgroundColor : "#CCCCCC"
				});
				par2.add(spacer);
				par2.add(header1);
				var body2 = Titanium.UI.createView({
					height : Ti.UI.SIZE,
					top : 0,
					layout : 'vertical',
					borderWidth : 0,
					width : "100%",
					accordion : "true",
					backgroundColor : "#CCCCCC",
					visible : false
				});
				var spac1 = Titanium.UI.createView({
					height : 5,
					width : "100%",
					backgroundColor : "#CCCCCC",
					//	top : ,
				});
				body2.add(spac1);
				for (var k = 0; k < iNode.length; k++) {
					var body3 = Titanium.UI.createView({
						height : Ti.UI.SIZE,
						layout : 'vertical',
						borderWidth : 0,
						backgroundColor : "white",

						left : 5,
						right : 5,
						accordion : "true",

						//visible : false
					});
					//console.log(iNode[k].valueType);
					//console.log(iNode[k].checkItem);
					var ib = getInternalBody(iNode[k], 16, '#ff', i, j);
					//creating checkitems
					alert(i + "---" + j + "heig" + ib.height());
					var controls = makeControl(iNode[k], i, j, k);
					//creating controls
					body3.add(ib);
					body3.add(controls);
					body2.add(body3);
					var bodyspac = Titanium.UI.createView({
						height : 5,
						width : "100%",
						backgroundColor : "white",
						//	top : ,
					});
					body3.add(bodyspac);
					var spac = Titanium.UI.createView({
						height : 5,
						width : "100%",
						backgroundColor : "#CCCCCC",
						//	top : ,
					});

					body2.add(spac);
					//body2.add(controls);

				}

				body2.height = 0;
				var spacer1 = Titanium.UI.createView({
					height : 1,
					width : "88%",
					backgroundColor : "#CCCCCC",
					left : "5%",
				});
				//par2.add(spacer1);
				//par2.add(spacer2);
				par2.add(body2);
				body1.add(par2);

				self.view[i + '' + i + '' + j] = body2;

			}
			if (d.length == 1) {
				//alert('dd');
				body1.height = Ti.UI.SIZE;
				body1.visible = true;
			} else {
				body1.height = 0;
			}

			//par1.add(spacer2);
			par1.add(body1);
			var spacermain = Titanium.UI.createView({
				height : 4,
				width : "100%",
				//top : 1,
				backgroundColor : "#CCCCCC"
			});
			par1.add(spacermain);
			self.view[i] = body1;

			topLevelView.add(par1);
			//console.log("-----------------------");
		}
		return topLevelView;
	}


	progressIndicator.show();
	progressIndicator.value = 1;
	init();
	progressIndicator.value = 3;
	givedata();
	progressIndicator.value = 10;
	progressIndicator.hide();
	function givedata() {//adding data to the template in edit mode
		//progressIndicator.value = 6;
		var db1 = Ti.Database.open('mydatalist8');
		var dbarray1 = db1.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
		note.value = dbarray1.fieldByName('Note');
		//console.log(dbarray.fieldByName('vin'));
		VIN.value = dbarray1.fieldByName('vin');
		man.value = dbarray1.fieldByName('Manufacturer');
		templetetype.value = dbarray1.fieldByName('TemplateType');
		tempname.value = dbarray1.fieldByName('TemplateName');
		Model.value = dbarray1.fieldByName('Model');
		Year.value = dbarray1.fieldByName('Year');
		Category.value = dbarray1.fieldByName('Series');
		dbarray1.close();
		db1.close();

	}


	mainRoot.add(btnview);
	return self;
};

var SaveDraft = Ti.UI.createButton({
	title : 'Submit',
	width : '56%',
	height : 50,
	left : "22%",
	top : 10,
	borderRadius : 5,
	buttom : 10,
	color : '#FFFFFF',
	backgroundColor : '#007f97',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 20,
		fontStyle : 'normal',
		fontWeight : 'bold',
		//index:[i][j][m]
	}

});
//save button
SaveDraft.addEventListener('click', function() {// saving the data locally

	var dbsrow = Ti.Database.open('mydatalist8');
	//progressIndicator1.show();
	var headcount = dbsrow.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
	var detailcount = dbsrow.execute("SELECT * FROM Entry_details where HeaderID = " + v);
	//progressIndicator1.value = 1;
	//alert("head" + headcount.rowCount + "detials" + detailcount.rowCount);
	dbsrow.execute('BEGIN');
	save();
	function save() {
		if (detailcount.rowCount != 0) {
			dbsrow.execute("DELETE FROM Entry_details where HeaderID = " + v);
		}

		for (var i = 0; i < self.data.length; i++) {
			var id = self.data[i].id;
			var HeaderID = v;
			var CheckItem = "";
			var Type = "";
			var Val = "";
			var Comment = "";
			var Pic = "";
			var valueType = "";
			var a = self.data[i].group;
			var picinfo = "";
			CheckItem = a;
			Type = "Section";
			//alert("inside group");
			var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,Pic,valueType,Picinfo,TemplateDetailID) VALUES (?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, Pic, valueType, picinfo, id);
			//alert(CheckItem+Type+Val+Comment+Pic);
			for (var k = 0; k < self.data[i].groupItems.length; k++) {
				Type = "Group";
				Comment = "";
				pic = "";
				picinfo = "";
				valueType = "";
				val = "";
				id = self.data[i].groupItems[k].id;
				CheckItem = self.data[i].groupItems[k].group;
				var d = self.data[i].groupItems[k].group;
				var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,Pic,valueType,Picinfo,TemplateDetailID) VALUES (?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, Pic, valueType, picinfo, id);

				for (var j = 0; j < self.data[i].groupItems[k].groupItems.length; j++) {
					id = self.data[i].groupItems[k].groupItems[j].id;
					var b = self.data[i].groupItems[k].groupItems[j].checkItem;
					CheckItem = b;
					Type = "CheckItem";
					valueType = self.data[i].groupItems[k].groupItems[j].valueType;
					if (valueType == "Numeric") {
						Val = self.checkview[a + "" + d + "" + b].value;
					}
					if (valueType == "Edit") {
						Val = self.checkview[a + "" + d + "" + b].value;
					}

					if (valueType == "Checkbox") {
						Val = self.checkview[a + "" + d + "" + b].checked;
					}
					if (valueType == "ListChoice") {

						Val = self.checkview[a + "" + d + "" + b].getSelectedRow(0).title;

					}
					//Val=self.checkview[a+""+b].checked;
					// alert(val);
					for (var m = 0; m < self.data[i].groupItems[k].groupItems[j].controls.length; m++) {
						var c = self.data[i].groupItems[k].groupItems[j].controls[m];
						if (c == "comment") {
							Comment = self.controls[a + "" + d + "" + b + "" + c].value;
						} else if (c == "Pic") {

							if (self.controls[a + "" + d + "" + b + "" + c].image != "") {
								//alert(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
								var test = self.controls[a + "" + d + "" + b + "" + c].image;
								Pic = "";

								var image11 = Ti.Utils.base64encode(test);
								//           alert("image11 =" + image11);
								picinfo = image11.toString();
							} else {
								picinfo = "";
							}

						} else if (c == "List") {
							Val = self.controls[a + "" + d + "" + b + "" + c].value;
						} else if (c == "Num") {
							//Val=self.controls[a+""+b+""+c].value;
						}

					}

					var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,Pic,valueType,Picinfo,TemplateDetailID) VALUES (?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, Pic, valueType, picinfo, id);

					//			progressIndicator1.value = 4;
				}
				var update = new Date();
				dbsrow.execute("UPDATE  Inspection set Updatedate='" + update + "' where EntryHeaderID =" + v);
			}
		}
	}


	dbsrow.execute('COMMIT');
	dbsrow.close();
	submittoserver();

});

// Create a Button.
var showbtn = Ti.UI.createButton({
	title : 'Submit',
	width : '48%',
	height : 50,
	right : 0,
	top : 10,
	borderRadius : 5,
	buttom : 10,
	color : '#FFFFFF',
	backgroundColor : '#007f97',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 20,
		fontStyle : 'normal',
		fontWeight : 'bold',
		//index:[i][j][m]
	}

});
var s = false;
// Listen for click events.
//showbtn.addEventListener('click', function()
function submittoserver() {//submitting the data to the server
	//var detailData=[];//empty array
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		toastMsg("No internet connection Data saved locally");
		var EntryForm = Alloy.createController('dashboard').getView();
	} else {
		var confirm = Titanium.UI.createAlertDialog({
			title : 'Submit',
			message : 'Are you sure you want to Submit Data to Server?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});
		confirm.show();
		confirm.addEventListener('click', function(e) {
			if (e.cancel === e.index || e.cancel === true) {
				return false;
			}
			if (e.index === 0) {
				//progressIndicator1.show();
				//progressIndicator1.value = 1;

				submitmydata();
				//	progressIndicator1.value = 9;
			}

		});

	}

}

btnview.add(SaveDraft);
//btnview.add(showbtn);

//$.win.add(btnview);

//$.win.add(btnview);
$.win.open();

var testAccordion = Accordion($.lorem);
$.lorem.add(btnview);

var sapceforscrolllbar = Ti.UI.createView({
	width : "100%",
	height : 5,
	backgroundColor : "#CCCCCC"
});
$.lorem.add(sapceforscrolllbar);
var progressIndicator = Ti.UI.Android.createProgressIndicator({
	message : 'Saving...',
	location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
	type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
	cancelable : false,
	max : 10,
	min : 0

});
var progressIndicator1 = Ti.UI.Android.createProgressIndicator({
	message : 'Submitting ...',
	location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
	type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
	cancelable : false,
	max : 10,
	min : 0

});
//var db = Ti.Database.open('mydatalist8');
function doClick(e) {
	var dbsrow1 = Ti.Database.open('mydatalist8');
	//progressIndicator.show();
	//progressIndicator.value = 1;
	var headcount = dbsrow1.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
	var detailcount = dbsrow1.execute("SELECT * FROM Entry_details where HeaderID = " + v);

	//alert("head" + headcount.rowCount + "detials" + detailcount.rowCount);
	dbsrow1.execute('BEGIN');
	save();
	function save() {
		if (detailcount.rowCount != 0) {
			dbsrow1.execute("DELETE FROM Entry_details where HeaderID = " + v);
		}

		for (var i = 0; i < self.data.length; i++) {
			var id = self.data[i].id;
			var HeaderID = v;
			var CheckItem = "";
			var Type = "";
			var Val = "";
			var Comment = "";
			var Pic = "";
			var valueType = "";
			var a = self.data[i].group;
			var picinfo = "";
			CheckItem = a;
			Type = "Section";
			//alert("inside group");
			var dbs = dbsrow1.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,Pic,valueType,Picinfo,TemplateDetailID) VALUES (?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, Pic, valueType, picinfo, id);
			//alert(CheckItem+Type+Val+Comment+Pic);
			for (var k = 0; k < self.data[i].groupItems.length; k++) {
				Type = "Group";
				Comment = "";
				pic = "";
				picinfo = "";
				valueType = "";
				val = "";
				id = self.data[i].groupItems[k].id;
				CheckItem = self.data[i].groupItems[k].group;
				var d = self.data[i].groupItems[k].group;
				dbsrow1.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,Pic,valueType,Picinfo,TemplateDetailID) VALUES (?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, Pic, valueType, picinfo, id);

				for (var j = 0; j < self.data[i].groupItems[k].groupItems.length; j++) {
					id = self.data[i].groupItems[k].groupItems[j].id;
					var b = self.data[i].groupItems[k].groupItems[j].checkItem;
					CheckItem = b;
					Type = "CheckItem";
					valueType = self.data[i].groupItems[k].groupItems[j].valueType;
					if (valueType == "Numeric") {
						Val = self.checkview[a + "" + d + "" + b].value;
					}
					if (valueType == "Edit") {
						Val = self.checkview[a + "" + d + "" + b].value;
					}

					if (valueType == "Checkbox") {
						Val = self.checkview[a + "" + d + "" + b].checked;
					}
					if (valueType == "ListChoice") {

						Val = self.checkview[a + "" + d + "" + b].getSelectedRow(0).title;

					}
					//Val=self.checkview[a+""+b].checked;
					// alert(val);
					for (var m = 0; m < self.data[i].groupItems[k].groupItems[j].controls.length; m++) {
						var c = self.data[i].groupItems[k].groupItems[j].controls[m];
						if (c == "comment") {
							Comment = self.controls[a + "" + d + "" + b + "" + c].value;
						} else if (c == "Pic") {

							if (self.controls[a + "" + d + "" + b + "" + c].image != "") {
								//alert(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
								var test = self.controls[a + "" + d + "" + b + "" + c].image;
								Pic = "";

								var image11 = Ti.Utils.base64encode(test);
								//           alert("image11 =" + image11);
								picinfo = image11.toString();
							} else {
								picinfo = "";
							}

						} else if (c == "List") {
							Val = self.controls[a + "" + d + "" + b + "" + c].value;
						} else if (c == "Num") {
							//Val=self.controls[a+""+b+""+c].value;
						}

					}

					dbsrow1.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,Pic,valueType,Picinfo,TemplateDetailID) VALUES (?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, Pic, valueType, picinfo, id);

				}
			}

		}
		var update = new Date();
		var myupdate = "UPDATE  Inspection set Updatedate='" + update + "', VIN='" + VIN.value + "', Series='" + Category.value + "',Model='" + Model.value + "'    where EntryHeaderID =" + v;
		//alert(myupdate);
		//console.log(myupdate);
		dbsrow1.execute(myupdate);
		//	dbsrow.execute("UPDATE  Inspection set Updatedate='" + update + "' where EntryHeaderID =" + v);
	}

	//progressIndicator.value = 3;
	dbsrow1.execute('COMMIT');
	//alert(JSON.stringify(dbsrow.execute("select * from Entry_details where HeaderID="+v)));
	//dbsrow1.close();
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		//alert("asdasdasdas");

		//progressIndicator.hide();
		toastMsg("No internet connection data saved locally");
		var testNew = Alloy.createController('offlinedasboard').getView();
	} else {
		//progressIndicator.value = 4;
		submitdata();
		//progressIndicator.value = 10;
		progressIndicator.hide();
	}

}

function submitdata() {
	//alert("inside submit");
	var db = Ti.Database.open('mydatalist8');
	//opening database
	var dbRows = db.execute("select * from Entry_details where HeaderID=" + v);

	//select quer
	var jsonArray = [];
	while (dbRows.isValidRow()) {//checking the validity of the data
		var testa = {};
		s = true;
		//adding the data in the array to show in the master parent tableview
		/*
		 var RecordID = dbRows.fieldByName('RecoedID');
		 var HeaderID = dbRows.fieldByName('HeaderID');
		 var CheckItem = dbRows.fieldByName('checkItem');
		 var Type = dbRows.fieldByName('Type');
		 var Value = dbRows.fieldByName('Value');
		 var Comment = dbRows.fieldByName('Comment');
		 var Pic = dbRows.fieldByName('Pic');
		 var valuetype = dbRows.fieldByName('valuetype');
		 var picinfo = dbRows.fieldByName('Picinfo');
		 //alert("test"+ dbRows.fieldByName('TemplateDetailID'));
		 var tid = dbRows.fieldByName('TemplateDetailID');*/

		testa["RecordID"] = dbRows.fieldByName('RecoedID');
		testa["HeaderID"] = dbRows.fieldByName('HeaderID');
		testa["CheckItem"] = dbRows.fieldByName('checkItem');
		testa["Type"] = dbRows.fieldByName('Type');
		testa["Value"] = dbRows.fieldByName('Value');
		testa["Comment"] = dbRows.fieldByName('Comment');
		testa["Pic"] = dbRows.fieldByName('Pic');
		testa["valuetype"] = dbRows.fieldByName('valuetype');
		testa["picinfo"] = dbRows.fieldByName('Picinfo');
		testa["TemplateDetailID"] = dbRows.fieldByName('TemplateDetailID');
		testa["id"] = v;
		testa["Status"] = "Draft";

		jsonArray.push(testa);
		//alert(JSON.stringify(testa));
		dbRows.next();
	}
	//var aaaaaaa=JSON.parse(jsonArray);
	//alert(jsonArray);
	dbRows.close();
	//alert(jsonArray);a
	var url = "www.inspect360.biz/genericsurvey/inspector/EntryDetails/UpdateDetailjson";
	//alert(url);
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			//	alert("asdasdasd");

			//console.log(this.responseText);
			var db1 = Ti.Database.open('mydatalist8');
			var headcount = db1.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
			var mysnzdate = JSON.parse(this.responseText);
			var sydate1 = new Date(mysnzdate.Date);
			var update = convertUTCDateToLocalDate(sydate1);
			//progressIndicator.value = 8;
			if (headcount.rowCount != 0) {
				//db1.execute("UPDATE  Inspection set synDate='" + sydate1 + "',Updatedate='" + update + "' where EntryHeaderID =" + v);
				db1.execute("UPDATE  Inspection set Updatedate='" + update + "', VIN='" + VIN.value + "', Series='" + Category.value + "',Model='" + Model.value + "'    where EntryHeaderID =" + v);
			}

			toastMsg("Record saved  To Server!!!");
			//	var EntryForm = Alloy.createController('dashboard').getView();

		},
		onerror : function(e) {
			progressIndicator.hide();
			toastMsg("Server error data saved locally!!!");
			//var EntryForm = Alloy.createController('dashboard').getView();

		},
		timeout : 50000 /* in milliseconds */
	});

	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/octet-stream");
	//console.log(JSON.stringify(jsonArray));
	var myid = {
		id : v
	};
	var pstdata = {
		entryheader : myid,
		listentryDetails : jsonArray
	};
	//console.log(JSON.stringify(pstdata));
	xhr.send(JSON.stringify(pstdata));
	//var EntryForm = Alloy.createController('dashboard').getView();
	dbRows.close();
	db.close();

}

function submitmydata() {
	var db = Ti.Database.open('mydatalist8');
	//opening database
	var dbRows = db.execute("select * from Entry_details where HeaderID=" + v);
	//select quer
	var jsonArray = [];
	while (dbRows.isValidRow()) {//checking the validity of the data
		var testa = {};
		s = true;
		//adding the data in the array to show in the master parent tableview
		var RecordID = dbRows.fieldByName('RecoedID');
		var HeaderID = dbRows.fieldByName('HeaderID');
		var CheckItem = dbRows.fieldByName('checkItem');
		var Type = dbRows.fieldByName('Type');
		var Value = dbRows.fieldByName('Value');
		var Comment = dbRows.fieldByName('Comment');
		var Pic = dbRows.fieldByName('Pic');
		var valuetype = dbRows.fieldByName('valuetype');
		var picinfo = dbRows.fieldByName('Picinfo');
		var templeteid = dbRows.fieldByName('TemplateDetailID');
		testa["RecordID"] = RecordID;
		testa["HeaderID"] = HeaderID;
		testa["CheckItem"] = CheckItem;
		testa["Type"] = Type;
		testa["Value"] = Value;
		testa["Comment"] = Comment;
		testa["Pic"] = Pic;
		testa["valuetype"] = valuetype;
		testa["picinfo"] = picinfo;
		testa["TemplateDetailID"] = templeteid;
		testa["id"] = v;
		testa["Status"] = "Pending";

		jsonArray.push(testa);
		//alert(JSON.stringify(testa));
		dbRows.next();
	}
	//var aaaaaaa=JSON.parse(jsonArray);
	//alert(jsonArray);
	dbRows.close();
	//alert(jsonArray);
	//progressIndicator1.value = 6;
	var url = "www.inspect360.biz/genericsurvey/inspector/EntryDetails/UpdateDetailjson";
	//alert(url);
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			//	alert("asdasdasd");
			//console.log(this.responseText);
			var db1 = Ti.Database.open('mydatalist8');
			var headcount = db1.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
			var sydate1 = new Date(this.responseText);
			var update = convertUTCDateToLocalDate(sydate1);
			if (headcount.rowCount != 0) {

				db1.execute("DELETE from  Inspection  where EntryHeaderID =" + v);
			} else
				db1.execute("DELETE from Entry_details HeaderID=" + v);
			db1.close();
			//	progressIndicator1.value = 8;
			toastMsg("Record Submitted  To Server!!!");
			var EntryForm = Alloy.createController('dashboard').getView();

		},
		onerror : function(e) {
			//progressIndicator1.hide();
			toastMsg("Server error data saved locally!!!");
			var EntryForm = Alloy.createController('dashboard').getView();

		},
		timeout : 50000 /* in milliseconds */
	});

	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/octet-stream");
	//console.log(JSON.stringify(jsonArray));
	var myid = {
		id : v
	};
	var pstdata = {
		entryheader : myid,
		listentryDetails : jsonArray
	};
	//console.log(JSON.stringify(pstdata));
	xhr.send(JSON.stringify(pstdata));
	//var EntryForm = Alloy.createController('dashboard').getView();
	dbRows.close();
	db.close();

};
//$.win
$.win.addEventListener('android:back', function(e) {
	$.win.close();
	var EntryForm = Alloy.createController('dashboard').getView();

});

