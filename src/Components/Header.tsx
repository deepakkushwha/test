import React from "react";
import car from "../../src/assets/images/Airtel_logo-700x216.jpg";

export default function Header() {
  return (
    <header>
      <div className="top-header-menu">
        <div>
          <img src={car} alt="logo" title="Airtel Logo" />
        </div>
        <div className="hader-userCol">
          <div className="firstName"> </div>
          <div className="header-rightuser-action">
            <i className="pi pi-user"></i>
          </div>
        </div>

        {/* <p-overlayPanel #op [style]="marginStyle">
    <div className="top-user-items">
        <ul>
            <li >LogOut</li>
            <li >Reset Password</li>
            <li >Change Password</li>
        </ul>
    </div>
</p-overlayPanel> */}
      </div>
    </header>
  );
}
