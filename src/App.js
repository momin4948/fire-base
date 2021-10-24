import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
          // error: "",
          // success: false,
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
          error: "",
          success: false,
        };
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleBlur = (event) => {
    console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if (event.target.name === "email") {
      // const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 8;
      console.log(isPasswordValid);
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  //Sign In//

  const handleSubmit = (e) => {
    if (user.email && user.password) {
      console.log("HI");
    }
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const newUserInfo = { ...user };
        newUserInfo.error = "";
        newUserInfo.success = true;
        setUser(newUserInfo);
      })
      .catch((error) => {
        const newUserInfo = { ...user };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
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
          <h1>Authentication Form</h1>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          onChange={handleBlur}
          name="name"
          placeholder="name"
          required
        />
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
        <br />
        <button>Submit</button>
        <p>email : {user.email}</p>
        <p>password : {user.password}</p>
        <p>name : {user.name}</p>
      </form>
      <p style={{ color: "Red", fontSize: "30px" }}>{user.error}</p>
      {/* <p style={{ color: "red", fontSize: "30px" }}>
        User Already Registered !
      </p> */}
      {user.success && (
        <p style={{ color: "Green", fontSize: "30px" }}>
          User Created Successfully
        </p>
      )}
    </div>
  );
}

export default App;
