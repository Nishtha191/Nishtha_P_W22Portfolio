var socket = io();
    socket.on("connect", () => {
      console.log(socket.id); 
    });

var user;
var room;

    //Sign Up
    function register(){
      $.get(`http://localhost:9000/user/${$("#usernamesu").val()}`, (data) => {
        socket.emit("register", {
          users: data
        });
      })
    }

    socket.on("signUpValid", (data) => {
      if(data == false){
        document.getElementById("uisu").innerHTML = '<p>Username already exists, try again</p>';
        
      }else{
        $.post('http://localhost:9000/user',{
          username: $("#usernamesu").val(),
          firstname: $("#firstname").val(),
          lastname:$("#lastname").val(),
          password:$("#passwordsu").val()
        });
        
      }
    })

    //Login
    function signIn(){
      $.get(`http://localhost:9000/user/login/${$("#usernameli").val()}`, (data) => {
        socket.emit("signIn", {
          username: $("#usernameli").val(),
          password: $("#passwordli").val(),
          users: data
          
        });
        socket.on("logInValid", (data) => {
            if(data == false){
              document.getElementById("uili").innerHTML = '<p>Invalid Log In</p>';
            }else{
                user = data.username;
                document.getElementById("parentCon").innerHTML = null;
                document.getElementById("chatbtn").innerHTML = null;
                document.getElementById("chatheader").innerHTML = "<div class='login-container'>\
                <h3>Log In Successful</h3>\
                <h1 class='subtitle'>Group</h1>\
                <div class='centre'><button class='btn' id='news' onclick='roomBtn(`news`, `gm`)'>News</button> <button class='btn' id='covid19' onclick='roomBtn(`covid19`, `gm`)'>Covid19</button> <button id='nodeJS' class='btn' onclick='roomBtn(`nodeJS`, `gm`)'>nodeJS</button></div>\
                <h1 class='subtitle'>Send a private message</h1>\
                <div id='pmui'></div>\
                <input class='inputt' type='text' id='usernamepm'><div class='centre'><button id='selectuser' class='btn' onclick='userValidate()')>Select User</button></div>\
                <h1 class='subtitle'>Private messages</h1>\
                <div class='centre'><button id='pm' class='btn' onclick='roomBtn(`" + user + "`,`mypm`)'>See Private Messages</button></div>\
                <br><button class='btn' id='logoutbutton'onclick='logOut()'>Log Out</button>\
                </div>";
              }
          })
        
        })
    }
    
    
   //user validate for private message
    function userValidate(){
      $.get(`http://localhost:9000/user/${$("#usernamepm").val()}`, (data) => {
        socket.emit("userValidate", {
          users: data,
          username: $("#usernamepm").val()
        });
      })
    }
    socket.on("checkUserValid", (data) => {
      if(data == false){
        document.getElementById("pmui").innerHTML = '<p>Username does not exist</p>';
      }else{
        roomBtn(data, "pm")
      }
    })

    //Group Chat
    function roomBtn(roomName, roomType){
      joinGroup(roomName);
      openRoom(roomName, roomType);
    }
    function joinGroup(roomName){
      room = roomName;
      socket.emit('joinGroup', {room: roomName});
    }
    function leaveRoom(){
      room = null;
      socket.emit('leaveRoom');
      document.getElementById("chatroom").innerHTML = null;
    }

    function openRoom(roomName, roomType){
      document.getElementById("chatroom").innerHTML = "<br><br>\
        <div class='login-container'>\
        <div class='chatbox'>\
        <div id='chattitle' class='title'></div>\
        <div class='centre'><button class='btn' id='leaveroom' onclick='leaveRoom()'>Leave</button></div>\
        <div id='messages'></div><br>\
        <div id='chatui' class='text'></div>\
        <div id='textbox'>\
          <input class='inputt' type='text' id='message' placeholder='Type your message here...' oninput='userTyping(`"+ roomName + "`,`" + roomType + "`)'><div class='centre'><button class='btn' id='send' onclick='sendMessage(`"+ roomName + "`,`" + roomType + "`)'>Send Message</button></div>\
        </div></div></div>";

      if(roomType == "gm"){
        document.getElementById("chattitle").innerHTML = roomName;
        getMessage(roomName, roomType);
      }
      else if(roomType == "pm"){
        document.getElementById("chattitle").innerHTML = "Private message to: " + roomName;
        getMessage(roomName, roomType);
      }else{
        document.getElementById('textbox').innerHTML = null;
        document.getElementById("chattitle").innerHTML = roomName + " Private Messages";
        getMessage(roomName, roomType);
      }
    }

    function getMessage(roomName, roomType){
      if(roomType == "gm"){
        $.get(`http://localhost:9000/gm/${roomName}`, (data) => {
          if(data != false){
            data.forEach(addMessages);
          }
        })
      }else if(roomType == "pm"){
        $.get(`http://localhost:9000/pm/${roomName}/${user}`, (data) => {
          if(data != false){
            data.forEach(addMessages);
          }
        })
      }else{
        $.get(`http://localhost:9000/pm/` + roomName, (data) => {
          if(data != false){
            data.forEach(addMessages);
          }
        })
      }
    }

    socket.on('addMessage', (msg) => {
      addMessages({message: msg.message, from_user:msg.from_user});
    })

    function addMessages(message){
        document.getElementById("messages").innerHTML += `<p class="username text">${message.from_user}:</p>\
        <p class="message text">${message.message}</p>`;
    }

    socket.on('newMessage', (msg) => {
      addMessages(msg);
    })

    function sendMessage(roomName, roomType){
      var msg = document.getElementById("message").value;
      
      if(msg){
        if(roomType == "gm"){
          $.post('http://localhost:9000/gm', {
            from_user: user,
            room: roomName,
            message: msg
          })
        }else if(roomType == "pm"){
          $.post('http://localhost:9000/pm', {
            from_user: user,
            to_user: roomName,
            message: msg
          })
        }
        socket.emit('groupMessage', {
          from_user: user,
          message: msg,
          room:roomName
        });
        addMessages({from_user:user, message:msg});
      }
    }

    function showChat(username){
      document.getElementById("chatui").innerHTML = `<p>${username} is typing...</p>`;
    }

    socket.on('showChat', (username) => {
      showChat(username);
    })

    function userTyping(roomName, roomType){
      socket.emit('userTyping', {
        username: user,
        room:roomName
      })
      document.getElementById("chatui").innerHTML = `<p>${user} is typing...</p>`;
    }

    function logOut(){
      document.getElementById("logoutbtn").innerHTML = null;
      document.getElementById("chatheader").innerHTML = null;
      document.getElementById("chatroom").innerHTML = null;
      document.getElementById("parentCon").innerHTML = "<br><h1 class='subtitle'></h1><br>\
        <div class='login-container'>\
        <button class='btn'><a href='index.html' type='button'>Log In</a></button>\
        <button class='btn'><a href='signUp.html' type='button'>Sign Up</a></button>\
        </div>";
      user = null;
      socket.emit("logOut");
    }