var nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('./models/User');

// _id, email
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user._id, iat: timestamp }, config.secret,{
    expiresIn: "1m"
  });
}

exports.sendResetPasswordMail = function(req,res){
  var _id = req.body._id,
      email = req.body.email;
      console.log(_id);
      console.log(email);
  try{
  User.findOne({_id: _id, valid: true},null,function(err,user){
    console.log(user);
    if(err) throw err;

    if(!user){
      console.log("resetPass: no such user");
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: false}));
      return;
    }else{
      if(user.email != email){
        console.log("resetPadd: email is wrong");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: false, err: "wrongEmail" }));
        return;
    }

      var url = config.server + "reset/" + tokenForUser(user),
      mailOptions = {
        from: config.mail.user,
        to: email,
        subject: "ChatChat - 密碼重設",
        html: "<p>您好:</p><p>請點擊以下連結重設您的密碼:</p><a href='"+url+"'>"+url+"</a>"
      };
      
      var transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
          type: 'OAuth2',
          user: config.mail.user,
          clientId: config.mail.clientId,
          clientSecret: config.mail.clientSecret,
          refreshToken: config.mail.refreshToken
        }
      });
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(JSON.stringify({ success: false}));
        } else {
          console.log('Email sent: ' + info.response);
          res.send("Email is successfully sent.");
        }
      });
    
      transporter.close();

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ success: true }));
    }
  });
  
  }catch(err){
    console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: false }));
  }
};