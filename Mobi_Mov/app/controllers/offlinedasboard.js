var onbittestcount = Titanium.App.Properties.getString("offdash");
if (onbittestcount == 0) {
	var testonline = Titanium.App.Properties.getString('bitcheck');
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

	var progressloading = Ti.UI.Android.createProgressIndicator({
		message : 'Fetching form Please wait ...',
		location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
		type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,

		cancelable : false,
		max : 10,
		min : 0

	});
	Ti.Network.addEventListener('change', function(e) {
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

		} else {
			if (testonline == 1) {
				Titanium.App.Properties.setString("offdash", 0);
				tabgroup.close();
				var testNew = Alloy.createController('dashboard').getView();
				//var testNew = Alloy.createController('index').getView();

				//toastMsg("You Are Logged Out !!!");

			}
		}

	});
	function checkefothenetwork() {
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {

		} else {
			if (testonline == 1) {
				Titanium.App.Properties.setString("offdash", 0);
				var testNew = Alloy.createController('dashboard').getView();
				tabgroup.close();
				var testNew = Alloy.createController('dashboard').getView();
				//var testNew = Alloy.createController('index').getView();
				//tabgroup.close();

			}
		}
	}

	var testbit = 1;
	function toastMsg(msg) {
		var toast = Ti.UI.createNotification({
			message : msg,
			duration : Ti.UI.NOTIFICATION_DURATION_LONG
		});
		toast.show();
	}

	var u = Titanium.App.Properties.getString("user");
	var nameuser = Titanium.App.Properties.getString("Uname");
	var tabgroup = Ti.UI.createTabGroup();
	var winDraft = Ti.UI.createWindow({
		title : "Testing",
		backgroundColor : "#CCCCCC"

	});

	//Ti.include('includes/InspectionList.js');
	var tabDraft = Ti.UI.createTab({
		title : " Draft",
		window : winDraft,
		icon : '/image/g1.png',
		backgroundSelectedColor : "#45c2da"

	});
	var winNewForm = Ti.UI.createWindow({
		title : "Testing",
		backgroundColor : "white"
	});
	var tabNewForm = Ti.UI.createTab({
		title : "New",

		window : winNewForm,
		icon : '/image/g2.png',
		backgroundSelectedColor : "#45c2da"
	});

	var winCompleted = Ti.UI.createWindow({
		title : "Testing",
		backgroundColor : "#CCCCCC"
	});

	var tabCompleted = Ti.UI.createTab({
		title : " Complete",
		window : winCompleted,
		icon : '/image/g3.png',
		backgroundSelectedColor : "#45c2da"
	});

	tabgroup.addTab(tabDraft);

	tabgroup.addTab(tabCompleted);
	tabgroup.addTab(tabNewForm);
	tabgroup.open();
	tabgroup.addEventListener('android:back', function(e) {
		var testNew = Alloy.createController('index').getView();

		tabgroup.close();
		//toastMsg("You Are Logged Out !!!");

	});

	var winCo = Ti.UI.createWindow({
		title : "Testing",
		backgroundColor : "white"
	});

	// Create a Label.
	var aLabel = Ti.UI.createLabel({
		text : 'Under Construction',
		color : 'red',
		font : {
			fontWeight : 'bold',
			fontSize : 24
		},

		textAlign : 'center'
	});
	winCo.add(aLabel);
	//tabCompleted.window=winCo;
	//bind();
	//tabGroup.addEventListener('open',doOpen);

	tabgroup.addEventListener('open', doOpen);
	function doOpen() {
		console.log(":num" + 1);
		checkefothenetwork();
		//Add a title to the tabgroup. We could also add menu items here if needed
		var activity = tabgroup.activity;

		if (activity.actionBar) {
			activity.actionBar.title = "Home";
			activity.actionBar.setIcon('/image/home8.png');

		}

		activity.onCreateOptionsMenu = function(e) {
			menu = e.menu;

			menuItem2 = menu.add({
				title : 'Profile',
				icon : 'image/p.png',
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
			});

			menuItem3 = menu.add({
				title : 'Logout',
				icon : 'image/l.png',
				showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
			});

			menuItem2.addEventListener('click', function(e) {
				alert(e.source.title);
			});
			menuItem3.addEventListener('click', function(e) {
				//alert(e.source.title);
				var testNew = Alloy.createController('index').getView();

				tabgroup.close();
				toastMsg("You Are Logged Out !!!");

			});

		};
	}

	var window = Ti.UI.createWindow({
		backgroundColor : 'White',
		title : 'Inspections Template'
	});
	function createInspection() {
		var givendata = "";
		//var lstdat = JSON.parse(array);
		var Barcode = require('ti.barcode');

		Barcode.allowRotation = true;
		Barcode.displayedMessage = '';
		Barcode.useLED = true;
		var scrollView = Ti.UI.createScrollView({
			//contentWidth : 'auto',
			//	contentHeight :500,
			top : 0,
			height : Ti.UI.FILL,
			backgroundColor : "#FFFFFF",
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			scrollType : 'vertical'
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
		//scrollView.add(scanCode);

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

		// Create a Label.
		var lblVim = Ti.UI.createLabel({
			text : 'Inspection No',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});

		//VIN,Make,Year,Series,Model and Note(long text field)
		var VIN = Ti.UI.createTextField({
			hintText : 'Inspection No',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
			width : "70%",
			left : "7%",
			borderWidth : 1,
			color : 'black',
			font : {
				fontFamily : 'Helvetica',
				fontSize : 14,
				fontStyle : 'normal',
				fontWeight : 'normal',
				//index:[i][j][m]
			},
			borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		});
		var VueVI = Ti.UI.createView({
			height : Ti.UI.SIZE,
			width : "100%"

		});

		var scanImage = Ti.UI.createImageView({
			image : '/image/scanner.png',
			width : 40,
			height : 40,
			top : 10,
			left : "81%",
			zIndex : 5,
			cause : "image"//Custom property
		});
		VueVI.add(VIN);
		VueVI.add(scanImage);
		scanImage.addEventListener('click', function() {
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

		var lblvrsn = Ti.UI.createLabel({
			text : 'Version',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});

		var Version = Ti.UI.createTextField({
			hintText : 'Version',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
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
		var lblorg = Ti.UI.createLabel({
			text : 'Organisation ID',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});

		var OrgID = Ti.UI.createTextField({
			hintText : 'Org ID',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
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

		var lblmfg = Ti.UI.createLabel({
			text : 'Type of Building',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		var lblassign = Ti.UI.createLabel({
			text : 'Assign',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		// Add to the parent view.

		var Manufacturer = Ti.UI.createPicker({
			backgroundColor : '#6a7369',

			top : 10,
			height : 40,
			width : "85%",
			borderColor : "#45C2DA",
			visibleItems : 3,
			font : {
				fontFamily : 'Helvetica',
				fontSize : 14,
				fontColor : "Black",
				fontStyle : 'normal',
				fontWeight : 'normal'
			},

		});
		var data = [];
		var listdataman = new Array();
		var listdatatype = new Array();
		var dbs3 = Ti.Database.open('mydatalist27');
		var cou11 = dbs3.execute("SELECT DISTINCT Manufacturer from TempleteTbl ");
		var cou12 = dbs3.execute("SELECT DISTINCT TempleteType from TempleteTbl ");
		var mancount = 0;
		var typecount = 0;
		while (cou11.validRow) {
			listdataman[mancount] = cou11.fieldByName("Manufacturer");
			mancount++;
			cou11.next();
		}
		while (cou12.validRow) {
			listdatatype[typecount] = cou12.fieldByName("TempleteType");
			typecount++;
			cou12.next();
		}

		var listdata = listdataman;
		for (var i = 0; i < cou11.rowCount; i++) {
			data[i] = Ti.UI.createPickerRow({
				title : listdata[i]
			});
		}
		Manufacturer.add(data);

		var lbltype = Ti.UI.createLabel({
			text : 'Inspection Type',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		//var dataurl = "166.62.41.120:8082/genericsurvey/inspector/template/manufacturer";

		var assign = Ti.UI.createPicker({
			backgroundColor : '#6a7369',

			top : 10,
			height : 40,
			width : "85%",
			borderColor : "#45C2DA",
			visibleItems : 3,
			font : {
				fontFamily : 'Helvetica',
				fontSize : 14,
				fontColor : "Black",
				fontStyle : 'normal',
				fontWeight : 'normal'
			},

		});

		var colassign = dbs3.execute("SELECT *  from Assign ");
		console.log(colassign.fieldByName("assign"));
		var myda = JSON.parse(colassign.fieldByName("assign"));
		var data1 = [];
		var list1 = myda;
		for (var i = 0; i < list1.length; i++) {
			data1[i] = Ti.UI.createPickerRow({
				title : list1[i]
			});
		}
		assign.add(data1);
		assign.setSelectedRow(0, -1, true);

		var Formtype = Ti.UI.createPicker({
			backgroundColor : '#6a7369',

			top : 10,
			height : 40,
			width : "85%",
			borderColor : "#45C2DA",
			visibleItems : 3,
			font : {
				fontFamily : 'Helvetica',
				fontSize : 14,
				fontColor : "Black",
				fontStyle : 'normal',
				fontWeight : 'normal'
			},

		});
		var data = [];
		var list = listdatatype;
		for (var i = 0; i < list.length; i++) {
			data[i] = Ti.UI.createPickerRow({
				title : list[i]
			});
		}
		//Formtype.add(data);

		Formtype.add(data);
		Formtype.setSelectedRow(0, -1, true);

		Formtype.addEventListener('change', getData);
		Manufacturer.addEventListener('change', getData);

		var fetchbutton = Ti.UI.createButton({
			title : 'Fetch',
			top : 10,
			font : {
				fontSize : 16
			},
			color : '#FFFFFF',
			width : '15%',
			height : 40,
			borderRadius : 5,
			buttom : 10,
			backgroundColor : '#45c2da'
		});

		// Listen for click events.
		fetchbutton.addEventListener('click', function() {
			getData();
		});

		// Add to the parent view.
		//	parentView.add(fetchbutton);
		var colm = Ti.UI.createPickerColumn();
		var flag = 0;
		var data2;
		var loadingformname = Ti.UI.Android.createProgressIndicator({
			message : 'loading Form Name ',
			location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
			type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,

			cancelable : false,
			max : 10,
			min : 0

		});
		function getData() {
			//loadingformname.show();
			//loadingformname.value = 1;
			var a = 0;
			if (flag != 0) {
				a = colm.rowCount;
				for (var i = colm.rowCount - 1; i >= -1; i--) {
					colm.removeRow(data2[i]);
				}
				a = colm.rowCount;

			}
			//loadingformname.value = 3;
			FormName.value = "";
			//alert("asd");
			var man = Manufacturer.getSelectedRow(0).title;
			var tem = Formtype.getSelectedRow(0).title;

			//loadingformname.value = 5;
			//Ti.API.info(this.responseText);
			var listdataname = new Array();
			var myindexname = 0;
			var couname = dbs3.execute("SELECT DISTINCT TempleteName from TempleteTbl where Manufacturer='" + man + "' and TempleteType='" + tem + "'");
			while (couname.validRow) {
				listdataname[myindexname] = couname.fieldByName("TempleteName");
				console.log(couname.fieldByName("TempleteName"));
				myindexname++;
				couname.next();
			}
			if (couname.rowCount > 0) {
				//loadingformname.value = 6;

				givendata = listdataname;
				data2 = [];
				//var listdata = JSON.parse(this.responseText);
				for (var i = 0; i < listdataname.length; i++) {
					data2[i] = Ti.UI.createPickerRow({
						title : listdataname[i]
					});

					colm.add(data2[i]);

				}
				flag++;
				picview.remove(picview1);
				//loadingformname.value = 10;
				//loadingformname.hide();

			} else {
				picview.add(picview1);
				//loadingformname.hide();
				flag = 0;
				toastMsg("No Template Name avilable");
			}

		}

		var lblName = Ti.UI.createLabel({
			text : 'Form Name',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		var FormName = null;
		FormName = Ti.UI.createPicker({
			backgroundColor : '#6a7369',

			//top : 10,
			height : "100%",
			width : "100%",
			borderColor : "#45C2DA",
			visibleItems : 3,
			font : {
				fontFamily : 'Helvetica',
				fontSize : 14,
				fontColor : "Black",
				fontStyle : 'normal',
				fontWeight : 'normal'
			},

		});
		FormName.add(colm);
		//var colm=Ti.UI.createPickerColumn();

		/*
		 FormName = Ti.UI.createTextField({
		 backgroundColor : '#F3F3F3',

		 top : 10,
		 height : 40,
		 width : "85%",
		 borderColor : "#45C2DA",
		 //visibleItems : 3,
		 editable : false,
		 color : "black",
		 font : {
		 fontFamily : 'Helvetica',
		 fontSize : 14,
		 fontColor : "Black",
		 fontStyle : 'normal',
		 fontWeight : 'normal'
		 },

		 });*/

		FormName.addEventListener('click', function(e) {

			//		getData();

		});

		//FormName.addEventListener('change', getData);
		var lblseries = Ti.UI.createLabel({
			text : 'Customer Name',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		var Series = Ti.UI.createTextField({
			hintText : 'Customer Name',
			top : 10,
			height : 40,
			backgroundColor : '#F3F3F3',
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
		var picview = Ti.UI.createView({
			top : 10,
			font : {
				fontSize : 16
			},
			//color : '#FFFFFF',
			width : '85%',
			height : 40,
			borderRadius : 5,
			buttom : 10,
			backgroundColor : '#007f97'
		});
		var picview1 = Ti.UI.createView({

			//top : 10,
			font : {
				fontSize : 16
			},
			//color : '#007f97',
			width : '100%',
			height : "100%",
			borderRadius : 5,
			buttom : 10,
			backgroundColor : '#6a7369'
		});

		var lblmodel = Ti.UI.createLabel({
			text : 'Address',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		var Model = Ti.UI.createTextField({
			hintText : 'Address',
			top : 10,
			width : "85%",
			backgroundColor : '#F3F3F3',
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
		var lblyear = Ti.UI.createLabel({
			text : 'Year Built',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		var Year = Ti.UI.createTextField({
			hintText : 'Year Built',
			top : 10,
			height : 40,
			width : "85%",
			borderWidth : 1,
			keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
			backgroundColor : '#F3F3F3',
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
		var lbldes = Ti.UI.createLabel({
			text : ' Property Desc',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : "7%",
			//textAlign : 'center'
		});
		var capimgview = Titanium.UI.createView({
			top : 3,
			left : "7%",
			layout : "horizontal",
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			backgroundColor : "white",
			//borderRadius : 3
		});

		var captureimg = Ti.UI.createLabel({
			text : ' Attach Pic',
			color : 'black',
			font : {
				fontSize : 16
			},
			height : 20,
			width : 'auto',
			top : 10,
			left : 0.5

			//textAlign : 'center'
		});

		var getphoto = Ti.UI.createImageView({
			top : 12,
			image : '/image/camera.png',
			width : 30,
			height : 30,
			left : 20
		});
		var uploadimg = Ti.UI.createImageView({
			top : 7,
			left : 15,
			width : 40,
			height : 40,
			image : '/image/attachpic.png'
		});
		var headerimgview = Ti.UI.createImageView({
			width : "90%",
			height : 0,
			image : "",
			imagename : "",

			//transform:Ti.UI.create2DMatrix().rotate(90)
		});
		headerimgview.addEventListener('click', function(e) {
			//console.log(e);
			//console.log(e.source.image);
			createZoomAbleimage(e.source.image);
		});

		getphoto.addEventListener('click', function(e) {
			Titanium.Media.showCamera({
				success : function(event) {
					if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

						headerimagehandler(event);

					}
				},
				cancel : function() {
				},
				error : function(error) {
				}
			});
		});
		uploadimg.addEventListener('click', function(e) {
			Titanium.Media.openPhotoGallery({
				success : function(event) {
					headerimagehandler(event);
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

		capimgview.add(captureimg);
		capimgview.add(getphoto);
		capimgview.add(uploadimg);
		function headerimagehandler(event) {
			var selectedImg = event.media;
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

				var path = event.media.nativePath;
				var pos1 = path.lastIndexOf(path.charAt(path.indexOf(":") + 1));
				var filename1 = path.substring(pos1 + 1);
				newBlob1 = event.media.imageAsResized(300, 200);
				headerimgview.image = newBlob1;
				headerimgview.height = 160;
				var dt1 = new Date();
				dttime1 = dt1.getTime();
				dtdate1 = dt1.getDate();
				headerimgview.imagename = dttime1 + "" + dtdate1 + "" + filename1;
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
						data : headerimgview.imagename.trim()
					});
				}

			}

		}

		var des = Ti.UI.createTextArea({
			hintText : ' Property Desc',
			top : 10,
			height : 60,
			width : "85%",
			borderWidth : 1,
			//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
			backgroundColor : '#F3F3F3',
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

		var bmydatalist27Insgection = Ti.UI.createButton({
			title : 'List Inspection',
			top : 10,
			color : '#FFFFFF',
			width : '85%',
			height : '8%',
			borderRadius : 5,
			backgroundColor : '#45c2da'
		});

		var btnSave = Ti.UI.createButton({
			title : 'Create',

			top : 10,
			font : {
				fontSize : 16
			},
			color : '#FFFFFF',
			width : '15%',
			height : 40,
			borderRadius : 5,
			buttom : 10,
			backgroundColor : '#45c2da'
		});
		var butheight = Ti.UI.createView({
			top : 10,
			height : 15,
			backgroundColor : '#FFFFFF'
		});

		var progresscreating = Ti.UI.Android.createProgressIndicator({
			message : 'Creating inspection Please wait ...',
			location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
			type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
			cancelable : false,
			max : 10,
			min : 0

		});
		btnSave.addEventListener('click', function() {

			if (VIN.value.length > 0 && Series.value.length > 0 && Model.value.length > 0 && Year.value.length > 0 && flag > 0) {
				progresscreating.show();
				progresscreating.value = 1;
				progresscreating.value = 3;
				var objnote = des.value;
				var objVIN = VIN.value;
				var objVersion = "RTR";
				var objOrgID = "TVS";
				var objManufacturer = Manufacturer.getSelectedRow(0).title;
				var objSeries = Series.value;
				var objModel = Model.value;
				var objYear = Year.value;
				var objtype = Formtype.getSelectedRow(0).title;
				var objName = FormName.getSelectedRow(0).title;
				var objbarcode = scanResult.text;
				var objsubmit = "False";
				var templeteid = "";

				var status = "Draft";
				var currentTime = new Date();
				/*
				 for (var i = 0; i < givendata.length; i++) {
				 if (givendata[i].temp_name == objName) {
				 templeteid = givendata[i].mrecordID;
				 }
				 }
				 */
				progresscreating.value = 6;
				VIN.value = "";
				Manufacturer.value = "";
				Series.value = "";
				Model.value = "";
				Year.value = "";
				FormName.value = "";
				des.value = "";
				var recid = "";
				var dbs = Ti.Database.open('mydatalist27');
				var encodeimg = Ti.Utils.base64encode(headerimgview.image);
				var offbit = 1;
				var getjson = dbs.execute("SELECT *  from TempleteTbl where TempleteName='" + objName + "' and TempleteType='" + objtype + "' and Manufacturer='" + objManufacturer + "'");
				console.log("id" + getjson.fieldByName("templeteid"));
				//templeteid=getjson.fieldByName("templeteid");
				var datasql = dbs.execute("INSERT INTO Inspection (VIN,Version,OrgID,Manufacturer,Series,Model,Year,Barcode,Submitted,TemplateType,TemplateName,Jsondata,TemplateID,Status,Updatedate,synDate,uname,Note,headimagename,headimageblob,Assignee,offlinebit,Inspector) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", objVIN, objVersion, objOrgID, objManufacturer, objSeries, objModel, objYear, objbarcode, objsubmit, objtype, objName, getjson.fieldByName("Json"), getjson.fieldByName("templeteid"), status, "", "", nameuser, objnote, headerimgview.imagename, encodeimg, assign.getSelectedRow(0).title, offbit, Titanium.App.Properties.getString("Uname"));
				headerimgview.height = 0;
				//testbit = 1;
				var dathead = dbs.execute("SELECT * from Inspection WHERE VIN='" + objVIN + "' AND Manufacturer = '" + objManufacturer + "'AND TemplateType  = '" + objtype + "' AND TemplateName = '" + objName + "'");

				Titanium.App.Properties.setString("head", dathead.fieldByName('EntryHeaderID'));
				Titanium.App.Properties.setString("mannufact", getjson.fieldByName("Json"));
				Titanium.App.Properties.setString("offdash", 0);
				var EntryForm = Alloy.createController('testupdate').getView();

				dbs.close();
				progresscreating.value = 10;

				//
				toastMsg("Inspection Created  !!!");
				//Titanium.App.Properties.setString("vinid", objVIN);
				progresscreating.hide();
			} else {
				toastMsg("All Fields Are Required!!! ");
			};
		});

		scrollView.add(lblVim);
		scrollView.add(VueVI);
		scrollView.add(scanImage);
		scrollView.add(lblmfg);
		scrollView.add(Manufacturer);
		scrollView.add(lbltype);
		scrollView.add(Formtype);
		scrollView.add(lblName);
		picview.add(FormName);

		scrollView.add(picview);
		scrollView.add(lblseries);
		scrollView.add(Series);
		scrollView.add(lblmodel);
		scrollView.add(Model);
		scrollView.add(lblyear);
		scrollView.add(Year);
		//scrollView.add(captureimg);
		scrollView.add(lblassign);
		scrollView.add(assign);
		scrollView.add(lbldes);

		scrollView.add(des);
		scrollView.add(capimgview);
		scrollView.add(headerimgview);
		scrollView.add(btnSave);
		scrollView.add(butheight);
		window.add(scrollView);

	}


	tabNewForm.window = window;
	//var dataaray = "";
	createInspection();

	tabNewForm.addEventListener('focus', function(e) {

	});
	bind();
	function bind() {
		var data = [];
		var tableView = Titanium.UI.createTableView({
			width : "97%",
			filterAttribute : 'filter',
			backgroundColor : '#CCCCCC'
		});
		winDraft.add(tableView);

		//	tableView.setData([]);
		winDraft.remove(tableView);
		var db = Ti.Database.open('mydatalist27');
		//opening database
		var test = db.execute("select * from Inspection");
		// db.execute("Delete from Inspection");
		//db.execute("Delete from Entry_details");
		if (test.rowCount > 0) {
			var dbRows = db.execute("select * from Inspection where submitted='False' and uname='"+nameuser+"'ORDER BY `Updatedate` DESC");
			//select query
			var dumRo = Ti.UI.createTableViewRow();
			dumRo.height = 5;
			dumRo.width = "100%";
			dumRo.backgroundColor = "#CCCCCC";
			while (dbRows.isValidRow()) {
				var row = Ti.UI.createTableViewRow({
					headerid : dbRows.fieldByName('EntryHeaderID'),
					vinid : dbRows.fieldByName('VIN')
				});
				row.selectedBackgroundColor = '#fff';
				row.height = Ti.UI.SIZE;
				row.className = 'datarow';
				row.clickName = 'row';
				var image = Ti.UI.createImageView({
					image : '/image/cross.png',
					width : 20,
					height : 20,
					top : 45,
					right : 10,
					zIndex : 5,
					name : dbRows.fieldByName('VIN'),
					man : dbRows.fieldByName('Manufacturer'),
					cause : "image"//Custom property
				});
				var w = Ti.UI.createWindow({});
				row.addEventListener('longpress', function(e) {
					/*	var va=e.source.name;
					 var test1=e.source.man;
					 Titanium.App.Properties.setString("head",va);
					 Titanium.App.Properties.setString("mannufact",test1);

					 var EntryForm = Alloy.createController('testedit').getView();

					 */

				});

				row.addEventListener('click', function(e) {

					if (e.source.cause == "image") {
						var vinid = e.source.name;
						var confirm = Titanium.UI.createAlertDialog({
							title : 'Delete',
							message : 'Are you sure you want to Delete?',
							buttonNames : ['Yes', 'No'],
							cancel : 1
						});
						confirm.show();
						confirm.addEventListener('click', function(e) {
							if (e.cancel === e.index || e.cancel === true) {
								return false;
							}
							if (e.index === 0) {
								// window.close();
								//alert('yes is clicked');
								//	alert(e.source.name);
								DeleteInspection(vinid);
								bind();
								toastMsg("Scanning");

							}

						});
						//alert('Delete Record');
						//alert(e.source.name);
					} else {
						progressloading.show();
						progressloading.value = 1;
						progressloading.value = 2;

						var va = e.rowData.headerid;
						var test1 = e.source.man;
						Titanium.App.Properties.setString("vinid", e.rowData.vinid);
						progressloading.value = 4;
						Titanium.App.Properties.setString("head", va);
						//alert(va);
						Titanium.App.Properties.setString("mannufact", test1);
						var dbget = Ti.Database.open('mydatalist27');
						var newdata = dbget.execute("select * from Inspection where EntryHeaderID=" + va);
						progressloading.value = 6;
						var name = newdata.fieldByName('TemplateName');
						var type = newdata.fieldByName('TemplateType');
						var jsondata = newdata.fieldByName('Jsondata');
						Titanium.App.Properties.setString("mannufact", jsondata);
						var mydata = dbget.execute("select * from Entry_details where HeaderID=" + va);
						//var count=mydata.rowCount;
						//alert(mydata.rowCount);
						progressloading.value = 8;
						if (mydata.rowCount > 0 && newdata.fieldByName('offlinebit') == 1) {
							progressloading.value = 10;
							progressloading.hide();
							//alert("it is Draft ");
							//tabgroup.close();
							Titanium.App.Properties.setString("offdash", 0);
							var EntryForm = Alloy.createController('localoffline').getView();
						} else {//alert("insert mode");
							//tabgroup.close();
							progressloading.value = 10;
							progressloading.hide();
							Titanium.App.Properties.setString("offdash", 0);
							var EntryForm = Alloy.createController('testupdate').getView();
							//var EntryForm = Alloy.createController('testnewjson').getView();
						}

						dbget.close();

					}

				});
				var view1 = Ti.UI.createView({
					width : "49.75%",
					height : 30,
					top : 0,
					left : 2,
					backgroundColor : "#007F97",
				});
				var col = Ti.UI.createLabel({
					color : 'white',
					backgroundColor : "#007F97",
					font : {
						fontSize : 20,
						fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					//		left : 0,
					id : 'vin',
					left : 2,
					top : 0,
					right : "75%",
					height : 30,
					width : 142,
					clickName : 'user',
					text : " " + 'Inspection No:' //+ dbRows[li].vin,
				});
				var col1 = Ti.UI.createLabel({
					color : 'white',
					text : " " + dbRows.fieldByName('vin'),
					backgroundColor : "#007F97",
					font : {
						fontSize : 20,
						//	fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					//		left : 0,
					id : 'vin',
					left : 142,
					top : 0,
					//right : "50%",
					height : 30,
					width : Ti.UI.SIZE,
					clickName : 'user',
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
				});

				// Add to the parent view.
				view1.add(col);
				view1.add(col1);
				row.add(view1);
				var view2 = Ti.UI.createView({
					width : "50%",
					height : 30,
					top : 0,
					left : "50%",
					backgroundColor : "#007F97",
				});

				// Add to the parent view.
				//row.add(image);

				var user = Ti.UI.createLabel({
					color : 'white',
					backgroundColor : "#007F97",
					font : {
						fontSize : 20,
						fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					left : 2,
					top : 0,
					height : 30,
					width : 66,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					clickName : 'user',
					text : 'Status:'// + dbRows[li].status
				});
				var user1 = Ti.UI.createLabel({
					color : 'white',
					backgroundColor : "#007F97",
					font : {
						fontSize : 20,
						//	fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					left : 68,
					top : 0,
					height : 30,
					width : Ti.UI.SIZE,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					clickName : 'user',
					text : " " + 'Draft'
				});

				//row.filter = user.text;
				view2.add(user);
				view2.add(user1);
				row.add(view2);
				var row2 = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "White",
					font : {
						fontSize : 17,
						fontWeight : ' ',
						fontFamily : 'Arial'
					},
					left : 2,
					top : 30,
					height : 30,
					width : '49.75%',
					clickName : 'user',
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					//text : " " + 'Address:' + dbRows[li].model,
				});
				// Add to the parent view.
				//row.add(row2);
				var view3 = Ti.UI.createView({
					width : "99.75%",
					height : 30,
					top : 30,
					left : 2,
					backgroundColor : "white",
				});

				var rc2 = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {
						fontSize : 17,
						fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					//left : '50%',
					//	zIndex : 89,
					left : 2,
					top : 30,
					height : 30,
					width : 75,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					clickName : 'user',
					text : " " + 'Address:'
				});
				var rc2data = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "White",
					font : {
						fontSize : 17,
						fontWeight : ' ',
						fontFamily : 'Arial'
					},
					//left : '50%',
					left : 75,
					top : 30,
					height : 30,
					width : Ti.UI.FILL,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					clickName : 'user',
					text : " " + dbRows.fieldByName('Model'),
				});
				v = Ti.UI.createView({
					width : "90%",
					//backgroundColor:"red"
				});
				//row.filter = rc2.text;
				//view3.add(v);
				//v.add(rc2);
				row.add(rc2);
				row.add(rc2data);

				var lineview = Ti.UI.createView({
					width : "99.75%",
					height : 2,
					top : 60,
					left : 2,
					backgroundColor : "white"
				});
				var lineview1 = Ti.UI.createView({
					width : "98%",
					height : 0.5,
					//	top:60,
					//width:"88%",
					backgroundColor : "Black"
				});
				//row.add(lineview1);
				lineview.add(lineview1);
				row.add(lineview);

				var row3 = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {
						fontSize : 17,
						fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					left : 2,
					top : 62,
					height : 30,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					width : 120,
					clickName : 'user',
					text : " " + 'Building Type:' //+ dbRows[li].tempname
				});
				var row3data = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {
						fontSize : 17,
						//fontWeight : ' ',
						fontFamily : 'Arial'
					},
					left : 120,
					top : 62,
					height : 30,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					width : Ti.UI.FILL,
					clickName : 'user',
					text : dbRows.fieldByName('Manufacturer')
				});

				// Add to the parent view.
				row.add(row3);
				row.add(row3data);

				var year = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {
						fontSize : 17,
						fontWeight : 'bold',
						fontFamily : 'Arial'
					},
					left : 0,
					//top : 60,

					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					height : 30,
					width : 86,
					clickName : 'user',
					text : 'Customer:'// + dbRows[li].temptype
				});

				var testview = Ti.UI.createView({
					height : 30,
					left : "50%",
					top : 62,
					backgroundColor : "white"
				});
				var yeardata = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {
						fontSize : 17,
						//fontWeight : 'Bold ',
						fontFamily : 'Arial'
					},
					left : 86,
					///right:2,
					//top : 60,

					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					height : 30,
					width : Ti.UI.SIZE,
					clickName : 'user',
					text : " " + dbRows.fieldByName('Series')
				});
				row.filter = year.text;

				testview.add(year);
				testview.add(yeardata);

				row.add(testview);
				var line = Ti.UI.createView({
					backgroundColor : 'Black',
					width : "100%",
					top : 100,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					height : 0.
				});
				var line1 = Ti.UI.createView({
					backgroundColor : '#CCCCCC',
					width : "99.75%",
					bottom : 0,
					height : 5,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
				});

				row.add(line);
				var testview1 = Ti.UI.createView({
					height : 30,
					left : 2,
					top : 94,
					backgroundColor : "white"
				});
				var testview2 = Ti.UI.createView({
					height : 30,
					left : "50%",
					top : 94,
					backgroundColor : "white"
				});
				var inspector = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {

						fontSize : 14,
						fontWeight : 'bold',
						fontFamily : 'Arial'

					},
					left : 2,
					//	top : 90.5,
					height : 30,
					width : 73,
					//man : dbRows[li].manufacturer,
					clickName : 'user',
					text : ' ' + 'Inspector:'// + nameuser,
				});
				var inspectordata = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "White",
					font : {
						fontSize : 14,
						//fontWeight : 'Bold ',
						fontFamily : 'Arial'
					},
					left : 73,
					//	top : 90.5,
					height : 30,
					width : '49.75%',
					//man : dbRows[li].manufacturer,
					clickName : 'user',
					text : dbRows.fieldByName('Inspector'),
				});
				console.log(dbRows.fieldByName('Inspector'));
				var lineviewlast = Ti.UI.createView({
					width : "99.75%",
					height : 2,
					top : 92,
					left : 2,
					backgroundColor : "white"
				});
				var lineviewlast1 = Ti.UI.createView({
					width : "98%",
					height : 0.5,
					//	top:60,
					//width:"88%",
					backgroundColor : "Black"
				});
				lineviewlast.add(lineviewlast1);
				row.add(lineviewlast);
				testview1.add(inspector);
				testview1.add(inspectordata);
				// Add to the parent view.
				row.add(testview1);
				var lab = Ti.UI.createLabel({
					left : 0,
					top : 90.5,
					height : 40,
					width : "%"
				});
				var myDate = new Date(dbRows.fieldByName('updatedate'));
				var testdate = new Date(convertUTCDateToLocalDate(myDate));

				var dATE = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "white",
					font : {

						fontSize : 14,
						fontWeight : 'bold',
						fontFamily : 'Arial'

					},
					left : 2,
					//	top : 90.5,
					height : 30,
					width : 80,
					//man : dbRows[li].manufacturer,
					clickName : 'user',
					text : 'Updated On:' //+ testdate.toDateString() + " " + testdate.toLocaleTimeString()
				});
				var dATEdata = Ti.UI.createLabel({
					color : 'black',
					backgroundColor : "White",
					font : {
						fontSize : 14,
						//fontWeight : 'Bold ',
						fontFamily : 'Arial'

					},
					left : 80,

					//top : 90.5,
					height : 30,
					//name : dbRows[li].vin,
					//text : dbRows[li].vin,
					width : Ti.UI.SIZE,
					//left:"1%",
					clickName : 'user',
					//right : 0,
					text : " " + testdate.toDateString() + " " + testdate.toLocaleTimeString()
				});
				row.filter = dATE.text;
				//row.add(lab);
				testview2.add(dATE);
				testview2.add(dATEdata);
				row.add(testview2);
				data.push(dumRo);
				data.push(row);
				dbRows.next();
			}
			dbRows.close();

			tableView.data = data;
			//alert(JSON.stringify(tableView));
			//winDraft.add(tableView);
		}
		winDraft.add(tableView);
	}


	tabDraft.addEventListener('focus', function(e) {
		checkefothenetwork();
		testbit = 1;
		bind();
		//alert("inside tabdraft");
	});
	function DeleteInspection(vinId) {

		// alert(vinId);
		var db = Ti.Database.open('mydatalist27');
		//opening database

		db.execute("DELETE FROM Inspection where VIN = " + vinId);
		db.close();
		toastMsg("Drafted Inspection Deleted");
		//alert("Data Have Been Deleted");
		//bind();
	}

	function combind() {
		var data = [];
		var db = Ti.Database.open('mydatalist27');
		//opening database

		var dbRows = JSON.parse(Titanium.App.Properties.getString("entrytemp"));
		console.log(JSON.stringify(dbRows));
		//db.execute("select * from Inspection where submitted='True' ");//select query /*where submitted='True'
		//var dumRo=Ti.UI.createTableViewRow();
		var dumRo = Ti.UI.createTableViewRow();
		dumRo.height = 5;
		dumRo.width = "100%";
		dumRo.backgroundColor = "#CCCCCC";
		var length = dbRows.length;
		var li = 0;
		while (li < length) {
			var row = Ti.UI.createTableViewRow();
			row.selectedBackgroundColor = '#fff';
			row.height = Ti.UI.SIZE;
			row.className = 'datarow';
			row.clickName = 'row';
			var image = Ti.UI.createImageView({
				image : '/image/cross.png',
				width : 20,
				height : 20,
				top : 45,
				right : 10,
				zIndex : 5,
				man : dbRows[li].Manufacturer,
				name : dbRows[li].vin,
				cause : "image"//Custom property
			});
			var w = Ti.UI.createWindow({});

			/*
			 row.addEventListener('click', function(e) {

			 //alert(e.source.name);

			 var va = e.source.name;
			 var test1 = e.source.man;

			 Titanium.App.Properties.setString("head", va);
			 //alert(va);
			 Titanium.App.Properties.setString("mannufact", test1);
			 //var EntryForm = Alloy.createController('cmtcheck').getView();

			 //alert(test1);

			 var url = "192.168.0.116:8088/genericsurvey/success/" + test1;
			 //alert(url);
			 var xhr = Ti.Network.createHTTPClient({
			 onload : function(e) {

			 Ti.API.info(this.responseText);
			 //  alert(JSON.stringify(this.responseText));

			 Titanium.App.Properties.setString("mannufact", this.responseText);
			 //alert("asd");
			 var EntryForm = Alloy.createController('testedit').getView();
			 //alert("finish");
			 },
			 onerror : function(e) {
			 Ti.API.debug(e.error);
			 alert('error');
			 },
			 timeout : 50000 /* in milliseconds
			 });
			 xhr.open("GET", url);
			 xhr.send();

			 /*var db = Ti.Database.open('test');
			 var mydata=db.execute("select * from Entry_details where HeaderID="+va);
			 //var count=mydata.rowCount;
			 if(mydata.rowCount>0)
			 {
			 //		alert("it is Draft ");
			 var EntryForm = Alloy.createController('testupdate').getView();
			 }
			 else
			 {
			 var EntryForm = Alloy.createController('testnewjson').getView();
			 }

			 });
			 */
			var col = Ti.UI.createLabel({
				color : 'white',
				backgroundColor : "#007F97",
				font : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : 'Arial'
				},
				left : 0,
				id : 'vin',
				top : 0,
				height : 30,
				width : '50%',
				clickName : 'user',
				man : dbRows[li].Manufacturer,
				name : dbRows[li].vin,
				text : 'Report No:' + dbRows[li].vin,
			});
			// Add to the parent view.
			row.add(col);

			// Add to the parent view.
			//row.add(image);

			var user = Ti.UI.createLabel({
				color : 'white',
				backgroundColor : "#007F97",
				font : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : 'Arial'
				},
				left : '50%',
				top : 0,
				height : 30,
				width : '50%',
				man : dbRows[li].Manufacturer,
				name : dbRows[li].vin,
				clickName : 'user',
				text : 'Status :Complete '
			});

			row.filter = user.text;
			row.add(user);
			var row2 = Ti.UI.createLabel({
				color : 'black',
				backgroundColor : "White",
				font : {
					fontSize : 17,
					fontWeight : ' ',
					fontFamily : 'Arial'
				},
				left : 2,
				top : 30,
				height : 30,
				width : '50%',
				clickName : 'user',
				man : dbRows[li].manufacturer,
				name : dbRows[li].vin,
				text : 'Model# :' + dbRows[li].model,
			});
			// Add to the parent view.
			row.add(row2);

			var rc2 = Ti.UI.createLabel({
				color : 'black',
				backgroundColor : "White",
				font : {
					fontSize : 17,
					fontWeight : ' ',
					fontFamily : 'Arial'
				},
				left : '50%',
				top : 30,
				height : 30,
				width : '50%',
				man : dbRows[li].manufacturer,
				name : dbRows[li].vin,
				clickName : 'user',
				text : 'Type of Building:' + dbRows[li].manufacturer,
			});
			row.filter = rc2.text;
			row.add(rc2);
			var row3 = Ti.UI.createLabel({
				color : 'black',
				backgroundColor : "White",
				font : {
					fontSize : 17,
					fontWeight : ' ',
					fontFamily : 'Arial'
				},
				left : 2,
				top : 60,
				height : 30,
				man : dbRows[li].manufacturer,
				name : dbRows[li].vin,
				width : '50%',
				clickName : 'user',
				text : 'Series :' + dbRows[li].series
			});
			// Add to the parent view.
			row.add(row3);

			var year = Ti.UI.createLabel({
				color : 'black',
				backgroundColor : "White",
				font : {
					fontSize : 17,
					fontWeight : ' ',
					fontFamily : 'Arial'
				},
				left : '50%',
				top : 60,

				man : dbRows[li].manufacturer,
				name : dbRows[li].vin,
				height : 30,
				width : '50%',
				clickName : 'user',
				text : 'Year :' + dbRows[li].year
			});

			row.filter = year.text;
			row.add(year);
			var line = Ti.UI.createView({
				backgroundColor : 'Black',
				width : "100%",
				top : 90,
				man : dbRows[li].manufacturer,
				name : dbRows[li].vin,
				height : 0.5
			});
			var line1 = Ti.UI.createView({
				backgroundColor : '#CCCCCC',
				width : "100%",
				bottom : 0,
				height : 5,
				man : dbRows[li].manufacturer,
				name : dbRows[li].vin,
			});

			row.add(line);
			var inspector = Ti.UI.createLabel({
				color : 'black',
				backgroundColor : "White",
				font : {
					fontSize : 11,
					fontFamily : 'Lucida Grande-Bold'
					//fontFamily : 'Arial'
				},
				left : 2,
				top : 90.5,
				height : 25,
				width : '50%',
				man : dbRows[li].manufacturer,
				clickName : 'user',
				text : 'Inspected by :' + nameuser,
			});
			// Add to the parent view.
			row.add(inspector);
			var dATE = Ti.UI.createLabel({
				color : 'black',
				backgroundColor : "White",
				font : {
					fontSize : 11,
					fontFamily : 'Lucida Grande-Bold'
				},
				//left : '50%',
				top : 90.5,
				height : 25,
				man : dbRows[li].manufacturer,
				name : dbRows[li].VIN,
				width : '50%',
				clickName : 'user',
				text : 'last Updated:' + dbRows[li].updatedate
			});
			row.filter = dATE.text;
			row.add(dATE);

			//row.add(line1);
			// Create a Button.
			data.push(dumRo);
			data.push(row);
			//dbRows.next();
			li = li + 1;
		}
		//dbRows.close();
		tableView = Titanium.UI.createTableView({
			data : data,
			//search:search,
			width : "97%",
			filterAttribute : 'filter',
			backgroundColor : 'grey'
		});
		//alert(JSON.stringify(tableView));
		winCompleted.add(tableView);

	}


	tabCompleted.addEventListener('focus', function(e) {
		checkefothenetwork();

		testbit = 1;
		if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
			toastMsg("No internet connection");
		} else {

		}
		//alert("inside tabdraft");
	});
	//combind();
	Titanium.App.Properties.setString("offdash", onbittestcount + 1);
}
//var winasdsa = Ti.UI.currentWindow;
