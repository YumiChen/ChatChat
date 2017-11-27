// connect to db and export connection
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var handleDB = function(fn){
    MongoClient.connect("mongodb://localhost:27017/chatchat", function(err, db) {
  if(!err) {
    console.log("We are connected");
    fn(db);
  }else{
      console.log("error:");
      console.log(err);
  }
});
}

module.exports = handleDB;