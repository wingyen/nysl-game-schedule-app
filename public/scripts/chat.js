function toggleChat() {
    $("#chatModal").toggle();
    applyChat();

}

// function toggleLoginModal(){
//     $("#id01").toggle();
//     console.log("login")
// }
//document.getElementById('login').addEventListener("click", login);
//document.getElementById('create-post').addEventListener("click", writeNewPost)

function signedOutState() {
    //console.log("signed out state")
    $('#firebaseui-container').show();
    $('#posts').hide();
    $('#logout').hide();
    $('#chatfooter').hide();
}
signedOutState()

let currentUser = null

firebase.auth().onAuthStateChanged(function (user) {
    console.log("auth state changed")
    if (user != null && user.displayName != null) {
        currentUser = user
        console.log("signed in state", user)
        $('#firebaseui-container').hide();
        $('#logout').show();
        $('#posts').show();
        $('#chatfooter').show();

        let userName = document.getElementById("guestName");
        userName.innerHTML = user.displayName + "!";
        $('#profile-photo').attr("src", user.photoURL)

        applyChat()
    } else {
        signedOutState();
    }
})

function logmeout() {
    console.log("signing out")
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("signed out")
        signedOutState()
        currentUser = null;
        $('#posts').innerHTML = "Loading posts..."

    }).catch(function (error) {
        // An error happened.
        console.log("error signing out", error)
    });
}

function writeNewPost() {

    // https://firebase.google.com/docs/database/web/read-and-write
    if (!$('#textInput').val()) {
        return
    }
    // Values
    let text = document.getElementById("textInput").value;
    let userName = currentUser.displayName;
    let proPhoto = currentUser.photoURL;
    let newTime = new Date();
    let cTime = newTime.toLocaleString();

    // A post entry

    let post = {
        name: userName,
        body: text,
        photo: proPhoto,
        time: cTime
    };


    // Get a key for a new Post.
    let newPostKey = firebase.database().ref().child('myChat').push().key;

    //Write data
    let updates = {};
    updates[newPostKey] = post;

    // clear messages when send is cliked
    $("#textInput").val("")

    return firebase.database().ref('myChat').update(updates);

}

let currentChatData = null

console.log("getting posts")

firebase.database().ref('myChat').on('value', function (data) {
    console.log("posts loaded", data)

    currentChatData = data;

    applyChat()


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
})

function applyChat() {
    if (currentUser == null || currentChatData == null) {
        return
    }

    let data = currentChatData
    let user = currentUser

    let posts = document.getElementById("posts");

    posts.innerHTML = "";

    let messages = data.val();

    let template = "";


    // let time = moment(new Date()).format("hh:mm:ss a")

    for (let key in messages) {
        let message = messages[key]
        var body = `<p class="message">${message.body}</p>`
        if(message.imageUrl != null) {
            body = `<img src="${message.imageUrl}" class="resize" />`
        }

        if (message.name == user.displayName) {
            template += `<div class="message-container">
            <img src="${message.photo}" alt="Guest" style="width:100%;">
            <p class="name">${message.name}:</p>
            ${body}
            <span class="chatTime time-right">${message.time}</span>
            </div>
            `;
        } else {
            template += `
            <div class="message-container darker">
            <img src="${message.photo}" alt="Guest" class="right" style="width:100%;">
            <p class="name">${message.name}:</p>
            ${body}
                <span class="chatTime time-left">${message.time}</span>
            </div>
            `
        }
    }
    posts.innerHTML = template;
    //
    $("#posts").animate({ scrollTop: $("#posts").prop("scrollHeight") }, 500)
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  
document.getElementById('cameraButton').addEventListener("change",function(e){
    var file= e.target.files[0];
    let randomname = "uploadedimg/"+uuidv4()
    //create storage ref to the firebase storage
    var storageRef = firebase.storage().ref().child(randomname);
    task = storageRef.put(file)
    console.log("uploading", task)
    task.on("state_changed",function(snapshot){
       var percentage= (snapshot.bytesTransferred/snapshot.totalBytes) *100;
       console.log("upload "+percentage)
    }, function(error) {
        // Handle unsuccessful uploads
        console.log("oh file didnt upload", error)
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          
          let userName = currentUser.displayName;
          let proPhoto = currentUser.photoURL;
          let newTime = new Date();
          let cTime = newTime.toLocaleString();
          let post = {
                name: userName,
                imageUrl: downloadURL,
                photo: proPhoto,
                time: cTime
            };
        
        
            // Get a key for a new Post.
            let newPostKey = firebase.database().ref().child('myChat').push().key;
        
            //Write data
            let updates = {};
            updates[newPostKey] = post;
        
            // clear messages when send is cliked
            $("#textInput").val("")
        
            firebase.database().ref('myChat').update(updates);
        });
      });
 });

 

function textArea() {
    var textContainer, textareaSize, input;
    var autoSize = function () {
        // also can use textContent or innerText
        textareaSize.innerHTML = input.value + '\n';
    };

    document.addEventListener('DOMContentLoaded', function () {
        textContainer = document.querySelector('.textarea-container');
        textareaSize = textContainer.querySelector('.textarea-size');
        input = textContainer.querySelector('textarea');
        autoSize();
        input.addEventListener('input', autoSize);
    });
}

textArea();