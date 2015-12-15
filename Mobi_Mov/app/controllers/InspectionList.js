//working with database

//Installing Database stored in Assetts/datab/AutomobileService.sqlite
// Ti.Database.install('/datab/AutomobileService.sqlite','ListIns');

var InsData=[];//empty array
var headerdata="";
if(InsData.length==0){	
	
	var db = Ti.Database.open('ListInsq');//opening database
	var dbRows = db.execute("select * from Inspection");//select query	
	
	while(dbRows.isValidRow()){		//checking the validity of the data
				
				//adding the data in the array to show in the master parent tableview
		InsData.push({
			title: dbRows.fieldByName('VIN')+'-'+dbRows.fieldByName('OrgID')+'-'+dbRows.fieldByName('Model'),
			RecordID:dbRows.fieldByName('VIN'),
			Version:dbRows.fieldByName('Version'),
			Org_ID:dbRows.fieldByName('OrgID'),
			Manufacturer:dbRows.fieldByName('Manufacturer'),
			Series:dbRows.fieldByName('Series'),
			Model:dbRows.fieldByName('Model'),
			Year:dbRows.fieldByName('Year'),
			hasChild:true,	
			color:"black",
				
		});
		dbRows.next();//iteration of the retured datarow from the query above
	}	
	dbRows.close();//closing the datarow object
	db.close();	//closing the database
}

//working with database//


//main parent window with parent view that consists of table
var win = Ti.UI.createWindow({
	title:'Master Inspection',
	backgroundColor:'white',
	layout:'vertical'	
});

//child window that is a container to the detail view
var windetail = Ti.UI.createWindow({
	
	title:'Detail Inspection',
	backgroundColor:'white',
	top:0,
	layout:'vertical',	
	height:'100%',
	width:'100%'
});

//view for table list of master contents whose container is main parent window
var scrollView = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight:'auto',
    //height:400,
    top: 0,
    showVerticalScrollIndicator: true,
    layout: 'vertical'
});
//data for master table to bind in the main table
var tableData = [
		{title:'1234-HondaLand-LX-1',RecordID:'1234', Version:'1.25',Org_ID:'HondaLand',Manufacturer:'Honda',Series:'Accord1',Model:'LX-1',Year:'2014',hasChild:true},
		{title:'1235-YamahaLand-LX-2',RecordID:'1235', Version:'1.26',Org_ID:'YamahaLand',Manufacturer:'Yamaha',Series:'Accord2',Model:'LX-2',Year:'2014',hasChild:true},
		{title:'1236-SkodaLand-LX-3',RecordID:'1236', Version:'1.27',Org_ID:'SkodaLand',Manufacturer:'Skoda',Series:'Accord3',Model:'LX-3',Year:'2014',hasChild:true},
		{title:'1237-HondaLand-LX-4',RecordID:'1237', Version:'1.28',Org_ID:'HondaLand',Manufacturer:'Honda',Series:'Accord4',Model:'LX-4',Year:'2014',hasChild:true},
		{title:'1238-BajajLand-LX-5',RecordID:'1238', Version:'1.29',Org_ID:'BajajLand',Manufacturer:'Bajaj',Series:'Accord5',Model:'LX-5',Year:'2014',hasChild:true},
		{title:'1239-SkodaLand-LX-6',RecordID:'1249', Version:'1.30',Org_ID:'SkodaLand',Manufacturer:'Skoda',Series:'Accord6',Model:'LX-6',Year:'2014',hasChild:true}
	];

	var table = Ti.UI.createTableView({
		// data:tableData,
				data:InsData,
			
		
		separatorColor:'#45c2da',
			
	});
	
	scrollView.add(table);
//click event to rows in the table
	table.addEventListener('click', function(e) {
		headerdata=e.rowData.RecordID;
		//a detail view where remaning data for the selected row
	var DetailView = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    top: 0,
    width:"100%",
    showVerticalScrollIndicator: true,
    layout: 'vertical'
});
		
		var lblRecordID = Ti.UI.createLabel({
		text:' VIM #   ' + e.rowData.RecordID,
		height:'auto',
		width:'100%',
		color:'#FFFF',
		backgroundColor:'#2CADC9',
		font: { fontSize:24 },  		
		left:0,		
	});
	
	var lblVersion = Ti.UI.createLabel({
		text:'Version'+'                 :  ' +e.rowData.Version,
		height:'auto',
		width:'100%',
		color:'#A2A2A2',
		
		font: { fontSize:18 },
		left:10,		
	});
	
	var lblOrgID = Ti.UI.createLabel({
		text:'Organization'+'      :  ' + e.rowData.Org_ID,
		height:'auto',
		
		color:'#A2A2A2',
		font: { fontSize:18 },
		width:'100%',
		left:10	
	});
	
	var lblManufacturer = Ti.UI.createLabel({
		text:'Manufacturer'+'     :  ' + e.rowData.Manufacturer,
		height:'auto',
		width:'100%',
		color:'#A2A2A2',
		
		font: { fontSize:18 },
		left:10,		
	});
	
	var lblSeries = Ti.UI.createLabel({
		text:'Series'+'                    :  ' + e.rowData.Series,
		height:'auto',   
		width:'100%',
		
		color:'#A2A2A2',
		font: { fontSize:18 },
		left:10,			
	});
	
	var lblModel = Ti.UI.createLabel({
		text:'Model'+'                    :  ' + e.rowData.Model,
		height:'auto',  
		width:'100%',
		color:'#A2A2A2',
		
		font: { fontSize:18 },
		left:10,		
	});
	
	var lblYear = Ti.UI.createLabel({
		text:'Year'+'                       :  ' + e.rowData.Year,
		height:'auto',
		
		color:'#A2A2A2',
		font: { fontSize:18 },
		width:'100%',
		left:10,	
	});	
	var btnBack = Ti.UI.createButton({
		title:'Back',
		color: '#FFFFFF',
   		 top:10,
   		 width: '85%',
	    height: '8%',
		borderRadius:5, 
   		 buttom:10,
    	backgroundColor: '#45c2da'	});
	
	var btnFetch = Ti.UI.createButton({
		title:'Fetch Form',	
		color: '#FFFFFF',
   		 top:10,
   		 width: '85%',
	    height: '8%',
		borderRadius:5, 
   		 buttom:10,
    	backgroundColor: '#45c2da'	
	});
	
	btnBack.addEventListener('click',function(e){			
		windetail.remove(DetailView);//removes the current data detail view from the child window
		windetail.close();//closes the current child window		
		win.open();//opens the main parent window with tables
	});		
	
	btnFetch.addEventListener('click',function(e){		
		windetail.remove(DetailView);//removes the current data detail view from the child window
		windetail.close();//closes the current child window		
		Titanium.App.Properties.setString("head",headerdata);
		var EntryForm = Alloy.createController('entryForm').getView();
  		win.open(EntryForm);
		
		win.open();//opens the main parent window with tables
	});	
		
		DetailView.add(lblRecordID);
		DetailView.add(lblVersion);
		DetailView.add(lblOrgID);
		DetailView.add(lblManufacturer);
		DetailView.add(lblSeries);
		DetailView.add(lblModel);
		DetailView.add(lblYear);
		
		DetailView.add(btnFetch);
		DetailView.add(btnBack);
			
		
		//adding the binded view to the child window	
		windetail.add(DetailView);
		//opening the child window
		windetail.open();					
	});

win.add(scrollView);
win.open();
