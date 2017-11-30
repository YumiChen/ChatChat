const express = require('express');
const router = express.Router();
const User = require("./models/User");
const Room = require("./models/Room");
const ObjectId = require('mongoose').Types.ObjectId
const passport = require("passport");
const passportService = require("./passport");
const nodemailer = require("nodemailer");
const mailer = require("./mailer");

const requireAuth = passport.authenticate('jwt', { session: false });

// send index page
router.get("/" , requireAuth, function(req,res){
  res.sendfile('index.html', {root: './public'});
});

/*- USER -*/

// delete user
// id(email)
router.get("/user/delete",function(req,res){
  handleDB(function(db){
    try{
      User.findOneAndUpdate({_id: req.query._id}, {$set: {valid: false}}, null, function(err, resp) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true }));
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

    var newRoom = new Room({
      name: name,
      members:[{_id:userId,name:userName}],
      log: [],
      valid: true
    }), result;
    try{
      // insert into room collection
      newRoom.save(function(err, resp) {
        // modify user data
        result = resp;
        _id = resp._id;

        User.findOneAndUpdate({
          _id:  userId
        },
        {$push: {'rooms':{_id: _id, name: name}}},
        null,
        function(err, resp) {
          if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true, result: result }));
        });
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  
});

// find one room
router.get("/room/findOne",function(req,res){
  // only query valid documents
  req.query.valid = true;
  
    try{
      Room.findOne({_id: new ObjectId(req.query._id), valid: true}, null,function(err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true, result: result }));
      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
  
});

/*-----      UPDATE      -----*/

// add log
// param: roomId, userId, userName, msg
router.get("/room/addLog",function(req,res){
    var msg = req.query.msg, roomId = req.query.roomId,
        userId = req.query.userId,
        name = req.query.userName;
    try{
      Room.findOneAndUpdate({_id: new ObjectId(roomId)}, {$addToSet: {log:{_id: userId, name: name, msg:msg}}}, null, function(err, resp) {
        if (err) throw err;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ success: true }));

      });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
});

// update username
// param: id, name
router.get("/user/updateName",function(req,res){
  // valid should not be set through this api
  req.query.valid = true;

    try{
      var _id = req.query._id,
          name = req.query.name,
          result = {};
      User.findOneAndUpdate({_id: _id}, {$set: {name: name}}, {new : true}, function(err, resp) {
        result._id = _id;
        result.name = resp.name;
        result.rooms = resp.rooms;
        if (err) throw err;
        Room.update({'members._id': _id,}, {$set: {'members.$.name': name}},{multi: true}, function(err, resp) {
          if (err) throw err;
          console.log(resp);
          Room.find({'log._id': _id},function(err, resp) {
            resp.forEach(function(room){
              room.log.forEach(function(log){
                if(log._id == _id) log.name = name;
              })
              room.save(function(err){ if(err) throw err});
            });
            // return user data;
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({ success: true , result: result}));
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



// if password is correct, pass in user id and room id, add user to room
// param: userId, userName, password
router.get("/user/addToRoom",function(req,res){
    var userId = req.query.userId,
        userName = req.query.userName,
        password = req.query.password;
    try{
      var room = Room.findOne({_id: new ObjectId(password), valid: true}, null, function(err,room){
        if(!room) throw err; // password is wrong, no corresponding room exists
              User.findOneAndUpdate({_id: userId}, {$addToSet: {rooms:{_id:room._id,name:room.name}}}, null, function(err, resp) {
                if (err) throw err;
                Room.findOneAndUpdate({_id: new ObjectId(password)}, {$addToSet: {members:{_id:userId,name:userName}}}, null, function(err, resp) {
                  if (err) throw err;
                  // 順便推播有新成員加入
                  Room.findOne({_id: new ObjectId(password)}, null, function(err, resp) {
                    if (err) throw err;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ success: true, result: resp }));
          
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


// pass in room id and user id, remove user from room
// userId, userName, roomId, roomName
router.get("/user/leaveRoom",function(req,res){
    var userId = req.query.userId,
        roomId = req.query.roomId,
        userName = req.query.userName,
        roomName = req.query.roomName;
    try{
        // !!!TODO room.valid as false if no members are left in the room
        Room.findOneAndUpdate({_id: new ObjectId(roomId)}, {$pull: {members:{_id:userId,name:userName}}},null, function(err, resp) {
        if (err) throw err;
          User.updateOne({_id: userId}, {$pull: {rooms:{_id: new ObjectId(roomId),name:roomName}}}, null, function(err, resp) {
            // 順便推播有成員離開
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ success: true }));
  
          });
        });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
});

/* AUTH */
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

// create user
// id(email), name
router.post("/user/insert",function(req,res){
  try{
    var newUser = new User({
      _id: req.body._id,
      email: req.body.email,
      name: req.body._id,
      password: req.body.password,
      rooms: [],
      valid: true
  });
    User.findOne({_id: newUser._id},function(err, user){
    if(err) throw err;
    if(user){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false, err: "idUsed"}));
    }else{
      User.findOne({email: newUser.email, valid: true},function(err){
        if(err) throw err;
        if(user){
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ success: false, err: "emailRegistered" }));
        }else{
          newUser.save(function(err, resp) {
            if (err) throw err;
              resp.email = null;
              resp.password = null;

              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({ 
                success: true, 
                result: resp,
                token: tokenForUser(resp)
               }));
          });
        }
      });
    }
  });
  }
  catch(err){
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: false }));
  }
});

router.post("/user/login",function(req,res){
    var _id = req.body._id,
        password = req.body.password;
    console.log(req.body);
    try{
        // TODO room.valid as false if no members are left in the room
        User.findOne({_id: _id}, { name: true, rooms: true , password: true, emailVerified: true }, function(err,user){
          // user decript method
          console.log(user);
          user.comparePassword(password, function(err, isMatch) {
            if (err) { throw err; }
            if (!isMatch) { 
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify({ success: false }));
            }
      
            user.password = null;
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 
              success: true ,
              result: user,
              token: tokenForUser(user)
            }));
          });
        });
    }
    catch(err){
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false }));
    }
});

router.post("/sendResetPasswordMail",mailer.sendResetPasswordMail);

router.post("/resetPassword",function(req,res){
  var _id = req.body._id, 
      password = req.body.password;
  try{
    User.findById(_id,function(err,user){
      user.password = password;
      user.save(function(err,res){
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: true }));
      });
    });
  }catch(err){
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: false }));
  }
});


module.exports = router;