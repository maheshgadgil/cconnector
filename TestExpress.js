const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'd:/cloudconnectivity/datafile' });
db.loadDatabase(function (err) {    // Callback is optional
  console.log('database loaded');
});



app.listen(3000, function() {
	console.log('listening');
});
app.get('/', function(req, res) {
  res.sendFile('d:/cloudconnectivity'+'/index.html')
});

app.post('/quotes', function (req, res)  {
  console.log(req.body);

  var doc = req.body;
  db.insert(doc, function (err, newDoc) {   // Callback is optional
	// newDoc is the newly inserted document, including its _id
	// newDoc has no key called notToBeSaved since its value was undefined
	console.log('inserted');
	
    var allData = db.getAllData(); 
    var len = allData.length;
    console.log('number of records ' + len);
   
    for (i=0; i<len; i++) {
		console.log(allData[i].UniqueDestinationName);
    }
  });
	

  
  res.send('done');	
});


