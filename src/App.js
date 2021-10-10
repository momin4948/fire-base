import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    photoURL: "",
    email: "",
  });
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          photoURL: "",
          email: "",
        };
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //SignIn

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
      })

      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
  return (
    <div className="App">
      <h1>Welcome, FireBase authentication</h1>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      {user.isSignedIn && (
        <div>
          <h2> Hi,{user.name}</h2>
          <p>{user.email}</p>
          <img src={user.photo} alt="fire-base" />
        </div>
      )}
    </div>
  );
}

export default App;
