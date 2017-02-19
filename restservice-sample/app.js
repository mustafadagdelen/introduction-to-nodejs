var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;

app.get('/', function (req, res) {
    res.json({
        name: "mustafa",
        lastName: "dağdelen"
    });
});

app.get('/restaurants', function (req, res) {
    MongoClient.connect("mongodb://localhost:27017/SampleDb", function (err, db) {
        var cursor = db.collection('Restaurants').find({ "type_of_food": "Kebab", "rating": { $gt: 5 } }).toArray(function (err, results) {
            res.json(results);
        });
    });
});

var elasticsearch = require('elasticsearch');
app.get('/importSearchData', function (req, res) {
    var client = new elasticsearch.Client();
    var client = elasticsearch.Client({
        hosts: [
            'http://192.168.1.112:9200'
        ]
    });

    MongoClient.connect("mongodb://localhost:27017/SampleDb", function (err, db) {
        var cursor = db.collection('Restaurants').find()

        cursor.each(function (err, item) {
            if(item.URL == null)
                return;

            client.index({
                index: "restaurants",
                type: "restaurant",
                body: {
                    url : item.URL,
                    address : item.address,
                    name: item.name,
                    postCode : item.postcode,
                    outCode: item.outcode,
                    rating: item.rating,
                    typeOfFood: item.type_of_food
                }
            }, function (err, response) {
                console.log(err);
            });
        });
    });

    res.status(202).send();
});

app.get("/search", function (req, res) {
  var q = req.query.q;

var client = new elasticsearch.Client();
    var client = elasticsearch.Client({
        hosts: [
            'http://192.168.1.112:9200'
        ]
    });

  client.search({
      q: q,
      size : 100
  }).then(function(results){
      res.json(results.hits.hits);
  });
});

app.listen(3000, function () {
    console.log("server started");
});