import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});

  ///// For Google Provider
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, credential, email);
      });
  };

  /// For Facebook Provider
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        console.log("Successfully logged in", user);
        var accessToken = credential.accessToken;
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, credential, email);
      });
  };

  //// For GitHub Provider
  var githubProvider = new firebase.auth.GithubAuthProvider();
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log("sign in successfully", user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, credential, email);
      });
  };
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In Using Google</button>
      <br /> <br />
      <button onClick={handleFbSignIn}>Sign In Using Facebook</button>
      <br /> <br />
      <button onClick={handleGithubSignIn}>Sign In Using GitHub</button>
      <h3>User: {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
