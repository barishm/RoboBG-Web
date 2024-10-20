import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/redux/authSlice";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../../app/services/authApiSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const lang = useSelector((state) => state.language.lang);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ username, password }).unwrap();
      const decoded = jwtDecode(userData.access_token);
      const user = decoded.sub;
      const role = decoded.role;
      const accessToken = userData.access_token;

      dispatch(setCredentials({ user, role, accessToken }));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(userData.refresh_token)
      );
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setErrorMessage("Incorrect username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <div className={screenSize > 767 ? "container mt-5 mb-5 " : "container mt-2"}>
      <div
        className={screenSize > 767 ? "card shadow-sm" : ""}
        style={{
          borderRadius: "1rem",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="card-body p-5 text-center">
          <form onSubmit={handleSubmit}>
            <h2 className="fw-bold mb-3">
              {lang === "en" ? "Sign in" : "Впиши се"}
            </h2>
            <p className="mb-3">
              {lang === "en"
                ? "Please enter your username and password!"
                : "Моля, въведете вашето потребителско име и парола!"}
            </p>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="form-outline form-white mb-4">
              <input
                type="username"
                name="username"
                value={username}
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="form-control form-control-md"
                style={
                  screenSize > 767
                    ? {}
                    : { backgroundColor: "rgb(245,245,245)" }
                }
              />
              <label className="form-label">
                {lang === "en" ? "Username" : "Потребителско име"}
              </label>
            </div>

            <div className="form-outline form-white mb-3">
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="form-control form-control-md"
                style={
                  screenSize > 767
                    ? {}
                    : { backgroundColor: "rgb(245,245,245)" }
                }
              />
              <label className="form-label">
                {lang === "en" ? "Password" : "Парола"}
              </label>
            </div>

            <button
              className="btn btn-dark btn-md mt-1"
              type="submit"
              style={{ width: "100px" }}
            >
              Login
            </button>
          </form>

          <div className="mt-3">
            <p className="mb-0">
              {lang === "en" ? "Don't have an account?" : "Нямате акаунт?"}{" "}
              <a
                href="#"
                onClick={() => navigate("/register")}
                className="fw-bold"
              >
                {lang === "en" ? "Sign Up" : "Регистрирай се"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
