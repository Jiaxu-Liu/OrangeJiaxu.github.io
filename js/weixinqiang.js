

window.onload = function(){
    
    
    var socketUrl = "https://wall.cgcgbcbc.com";

    var my_socket = io.connect(socketUrl);
    
    //function getOldMessage(){
        var xhr = new XMLHttpRequest();
        var oldMessage;
        xhr.onreadystatechange = function(event){ 
            if (xhr.readyState == 4){      
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){    
                    
                    //alert(xhr.responseText);
                    
                    oldMessage = eval(xhr.responseText);
                    //console.log(oldMessage[0].content);
                    
                    getNormalMessage(oldMessage[2]);
                    getNormalMessage(oldMessage[1]);
                    getNormalMessage(oldMessage[0]);
                    
                    
                } 
                else {    
                    alert("Request was unsuccessful: " + xhr.status); 
                } 
            } 
            }; 
        xhr.open("GET", "https://wall.cgcgbcbc.com/api/messages?num=3", true); 
        xhr.send(null);
    //}
    
    
    
    
    
    function getNormalMessage(message){
        var first = document.getElementById("firstMessage")
        var second = document.getElementById("secondMessage");
        var third = document.getElementById("thirdMessage");
    
        first.id = "secondMessage";
        second.id = "thirdMessage";
        third.parentNode.removeChild(third);
        
        var newMessage = document.createElement('div');
        newMessage.id = "firstMessage";
        var newPhoto = document.createElement('div');
        newPhoto.className = "photo";
        var newNickname = document.createElement('div');
        newNickname.className = "nickname";
        var newContent = document.createElement('div');
        newContent.className = "content";
    
        newNickname.innerText = message.nickname;
        newContent.innerText = message.content;
        newPhoto.style.backgroundImage = 'url(' + message.headimgurl + ')';
        
        document.getElementById("all").appendChild(newMessage);
        document.getElementById("firstMessage").appendChild(newPhoto);
        document.getElementById("firstMessage").appendChild(newNickname);
        document.getElementById("firstMessage").appendChild(newContent);
    
       
    }
    
    var admin = document.getElementById("adminMessage");
    var time;
    
    
    
    function adminTime(message){
        admin.style.display = 'block';
        var ac = document.getElementsByClassName("admincontent");
        //console.log(ac[0]);
        ac[0].innerText = message.content;
        clearTimeout(time);
        time = setTimeout(function(){
            admin.style.display = 'none';
        }, 10000);
    }
    
    
    function getAdminMessage(message){   
        adminTime(message); 
        //console.log("1");
    }
    
    my_socket.on('new message', function(message){
	   getNormalMessage(message);
    });
    
    my_socket.on('admin', function(message){
	   getAdminMessage(message);
    });
     
    
}





