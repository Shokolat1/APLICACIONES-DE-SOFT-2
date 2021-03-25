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

// Variables creadas para seleccionar áreas en el HTML
let welcome_page = document.querySelector("#outside");
let register_page = document.querySelector("#register");
let login_page = document.querySelector("#auth");
let contents_page = document.querySelector("#inside");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let log_email = document.querySelector("#email_l");
let log_pass = document.querySelector("#pass_l");
let bRegister = document.querySelector("#new_user");
let bLogIn = document.querySelector("#log_in");
let bSign_out = document.querySelector("#sign_out");
let button_reg = document.querySelector("#reg_user");
let button_log = document.querySelector("#log_user");
let button_fb = document.querySelector("#fb");
let button_google = document.querySelector("#google");

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
  
  alert("Unexpected error while trying to Log in, please try again.");
  });
});

// Métodos propios de la página
bRegister.addEventListener("click",()=>{
  register_page.style.display = "block";
  login_page.style.display = "none";
});

bLogIn.addEventListener("click",()=>{
  login_page.style.display = "block";
  register_page.style.display = "none";
});

button_reg.addEventListener("click", ()=>{
    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
    .then((user) => {
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
  .then((user) => {
      alert("User account found successfully!");
  })
  .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Impossible to find this account, please try again.");
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