// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpsXaJR5BqS2FtMizPxIj2TqefGFBD9FE",
    authDomain: "apps-de-soft.firebaseapp.com",
    projectId: "apps-de-soft",
    storageBucket: "apps-de-soft.appspot.com",
    messagingSenderId: "109231599561",
    appId: "1:109231599561:web:fa42ae6a06fd06ddfbc218",
    measurementId: "G-K9T2ZFXXW8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

// Variables creadas para seleccionar áreas en el HTML

let welcome_page = document.querySelector("#outside");
let welcome_wallp = document.querySelector("#welcome");
let register_page = document.querySelector("#new");
let login_page = document.querySelector("#check");
let contents_page = document.querySelector("#inside");
let _show = document.querySelector("#show");
let _create = document.querySelector("#create");
let _update = document.querySelector("#upd");
let _delete = document.querySelector("#delete");

let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let log_email = document.querySelector("#email_l");
let log_pass = document.querySelector("#pass_l");

let bRegister = document.querySelector("#new_user");
let bLogIn = document.querySelector("#log_in");
let bSign_out = document.querySelector("#sign_out");
let b_Dentro = document.querySelector("#dentro");

let button_reg = document.querySelector("#reg_user");
let button_log = document.querySelector("#log_user");
let button_google = document.querySelector("#google");
let button_fb = document.querySelector("#fb");
let button_twitter = document.querySelector("#twitter");
let button_git = document.querySelector("#gh");
let button_microsoft = document.querySelector("#microsoft");
let button_apple = document.querySelector("#apple");
let button_yahoo = document.querySelector("#yahoo");

let show_data = document.querySelector("#b_show");
let create_data = document.querySelector("#b_create");
let update_data = document.querySelector("#b_update");
let delete_data = document.querySelector("#b_delete");

let firstName = document.querySelector("#f_name");
let lastName = document.querySelector("#l_name");
let cardNum = document.querySelector("#card_num");
let expM = document.querySelector("#exp_month");
let expY = document.querySelector("#exp_year");
let createItem = document.querySelector("#c_item");

var temp_id = "";

let update_info = document.querySelector("#update_info")
let current = document.querySelector("#curr_usInfo"); 
let firstName_upd = document.querySelector("#f_name_upd");
let lastName_upd = document.querySelector("#l_name_upd");
let expM_upd = document.querySelector("#exp_month_upd");
let expY_upd = document.querySelector("#exp_year_upd");
let updateItem = document.querySelector("#upd_item");

let d_table = document.querySelector("#delete_table");
let deleteItem = document.querySelector("#d_item");

// Variable y método para conectar con Facebook
button_fb.addEventListener("click", ()=>{
  var provider = new firebase.auth.FacebookAuthProvider();
  
firebase.auth().signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    alert("Logged in succesfully with Facebook account!");
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    alert("Unexpected error while trying to log in, please try again.");
  });
});

// Variable y Método para conectar con Google
button_google.addEventListener("click", ()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;

  // The signed-in user info.
  var user = result.user;
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = credential.accessToken;
  
  alert("Logged in succesfully with Google account!");
  })
  .catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  
  alert("Unexpected error while trying to log in, please try again.");
  });
});

// Variable y Método para conectar con Twitter
button_twitter.addEventListener("click", ()=>{
  var provider = new firebase.auth.TwitterAuthProvider();

  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = credential.accessToken;
    var secret = credential.secret;

    // The signed-in user info.
    var user = result.user;
    
    alert("Logged in successfully with a Twitter account!");
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    
    alert("Unexpected error while trying to log in, please try again.");
  });
});

// Variable y Método para conectar con GitHub
button_git.addEventListener("click", ()=>{
  var provider = new firebase.auth.GithubAuthProvider();
  firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = credential.accessToken;

    // The signed-in user info.
    var user = result.user;

    alert("Logged in successfully with a GitHub account!");
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    alert("Unexpected error while trying to log in, please try again.");
  });
});

// Variable y Método para conectar con Yahoo
button_yahoo.addEventListener("click", ()=>{
  var provider = new firebase.auth.OAuthProvider('yahoo.com');

  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // IdP data available in result.additionalUserInfo.profile
    // ...

    /** @type {firebase.auth.OAuthCredential} */
    const credential = result.credential;

    // Yahoo OAuth access token and ID token can be retrieved by calling:
    var accessToken = credential.accessToken;
    var idToken = credential.idToken;

    alert("Logged in successfully with a Yahoo account!");
  })
  .catch((error) => {
    alert("Unexpected error while trying to log in, please try again.");
  });
});

// Métodos propios de la página
bRegister.addEventListener("click",()=>{
  welcome_wallp.style.display = "none";
  register_page.style.display = "block";
  login_page.style.display = "none";
});

bLogIn.addEventListener("click",()=>{
  welcome_wallp.style.display = "none";
  login_page.style.display = "block";
  register_page.style.display = "none";
});


button_reg.addEventListener("click", ()=>{
    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("User account created successfully!");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Impossible to create a new account, please try again.");
    });
});

button_log.addEventListener("click", ()=>{
  firebase.auth().signInWithEmailAndPassword(log_email.value, log_pass.value)
  .then((userCredential) => {
      var user = userCredential.user;
      alert("User account found successfully!");
  })
  .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Impossible to find this account, please try again or create a new account.");
  });
});

bSign_out.addEventListener("click", ()=>{
    firebase.auth().signOut()
    .then(() => {
      alert("Signed Out successfully!");
      log_email.value = "";
      log_pass.value = "";
      email.value = "";
      pass.value = "";
    })
    .catch((error) => {
      alert("An error occured while signing out, please try again.");
    });
});

// DATABASE ---------------------------------------------------------------------------------------
create_data.addEventListener("click", ()=>{
  _show.style.display = "none";
  _create.style.display = "block";
  _update.style.display = "none";
  _delete.style.display = "none";
});

createItem.addEventListener("click", ()=>{
  db.collection("auth").add({
    lastName: lastName.value,
    firstName: firstName.value,
    cardNum: cardNum.value,
    expM: expM.value,
    expY: expY.value
  })
  .then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
  alert("Information added succesfully!");
  _create.style.display = "none";
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    alert("Unexpexted error ocurred whle trying to add info. Try again please");
  });
});

show_data.addEventListener("click", ()=>{
  _show.style.display = "block";
  _create.style.display = "none";
  _update.style.display = "none";
  _delete.style.display = "none";
  _show.innerHTML=`
  <thead class="table-dark">
  <tr>
    <th scope="col">Last Name</th>
    <th scope="col">First Name</th>
    <th scope="col">Card Number</th>
    <th scope="col">Expiration Month</th>
    <th scope="col">Expiration Year</th>
  </tr>
  </thead>
  `

  db.collection("auth").orderBy("lastName", "asc").get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      _show.innerHTML+=`
        <tr class="table-dark">
          <td>${doc.data().lastName}</td>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().cardNum}</td>
          <td>${doc.data().expM}</td>
          <td>${doc.data().expY}</td>
        </tr>
        `
      });
    });
  });

update_data.addEventListener("click", ()=>{
  _show.style.display = "none";
  _create.style.display = "none";
  _update.style.display = "block";
  _delete.style.display = "none";

  temp_cardNum = prompt("Please enter the card number of the user you want to update.");

  current.innerHTML=`
  <thead class="table-dark">
    <tr>
    <th scope="col">Last Name</th>
    <th scope="col">First Name</th>
      <th scope="col">Card Number</th>
      <th scope="col">Expiration Month</th>
      <th scope="col">Expiration Year</th>
    </tr>
  </thead>
  `

  db.collection("auth").where("cardNum", "==", temp_cardNum).get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc) =>{
        current.innerHTML+=`
        <tr class="table-dark">
          <td>${doc.data().lastName}</td>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().cardNum}</td>
          <td>${doc.data().expM}</td>
          <td>${doc.data().expY}</td>
        </tr>
        `
        temp_id = doc.id;
      });
    })
    .catch((error) => {
      console.error("Error finding this user: ", error);
      alert("Unable to find this card number, please try again.");
      _update.style.display = "none";
    });
});

updateItem.addEventListener("click", ()=>{
  db.collection("auth").doc(temp_id).update({
    firstName: firstName_upd.value,
    lastName: lastName_upd.value,
    expM: expM_upd.value,
    expY: expY_upd.value
  })
  .then(() => {
    console.log("Document successfully written!");
    alert("Information updated succesfully!");
    _update.style.display = "none";
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
    alert("Unexpexted error ocurred whle trying to update info. Please try again.");
  });
});

delete_data.addEventListener("click", ()=>{
  _show.style.display = "none";
  _create.style.display = "none";
  _update.style.display = "none";
  _delete.style.display = "block";

  temp_cardNum = prompt("Please enter the card number of the user you want to delete.");
  alert("Please take into consideration that once you press the 'delete' button, this user's information will be completely erased form the database.")

  d_table.innerHTML=`
  <thead class="table-dark">
    <tr>
      <th scope="col">Last Name</th>
      <th scope="col">First Name</th>
      <th scope="col">Card Number</th>
      <th scope="col">Expiration Month</th>
      <th scope="col">Expiration Year</th>
    </tr>
  </thead>
  `

  db.collection("auth").where("cardNum", "==", temp_cardNum).get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc) =>{
        d_table.innerHTML+=`
        <tr class="table-dark">
          <td>${doc.data().lastName}</td>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().cardNum}</td>
          <td>${doc.data().expM}</td>
          <td>${doc.data().expY}</td>
        </tr>
        `
        temp_id = doc.id;
      });
    })
    .catch((error) => {
      console.error("Error finding this user: ", error);
      alert("Unable to find this card number, please try again.");
      _delete.style.display = "none";
    });
});

deleteItem.addEventListener("click", ()=>{
  db.collection("auth").doc(temp_id).delete()
  .then(() => {
    console.log("Document successfully deleted!");
    alert("Information deleted succesfully!");
    _delete.style.display = "none";
  })
  .catch((error) => {
    console.error("Error removing document: ", error);
    alert("Unexpected error ocurred while trying to delete this user. Please try again.");
  });
});

// OBSERVER ---------------------------------------------------------------------------------------
function observa(){
    firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;

            console.log(uid);
            console.log(user);

            //Usuario está conectado
            welcome_page.style.display = "none";
            bRegister.style.display = "none";
            bLogIn.style.display = "none";
            bSign_out.style.display = "block";
            contents_page.style.display = "block";
        }else{
            //Usuario está desconectado
            welcome_page.style.display = "block";
            bRegister.style.display = "block";
            bLogIn.style.display = "block";
            bSign_out.style.display = "none";
            contents_page.style.display = "none";
        }
    });
}

observa();