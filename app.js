var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
const fetch = require('node-fetch');

fetch('https://api.github.com/search/users?q=repos:%3E-1&sort=joined&order=desc&per_page=100')
	.then((resp) => resp.json())
	.then((data) => {
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost:27017/';
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
			var dbo = db.db('userdata');
			console.log('connect');
			try {
				if (data.items)
					dbo.collection('users').deleteMany({}).then(() => {
						console.log('deleted');
					});
				dbo.collection('users').insertMany(data.items).then(() => {
					console.log('saved');
				});
			} catch (err) {
				console.log(err);
			}
		});
	});
app.get('/getall', (req, res) => {
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost:27017/';

	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db('userdata');
		dbo.collection('users').find({}).toArray(function(err, result) {
			if (err) throw err;
			res.send(result);
		});
	});
});


app.listen(2000, function() {
	console.log('listen on port 2000'); // locahost:2000
});
