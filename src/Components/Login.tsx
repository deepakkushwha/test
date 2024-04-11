import React, { useState } from "react";
import car from "../../src/assets/images/Airtel_logo-700x216.jpg";
import { InputText } from "primereact/inputtext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    // e.preventDefault();
    console.log("Submitted:", { username, password });
  };
  return (
    <div className="wrapper">
      <div className="login-container">
        <div className="custom-login-grid">
          <div className="login-col-6 login-background">
            <div className="login-content-box">
              <div>
                <h2 className="">We're holding the door for you!</h2>
                <p>
                  Login now and manage all your bharti airtel logging services.
                </p>
              </div>
            </div>
          </div>
          <div className="login-col-6">
            <div className="login-logo-box">
              <img className="logo-img" src={car} alt="logo" />
            </div>
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className="field-group">
                  {/* <label>
        Username: */}
                  <InputText
                    className="p-inputtext"
                    placeholder="UserName"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {/* </label> */}
                </div>
                <br />
                <div className="field-group">
                  {/* <label>
        Password: */}
                  <input
                    className="p-inputtext"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* </label> */}
                </div>
                <br />
                <button className="login-btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
