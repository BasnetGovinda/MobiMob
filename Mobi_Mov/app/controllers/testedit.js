function createZoomAbleimage(imgblob) {
	var win = Ti.UI.createWindow({
		backgroundColor : '#fff',
		title : 'ZOOM'
	});
	win.open();

	//start
	var view1 = Ti.UI.createView({
		backgroundColor : '#123'
	});

	var scrollableView = Ti.UI.createScrollableView({
		showPagingControl : true
	});
	scrollableView.add(view1);
	win.add(scrollableView);

	var baseHeight = 600;
	var baseWidth = 500;

	var img = Ti.UI.createImageView({
		height : baseHeight,
		image : imgblob, // kitten image
		//image: 'http://placehold.it/200x200/c60000/ffffff', // red box with caption
		width : baseWidth,
	});
	view1.add(img);

	img.addEventListener('pinch', function(e) {
		img.height = baseHeight * e.scale;
		img.width = baseWidth * e.scale;
		//label.text = Math.round(img.width) + ' x ' + Math.round(img.height);
	});
	img.addEventListener('touchstart', function(e) {
		baseHeight = img.height;
		baseWidth = img.width;
	});

}

var testbit = 0;
var testbitload = 0;
var clickedind;

var contarray = new Array();
var imgbolb = new Array();
var myindex = 0;
var VIN;
var man;
var mainview = new Array();
var templetetype;
var tempname;
var Model;
var imgheader;
var Year;
var Category;
var note;
var progressloading = Ti.UI.Android.createProgressIndicator({
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
$.vin.text = "Inspection No:" + myvinid;
var v = "";
var headjsonheader = "";
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
self.picview = {};
self.data = "";

self.data = JSON.parse(testmmm);

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
				touchEnabled : false,
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
			for (var i = 0; i < 5; i++) {
				self.picview[a + "" + b + "" + d + "" + "v" + "" + i] = Ti.UI.createView({
					top : 0,
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE,
					layout : "vertical"
				});

				/*
				 self.picview[a + "" + b + "" + d + "" + "imgview" + "" + i] = 1;
				 self.picview[a + "" + b + "" + d + "" + c + "" + i] = 1;
				 self.picview[a + "" + b + "" + d + "" + "add" + "" + i] = 1;
				 */

				var vie1 = Ti.UI.createView({
					height : 40,
					width : "90%",
					top : 10,
				});
				self.picview[a + "" + b + "" + d + "" + "v" + "" + i].add(vie1);

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
				self.picview[a + "" + b + "" + d + "" + "add" + "" + i] = Ti.UI.createImageView({
					top : 0,
					image : '/image/add_list.png',
					left : "51%",
					height : 40,
					width : 40,
					nameofimgview : "",
					removename : "",
					visible : false
				});
				self.picview[a + "" + b + "" + d + "" + c + "" + i] = Ti.UI.createImageView({
					top : 10,
					width : "90%",
					height : 0,
					image : "",
					imagename : "",
					mainviw : self.picview[a + "" + b + "" + d + "" + "v" + "" + i]
				});
				self.picview[a + "" + b + "" + d + "" + "del" + "" + i] = Ti.UI.createImageView({
					top : 0,
					image : '/image/delete.png',
					right : 3,
					height : 40,
					width : 40,
					delview : self.picview[a + "" + b + "" + d + "" + c + "" + i],
					toplevelview : self.picview[a + "" + b + "" + d + "" + "v" + "" + i],
					disableadd : self.picview[a + "" + b + "" + d + "" + "add" + "" + i],
					prvimview : "",
					prvplus : "",
					visible : false

				});
				self.picview[a + "" + b + "" + d + "" + "show" + "" + i] = Ti.UI.createImageView({
					top : 0,
					image : '/image/preview.png',
					left : "65%",
					imgname : "",
					imgcontrol : self.picview[a + "" + b + "" + d + "" + c + "" + i],
					height : 40,
					width : 40,
					visible : false
				});

				if (i > 0) {
					//console.log("before"+a + "" + b + "" + d + "" + "del" + "" + i+"After"+a + "" + b + "" + d + "" + "add" + "" + (i - 1));
					self.picview[a + "" + b + "" + d + "" + "del" + "" + i].prvplus = self.picview[a + "" + b + "" + d + "" + "add" + "" + (i - 1)];
					self.picview[a + "" + b + "" + d + "" + "del" + "" + i].prvimview = self.picview[a + "" + b + "" + d + "" + c + "" + (i - 1)];
				}

				self.picview[a + "" + b + "" + d + "" + "getpic" + "" + i] = Ti.UI.createImageView({
					top : 7,
					image : '/image/camera.png',
					left : "31%",
					viewname : "",
					addname : self.picview[a + "" + b + "" + d + "" + "add" + "" + i],
					nextview : "",
					indexi : i,
					addnewview : self.picview[a + "" + b + "" + d + "" + "del" + "" + i]
				});
				if (i > 0) {
					self.picview[a + "" + b + "" + d + "" + "getpic" + "" + (i - 1)].nextview = self.picview[a + "" + b + "" + d + "" + "v" + "" + i];

				}

				self.picview[a + "" + b + "" + d + "" + "add" + "" + i].addEventListener('click', function(e) {
					e.source.nameofimgview.height = Ti.UI.SIZE;
					e.source.visible = false;
				});

				vie1.add(aLabel);
				vie1.add(self.picview[a + "" + b + "" + d + "" + "getpic" + "" + i]);
				vie1.add(self.picview[a + "" + b + "" + d + "" + "add" + "" + i]);
				vie1.add(self.picview[a + "" + b + "" + d + "" + "show" + "" + i]);
				self.picview[a + "" + b + "" + d + "" + "show" + "" + i].addEventListener('click', function(e) {
					//console.log("contril" + e.source.imgcontrol + "imgnmae" + e.source.imgname);
					var imgdb = Ti.Database.open('mydatalist27');
					var imagequery = "Select * from tbl_temp where imageName='" + e.source.imgname + "'";
					var imgdata = imgdb.execute(imagequery);
					//console.log(imgdata.fieldByName("imageBlob"));
					if (imgdata.rowCount > 0) {
						e.source.imgcontrol.image = Ti.Utils.base64decode(imgdata.fieldByName("imageBlob"));
						e.source.imgcontrol.height = 160;
						e.source.imgcontrol.imagename = e.source.imgname;
						e.source.visible = false;
					} else {
						toastMsg("Can not view picture, server not available");
					}
					imgdb.close();
				});
				//addimg.visible = false;

				vie1.add(self.picview[a + "" + b + "" + d + "" + "del" + "" + i]);
				self.picview[a + "" + b + "" + d + "" + "del" + "" + i].addEventListener('click', function(e) {
					//alert(e.source.delview);
					e.source.delview.image = "";
					e.source.delview.height = 0;
					e.source.delview.imagename = "";
					e.source.toplevelview.height = 0;
					if (e.source.disableadd.visible) {
						e.source.disableadd.visible = false;
					}
					if (e.source.prvimview.height != 0) {
						e.source.prvplus.visible = true;
					}

					e.source.visible = false;
				});
				//console.log(a + "" + b + "" + d + "" + c + "" + i);
				self.picview[a + "" + b + "" + d + "" + "v" + "" + i].add(self.picview[a + "" + b + "" + d + "" + c + "" + i]);
				self.picview[a + "" + b + "" + d + "" + "getpic" + "" + i].viewname = self.picview[a + "" + b + "" + d + "" + c + "" + i];
				self.picview[a + "" + b + "" + d + "" + c + "" + i].addEventListener('click', function(e) {

					createZoomAbleimage(e.source.image);

				});
				// Listen for click events.
				self.picview[a + "" + b + "" + d + "" + "getpic" + "" + i].addEventListener('click', function(e) {
					c = "Pic";
					var myimgviewname = e.source.viewname;
					var enbview = e.source.addname;
					var nextviewname = e.source.nextview;
					var myindexi = e.source.indexi;
					var mydelbtn = e.source.addnewview;
					Titanium.Media.showCamera({
						success : function(event) {
							if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
								var path = event.media.nativePath;
								var pos = path.lastIndexOf(path.charAt(path.indexOf(":") + 1));
								var filename = path.substring(pos + 1);
								var dt = new Date();
								var newBlob = event.media.imageAsResized(300, 200);
								dttime = dt.getTime();
								dtdate = dt.getDate();
								myimgviewname.image = newBlob;
								myimgviewname.height = 160;
								if (myindexi != 0) {
									mydelbtn.visible = true;
								}
								if (nextviewname.height == 0 && myindexi < 4) {
									enbview.visible = true;
								}

								myimgviewname.imagename = uname + "" + orgnizationname + "" + dttime + "" + dtdate + "" + filename;
								var dbs = Ti.Database.open('mydatalist27');
								var encodeddimg = Ti.Utils.base64encode(myimgviewname.image).text;
								console.log(encodeddimg);
								dbs.execute("INSERT INTO tbl_temp (imageName,imageBlob,updatedDate) VALUES (?,?,?)", myimgviewname.imagename, encodeddimg, dt);
								dbs.close();

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

				if (i != 0) {
					self.picview[a + "" + b + "" + d + "" + "v" + "" + i].height = 0;
					self.picview[a + "" + b + "" + d + "" + "add" + "" + (i - 1)].nameofimgview = self.picview[a + "" + b + "" + d + "" + "v" + "" + i];
					self.picview[a + "" + b + "" + d + "" + "add" + "" + i].removename = self.picview[a + "" + b + "" + d + "" + "add" + "" + i];

				}
				vu.add(self.picview[a + "" + b + "" + d + "" + "v" + "" + i]);
			}
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
			touchEnabled : false,
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
			touchEnabled : false,
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
				fontWeight : 'normal',
				valarray : ""
			},
			width : "90%",

		});

		var data = [];
		var listdata = d.valueOption;
		self.checkview[x + "" + y + "" + z].valarray = listdata;
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
			width : "100%",
			test : "mytest1"

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
			index : index,
			visible : false
			//	test:0

		});

		vue.add(lab);
		vue.add(image);

		self.images[index] = image;

		/*
		 lab.addEventListener('click', click);
		 image.addEventListener('click', click);*/
		vue.touchEnabled = false;
		vue.addEventListener('click', function(e) {
			////console.log(e);
			var index = e.source.index;
			var view = self.view[index];
			var imageView = self.images[index];
			view.visible = !view.visible;
			self.view[index] = view;

			if (testbit >= 0) {

				//////console.log(index);

				//console.log(view);
				if (view.visible) {

					view.height = Ti.UI.SIZE;
					imageView.image = '/image/minus.png';

				} else {
					view.height = 0;
					imageView.image = '/image/plu.png';

				}
			} else {

				//	progressloading.show();
				testbit = 1;
				//progressloading.value = 3;
				clickedind = index;
				//maincontrol();
				view.height = Ti.UI.SIZE;
				imageView.image = '/image/minus.png';

			}
			////console.log(e);

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

		//self.checkview[x + "" + y + "" + z].addEventListener("click", togglecheck);
		if (specs.view) {
			//specs.view.addEventListener("click", togglecheck);
		}
		return self.checkview[x + "" + y + "" + z];

	}

	function init() {
		var view = testMethod(self.data);
		progressloading.value = 4;
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
			text : 'Inspection No',
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
			hintText : 'Inspection No',
			top : 10,
			height : 40,
			//value:headerdata.vin,
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
			editable : false,
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
			hintText : 'Form Name',
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
			//	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		imgheader = Ti.UI.createImageView({
			top : 10,
			width : "90%",
			height : 160,
			image : "",
			imagename : ""
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
		view1.add(imgheader);
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
					accordion : "true",

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
				body1.height = Ti.UI.SIZE;
				body1.visible = true;
			} else {
				body1.height = 0;
			}

			//par1.add(spacer2);
			par1.add(body1);
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


	progressloading.show();
	progressloading.value = 1;
	init();
	progressloading.hide();
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

// Create a Button.

$.win.open();

var testAccordion = Accordion($.lorem);
//$.lorem.add(btnview);

var sapceforscrolllbar = Ti.UI.createView({
	width : "100%",
	height : 5,
	backgroundColor : "#CCCCCC"
});
//$.lorem.add(sapceforscrolllbar);

givedataHeader();
function maincontrol() {

	contentinit();
	//progressloading.value = 6;
	//givedata();
	//progressloading.value = 10;
	//progressloading.hide();
	if (myindex > 0) {
		setTimeout(function() {
			imageLoader(0);
		}, 1000);
		//alert("completes");
	}

}

function contentinit1() {
	for (var i = 0; i < self.data.length; i++) {
		var node = self.data[i].groupItems;
		for (var j = 0; j < node.length; j++) {
			var iNode = node[j].groupItems;
			for (var k = 0; k < iNode.length; k++) {
				if ($.lorem.fireEvent('clicyk')) {
					console.log('asdasdasdasd');
				}
				var body3 = Titanium.UI.createView({
					height : Ti.UI.SIZE,
					layout : 'vertical',
					borderWidth : 0,
					backgroundColor : "white",

					left : 5,
					right : 5,
					accordion : "true",
				});
				var ib = getInternalBody(iNode[k], 16, '#ff', i, j);
				var controls = makeControl(iNode[k], i, j, k);
				body3.add(ib);
				body3.add(controls);
				self.view[i + '' + i + '' + j].add(body3);

			}
			self.images[i + '' + i + '' + j].visible = true;
			self.view[i + '' + i + '' + j].touchEnabled = true;

		}
		self.images[i].visible = true;
		self.view[i].touchEnabled = true;
	}
}

function contentinit() {
	setTimeout(function() {
		makegroup(0);
	}, 1000);

}

function makegroup(myindex) {
	var node = self.data[myindex].groupItems;
	for (var j = 0; j < node.length; j++) {
		var iNode = node[j].groupItems;
		for (var k = 0; k < iNode.length; k++) {
			if ($.lorem.fireEvent('click')) {
				console.log('asdasdasdasd');
			}
			var body3 = Titanium.UI.createView({
				height : Ti.UI.SIZE,
				layout : 'vertical',
				borderWidth : 0,
				backgroundColor : "white",

				left : 5,
				right : 5,
				accordion : "true",
			});
			var ib = getInternalBody(iNode[k], 16, '#ff', myindex, j);
			var controls = makeControl(iNode[k], myindex, j, k);
			body3.add(ib);
			body3.add(controls);
			self.view[myindex + '' + myindex + '' + j].add(body3);

		}
		self.images[myindex + '' + myindex + '' + j].visible = true;
		self.view[myindex + '' + myindex + '' + j].touchEnabled = true;

	}
	self.images[myindex].visible = true;
	self.view[myindex].touchEnabled = true;
	//console.log("wholejson" + JSON.stringify(wholejson));
	//console.log("sadasdjsonlength" + json.length);
	if (wholejson.listentryDetails.length > 0) {
		givedattosection(self.data[myindex].group, myindex);
	}
	//console.log(myindex +"cczcas"+ self.data.length);
	if (myindex < (self.data.length - 1)) {
		setTimeout(function() {
			myindex = myindex + 1;
			makegroup(myindex);
		}, 1000);

	} else {
		completedataloadbit = 1;
	}

}

function givedattosection(sectioname, myindex) {
	json = wholejson.listentryDetails;
	//console.log("wholw json "+JSON.stringify(json));
	//console.log(json.length);

	for ( im = 0; im < json.length; im++) {

		if (json[im].eType == "Section" && json[im].eCheckItem == sectioname) {
			console.log(json[im].eType);
			console.log(json[im].eCheckItem);
			var len = json.length;
			var a = "";
			var b = "";
			var c = "";
			var s = "";
			var sec = "";
			var g = "";
			var ch = "";
			sec = 0;
			g = 0;
			ch = 0;
			s = json[im].eCheckItem;
			//alert(s);
			++sec;
			ch = 0;
			g = 0;
			a = "";
			b = "";
			for ( i = im + 1; i < json.length; i++) {

				if (json[i].eType == "Section") {

					break;
					im = json.length;
				}
				if (json[i].eType == "Group") {

					a = json[i].eCheckItem;
					++g;
					ch = 0;
					b = "";
				}
				if (json[i].eType == "CheckItem") {
					ch++;
					b = json[i].eCheckItem;
					var vt = json[i].evaluetype;

					if (vt == "Checkbox") {
						if (json[i].eValue == "true") {
							self.checkview[s + "" + a + "" + b].checked = true;
							self.checkview[s + "" + a + "" + b].backgroundImage = '/image/checked1.png';
							//self.checkview[s+""+a + "" + b].checked.touchEnabled = false;
						}
					} else if (vt == "Edit") {
						self.checkview[s + "" + a + "" + b].value = json[i].eValue;

					} else if (vt == "Numeric") {
						self.checkview[s + "" + a + "" + b].value = json[i].eValue;
					} else if (vt == "ListChoice") {
						var listdata = self.checkview[s + "" + a + "" + b].valarray;
						for (var m = 0; m < listdata.length; m++) {
							if (listdata[m] == json[i].eValue) {

								self.checkview[s + "" + a + "" + b].setSelectedRow(0, m, true);
							}
						}

					}

				}

				if (json[i].eComment != "") {
					c = "comment";
					self.controls[s + "" + a + "" + b + "" + c].value = json[i].eComment;
					//	self.controls[s+""+a + "" + b + "" + c].editable = false;
				}
				/*
				if (json[i].ePic != null) {//image1,image2

				c = "Pic";
				contarray[myindex] = s + "" + a + "" + b + "" + c;
				self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
				console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
				imgbolb[myindex] = json[i].ePic;
				myindex++;
				}*/
				//console.log(json[i].image1 + " " + json[i].image2 + "" + json[i].image3);
				if (json[i].image1 != "") {
					contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 0;
					//self.picview[s + "" + a + "" + b + "" + "del" + 0].visible = true;
					self.picview[s + "" + a + "" + b + "" + "add" + 0].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 0].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 0].imgname = json[i].image1;
					//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
					imgbolb[myindex] = json[i].image1;
					self.picview[s + "" + a + "" + b + "" + "Pic" + "" + 0].imagename = json[i].image1;
					//	mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 0;
					self.picview[s + "" + a + "" + b + "" + "v" + "" + 0].height = Ti.UI.SIZE;
					myindex++;
				}
				if (json[i].image2 != "") {
					self.picview[s + "" + a + "" + b + "" + "add" + 0].visible = false;
					contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 1;
					self.picview[s + "" + a + "" + b + "" + "del" + 1].visible = true;
					self.picview[s + "" + a + "" + b + "" + "add" + 1].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 1].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 1].imgname = json[i].image2;
					//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
					//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
					imgbolb[myindex] = json[i].image2;
					self.picview[s + "" + a + "" + b + "" + "Pic" + "" + 1].imagename = json[i].image2;

					mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 1;
					self.picview[s + "" + a + "" + b + "" + "v" + "" + 1].height = Ti.UI.SIZE;
					myindex++;

				}
				if (json[i].image3 != "") {
					self.picview[s + "" + a + "" + b + "" + "del" + 2].visible = true;
					self.picview[s + "" + a + "" + b + "" + "add" + 1].visible = false;
					contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 2;
					self.picview[s + "" + a + "" + b + "" + "add" + 2].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 2].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 2].imgname = json[i].image3;
					//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
					//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
					self.picview[s + "" + a + "" + b + "" + "v" + "" + 2].height = Ti.UI.SIZE;
					mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 2;
					self.picview[s + "" + a + "" + b + "" + "Pic" + "" + 2].imagename = json[i].image3;

					imgbolb[myindex] = json[i].image3;
					myindex++;

				}
				if (json[i].image4 != "") {
					self.picview[s + "" + a + "" + b + "" + "del" + 3].visible = true;
					self.picview[s + "" + a + "" + b + "" + "add" + 2].visible = false;
					contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 3;
					//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
					self.picview[s + "" + a + "" + b + "" + "add" + 3].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 3].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 3].imgname = json[i].image4;
					//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
					self.picview[s + "" + a + "" + b + "" + "v" + "" + 3].height = Ti.UI.SIZE;
					imgbolb[myindex] = json[i].image4;
					self.picview[s + "" + a + "" + b + "" + "Pic" + "" + 3].imagename = json[i].image4;

					mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 3;
					myindex++;
				}
				if (json[i].image5 != "") {
					self.picview[s + "" + a + "" + b + "" + "del" + 4].visible = true;
					self.picview[s + "" + a + "" + b + "" + "add" + 3].visible = false;
					contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 4;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 4].visible = true;
					self.picview[s + "" + a + "" + b + "" + "show" + "" + 4].imgname = json[i].image5;
					//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
					//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
					imgbolb[myindex] = json[i].image5;
					self.picview[s + "" + a + "" + b + "" + "v" + "" + 4].height = Ti.UI.SIZE;
					self.picview[s + "" + a + "" + b + "" + "Pic" + "" + 4].imagename = json[i].image5;

					mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 4;
					myindex++;

				}

			}

		}
	}

}

var json = "";
var wholejson = "";
function givedataHeader() {
	jsurl = "166.62.41.120:8082/genericsurvey/inspector/entryheader/TemplateNumberMob/" + v;
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		//console.log(this.responseText);
		wholejson = JSON.parse(this.responseText);
		//json = wholejson.listentryDetails;
		console.log("asdasd" + json.length);
		headjsonheader = wholejson.entryheader;
		tempname.value = wholejson.entryheader.tempname;
		Category.value = wholejson.entryheader.category;
		note.value = wholejson.entryheader.note;
		man.value = wholejson.entryheader.manufacturer;
		templetetype.value = wholejson.entryheader.temptype;
		Model.value = wholejson.entryheader.model;
		Year.value = wholejson.entryheader.year;
		VIN.value = wholejson.entryheader.vin;
		var imname = wholejson.entryheader.image;
		maincontrol();
		if (imname != "") {
			var url = "166.62.41.120:8082/genericsurvey/inspector/entryheader/ImageName";
			var client = Ti.Network.createHTTPClient({
				onload : function(e) {
					//console.log(this.responseText);
					imgheader.image = Ti.Utils.base64decode(this.responseText);
					imgheader.addEventListener('click', function() {
						createZoomAbleimage(imgheader.image);
					});

					imgheader.imagename = imname;

				},
				onerror : function(e) {
				},
				timeout : 5000 // in milliseconds
			});
			client.open("POST", url);
			var imgjson = {
				name : imname
			};
			client.setRequestHeader("Content-Type", "application/octet-stream");
			client.send(JSON.stringify(imgjson));
		}

	};
	xhr.open('GET', jsurl);
	xhr.send();
}

function givedata() {

	var winNewForm = Ti.UI.createWindow({
		title : "Completed Data",
		backgroundColor : "#CCCCCC"
	});
	json = wholejson.listentryDetails;

	var len = json.length;
	var a = "";
	var b = "";
	var c = "";
	var s = "";
	var sec = "";
	var g = "";
	var ch = "";
	sec = 0;
	g = 0;
	ch = 0;
	for ( i = 0; i < json.length; i++) {

		if (json[i].eType == "Section") {

			s = json[i].eCheckItem;
			//alert(s);
			++sec;
			ch = 0;
			g = 0;
			a = "";
			b = "";

		}
		if (json[i].eType == "Group") {

			a = json[i].eCheckItem; ++g;
			ch = 0;
			b = "";
		}
		if (json[i].eType == "CheckItem") {
			ch++;
			b = json[i].eCheckItem;
			var vt = json[i].evaluetype;

			if (vt == "Checkbox") {
				if (json[i].eValue == "true") {
					self.checkview[s + "" + a + "" + b].checked = true;
					self.checkview[s + "" + a + "" + b].backgroundImage = '/image/checked1.png';
					//self.checkview[s+""+a + "" + b].checked.touchEnabled = false;
				}
			} else if (vt == "Edit") {
				self.checkview[s + "" + a + "" + b].value = json[i].eValue;

			} else if (vt == "Numeric") {
				self.checkview[s + "" + a + "" + b].value = json[i].eValue;
			} else if (vt == "ListChoice") {
				var s1 = sec - 1;
				var g1 = g - 1;
				var c1 = ch - 1;
				var listdata = self.data[s1].groupItems[g1].groupItems[c1].valueOption;
				var listlen = listdata.length;
				//console.log(json[i].eValue);
				self.checkview[s + "" + a + "" + b].value = json[i].eValue;

			}

		}

		if (json[i].eComment != "") {
			c = "comment";
			self.controls[s + "" + a + "" + b + "" + c].value = json[i].eComment;
			//	self.controls[s+""+a + "" + b + "" + c].editable = false;
		}
		if (json[i].image1 != "") {
			contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 0;
			//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
			//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
			imgbolb[myindex] = json[i].image1;
			mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 0;
			myindex++;
		}
		if (json[i].image2 != "") {
			contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 1;
			//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
			//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
			imgbolb[myindex] = json[i].image2;
			mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 1;
			myindex++;

		}
		if (json[i].image3 != "") {
			contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 2;
			//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
			//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
			mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 2;
			imgbolb[myindex] = json[i].image3;
			myindex++;

		}
		if (json[i].image4 != "") {
			contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 3;
			//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
			//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
			imgbolb[myindex] = json[i].image4;
			mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 3;
			myindex++;
		}
		if (json[i].image5 != "") {
			contarray[myindex] = s + "" + a + "" + b + "" + "Pic" + 4;
			//self.controls[s + "" + a + "" + b + "" + c].image = json[i].ePic;
			//	console.log("asdasd:ASd" + self.controls[s + "" + a + "" + b + "" + c].image);
			imgbolb[myindex] = json[i].image5;
			myindex++;
			mainview[myindex] = s + "" + a + "" + b + "" + "v" + "" + 4;
		}

	}
}

function imageLoader(currentimg) {
	if (currentimg < imgbolb.length) {
		var imgname = imgbolb[currentimg];
		var url = "166.62.41.120:8082/genericsurvey/inspector/entryheader/ImageName";
		//	console.log(url);
		var client = Ti.Network.createHTTPClient({
			onload : function(e) {
				//				console.log(this.responseText);

				self.picview[contarray[currentimg]].image = Ti.Utils.base64decode(this.responseText);
				self.picview[contarray[currentimg]].height = 160;
				//self.picview[contarray[currentimg]].mainviw.height=Ti.UI.SIZE;
				self.picview[mainview[currentimg]].height = Ti.UI.SIZE;
				//	console.log(self.picview[contarray[currentimg]]);
				self.picview[contarray[currentimg]].imagename = imgname;
				setTimeout(function() {
					imageLoader(currentimg + 1);
				}, 1000);
			},
			onerror : function(e) {
			},
			timeout : 5000 // in milliseconds
		});
		client.open("POST", url);
		var imgjson = {
			name : imgname
		};
		client.setRequestHeader("Content-Type", "application/octet-stream");
		client.send(JSON.stringify(imgjson));

	}

}
