/**
 * @author govinda
 */
function toastMsg(msg) {
	var toast = Ti.UI.createNotification({
		message : msg,
		duration : Ti.UI.NOTIFICATION_DURATION_LONG
	});
	toast.show();
}

var usertestbit = 0;
var passtestblt = 0;
var win = Ti.UI.createWindow({
	width : "100%",
	height : "100%"
});
var parentview = Ti.UI.createScrollView({
	top : 0,
	height : Ti.UI.SIZE,
	backgroundColor : "#FFFFFF",
	showVerticalScrollIndicator : true,
	layout : 'vertical',
	scrollType : 'vertical',
	width : "100%"

});

// Create a Button.
var signup = Ti.UI.createButton({
	title : 'Create Account',
	height : 40,
	width : Ti.UI.SIZE,
	color : '#FFFFFF',
	backgroundColor : '#007f97',
	top : 10,
	borderRadius:9
});

// Listen for click events.

var viewuser = Ti.UI.createView({
	width : "95%",
	layout : "vertical",
	height : Ti.UI.SIZE
});
var vieworg = Ti.UI.createView({
	width : "95%",
	layout : "vertical",
	height : Ti.UI.SIZE
});

var lbllogin = Ti.UI.createLabel({
	top : 10,
	height : 40,
	//backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 16,
		fontStyle : 'normal',
		fontWeight : 'Bold',
		//index:[i][j][m]
	},
	text : "Login Information ",
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
var lbluser = Ti.UI.createLabel({
	top : 10,
	height : 40,
	//backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 16,
		fontStyle : 'normal',
		fontWeight : 'Bold',
		//index:[i][j][m]
	},
	text : "User Information ",
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});

var lblorg = Ti.UI.createLabel({
	top : 10,
	height : 40,
	//backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
	borderWidth : 1,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 16,
		fontStyle : 'normal',
		fontWeight : 'Bold',
		//index:[i][j][m]
	},
	text : "Orgnization  Information ",
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	////keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});

var fname = Ti.UI.createTextField({
	hintText : 'First Name',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
	////keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
var lname = Ti.UI.createTextField({
	hintText : 'Last Name',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
	////keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
var uname = Ti.UI.createTextField({
	hintText : 'Username',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
	//////keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
uname.addEventListener('blur', function() {
	//alert(uname.value);
	if (uname.value != "") {
		var url = "166.62.41.120:8082/genericsurvey/user-signup/CheckUname/" + uname.value;
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {

				if (JSON.parse(this.responseText).Status == "dublicate") {
					usertestbit = 0;
					toastMsg("Duplicate username");
					uname.borderColor="red";

				} else {
					usertestbit = 1;
					uname.borderColor="white";
					//alert("not");
				}
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
				alert('error');
			},
			timeout : 5000 // in milliseconds
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	}
	else
	{
		//toastMsg("Duplicate username ");
		uname.borderColor="red";
	}
});

var email = Ti.UI.createTextField({
	hintText : 'E-mail',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
var phone = Ti.UI.createTextField({
	hintText : 'Phone',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
var password = Ti.UI.createTextField({
	hintText : 'Password',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
	passwordMask : true,
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
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
var Confirmpassword = Ti.UI.createTextField({
	hintText : 'Confirm Password',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
	borderWidth : 1,
	passwordMask : true,
	color : 'black',
	font : {
		fontFamily : 'Helvetica',
		fontSize : 14,
		fontStyle : 'normal',
		fontWeight : 'normal',
		//index:[i][j][m]
	},
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
Confirmpassword.addEventListener('blur', function() {
	if (password.value == Confirmpassword.value) {
		passtestblt = 1;
		password.borderColor="white";
		Confirmpassword.borderColor="white";
	} else {
		toastMsg("Password doesn't match");
		password.borderColor="red";
		Confirmpassword.borderColor="red";
		passtestblt = 0;
	}

});
var orgname = Ti.UI.createTextField({
	hintText : 'Organization Name',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
var orgadd = Ti.UI.createTextField({
	hintText : 'Address',
	top : 10,
	height : 40,
	backgroundColor : '#F3F3F3',
	width : "90%",
	left : "5%",
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
	//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
});
viewuser.add(lbllogin);
viewuser.add(uname);
viewuser.add(password);
viewuser.add(Confirmpassword);
viewuser.add(lbluser);
viewuser.add(fname);
viewuser.add(lname);
viewuser.add(email);
viewuser.add(phone);
parentview.add(viewuser);
vieworg.add(lblorg);
vieworg.add(orgname);
vieworg.add(orgadd);
parentview.add(vieworg);
win.add(parentview);
parentview.add(signup);
signup.addEventListener('click', function() {
	if (usertestbit == 0) {
		toastMsg("Username Must Be Unique");
	} else if (passtestblt == 0) {
		toastMsg("Password doesn't match");
	} else {
		if (fname.value == "" || lname.value == "" || uname.value == "" || email.value == "" || password.value == "" || phone.value == "" || orgname.value == "" || orgadd == "") {
			toastMsg("All field are required");
		} else {
			var signupData = {};
			signupData["FirstName"] = fname.value;
			signupData["LastName"] = lname.value;
			signupData["UserName"] = uname.value;
			signupData["Email"] = email.value;
			signupData["Phone"] = phone.value;
			signupData["pass"] = password.value;
			signupData["OrgName"] = orgname.value;
			signupData["OrgAdd"] = orgadd.value;
			var url1 = "166.62.41.120:8082/genericsurvey/user-signup";
			var client1 = Ti.Network.createHTTPClient({
				onload : function(e) {
					toastMsg("Your sign up is successful, uploading Template.....Please login to use system after process is completed");
					Alloy.createController('index').getView();
				},
				onerror : function(e) {
				},
				timeout : 5000 // in milliseconds
			});
			client1.open("POST", url1);
			client1.setRequestHeader("Content-Type", "application/octet-stream");
			client1.send(JSON.stringify(signupData));

		}
	}
});
win.open();
