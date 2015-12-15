var win=Ti.UI.createWindow(
{	height:"90%",
	width:"80%",
	backgroundColor:"green"
	}
);
var anImageView = Ti.UI.createImageView({
	//image : 'location',
	width :"90%",
	height :"90%"
	
});
anImageView.image='http:166.62.41.120:8082/genericsurvey/resources/UploadedImage/11424344927826.jpg';
win.add(anImageView);
anImageView.addEventListener('load', function() {
	Ti.API.info('Image loaded!');
});

// Add to the parent view.
//parentView.add(anImageView);


win.open();
