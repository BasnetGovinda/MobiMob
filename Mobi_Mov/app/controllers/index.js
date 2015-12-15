/*
var mudb = Ti.Database.open('mydatalist27');

mudb.execute("DELETE FROM Entry_details ");
mudb.execute("DELETE FROM Inspection ");
mudb.execute("DELETE FROM tbl_temp ");
mudb.execute("DELETE FROM Inspection ");

mudb.close();*/
Titanium.App.Properties.setString("offdash", 0);
Titanium.App.Properties.setString("ondash", 0);
							
							
var testonlinebit = 0;
function toastMsg(msg) {
	var toast = Ti.UI.createNotification({
		message : msg,
		duration : Ti.UI.NOTIFICATION_DURATION_LONG
	});
	toast.show();
}

$.index.addEventListener('open', function(e) {
	var url1 = "www.inspect360.biz/genericsurvey/user-login";
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
		},
		onerror : function(e) {
			Ti.API.debug(e.error);

		},
		timeout : 50000
	});
	xhr.open("GET", url1);
	xhr.send();

});
function check() {
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		//	toastMsg("No internet connection ");
		testonlinebit = 0;
		if ($.uname.value != "" || $.pass.value != "") {
			var mypass = Ti.Utils.base64encode($.pass.value);
			var db = Ti.Database.open('mydatalist27');
			var udata = "select * from tbl_userInfo where uname='" + $.uname.value + "'and password='" + mypass + "'";
			//console.log(udata);
			var rowcount = db.execute(udata);
			if (rowcount.rowCount > 0) {

				var confirm = Titanium.UI.createAlertDialog({
					title : 'Submit',
					message : 'Sorry internet is not available, do you want to work offline? (Note: You will have to login online again before you submit inspection to server)',
					buttonNames : ['Yes', 'No'],
					cancel : 1
				});
				confirm.show();
				confirm.addEventListener('click', function(e) {
					if (e.cancel === e.index || e.cancel === true) {
						return false;
					}
					if (e.index === 0) {

						//console.log(rowcount.fieldByName('uname'));
						Titanium.App.Properties.setString("pass", $.pass.value);
						Titanium.App.Properties.setString("myuname", $.uname.value);
						Titanium.App.Properties.setString("Uname", rowcount.fieldByName('Username'));
						Titanium.App.Properties.setString("userdetails", JSON.stringify(rowcount.fieldByName('Otherinfo')));
						Titanium.App.Properties.setString("bitcheck", testonlinebit);
						var testNew = Alloy.createController('offlinedasboard').getView();
					}

				});

			} else {
				toastMsg("User id or Password is not valid");
			}
		}

	} else {

		if ($.uname.value != "" || $.pass.value != "") {
			var actInd = Ti.UI.Android.createProgressIndicator({
				message : "Signing in... ",
				location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
				type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,

				cancelable : false,
				max : 10,
				min : 0

			});

			actInd.show();
			actInd.value = 1;
			var cerdentail = {
				j_username : $.uname.value,
				j_password : $.pass.value
			};

			var xhr = Ti.Network.createHTTPClient();
			var url = "www.inspect360.biz/genericsurvey/j_spring_security_check";
			var postData = "";
			postData += 'j_username=' + $.uname.value;
			postData += '&j_password=' + $.pass.value;
			postData += '&_spring_security_remember_me=on';
			Ti.API.debug(url);
			actInd.value = 2;
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.onload = function() {
				actInd.value = 4;
				//alert( xhr.responseText );
				//console.log(this.responseText);
				var url1 = "www.inspect360.biz/genericsurvey/success-Mob";
				//alert(url);
				actInd.value = 6;
				var xhr = Ti.Network.createHTTPClient({
					onload : function(e) {
						//alert('----My test: ' + this.responseText);
						Ti.API.info(this.responseText);
						var datajson = JSON.parse(this.responseText);
						//alert(datajson.Status);
						actInd.value = 8;
						if (datajson.Status == "success") {
							actInd.value = 10;
							testonlinebit = 1;
							actInd.hide();
							//var testNew = Alloy.createController('entryForm').getView();

							Titanium.App.Properties.setString("pass", $.pass.value);
							Titanium.App.Properties.setString("myuname", $.uname.value);

							actInd.value = 5;
							Titanium.App.Properties.setString("Uname", datajson.UserName);
							Titanium.App.Properties.setString("bitcheck", testonlinebit);
							//		console.log($.pass.value);
							Titanium.App.Properties.setString("userdetails", JSON.stringify(datajson.UserInfo));
							var decodedpass = Ti.Utils.base64encode($.pass.value).toString();
							var dbs = Ti.Database.open('mydatalist27');
							Titanium.App.Properties.setString("user_id", datajson.UserId);
							var checkdata = "Select * from tbl_userInfo where Id=" + datajson.UserId;
							var sqlq = dbs.execute(checkdata);
							if (sqlq.rowCount > 0) {
								delquery = "Delete from tbl_userInfo where  Id='" + datajson.UserId + "'";
								dbs.execute(delquery);
							}

							var datasql = dbs.execute("INSERT INTO tbl_userInfo (Id,uname,password,Otherinfo,Username) VALUES (?,?,?,?,?)", datajson.UserId, $.uname.value, decodedpass, datajson.UserInfo, datajson.UserName);

							var urlnarrative = "www.inspect360.biz/genericsurvey/inspector/library/LibraryValue";
							var client1 = Ti.Network.createHTTPClient({
								onload : function(e) {
									var resdata = JSON.parse(this.responseText);
									var cou = dbs.execute("select * from tbl_narrative");
									if (cou.rowCount > 0) {
										dbs.execute("Delete  from tbl_narrative");
									}
									for (var i = 0; i < resdata.length; i++) {
										dbs.execute("Insert into tbl_narrative(libary,value,organization) values (?,?,?)", resdata[i].library, resdata[i].value, resdata[i].oId);
									}

									dbs.close();
									console.log("tets");
									var testNew = Alloy.createController('dashboard').getView();
									$.uname.value = "";
									$.pass.value = "";
								},
								onerror : function(e) {
								},
								timeout : 5000 // in milliseconds
							});
							client1.open("GET", urlnarrative);
							client1.send();
							var xhruser = Ti.Network.createHTTPClient({
								onload : function(e) {

									Ti.API.info(this.responseText);
									//createInspection(this.responseText);this.responseText
									console.log();

									var myda = JSON.parse(this.responseText);
									var dbs3 = Ti.Database.open('mydatalist27');
									var cou11 = dbs3.execute("select * from Assign ");

									if (cou11.rowCount > 0) {
										dbs3.execute("Delete from Assign ");
									}

									dbs3.execute("Insert into Assign(assign) values (?)", this.responseText);

									dbs3.close();
								},
								onerror : function(e) {
									Ti.API.debug(e.error);
									//alert('error');
								},
								timeout : 50000 /* in milliseconds */
							});
							xhruser.open("GET", "www.inspect360.biz/genericsurvey/inspector/entryheader/assignUsers");
							xhruser.send();
							var urlcreatinspection = "www.inspect360.biz/genericsurvey/inspector/template/offlineJson";
							var client2 = Ti.Network.createHTTPClient({
								onload : function(e) {
									var dbs1 = Ti.Database.open('mydatalist27');
									var resdata = JSON.parse(this.responseText);
									console.log(this.responseText);
									var cou11 = dbs1.execute("select * from TempleteTbl ");
									if (cou11.rowCount > 0) {

										dbs1.execute("Delete from TempleteTbl ");
									}

									for (var i = 0; i < resdata.length; i++) {
										dbs1.execute("Insert into TempleteTbl(TempleteName,TempleteType,Manufacturer,Json,templeteid) values (?,?,?,?,?)", resdata[i].templateName, resdata[i].templateType, resdata[i].manufacturer, JSON.stringify(resdata[i].json), resdata[i].templateId);
										console.log(JSON.stringify(resdata[i].templateId));
									}
									var cou2 = dbs1.execute("select * from TempleteTbl ");
									console.log(cou2.rowCount);
									dbs1.close();
									var testNew = Alloy.createController('dashboard').getView();
									$.uname.value = "";
									$.pass.value = "";
								},
								onerror : function(e) {
								},
								timeout : 5000 // in milliseconds
							});
							client2.open("POST", urlcreatinspection);
							client2.send();

						} else if (datajson.Status == "Failed") {
							actInd.hide();
							toastMsg("Login failed");
							$.index.open();
						} else {
							alert("other error");
							actInd.hide();
						}
						//  alert(JSON.stringify(this.responseText));

						//alert("finish");
					},
					onerror : function(e) {
						toastMsg("Login Failed");
						//Ti.API.debug(e.error);
						//alert('----My test: ' + this.responseText);
						Ti.API.error('----My test: ' + this.responseText);
						actInd.hide();
						//alert('error');
					},
					timeout : 50000
				});
				xhr.open("GET", url1);
				xhr.send();

			};
			xhr.onerror = function() {
				Ti.API.error("Error Logging in");
				actInd.hide();
			};
			xhr.open("POST", url);
			xhr.send(postData);
		} else {
			toastMsg("All field are required");
		}
	}

}

function createNew() {
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
		toastMsg("No Internet Connection");
	} else {
		Alloy.createController('createAccount').getView();
	}

}

$.index.open();
