// FIREBASE ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBCpgjmdyHEGhOwxYhTUYwu0pow9WTUtsA",
  authDomain: "examen-final-ads2.firebaseapp.com",
  projectId: "examen-final-ads2",
  storageBucket: "examen-final-ads2.appspot.com",
  messagingSenderId: "775006886357",
  appId: "1:775006886357:web:68ed612d9c0847c9cf855c",
  measurementId: "G-R88P3Q0DGL"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

// ALL VARIABLES --------------------------------------------------------------------
// VIEWS
let welcome_page = document.querySelector("#outside");
let welcome_wallp = document.querySelector("#welcome");
let register_page = document.querySelector("#new");
let login_page = document.querySelector("#check");
let contents_page = document.querySelector("#inside");
let _show = document.querySelector("#show");
let _game = document.querySelector("#game");
let _newP = document.querySelector("#newPlayer");
let leaderboard = document.querySelector("#b_scores");

// EMAIL AND PASSWORD FOR LOGIN AND SIGN IN
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let log_email = document.querySelector("#email_l");
let log_pass = document.querySelector("#pass_l");

// HEADER BUTTONS
let bRegister = document.querySelector("#new_user");
let bLogIn = document.querySelector("#log_in");
let bSign_out = document.querySelector("#sign_out");

// BUTTONS FOR LOGIN AND SIGN IN
let button_reg = document.querySelector("#reg_user");
let button_log = document.querySelector("#log_user");
let button_google = document.querySelector("#google");

// GAME VARIABLES
let play_game = document.querySelector("#b_game");
let newScore = document.querySelector("#bNewScore");

// LEADERBOARD
let LBtable = document.querySelector("#LBtable");
var firstPlace = "";

// IMPORTS -------------------------------------------------------------------------
import gameStart from "../game/scenes/start_game.js";
import {totalScore, pName, countryName} from '../game/scenes/game.js';
import mapUSA from '../maps/usa.js';
import mapBRAZIL from '../maps/brazil.js';
import mapSPAIN from '../maps/spain.js';
import mapRUSSIA from '../maps/russia.js';
import mapJAPAN from '../maps/japan.js';


// LOGIN WITH GOOGLE --------------------------------------------------------------
button_google.addEventListener("click", ()=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;
  var user = result.user;
  var token = credential.accessToken;
  
  alert("Logged in succesfully with Google account!");
  })
  .catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
  
  alert("Unexpected error while trying to log in, please try again.");
  });
});

// HEADER BUTTONS --------------------------------------------------------------
bRegister.addEventListener("click",()=>{
  welcome_wallp.style.display = "none";
  register_page.style.display = "block";
  login_page.style.display = "none";
  newScore.style.display = "none";
});

bLogIn.addEventListener("click",()=>{
  welcome_wallp.style.display = "none";
  login_page.style.display = "block";
  register_page.style.display = "none";
  newScore.style.display = "none";
});

bSign_out.addEventListener("click", ()=>{
  firebase.auth().signOut()
  .then(() => {
    alert("Signed Out successfully!");
    welcome_wallp.style.display = "block";
    register_page.style.display = "none";
    login_page.style.display = "none";
    log_email.value = "";
    log_pass.value = "";
    email.value = "";
    pass.value = "";
  })
  .catch((error) => {
    alert("An error occured while signing out, please try again.");
  });
});

// REGISTER AND LOGIN BUTTONS -------------------------------------------------------------
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

// LEADERBOARD ---------------------------------------------------------------------------------------
leaderboard.addEventListener("click", ()=>{
  var place = 1;

  _show.style.display = "block";
  _game.style.display = "none";
  _newP.style.display = "none";
  newScore.style.display = "none";
  LBtable.innerHTML=`
    <thead class="table table-hover">
    <tr>
      <th scope="col">Place Number</th>
      <th scope="col">Score</th>
      <th scope="col">Player's Name</th>
      <th scope="col">Origin Country</th>
    </tr>
    </thead>
  `
  db.collection("playerData").orderBy("score", "desc").limit(5).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      LBtable.innerHTML+=`
        <tr class="table-light">
          <td>${place}</td>
          <td>${doc.data().score}</td>
          <td>${doc.data().playerName}</td>
          <td>${doc.data().originCountry}</td>
        </tr>
        `
        place++;
    });
  });

  db.collection("playerData").orderBy("score", "desc").limit(1).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      firstPlace = doc.data().originCountry;
    });
  });

// MAP
switch(firstPlace){
  case "USA":
    mapUSA();
    break;
  case "Brazil":
    mapBRAZIL();
    break;
  case "Spain":
    mapSPAIN();
    break;
  case "Russia":
    mapRUSSIA();
    break;
  case "Japan":
    mapJAPAN();
    break;
  }
});

// GAME ---------------------------------------------------------------------------
play_game.addEventListener("click", ()=>{
  _show.style.display = "none";
  _newP.style.display = "none";
  _game.style.display = "block";
  newScore.style.display = "block";
});

var config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 520,
  scene: [gameStart],
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 400 },
          debug: false
      }
    }
};

var game = new Phaser.Game(config);

gameStart;

// ADD NEW PLAYER TO LEADERBOARD -------------------------------------------------------------------
newScore.addEventListener("click", ()=>{
  _game.style.display = "none";
  _show.style.display = "none";
  _newP.style.display = "block";
  newScore.style.display = "none";

  _newP.innerHTML = `
  <div class="form-group">  
  <fieldset>
      <legend><h3>Player Information</h3></legend>
      <label for="playerName" class="control-label">Name:</label>
      <input type="text" id="playerName" readonly="" class="form-control" value=${pName}>
      <br>
      <label for="playerScore" class="control-label">Score:</label>
      <input type="text" id="playerScore" readonly="" class="form-control" value=${totalScore}>
      <br>
      <label for="cName" class="control-label">Country of Origin:</label>
      <input type="text" id="cName" readonly="" class="form-control" value=${countryName}>
      <br>
      <p class="text-warning">This information will only be used for the current leaderboard.</p>
    </fieldset>
    </div>
`;
  db.collection("playerData").add({
  originCountry: countryName,
  playerName: pName,
  score: totalScore
  })
  .then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
  alert("Information added succesfully!");
  _newP.style.display = "none";
  leaderboard.style.display = "block";
  })
  .catch((error) => {
  console.error("Error adding document: ", error);
  alert("Unexpexted error ocurred whle trying to add info. Try again please");
  }); 
});

// OBSERVER ---------------------------------------------------------------------------------------
function observa(){
    firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          var uid = user.uid;
          console.log(uid);
          console.log(user);

          //USER IS ONLINE
          welcome_page.style.display = "none";
          bRegister.style.display = "none";
          bLogIn.style.display = "none";
          bSign_out.style.display = "block";
          contents_page.style.display = "block";
        }else{
          //USER IS DISCONNECTED
          welcome_page.style.display = "block";
          bRegister.style.display = "block";
          bLogIn.style.display = "block";
          bSign_out.style.display = "none";
          contents_page.style.display = "none";
        }
    });
}

observa();