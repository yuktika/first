const express = require("express")
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/mydb";

const app = express()
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

app.listen(3000, () => console.log("Listing in the port 3000"));