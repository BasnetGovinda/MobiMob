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

$.win.open();
var tesolinebit = 0;
var udetails = JSON.parse(Titanium.App.Properties.getString("userdetails"));
var uname = udetails.userId;
var orgnizationname = udetails.OrganisationID;
var testbit = 0;
var testbitload = 0;
var completedataloadbit = 0;
var clickedind;
var contarray = new Array();
var imgbolb = new Array();
var mainview = new Array();
var myindex = 0;
var VIN;
var man;
var templetetype;
var tempname;
var Model;
var Year;
var Category;
var note;
var imgheader;

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
v = Titanium.App.Properties.getString("head");
var testmmm = Titanium.App.Properties.getString("mannufact");
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
	if (msg == "Record saved  to server!!!") {
		progressIndicator.value = 10;
		progressIndicator.hide();
	}
	if (msg == "Record submitted  to server!!!") {
		progressIndicator1.value = 10;
		progressIndicator1.hide();
	}
}

var da = [];
var self = {};
self.controls = {};
self.checkview = {};
self.Views = [];
self.view = {};
self.images = {};
self.data = "";
self.data = JSON.parse(testmmm);
self.picview = {};
function makeControl(d, i, j, k) {//function making the contrmaiols
	var myda = d;
	var vu = Ti.UI.createView({
		layout : "horizontal",
		height : Ti.UI.SIZE,
		top : 5,
		left : 50

	});
	var len = d.controls.length;
	for (var m = 0; m < len; m++) {
		var a = self.data[i].group;
		var b = self.data[i].groupItems[j].group;
		var d = self.data[i].groupItems[j].groupItems[k].checkItem;
		var c = self.data[i].groupItems[j].groupItems[k].controls[m];

		if (c == "comment") {
			var view123 = Ti.UI.createView({
				width : "80%",
				height : 85,
			});
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
			var lib1 = myda.library;
			var narativelib1 = Ti.UI.createImageView({
				bottom : 8,
				left : 5,
				height : 40,
				width : 40,
				image : '/image/libary.png',
				libarary : myda.library,
				contname : self.controls[a + "" + b + "" + d + "" + c]

			});
			if (lib1 != "") {
				vu.add(narativelib1);
			}
			narativelib1.addEventListener('click', function(e) {
				if (lib1 != "" || lib1 != null) {
					//console.log(e);
					var db = Ti.Database.open('mydatalist27');
					var myqrey = "SELECT * FROM tbl_narrative where libary ='" + e.source.libarary + "'";
					//	console.log(myqrey);
					var mm = db.execute(myqrey);

					if (mm.rowCount > 0) {
						var myarray = new Array();
						var ind = 0;
						while (mm.validRow) {

							myarray[ind] = mm.fieldByName("value");
							//console.log(mm.fieldByName("value"));
							ind++;

							mm.next();
						}
						db.close();
						console.log(JSON.stringify(myarray));
						var opts = {
							cancel : 2,
							options : myarray,
							destructive : 0,
						};
						var dialog = Ti.UI.createOptionDialog(opts);
						dialog.show();
						dialog.addEventListener('click', onSelectDialog);
						function onSelectDialog(event) {
							var selectedIndex = event.source.selectedIndex;
							e.source.contname.value = myarray[selectedIndex];
						}

					}
				}
			});
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
		} else if (c == "Checkbox") {
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
					right : 50,
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
					right : 4,
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
					left : "48%",
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
					left : "30%",
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
	////console.log('makebody for accrodion->text: ' + text);

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
		var lib = d.library;
		var x = self.data[i].group;
		var y = self.data[i].groupItems[j].group;
		var z = d.checkItem;
		self.checkview[x + "" + y + "" + z] = Ti.UI.createTextField({
			hintText : "edit",
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "80%",
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

		var narativelib = Ti.UI.createImageView({
			bottom : 2,
			left : 2,
			height : 40,
			width : 40,
			image : '/image/libary.png',
			library : d.library,

		});

		narativelib.addEventListener('click', function(e) {
			if (lib != "") {
				var db = Ti.Database.open('mydatalist27');
				var mm = db.execute("select * from tbl_narrative where libary='" + e.source.library + "'");

				var myarray = new Array();
				var ind = 0;
				while (mm.validRow) {

					myarray[ind] = mm.fieldByName("value");
					console.log(mm.fieldByName("value"));
					ind++;

					mm.next();
				}
				db.close();
				console.log(JSON.stringify(myarray));
				var opts = {
					cancel : 2,
					options : myarray,
					selectedIndex : 2,
					destructive : 0,

				};

				var dialog = Ti.UI.createOptionDialog(opts);
				dialog.show();
				dialog.addEventListener('click', onSelectDialog);

				function onSelectDialog(event) {
					var selectedIndex = event.source.selectedIndex;
					//alert(myarray[selectedIndex]);
					self.checkview[x + "" + y + "" + z].value = myarray[selectedIndex];
				}

			}
		});

		vu.add(self.checkview[x + "" + y + "" + z]);

		if (lib != "") {
			var flag = true;
			for (var w = 0; w < d.controls.length; w++) {
				if (d.controls[w] == "comment") {
					flag = false;
					break;
				}
			}
			if (flag) {
				vu.add(narativelib);
			}

		}
		/*
		 if(d.controls.length==0 &&lib!="")
		 {
		 vu.add(narativelib);
		 }
		 else
		 {
		 for(var q=0;q<d.controls.length;q++)
		 {
		 if(lib!="" && d.cotrols[q]=="comment")
		 {
		 vu.add(narativelib);
		 }
		 }
		 }*/

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

		self.checkview[x + "" + y + "" + z].addEventListener("click", togglecheck);
		if (specs.view) {
			specs.view.addEventListener("click", togglecheck);
		}
		return self.checkview[x + "" + y + "" + z];

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
			//editable : false,
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
			editable : false,
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
			editable : false,
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
			//editable : false,
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
			//editable : false,
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
			hintText : 'Form Name',
			top : 10,
			height : 40,
			//editable : false,
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
			//editable : false,
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
		var attachheaderview = Ti.UI.createView({
			top : 10,
			height : 40,
			width : "90%",
			layout : 'horizontal'
		});
		attachheaderview.add(Ti.UI.createLabel({
			text : ' Attach Pic',
			color : 'black',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			height : 20,
			width : 100,
			top : 10,

		}));
		var uploadimg = Ti.UI.createImageView({
			width : 40,
			height : 40,
			image : '/image/attachpic.png'
		});
		attachheaderview.add(uploadimg);
		var uploadimg1 = Ti.UI.createImageView({
			left : 20,
			width : 30,
			height : 30,
			image : '/image/camera.png'
		});
		attachheaderview.add(uploadimg);
		attachheaderview.add(uploadimg1);

		imgheader = Ti.UI.createImageView({
			top : 10,
			width : "90%",
			height : 160,
			image : "",
			imagename : ""
		});
		uploadimg1.addEventListener('click', function(e) {
			Titanium.Media.showCamera({
				success : function(event) {
					if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

						headerimagehandler(event);

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
		uploadimg.addEventListener('click', function(e) {
			Titanium.Media.openPhotoGallery({
				success : function(event) {
					headerimagehandler(event);
				},
				cancel : function() {
				},
				error : function(error) {
				}
			});
		});
		function headerimagehandler(event) {
			var selectedImg = event.media;
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

				var path = event.media.nativePath;
				var pos1 = path.lastIndexOf(path.charAt(path.indexOf(":") + 1));
				var filename1 = path.substring(pos1 + 1);
				newBlob1 = event.media.imageAsResized(300, 200);
				imgheader.image = newBlob1;
				imgheader.height = 160;
				var dt1 = new Date();
				dttime1 = dt1.getTime();
				dtdate1 = dt1.getDate();
				imgheader.imagename = dttime1 + "" + dtdate1 + "" + filename1;
				if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
				} else {
					xhr = Titanium.Network.createHTTPClient();
					xhr.onload = function() {

					}, xhr.setRequestHeader("enctype", "multipart/form-data");
					xhr.setRequestHeader("Content-Type", "image/jpg");
					xhr.open("POST", "http://166.62.41.120:8082/genericsurvey/inspector/EntryDetails/uploadImage");
					var da = new Date();
					console.log(da);
					xhr.send({
						file : newBlob1,
						data : imgheader.imagename.trim()
					});
				}

			}

		}

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
		view1.add(attachheaderview);
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

			////console.log("-----------------------");
			var node = d[i].groupItems;
			////console.log(d[i].group);
			////console.log("*******************************");

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
				////console.log(node[j].group);
				////console.log("..........................");
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
			////console.log("-----------------------");
		}
		return topLevelView;
	}


	progressloading.show();
	progressloading.value = 1;
	init();
	progressloading.value = 3;
	//	givedata();
	//console.log(new Date());
	progressloading.value = 10;
	progressloading.hide();

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
	if (Titanium.App.Properties.getString('bitcheck') == 0) {
		toastMsg('You have not logged in to server yet, please save your record, logout and login again to submit the inspection.');
	} else {
		if (completedataloadbit == 0) {
			toastMsg("All Form data is still loading, please wait and save again ");
		} else {

			var dbsrow = Ti.Database.open('mydatalist27');
			//progressIndicator1.show();
			var headcount = dbsrow.execute("SELECT * FROM Inspection where offlinebit='1' and EntryHeaderID = " + v);
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
					var valueType = "";
					var a = self.data[i].group;
					var Pic0 = "";
					var Picinfo0 = "";
					var Pic1 = "";
					var Picinfo1 = "";
					var Pic2 = "";
					var Picinfo2 = "";
					var Pic3 = "";
					var Picinfo3 = "";
					var Pic4 = "";
					var Picinfo4 = "";

					CheckItem = a;
					Type = "Section";

					var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,valueType,TemplateDetailID,picname,pic,picname1,pic1,picname2,pic2,picname3,pic3,picname4,pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, valueType, id, Pic0, Picinfo0, Pic1, Picinfo1, Pic2, Picinfo2, Pic3, Picinfo3, Pic4, Picinfo4);
					//alert(CheckItem+Type+Val+Comment+Pic);
					for (var k = 0; k < self.data[i].groupItems.length; k++) {
						Type = "Group";
						Comment = "";
						Pic0 = "";
						Picinfo0 = "";
						Pic1 = "";
						Picinfo1 = "";
						Pic2 = "";
						Picinfo2 = "";
						Pic3 = "";
						Picinfo3 = "";
						Pic4 = "";
						Picinfo4 = "";

						valueType = "";
						val = "";
						id = self.data[i].groupItems[k].id;
						CheckItem = self.data[i].groupItems[k].group;
						var d = self.data[i].groupItems[k].group;
						var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,valueType,TemplateDetailID,picname,pic,picname1,pic1,picname2,pic2,picname3,pic3,picname4,pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, valueType, id, Pic0, Picinfo0, Pic1, Picinfo1, Pic2, Picinfo2, Pic3, Picinfo3, Pic4, Picinfo4);

						for (var j = 0; j < self.data[i].groupItems[k].groupItems.length; j++) {
							id = self.data[i].groupItems[k].groupItems[j].id;
							Pic0 = "";
							Picinfo0 = "";
							Pic1 = "";
							Picinfo1 = "";
							Pic2 = "";
							Picinfo2 = "";
							Pic3 = "";
							Picinfo3 = "";
							Pic4 = "";
							Picinfo4 = "";

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
									Pic0 = "";
									Picinfo0 = "";
									Pic1 = "";
									Picinfo1 = "";
									Pic2 = "";
									Picinfo2 = "";
									Pic3 = "";
									Picinfo3 = "";
									Pic4 = "";
									Picinfo4 = "";

									if (self.picview[a + "" + d + "" + b + "" + "Pic0"].imagename != "") {

										var test = self.picview[a + "" + d + "" + b + "" + "Pic0"].image;
										var Pic0 = self.picview[a + "" + d + "" + b + "" + "Pic0"].imagename;
										var P = self.picview[a + "" + d + "" + b + "" + "Pic0"].imagename;
										var image11 = Ti.Utils.base64encode(test);
										Picinfo0 = image11.toString();
									}
									if (self.picview[a + "" + d + "" + b + "" + "Pic1"].imagename != "") {

										var test = self.picview[a + "" + d + "" + b + "" + "Pic1"].image;
										var Pic1 = self.picview[a + "" + d + "" + b + "" + "Pic1"].imagename;
										var P = self.picview[a + "" + d + "" + b + "" + "Pic1"].imagename;
										var image11 = Ti.Utils.base64encode(test);
										Picinfo1 = image11.toString();
									}
									if (self.picview[a + "" + d + "" + b + "" + "Pic2"].imagename != "") {

										var test = self.picview[a + "" + d + "" + b + "" + "Pic2"].image;
										var Pic2 = self.picview[a + "" + d + "" + b + "" + "Pic2"].imagename;
										var P = self.picview[a + "" + d + "" + b + "" + "Pic2"].imagename;
										var image11 = Ti.Utils.base64encode(test);
										Picinfo2 = image11.toString();
									}
									if (self.picview[a + "" + d + "" + b + "" + "Pic3"].imagename != "") {

										var test = self.picview[a + "" + d + "" + b + "" + "Pic3"].image;
										var Pic3 = self.picview[a + "" + d + "" + b + "" + "Pic3"].imagename;
										var P = self.picview[a + "" + d + "" + b + "" + "Pic3"].imagename;
										var image11 = Ti.Utils.base64encode(test);
										Picinfo3 = image11.toString();
									}
									if (self.picview[a + "" + d + "" + b + "" + "Pic4"].imagename != "") {

										var test = self.picview[a + "" + d + "" + b + "" + "Pic4"].image;
										var Pic4 = self.picview[a + "" + d + "" + b + "" + "Pic4"].imagename;
										var P = self.picview[a + "" + d + "" + b + "" + "Pic4"].imagename;
										var image11 = Ti.Utils.base64encode(test);
										Picinfo4 = image11.toString();
									}
								} else if (c == "List") {

									Val = self.controls[a + "" + d + "" + b + "" + c].value;
								} else if (c == "Num") {
									//Val=self.controls[a+""+b+""+c].value;

								}

							}

							var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,valueType,TemplateDetailID,picname,pic,picname1,pic1,picname2,pic2,picname3,pic3,picname4,pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, valueType, id, Pic0, Picinfo0, Pic1, Picinfo1, Pic2, Picinfo2, Pic3, Picinfo3, Pic4, Picinfo4);

						}
					}

				}

			}

			var update = new Date();
			var encimg = Ti.Utils.base64encode(imgheader.image);
			var myupdate = "UPDATE  Inspection set Updatedate='" + update + "', Year='" + Year.value + "', Series='" + Category.value + "',Model='" + Model.value + "',Note='" + note.value + "',headimagename='" + imgheader.imagename + "',headimageblob='" + encimg + "'    where EntryHeaderID =" + v;
			/*
			Year=Year.value
			Note=note.value
			headimagename=imgheader.imagename;
			headimageblob=imgheader.image;*/

			//alert(myupdate);
			////console.log(myupdate);
			dbsrow.execute(myupdate);

			dbsrow.execute('COMMIT');
			dbsrow.close();
			//progressIndicator1.value = 5;
			submittoserver();
			//progressIndicator1.value = 10;
			//progressIndicator1.hide();
		}
	}
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
			message : 'Are you sure you want to Submit Form?',
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});
		confirm.show();
		confirm.addEventListener('click', function(e) {
			if (e.cancel === e.index || e.cancel === true) {
				return false;
			}
			if (e.index === 0) {
				progressIndicator1.show();
				progressIndicator1.value = 1;

				submitmydata();
				//progressIndicator1.value = 9;
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

function doClick(e) {
	if (completedataloadbit == 0) {
		toastMsg("All Form data is still loading, please wait and save again ");
	} else {
		var dbsrow = Ti.Database.open('mydatalist27');
		progressIndicator.show();
		progressIndicator.value = 1;
		var headcount = dbsrow.execute("SELECT * FROM Inspection where offlinebit='1' and EntryHeaderID = " + v);
		var detailcount = dbsrow.execute("SELECT * FROM Entry_details where HeaderID = " + v);

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
				var valueType = "";
				var a = self.data[i].group;
				var Pic0 = "";
				var Picinfo0 = "";
				var Pic1 = "";
				var Picinfo1 = "";
				var Pic2 = "";
				var Picinfo2 = "";
				var Pic3 = "";
				var Picinfo3 = "";
				var Pic4 = "";
				var Picinfo4 = "";

				CheckItem = a;
				Type = "Section";

				var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,valueType,TemplateDetailID,picname,pic,picname1,pic1,picname2,pic2,picname3,pic3,picname4,pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, valueType, id, Pic0, Picinfo0, Pic1, Picinfo1, Pic2, Picinfo2, Pic3, Picinfo3, Pic4, Picinfo4);
				//alert(CheckItem+Type+Val+Comment+Pic);
				for (var k = 0; k < self.data[i].groupItems.length; k++) {
					Type = "Group";
					Comment = "";
					Pic0 = "";
					Picinfo0 = "";
					Pic1 = "";
					Picinfo1 = "";
					Pic2 = "";
					Picinfo2 = "";
					Pic3 = "";
					Picinfo3 = "";
					Pic4 = "";
					Picinfo4 = "";

					valueType = "";
					val = "";
					id = self.data[i].groupItems[k].id;
					CheckItem = self.data[i].groupItems[k].group;
					var d = self.data[i].groupItems[k].group;
					var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,valueType,TemplateDetailID,picname,pic,picname1,pic1,picname2,pic2,picname3,pic3,picname4,pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, valueType, id, Pic0, Picinfo0, Pic1, Picinfo1, Pic2, Picinfo2, Pic3, Picinfo3, Pic4, Picinfo4);

					for (var j = 0; j < self.data[i].groupItems[k].groupItems.length; j++) {
						id = self.data[i].groupItems[k].groupItems[j].id;
						Pic0 = "";
						Picinfo0 = "";
						Pic1 = "";
						Picinfo1 = "";
						Pic2 = "";
						Picinfo2 = "";
						Pic3 = "";
						Picinfo3 = "";
						Pic4 = "";
						Picinfo4 = "";

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
								Pic0 = "";
								Picinfo0 = "";
								Pic1 = "";
								Picinfo1 = "";
								Pic2 = "";
								Picinfo2 = "";
								Pic3 = "";
								Picinfo3 = "";
								Pic4 = "";
								Picinfo4 = "";

								if (self.picview[a + "" + d + "" + b + "" + "Pic0"].imagename != "") {

									var test = self.picview[a + "" + d + "" + b + "" + "Pic0"].image;
									var Pic0 = self.picview[a + "" + d + "" + b + "" + "Pic0"].imagename;
									var P = self.picview[a + "" + d + "" + b + "" + "Pic0"].imagename;
									var image11 = Ti.Utils.base64encode(test);
									Picinfo0 = image11.toString();
								}
								if (self.picview[a + "" + d + "" + b + "" + "Pic1"].imagename != "") {

									var test = self.picview[a + "" + d + "" + b + "" + "Pic1"].image;
									var Pic1 = self.picview[a + "" + d + "" + b + "" + "Pic1"].imagename;
									var P = self.picview[a + "" + d + "" + b + "" + "Pic1"].imagename;
									var image11 = Ti.Utils.base64encode(test);
									Picinfo1 = image11.toString();
								}
								if (self.picview[a + "" + d + "" + b + "" + "Pic2"].imagename != "") {

									var test = self.picview[a + "" + d + "" + b + "" + "Pic2"].image;
									var Pic2 = self.picview[a + "" + d + "" + b + "" + "Pic2"].imagename;
									var P = self.picview[a + "" + d + "" + b + "" + "Pic2"].imagename;
									var image11 = Ti.Utils.base64encode(test);
									Picinfo2 = image11.toString();
								}
								if (self.picview[a + "" + d + "" + b + "" + "Pic3"].imagename != "") {

									var test = self.picview[a + "" + d + "" + b + "" + "Pic3"].image;
									var Pic3 = self.picview[a + "" + d + "" + b + "" + "Pic3"].imagename;
									var P = self.picview[a + "" + d + "" + b + "" + "Pic3"].imagename;
									var image11 = Ti.Utils.base64encode(test);
									Picinfo3 = image11.toString();
								}
								if (self.picview[a + "" + d + "" + b + "" + "Pic4"].imagename != "") {

									var test = self.picview[a + "" + d + "" + b + "" + "Pic4"].image;
									var Pic4 = self.picview[a + "" + d + "" + b + "" + "Pic4"].imagename;
									var P = self.picview[a + "" + d + "" + b + "" + "Pic4"].imagename;
									var image11 = Ti.Utils.base64encode(test);
									Picinfo4 = image11.toString();
								}
							} else if (c == "List") {
								Val = self.controls[a + "" + d + "" + b + "" + c].value;
							} else if (c == "Num") {
								//Val=self.controls[a+""+b+""+c].value;

							}

						}

						var dbs = dbsrow.execute("INSERT INTO Entry_details (HeaderID,checkItem,Type,Value,Comment,valueType,TemplateDetailID,picname,pic,picname1,pic1,picname2,pic2,picname3,pic3,picname4,pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", HeaderID, CheckItem, Type, Val, Comment, valueType, id, Pic0, Picinfo0, Pic1, Picinfo1, Pic2, Picinfo2, Pic3, Picinfo3, Pic4, Picinfo4);

					}
				}

			}
			var update = new Date();
			var encimg = Ti.Utils.base64encode(imgheader.image);
			var myupdate = "UPDATE  Inspection set Updatedate='" + update + "', Year='" + Year.value + "', Series='" + Category.value + "',Model='" + Model.value + "',Note='" + note.value + "',headimagename='" + imgheader.imagename + "',headimageblob='" + encimg + "'    where EntryHeaderID =" + v;
			/*
			Year=Year.value
			Note=note.value
			headimagename=imgheader.imagename;
			headimageblob=imgheader.image;*/

			//alert(myupdate);
			////console.log(myupdate);
			dbsrow.execute(myupdate);
			//	dbsrow.execute("UPDATE  Inspection set Updatedate='" + update + "' where EntryHeaderID =" + v);
		}


		progressIndicator.value = 3;
		dbsrow.execute('COMMIT');
		//alert(JSON.stringify(dbsrow.execute("select * from Entry_details where HeaderID="+v)));
		dbsrow.close();
		if (Titanium.App.Properties.getString('bitcheck') == 0) {
			toastMsg("You have not logged in to server yet, please save your record, logout and login again to submit the inspection.");
			progressIndicator.hide();
		} else {

			if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
				//alert("asdasdasdas");

				progressIndicator.hide();
				toastMsg("No internet connection data saved locally");
				//var testNew = Alloy.createController('offlinedasboard').getView();
			} else {
				progressIndicator.value = 4;
				submitdata();
				//progressIndicator.value = 10;
				//progressIndicator.hide();
			}
		}
	}
}

function submitdata() {
	//alert("inside submit");
	var db = Ti.Database.open('mydatalist27');
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
		//testa["Pic"] = Pic;
		testa["valuetype"] = valuetype;
		//testa["picinfo"] = picinfo;
		testa["TemplateDetailID"] = templeteid;
		testa["id"] = v;
		testa["Status"] = "Draft";
		testa["picinfo1"] = dbRows.fieldByName('picname');
		testa["picinfo2"] = dbRows.fieldByName('picname1');
		testa["picinfo3"] = dbRows.fieldByName('picname2');
		testa["picinfo4"] = dbRows.fieldByName('picname3');
		testa["picinfo5"] = dbRows.fieldByName('picname4');
		var picblob1 = "";
		var picblob2 = "";
		var picblob3 = "";
		var picblob4 = "";
		var picblob5 = "";

		if (dbRows.fieldByName('picname') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname') + "'";

			var pic1 = db.execute(imagequery);
			picblob1 = pic1.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname1') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname1') + "'";

			var pic2 = db.execute(imagequery);

			picblob2 = pic1.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname2') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname2') + "'";

			var pic3 = db.execute(imagequery);
			picblob3 = pic3.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname3') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname3') + "'";

			var pic4 = db.execute(imagequery);
			picblob4 = pic4.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname4') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname4') + "'";

			var pic5 = db.execute(imagequery);
			picblob4 = pic5.fieldByName("imageBlob");
		}
		testa["Pic1"] = picblob1;
		//dbRows.fieldByName('pic');
		testa["Pic2"] = picblob2;
		//dbRows.fieldByName('pic1');
		testa["Pic3"] = picblob3;
		//dbRows.fieldByName('pic2');
		testa["Pic4"] = picblob4;
		//dbRows.fieldByName('pic3');
		testa["Pic5"] = picblob5;
		//dbRows.fieldByName('pic4');
		jsonArray.push(testa);
		dbRows.next();
	}
	var hquery = "select * from Inspection where offlinebit='1' and EntryHeaderID=" + v;
	console.log(hquery);
	var dbRows1 = db.execute(hquery);
	//SELECT * from Inspection WHERE VIN='
	//console.log(dbRows1.rowCount);
	//select quer
	var jsonheadArray = {};
	//dasd"+dbRows1.fieldByName('EntryHeaderID'));
	jsonheadArray["id"] = v;
	jsonheadArray["EntryHeaderID"] = dbRows1.fieldByName('EntryHeaderID');
	jsonheadArray["VIN"] = dbRows1.fieldByName('VIN');
	jsonheadArray["Version"] = dbRows1.fieldByName('Version');
	jsonheadArray["OrgID"] = dbRows1.fieldByName('OrgID');
	jsonheadArray["Manufacturer"] = dbRows1.fieldByName('Manufacturer');
	jsonheadArray["Series"] = dbRows1.fieldByName('Series');
	jsonheadArray["Model"] = dbRows1.fieldByName('Model');
	jsonheadArray["Year"] = dbRows1.fieldByName('Year');
	jsonheadArray["TemplateType"] = dbRows1.fieldByName('TemplateType');
	jsonheadArray["TemplateName"] = dbRows1.fieldByName('TemplateName');
	jsonheadArray["TemplateID"] = dbRows1.fieldByName('TemplateID');
	jsonheadArray["Status"] = dbRows1.fieldByName('Status');
	jsonheadArray["Updatedate"] = dbRows1.fieldByName('Updatedate');
	jsonheadArray["synDate"] = dbRows1.fieldByName('synDate');
	jsonheadArray["uname"] = dbRows1.fieldByName('uname');
	jsonheadArray["Note"] = dbRows1.fieldByName('Note');
	jsonheadArray["headimagename"] = dbRows1.fieldByName('headimagename');
	jsonheadArray["headimageblob"] = dbRows1.fieldByName('headimageblob');
	jsonheadArray["Assignee"] = dbRows1.fieldByName('Assignee');

	console.log(JSON.stringify(jsonheadArray));

	//var aaaaaaa=JSON.parse(jsonArray);
	//alert(jsonArray);
	dbRows.close();
	//alert(jsonArray);
	var url = "166.62.41.120:8082/genericsurvey/inspector/EntryDetails/InsertHeaderDetailJson";
	//alert(url);
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			//	alert("asdasdasd");
			console.log(this.responseText);
			var serverdata = JSON.parse(this.responseText);
			var db1 = Ti.Database.open('mydatalist27');
			var headcount = db1.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
			//var mysnzdate = JSON.parse(this.responseText);
			var sydate1 = new Date(serverdata.Date);
			var myheadid = serverdata.HeaderID;
			var update = convertUTCDateToLocalDate(sydate1);
			progressIndicator.value = 8;
			db1.execute("UPDATE  Inspection set synDate='" + sydate1 + "',offlinebit='0', Updatedate='" + update + "', VIN='" + VIN.value + "', Series='" + Category.value + "',Model='" + Model.value + "',EntryHeaderID='" + myheadid + "'    where EntryHeaderID =" + v);
			db1.execute("UPDATE Entry_details set HeaderID=" + myheadid);
			toastMsg("Record saved  to server!!!");
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
	////console.log(JSON.stringify(jsonArray));
	var myid = {
		id : v
	};
	var pstdata = {
		entryheader : jsonheadArray,
		listentryDetails : jsonArray
	};
	console.log(JSON.stringify(pstdata));
	xhr.send(JSON.stringify(pstdata));
	//var EntryForm = Alloy.createController('dashboard').getView();
	dbRows.close();
	db.close();

}

function submitmydata() {
	var db = Ti.Database.open('mydatalist27');
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
		//testa["Pic"] = Pic;
		testa["valuetype"] = valuetype;
		//testa["picinfo"] = picinfo;
		testa["TemplateDetailID"] = templeteid;
		testa["id"] = v;
		testa["Status"] = "Pending";
		testa["picinfo1"] = dbRows.fieldByName('picname');
		testa["picinfo2"] = dbRows.fieldByName('picname1');
		testa["picinfo3"] = dbRows.fieldByName('picname2');
		testa["picinfo4"] = dbRows.fieldByName('picname3');
		testa["picinfo5"] = dbRows.fieldByName('picname4');
		var picblob1 = "";
		var picblob2 = "";
		var picblob3 = "";
		var picblob4 = "";
		var picblob5 = "";

		if (dbRows.fieldByName('picname') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname') + "'";

			var pic1 = db.execute(imagequery);
			picblob1 = pic1.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname1') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname1') + "'";

			var pic2 = db.execute(imagequery);

			picblob2 = pic1.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname2') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname2') + "'";

			var pic3 = db.execute(imagequery);
			picblob3 = pic3.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname3') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname3') + "'";

			var pic4 = db.execute(imagequery);
			picblob4 = pic4.fieldByName("imageBlob");
		}
		if (dbRows.fieldByName('picname4') != "") {
			var imagequery = "Select * from tbl_temp where imageName='" + dbRows.fieldByName('picname4') + "'";

			var pic5 = db.execute(imagequery);
			picblob4 = pic5.fieldByName("imageBlob");
		}
		testa["Pic1"] = picblob1;
		//dbRows.fieldByName('pic');
		testa["Pic2"] = picblob2;
		//dbRows.fieldByName('pic1');
		testa["Pic3"] = picblob3;
		//dbRows.fieldByName('pic2');
		testa["Pic4"] = picblob4;
		//dbRows.fieldByName('pic3');
		testa["Pic5"] = picblob5;
		//dbRows.fieldByName('pic4');
		jsonArray.push(testa);
		//alert(JSON.stringify(testa));
		dbRows.next();
	}
	//var aaaaaaa=JSON.parse(jsonArray);
	//alert(jsonArray);
	var hquery = "select * from Inspection where EntryHeaderID=" + v;
	console.log(hquery);
	var dbRows1 = db.execute(hquery);
	var jsonheadArray = {};
	//dasd"+dbRows1.fieldByName('EntryHeaderID'));
	jsonheadArray["id"] = v;
	jsonheadArray["EntryHeaderID"] = dbRows1.fieldByName('EntryHeaderID');
	jsonheadArray["VIN"] = dbRows1.fieldByName('VIN');
	jsonheadArray["Version"] = dbRows1.fieldByName('Version');
	jsonheadArray["OrgID"] = dbRows1.fieldByName('OrgID');
	jsonheadArray["Manufacturer"] = dbRows1.fieldByName('Manufacturer');
	jsonheadArray["Series"] = dbRows1.fieldByName('Series');
	jsonheadArray["Model"] = dbRows1.fieldByName('Model');
	jsonheadArray["Year"] = dbRows1.fieldByName('Year');
	jsonheadArray["TemplateType"] = dbRows1.fieldByName('TemplateType');
	jsonheadArray["TemplateName"] = dbRows1.fieldByName('TemplateName');
	jsonheadArray["TemplateID"] = dbRows1.fieldByName('TemplateID');
	jsonheadArray["Status"] = dbRows1.fieldByName('Status');
	jsonheadArray["Updatedate"] = dbRows1.fieldByName('Updatedate');
	jsonheadArray["synDate"] = dbRows1.fieldByName('synDate');
	jsonheadArray["uname"] = dbRows1.fieldByName('uname');
	jsonheadArray["Note"] = dbRows1.fieldByName('Note');
	jsonheadArray["headimagename"] = dbRows1.fieldByName('headimagename');
	jsonheadArray["headimageblob"] = dbRows1.fieldByName('headimageblob');
	jsonheadArray["Assignee"] = dbRows1.fieldByName('Assignee');

	console.log(JSON.stringify(jsonheadArray));

	dbRows.close();
	//alert(jsonArray);
	progressIndicator1.value = 6;
	var url = "166.62.41.120:8082/genericsurvey/inspector/EntryDetails/InsertHeaderDetailJson";
	//alert(url);
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {

			var headcount = db1.execute("SELECT * FROM Inspection where EntryHeaderID = " + v);
			/*
			 var sydate1 = new Date(this.responseText);
			 var update = convertUTCDateToLocalDate(sydate1);
			 if (headcount.rowCount != 0) {

			 db1.execute("DELETE from  Inspection  where EntryHeaderID =" + v);

			 db1.execute("DELETE from Entry_details HeaderID=" + v);
			 }
			 db1.close();*/

			progressIndicator1.value = 8;
			toastMsg("Record submitted  to server!!!");
			var EntryForm = Alloy.createController('dashboard').getView();

		},
		onerror : function(e) {
			progressIndicator1.hide();
			toastMsg("Server error data saved locally!!!");
			var EntryForm = Alloy.createController('dashboard').getView();

		},
		timeout : 50000 /* in milliseconds */
	});
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/octet-stream");
	////console.log(JSON.stringify(jsonArray));
	var myid = {
		id : v
	};
	var pstdata = {
		entryheader : jsonheadArray,
		listentryDetails : jsonArray
	};
	console.log(JSON.stringify(pstdata));
	xhr.send(JSON.stringify(pstdata));
	//var EntryForm = Alloy.createController('dashboard').getView();
	dbRows.close();
	db.close();

};

function maincontrol() {
	contentinit();

	if (myindex > 0) {
		setTimeout(function() {
			imageLoader(0);
		}, 1000);
	}

}

//contentinit();

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
	//console.log("wholejson"+JSON.stringify(wholejson));
	//console.log("sadasdjsonlength"+json.length);
	var db = Ti.Database.open('mydatalist27');
	vnumber = Titanium.App.Properties.getString("head");
	var mydata = db.execute("select * from Entry_details where HeaderID=" + vnumber);
	var count = mydata.rowCount;
	if (count > 0) {
		givedattosection(self.data[myindex].group);
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

function givedattosection(sectioname) {
	var checkbitfordata = 0;
	var db = Ti.Database.open('mydatalist27');
	v = Titanium.App.Properties.getString("head");
	var mydata = db.execute("select * from Entry_details where HeaderID=" + v);
	var count = mydata.rowCount;
	var a = "";
	var b = "";
	var c = "";
	var sec = "";
	var g = 0;
	var ch = 0;
	var s = 0;

	while (mydata.isValidRow()) {//checking the validity of the data

		if (mydata.fieldByName('Type') == "Section" && mydata.fieldByName('checkItem') == sectioname) {
			sec = mydata.fieldByName('checkItem'); ++s;
			g = 0;
			ch = 0;
			a = "";
			b = "";
			mydata.next();
			while (mydata.isValidRow()) {
				if (mydata.fieldByName('Type') == "Section") {
					checkbitfordata = 1;
					break;
				}
				if (mydata.fieldByName('Type') == "Group") {
					////console.log("GGGGGGGGGGGGsssssssss");
					a = mydata.fieldByName('checkItem'); ++g;
					ch = 0;
					b = "";
				}

				if (mydata.fieldByName('Type') == "CheckItem") {

					//alert(c);
					b = mydata.fieldByName('checkItem');
					//alert(a+b);
					var vt = mydata.fieldByName('valueType');
					console.log(sec + a + b + vt);
					if (vt == "Checkbox") {
						//alert(mydata.fieldByName('Value'));
						if (mydata.fieldByName('Value') == "true") {
							self.checkview[sec + "" + a + "" + b].checked = true;
							self.checkview[sec + "" + a + "" + b].backgroundImage = '/image/checked1.png';
						}
					} else if (vt == "Edit") {
						self.checkview[sec + "" + a + "" + b].value = mydata.fieldByName('Value');
					} else if (vt == "Numeric") {
						self.checkview[sec + "" + a + "" + b].value = mydata.fieldByName('Value');
					} else if (vt == "ListChoice") {

						//					var listdata = self.checkview[sec + "" + a + "" + b].valoption;
						//						console.log(mydata.fieldByName('Value') + listdata.length)

						var listdata = self.checkview[sec + "" + a + "" + b].valarray;
						for (var m = 0; m < listdata.length; m++) {
							if (listdata[m] == mydata.fieldByName('Value')) {

								self.checkview[sec + "" + a + "" + b].setSelectedRow(0, m, true);
							}
						}

					}
					ch++;

				}

				if (mydata.fieldByName('Comment') != "") {
					c = "comment";
					self.controls[sec + "" + a + "" + b + "" + c].value = mydata.fieldByName('Comment');
				}

				if (mydata.fieldByName('picname') != "") {
					c = "Pic";
					//self.picview[sec + "" + a + "" + b + "" + "del" + "" + 0].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "add" + 0].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "Pic" + 0].imagename = mydata.fieldByName('picname');
					contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 0;
					imgbolb[myindex] = mydata.fieldByName('pic');
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 0].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 0].imgname = mydata.fieldByName('picname');

					mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 0;
					self.picview[sec + "" + a + "" + b + "" + "v" + 0].height = Ti.UI.SIZE;

					myindex++;

				}
				if (mydata.fieldByName('picname1') != "") {
					c = "Pic";
					self.picview[sec + "" + a + "" + b + "" + "del" + "" + 1].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "add" + 0].visible = false;
					self.picview[sec + "" + a + "" + b + "" + "Pic" + 1].imagename = mydata.fieldByName('picname1');
					self.picview[sec + "" + a + "" + b + "" + "add" + 1].visible = true;
					contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 1;
					imgbolb[myindex] = mydata.fieldByName('pic1');
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 1].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 1].imgname = mydata.fieldByName('picname1');

					self.picview[sec + "" + a + "" + b + "" + "v" + 1].height = Ti.UI.SIZE;

					mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 1;
					myindex++;

				}
				if (mydata.fieldByName('picname2') != "") {
					c = "Pic";
					self.picview[sec + "" + a + "" + b + "" + "del" + "" + 2].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "add" + 1].visible = false;
					self.picview[sec + "" + a + "" + b + "" + "Pic" + 2].imagename = mydata.fieldByName('picname2');
					contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 2;
					self.picview[sec + "" + a + "" + b + "" + "add" + 2].visible = true;
					imgbolb[myindex] = mydata.fieldByName('pic2');
					self.picview[sec + "" + a + "" + b + "" + "v" + 2].height = Ti.UI.SIZE;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 2].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 2].imgname = mydata.fieldByName('picname2');

					mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 2;
					myindex++;

				}
				if (mydata.fieldByName('picname3') != "") {
					c = "Pic";
					self.picview[sec + "" + a + "" + b + "" + "del" + "" + 3].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "add" + 2].visible = false;
					self.picview[sec + "" + a + "" + b + "" + "Pic" + 3].imagename = mydata.fieldByName('picname3');
					contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 3;
					self.picview[sec + "" + a + "" + b + "" + "add" + 3].visible = true;
					imgbolb[myindex] = mydata.fieldByName('pic3');
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 3].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 3].imgname = mydata.fieldByName('picname3');

					self.picview[sec + "" + a + "" + b + "" + "v" + 3].height = Ti.UI.SIZE;

					mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 3;
					myindex++;

				}
				if (mydata.fieldByName('picname4') != "") {
					c = "Pic";
					self.picview[sec + "" + a + "" + b + "" + "del" + "" + 4].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "add" + 3].visible = false;
					self.picview[sec + "" + a + "" + b + "" + "Pic" + 4].imagename = mydata.fieldByName('picname4');
					contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 4;
					imgbolb[myindex] = mydata.fieldByName('pic4');
					self.picview[sec + "" + a + "" + b + "" + "v" + 4].height = Ti.UI.SIZE;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 4].visible = true;
					self.picview[sec + "" + a + "" + b + "" + "show" + "" + 4].imgname = mydata.fieldByName('picname4');
					;

					mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 4;
					myindex++;

				}
				mydata.next();

			}

		}
		if (checkbitfordata == 1) {
			break;
		}
		mydata.next();

	}
	//progressloading.value = 8;
	mydata.close();
	db.close();

}

givedataHeader();

function givedataHeader() {
	var db = Ti.Database.open('mydatalist27');
	var dbarray = db.execute("SELECT * FROM Inspection where offlinebit='1' and EntryHeaderID = " + v);
	VIN.value = dbarray.fieldByName('vin');
	man.value = dbarray.fieldByName('Manufacturer');
	templetetype.value = dbarray.fieldByName('TemplateType');
	tempname.value = dbarray.fieldByName('TemplateName');
	Model.value = dbarray.fieldByName('Model');
	Year.value = dbarray.fieldByName('Year');
	Category.value = dbarray.fieldByName('Series');
	note.value = dbarray.fieldByName('note');
	var himagename = dbarray.fieldByName('headimagename');

	var himageblob = dbarray.fieldByName('headimageblob');
	//console.log(himageblob);
	imgheader.imagename = himagename;
	imgheader.image = Ti.Utils.base64decode(himageblob);
	maincontrol();
	imgheader.addEventListener('click', function() {
		createZoomAbleimage(imgheader.image);
	});

	dbarray.close();
	db.close();

}

function givedata() {//adding data to the template in edit mode

	var db = Ti.Database.open('mydatalist27');
	v = Titanium.App.Properties.getString("head");
	var dbarray = db.execute("SELECT * FROM Inspection where offlinebit='1' and EntryHeaderID = " + v);
	if (dbarray.rowCount > 0) {
		var mydata = db.execute("select * from Entry_details where HeaderID=" + v);
		var count = mydata.rowCount;
		var a = "";
		var b = "";
		var c = "";
		var sec = "";
		var g = 0;
		var ch = 0;
		var s = 0;

		while (mydata.isValidRow()) {//checking the validity of the data

			if (mydata.fieldByName('Type') == "Section") {
				sec = mydata.fieldByName('checkItem'); ++s;
				g = 0;
				ch = 0;
				a = "";
				b = "";
			}
			if (mydata.fieldByName('Type') == "Group") {
				////console.log("GGGGGGGGGGGGsssssssss");
				a = mydata.fieldByName('checkItem');
				++g;
				ch = 0;
				b = "";
			}

			if (mydata.fieldByName('Type') == "CheckItem") {

				//alert(c);
				b = mydata.fieldByName('checkItem');
				//alert(a+b);
				var vt = mydata.fieldByName('valueType');
				//	//console.log(sec+a+b+vt);
				if (vt == "Checkbox") {
					//alert(mydata.fieldByName('Value'));
					if (mydata.fieldByName('Value') == "true") {
						self.checkview[sec + "" + a + "" + b].checked = true;
						self.checkview[sec + "" + a + "" + b].backgroundImage = '/image/checked1.png';
					}
				} else if (vt == "Edit") {
					self.checkview[sec + "" + a + "" + b].value = mydata.fieldByName('Value');
				} else if (vt == "Numeric") {
					self.checkview[sec + "" + a + "" + b].value = mydata.fieldByName('Value');
				} else if (vt == "ListChoice") {
					var listdata = self.data[s-1].groupItems[g-1].groupItems[ch].valueOption;
					////console.log(listdata);
					for (var i = 0; i < listdata.length; i++) {
						if (listdata[i] == mydata.fieldByName('Value')) {
							self.checkview[sec + "" + a + "" + b].setSelectedRow(0, i, true);
						}
					}

				}
				ch++;

			}

			if (mydata.fieldByName('Comment') != "") {
				c = "comment";
				self.controls[sec + "" + a + "" + b + "" + c].value = mydata.fieldByName('Comment');
			}

			/*if (mydata.fieldByName('Picinfo') != "") {
			 c = "Pic";
			 self.controls[sec + "" + a + "" + b + "" + c].imagename = mydata.fieldByName('Pic');
			 contarray[myindex] = sec + "" + a + "" + b + "" + c;
			 imgbolb[myindex] = mydata.fieldByName('Picinfo');
			 myindex++;

			 }*/
			if (mydata.fieldByName('pic') != "") {
				c = "Pic";
				//self.picview[sec + "" + a + "" + b + "" + "del" + "" + 0].visible = true;
				self.picview[sec + "" + a + "" + b + "" + "add" + 0].visible = true;
				self.picview[sec + "" + a + "" + b + "" + "Pic" + 0].imagename = mydata.fieldByName('picname');
				contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 0;
				imgbolb[myindex] = mydata.fieldByName('pic');

				mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 0;
				myindex++;

			}
			if (mydata.fieldByName('pic1') != "") {
				c = "Pic";
				self.picview[sec + "" + a + "" + b + "" + "del" + "" + 1].visible = true;
				self.picview[sec + "" + a + "" + b + "" + "add" + 0].visible = false;
				self.picview[sec + "" + a + "" + b + "" + "Pic" + 1].imagename = mydata.fieldByName('picname1');
				self.picview[sec + "" + a + "" + b + "" + "add" + 1].visible = true;
				contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 1;
				imgbolb[myindex] = mydata.fieldByName('pic1');

				mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 1;
				myindex++;

			}
			if (mydata.fieldByName('pic2') != "") {
				c = "Pic";
				self.picview[sec + "" + a + "" + b + "" + "del" + "" + 2].visible = true;
				self.picview[sec + "" + a + "" + b + "" + "add" + 1].visible = false;
				self.picview[sec + "" + a + "" + b + "" + "Pic" + 2].imagename = mydata.fieldByName('picname2');
				contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 2;
				self.picview[sec + "" + a + "" + b + "" + "add" + 2].visible = true;
				imgbolb[myindex] = mydata.fieldByName('pic2');

				mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 2;
				myindex++;

			}
			if (mydata.fieldByName('pic3') != "") {
				c = "Pic";
				self.picview[sec + "" + a + "" + b + "" + "del" + "" + 3].visible = true;
				self.picview[sec + "" + a + "" + b + "" + "add" + 2].visible = false;
				self.picview[sec + "" + a + "" + b + "" + "Pic" + 3].imagename = mydata.fieldByName('picname3');
				contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 3;
				self.picview[sec + "" + a + "" + b + "" + "add" + 3].visible = true;
				imgbolb[myindex] = mydata.fieldByName('pic3');

				mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 3;
				myindex++;

			}
			if (mydata.fieldByName('pic4') != "") {
				c = "Pic";
				self.picview[sec + "" + a + "" + b + "" + "del" + "" + 4].visible = true;
				self.picview[sec + "" + a + "" + b + "" + "add" + 3].visible = false;
				self.picview[sec + "" + a + "" + b + "" + "Pic" + 4].imagename = mydata.fieldByName('picname4');
				contarray[myindex] = sec + "" + a + "" + b + "" + "Pic" + 4;
				imgbolb[myindex] = mydata.fieldByName('pic4');

				mainview[myindex] = sec + "" + a + "" + b + "" + "v" + 4;
				myindex++;

			}

			mydata.next();

		}
		progressloading.value = 8;
	}
	mydata.close();
	db.close();

}

function imageLoader(currentimg) {

	if (currentimg < imgbolb.length) {

		self.picview[contarray[currentimg]].image = Ti.Utils.base64decode(imgbolb[currentimg]);
		self.picview[contarray[currentimg]].height = 160;
		self.picview[mainview[currentimg]].height = Ti.UI.SIZE;

	}
	//imageLoader(currentimg++);
	if (currentimg + 1 == imgbolb.length) {
		completedataloadbit = 1;
	}

	setTimeout(function() {
		imageLoader(currentimg + 1);
	}, 1000);

}
