/* eslint-disable no-undef */
import FullPageLoader from "../components/FullPageLoader.jsx";
import { useState } from "react";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice.js";

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  //State Changed
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  // Handle Credentials
  function handleCredentials(e) {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
    console.log(userCredentials);
  }

  // Handle SignUp
  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(
          setUser({
            id: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Handle Log In
  function handleLogIn(e) {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(
          setUser({
            id: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  // Handle Forget Password
  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert("Email sent! Check your inbox for password reset instruction");
  }
  const provider = new GoogleAuthProvider();
  const handleGoogleLogIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {isLoading && <FullPageLoader />}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div>
            <button onClick={handleGoogleLogIn} className=" btn btn-block">
              Login with Google{" "}
              <img
                style={{ width: "15px" }}
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-icon.png"
                alt="Google Icon"
              />
            </button>
            <br />
          </div>
          <div className="login-type">
            <button
              className={`btn ${loginType === "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType === "signUp" ? "selected" : ""}`}
              onClick={() => setLoginType("signUp")}
            >
              SignUp
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input
                onChange={handleCredentials}
                type="text"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                onChange={handleCredentials}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {loginType === "login" ? (
              <button onClick={handleLogIn} className="active btn btn-block">
                Login
              </button>
            ) : (
              <button onClick={handleSignUp} className="active btn btn-block">
                Sign Up
              </button>
            )}
            {error && <div className="error">{error}</div>}

            <p onClick={handlePasswordReset} className="forgot-password">
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
