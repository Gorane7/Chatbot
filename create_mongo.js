var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	console.log("Database created!");
	var dbo = db.db("mydb");
	var phrases = [
		{ _id: 0, phrase: "Hello!"},
		{ _id: 1, phrase: "I am not a bot!"}
	];
	dbo.collection("phrases").insertMany(phrases, function(err, res) {
		if (err) throw err;
		console.log(res);
		db.close();
	});
});
