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
  //Sign In//
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
  //Sign In//
  //Sign Out//
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
  const handleBlur = (event) => {
    console.log(event.target.name, event.target.value);
    if (event.target.name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 8;
      console.log(isPasswordValid);
    }
  };
  //Sign In//

  const handleSubmit = () => {};
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
          <h1>Authentication Form</h1>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          onChange={handleBlur}
          name="email"
          placeholder="email-id"
          required
        />
        <br />
        <input
          type="password"
          onChange={handleBlur}
          name="password"
          placeholder="password"
          required
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
