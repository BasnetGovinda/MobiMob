var db = Ti.Database.open('mydatalist14');
for(var i=0;i<12;i++)
{
	var a="A";
	var b="B";
	var c="C";
		//var insquery="Insert into tbl_narrative(libary,value,organization) values (?,?,?)",a+i,b+i,c+i;
		db.execute("Insert into tbl_narrative(libary,value,organization) values (?,?,?)",a+i,b+i,c+i);	
}
var mm=db.execute("select * from tbl_narrative");


 while(mm.validRow)
 {
 	
 	console.log("id:"+mm.fieldByName("id"));
 	console.log("libary"+mm.fieldByName("libary"));
 	console.log("value"+mm.fieldByName("value"));
 	console.log("orgn"+mm.fieldByName("organization"));
 	
 	
 	mm.next();
 }
