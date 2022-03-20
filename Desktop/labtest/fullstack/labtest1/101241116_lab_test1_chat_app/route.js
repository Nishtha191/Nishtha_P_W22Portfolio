var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
const User = require('./model/user');
const PrivateMessage = require('./model/privateMessage')
const GroupMessage = require('./model/groupMessage')


//User
app.get('/user', (req, res) => {
    User.find({},(err, users)=> {
      res.send(users);
    })
  })

  
app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const users = await User.find({username:username});
  
    try{
      if(users.length != 0){
        res.send(true);
      }else{
        res.send(false);
      }
    }catch(err){
      res.status(500).send(err);
    }
})
app.get('/user/login/:username', async (req, res) => {
    const uname = req.params.username;
    const users = await User.find({username:uname}).select("username password");
  
    try{
      if(users.length != 0){
        res.send(users);
      }else{
        res.send(false);
      }
    }catch(err){
        res.status(500).send(err);
      }
  })
  
  app.post('/user', async (req, res) => {
    var user = new User(req.body);
    user.save((err) => {
      if(err){
        console.log(err);
      }
      res.sendStatus(200);
    })
  });

  //private Messaging
  app.get('/pm/:room/:user', async (req, res) => {
    const roomName = req.params.room;
    const user = req.params.user;
    const privateMessages = await PrivateMessage.find({to_user:roomName, from_user:user}).select("from_user message");
  
    try{
      if(privateMessages.length != 0){
        res.send(privateMessages);
      }else{
        res.send(false);
      }
    }catch(err){
        res.status(500).send(err);
      }
})

app.get('/pm/:room', async (req, res) => {
    const roomName = req.params.room;
    const privateMessages = await PrivateMessage.find({to_user:roomName}).select("from_user message");
  
    try{
      if(privateMessages.length != 0){
        res.send(privateMessages);
      }else{
        res.send(false);
      }
    }catch(err){
        res.status(500).send(err);
      }
})

app.post('/pm', async (req, res) => {
  var pm = new PrivateMessage(req.body);
  pm.save((err) => {
    if(err){
      console.log(err);
    }
    res.sendStatus(200);
  })
});

//group messaging
app.get('/gm/:room', async (req, res) => {
    const roomName = req.params.room;
    const groupMessages = await GroupMessage.find({room:roomName}).select("from_user message");
  
    try{
      if(groupMessages.length != 0){
        res.send(groupMessages);
      }else{
        res.send(false);
      }
    }catch(err){
        res.status(500).send(err);
      }
})

app.post('/gm', async (req, res) => {
  var gm = new GroupMessage(req.body);
  gm.save((err) => {
    if(err){
      console.log(err);
    }
    res.sendStatus(200);
  })
});


module.exports = app;