var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var handleDB = require("./db");
var ObjectId = require('mongodb').ObjectID;

// send index page
router.get("/",function(req,res){
  res.sendfile('index.html', {root: './public'});
});

// check password

/*- USER -*/
// create user
// id(email), name
router.get("/user/insert",function(req,res){
  handleDB(function(db){
    try{
      db.collection("user").insertOne({
        _id: req.query._id,
        name: req.query.name,
        password: req.query.password,
        rooms: [],
        valid: true
      },function(err, resp) {
        if (err) throw err;
        db.collection("user").findOne({
          _id: req.query._id
        },function(err, resp) {
          if (err) throw err;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ success: true, result: resp }));
          db.close();
        });
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });

});

// delete user
// id(email)
router.get("/user/delete",function(req,res){
  handleDB(function(db){
    try{
      db.collection("user")
      .updateOne({_id: req.query._id}, {$set: {valid: false}}, function(err, resp) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true }));
        db.close();
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

// query user 
router.get("/user/query",function(req,res){
  // only query valid documents
  req.query.valid = true;

  handleDB(function(db){
    try{
      db.collection("user").find(req.query).toArray(function(err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true, result: result }));
        db.close();
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});


/* ROOM */
// create room
// param: name, userId, userName
// return objectId
router.get("/room/insert",function(req,res){
  // founder of room would be automatically added to room members
  var userId = req.query.userId,
      userName = req.query.userName,
      name = req.query.roomName,
      _id;
  handleDB(function(db){
    try{
      // insert into room collection
      db.collection("room").insertOne({
        name: name,
        members:[{_id:userId,name:userName}],
        log: [],
        valid: true
      },function(err, resp) {
        // modify user data
        _id = resp.insertedId;
        db.collection("user").updateOne({
          _id:  userId
        },{$push: {'rooms':{_id: _id, name: name}}},function(err, resp) {
          if (err) throw err;
          db.collection("room").findOne({
            _id:  ObjectId(_id)
          },function(err, resp) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true, result: resp }));
            db.close();
          });
        });
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });

});

// delete room
// param: id
router.get("/room/delete",function(req,res){
  handleDB(function(db){
    try{
      db.collection("room")
      .updateOne({_id: req.query._id}, {$set: {valid: false}}, function(err, resp) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true }));
        db.close();
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

// query room info
router.get("/room/query",function(req,res){
  // only query valid documents
  req.query.valid = true;
  
  handleDB(function(db){
    try{
      db.collection("room").find(req.query).toArray(function(err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true, result: result }));
        db.close();
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

// query room info
router.get("/room/findOne",function(req,res){
  // only query valid documents
  req.query.valid = true;
  
  handleDB(function(db){
    try{
      db.collection("room").findOne({_id: ObjectId(req.query._id)},function(err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true, result: result }));
        db.close();
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

/*-----      UPDATE      -----*/

// add log
// param: roomId, userId, userName, msg
router.get("/room/addLog",function(req,res){
  handleDB(function(db){
    var msg = req.query.msg, roomId = req.query.roomId,
        userId = req.query.userId,
        name = req.query.userName;
    try{
      db.collection("room").updateOne({_id: ObjectId(roomId)}, {$addToSet: {log:{_id: userId, name: name, msg:msg}}}, function(err, resp) {
        if (err) throw err;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ success: true }));
          db.close();
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

// update username
// param: id, name
router.get("/user/updateName",function(req,res){
  // valid should not be set through this api
  req.query.valid = true;

  handleDB(function(db){
    try{
      db.collection("user")
      .updateOne({_id: req.query._id}, {$set: {name: req.query.name}}, function(err, resp) {
        if (err) throw err;
        db.collection("room")
        .update({'members._id': req.query._id,}, {$set: {'members.$.name': req.query.name}},{multi: true}, function(err, resp) {
          if (err) throw err;
          console.log(resp);
          db.collection("room")
          .update({'log._id': req.query._id,}, {$set: {'log.$.name': req.query.name}},{multi: true}, function(err, resp) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
            db.close();
          });
        });
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});



// if password is correct, pass in user id and room id, add user to room
// param: userId, userName, password
router.get("/user/addToRoom",function(req,res){
  handleDB(function(db){
    var userId = req.query.userId,
        userName = req.query.userName,
        password = req.query.password;
    try{
      var room = db.collection("room").findOne({_id: ObjectId(password)},function(err,room){
        if(!room) throw err; // password is wrong, no corresponding room exists
              db.collection("user").updateOne({_id: userId}, {$addToSet: {rooms:{_id:room._id,name:room.name}}}, function(err, resp) {
                if (err) throw err;
                db.collection("room").updateOne({_id: ObjectId(password)}, {$addToSet: {members:{_id:userId,name:userName}}}, function(err, resp) {
                  if (err) throw err;
                  db.collection("room").findOne({_id: ObjectId(password)}, function(err, resp) {
                    if (err) throw err;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ success: true, result: resp }));
                    db.close();
                  });
                });
              });
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});


// pass in room id and user id, remove user from room
// userId, userName, roomId, roomName
router.get("/user/leaveRoom",function(req,res){
  handleDB(function(db){
    var userId = req.query.userId,
        roomId = req.query.roomId,
        userName = req.query.userName,
        roomName = req.query.roomName;
    try{
        // !!!TODO room.valid as false if no members are left in the room
        db.collection("room").updateOne({_id: ObjectId(roomId)}, {$pull: {members:{_id:userId,name:userName}}}, function(err, resp) {
        if (err) throw err;
          db.collection("user").updateOne({_id: userId}, {$pull: {rooms:{_id:ObjectId(roomId),name:roomName}}}, function(err, resp) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
            db.close();
          });
        });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

/* AUTH */
router.get("/user/login",function(req,res){
  handleDB(function(db){
    var _id = req.query._id,
        password = req.query.password;
    try{
        // TODO room.valid as false if no members are left in the room
        var user = db.collection("user").findOne({_id: _id},function(err,user){
          console.log(user);
          if(user && user.password == password){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true , result: user}));
          }else{
            throw new Error("password or email is incorrect");
          }
        });

    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  });
});

module.exports = router;