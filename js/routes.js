var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var handleDB = require("./db");

// send index page
router.get("/",function(req,res){
  res.sendfile('index.html', {root: './public'});
});

// check password

/*- USER -*/
// create user
router.post("/user/insert",function(req,res){
  handleDB(function(db){
    try{
      db.collection("user").insertOne({
        _id: req.query.id,
        name: req.query.name,
        email: req.query.email,
        rooms: [],
        valid: true
      },function(err, resp) {
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

// update user profile( exclude password, valid)
router.get("/user/update",function(req,res){
  // valid should not be set through this api
  req.query.valid = true;

  handleDB(function(db){
    try{
      db.collection("user")
      .updateOne({_id: req.query.id}, {$set: newValues}, function(err, resp) {
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

// delete user
router.get("/user/delete",function(req,res){
  handleDB(function(db){
    try{
      db.collection("user")
      .updateOne({_id: req.query.id}, {$set: {valid: false}}, function(err, resp) {
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

// query user info
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
router.post("/room/insert",function(req,res){
  handleDB(function(db){
    try{
      db.collection("room").insertOne({
        _id: req.query.id,
        name: req.query.name,
        password: req.query.password,
        members:[],
        valid: true
      },function(err, resp) {
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

// update room profile( exclude password, valid)
router.get("/room/update",function(req,res){
  // valid should not be set through this api
  req.query.valid = true;

  handleDB(function(db){
    try{
      db.collection("room")
      .updateOne({_id: req.query.id}, {$set: req.query}, function(err, resp) {
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

// delete room
router.get("/room/delete",function(req,res){
  handleDB(function(db){
    try{
      db.collection("room")
      .updateOne({_id: req.query.id}, {$set: {valid: false}}, function(err, resp) {
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

// pass in ids of rooms, return data of each room
router.get("/user/getRooms",function(req,res){
  handleDB(function(db){
    try{
      if(!req.query.rooms instanceof Array) throw new Error("query type should be Array");
      db.collection("room").find({$or:[req.query.rooms]}).toArray(function(err, result) {
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

// pass in ids of users, return data of each user
router.get("/user/getMembers",function(req,res){
  handleDB(function(db){
    try{
      if(!req.query.members instanceof Array) throw new Error("query type should be Array");
      db.collection("user").find({$or:[req.query.members]}).toArray(function(err, result) {
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

// add log
router.get("/user/addLog",function(req,res){
  handleDB(function(db){
    var msg = req.query.msg, roomId = req.query.roomId,
        userId = req.query.userId;
    try{
      db.collection("room").updateOne({_id: roomId}, {$addToSet: {log:[{userId: userId,msg:msg}]}}, function(err, resp) {
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


// pass in user id and room id, add user to room
router.get("/user/addToRoom",function(req,res){
  handleDB(function(db){
    var userId = req.query.userId,
        roomId = req.query.roomId;
    try{
      db.collection("user").updateOne({_id: userId}, {$addToSet: {rooms:[roomId]}}, function(err, resp) {
        if (err) throw err;
        db.collection("room").updateOne({_id: roomId}, {$addToSet: {members:[userId]}}, function(err, resp) {
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

// 目前方式為直接移除，考慮改為設為無效
// pass in room id and user id, remove user from room
router.get("/user/leaveRoom",function(req,res){
  handleDB(function(db){
    var userId = req.query.userId,
        roomId = req.query.roomId;
    try{
      db.collection("user").updateOne({_id: userId}, {$pull: {rooms:[roomId]}}, function(err, resp) {
        if (err) throw err;
        db.collection("room").updateOne({_id: roomId}, {$pull: {members:[userId]}}, function(err, resp) {
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

/* USER */
// authertication
// reset password

module.exports = router;