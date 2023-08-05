// Bring in the GoogleLogin
// component from the library
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Login() {
  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    const decodedToken = jwtDecode(credential);

    if (decodedToken?.email) {
      navigate("/user-dashboard", { state: { decodedToken } });
    }
  };
  const navigate = useNavigate();
  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        width={"20%"}
        src="https://yt3.googleusercontent.com/2kw8s66dhLUegJ3XrqZSkZMfp77CRhCfYm1NurDwDB2L9sT_-CaoUix_iWjoE_t66b07JzoR=s900-c-k-c0x00ffffff-no-rj"
        alt="nasaData"
      />
      <h4>{`The red v-shaped wing represents aeronautics. The circular orbit around the agency's name represents space travel. NASA used the "worm" logo from 1975 until 1992. After it was introduced, the "meatball" was the most common symbol of NASA for 16 years`}</h4>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          return <h1>Login Failed</h1>;
        }}
      />
    </div>
  );
}

export default Login;
