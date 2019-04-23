var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var db_data;

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.collection("phrases").find({}).toArray(function(err, result) {
		if (err) throw err;
		db_data = result;
		db.close();
	});
});

app.get('/', function(req, res) {
	res.send(db_data[0].phrase + " " + db_data[1].phrase);
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})

