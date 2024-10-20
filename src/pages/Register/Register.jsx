import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../../app/services/authApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);
  const [register] = useRegisterMutation();
  const [invalidUsername,setInvalidUsername] = useState(false);
  const [invalidEmail,setInvalidEmail] = useState(false);
  const [invalidPassword,setInvalidPassword] = useState(false);
  const isEmailInvalid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
    return !emailRegex.test(email);
  };

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);




  const sendRequest = async (e) => {
    let dontContinue = false;
    if(username.length < 5 || username.length > 15) {
      setInvalidUsername(true);
      dontContinue = true;
    }
    if(isEmailInvalid(email)){
      setInvalidEmail(true);
      dontContinue = true;
    }
    if(password.length < 6 || password.length > 20){
      setInvalidPassword(true);
      dontContinue = true;
    }
    if(dontContinue) {
      return
    }
      try {
        await register({ username,email, password, confirmPassword }).unwrap();
        setSuccessMessage("Account is created successfully!");
        setErrorMessage("");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        setErrorMessage(err.data ? err.data.message : "An error occurred during registration.");
        setSuccessMessage(""); 
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
  };

  const inputHandler = () => {
    sendRequest();
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };
  return (
    <div className="container mt-5 mb-5">
          <div className={screenSize > 767 ? "card shadow-sm" : ""} style={{ borderRadius: "1rem",maxWidth:"500px",marginLeft:"auto",marginRight:"auto" }}>
            <div className="card-body p-5 text-center">
                <form>
                  <h2 className="fw-bold mb-4">{lang === "en" ? "Sign up" : "Регистрирай се"}</h2>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                      )}
                  {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                    </div>
                    )}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`form-control form-control-md ${invalidUsername ? "is-invalid" : ""}`}
                      style={screenSize > 767 ? {} : {backgroundColor:"rgb(245,245,245)"}}
                    />
                    <div className="invalid-feedback">
                      Username must contain 6-20 Characters.
                    </div>
                    <label className="form-label">{lang === "en" ? "Username" : "Потребителско име"}</label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`form-control form-control-md ${invalidEmail ? "is-invalid" : ""}`}
                      style={screenSize > 767 ? {} : {backgroundColor:"rgb(245,245,245)"}}
                    />
                    <div className="invalid-feedback">
                      Email is not valid.
                    </div>
                    <label className="form-label">{lang === "en" ? "Email" : "Е-поща"}</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`form-control form-control-md ${invalidPassword ? "is-invalid" : ""}`}
                      style={screenSize > 767 ? {} : {backgroundColor:"rgb(245,245,245)"}}
                    />
                    <div className="invalid-feedback">
                      Password must contain 6-20 Characters.
                    </div>
                    <label className="form-label">{lang === "en" ? "Password" : "Парола"}</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`form-control form-control-md ${invalidPassword ? "is-invalid" : ""}`}
                      style={screenSize > 767 ? {} : {backgroundColor:"rgb(245,245,245)"}}
                    />
                    <div className="invalid-feedback">
                      Password must contain 6-20 Characters.
                    </div>
                    <label className="form-label">{lang === "en" ? "Confirm Password" : "Потвърди парола"}</label>
                  </div>

                  <button
                    className="btn btn-dark btn-md px-5"
                    onClick={() => inputHandler()}
                    type="button"
                  >
                    {lang === "en" ? "Register" : "Регистрирай се"}
                  </button>
                </form>
            </div>
          </div>
        </div>
  );
};

export default Register;