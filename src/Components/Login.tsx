import React, { useState } from "react";
import car from "../../src/assets/images/Airtel_logo-700x216.jpg";
import { InputText } from "primereact/inputtext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Submitted:", { username, password });
  };
  return (
    <div className="wrapper">
      <div className="login-container">
        <div className="custom-login-grid">
          <div className="login-col-6 login-background">
            <div className="login-content-box">
                <h2 className="">We're holding the door for you!</h2>
                <p>
                  Login now and manage all your bharti airtel logging services.
                </p>
            </div>
          </div>
          <div className="login-col-6">
            <div className="login-logo-box">
              <img className="logo-img" src={car} alt="logo" />
            </div>
            <div className="login-form">
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="field-group">
                  <InputText
                    className="p-inputtext"
                    placeholder="UserName"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <br />
                <div className="field-group icon-input-field">
                  <input
                    className="p-inputtext"
                    placeholder="Password"
                    type={showPassword ? "text":"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ?
                  <i className="pi pi-eye-slash icon" onClick={()=>setshowPassword(!showPassword)}></i>
                  :
                  <i className="pi pi-eye icon" onClick={()=>setshowPassword(!showPassword)}></i>
                }
                    
                    
                    
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
