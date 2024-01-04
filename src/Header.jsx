import React from "react";
import { ToggleSwitch } from "./components/AllCalls";

const Header = ({ setSeeArchive, seeArchive }) => {
  return (
    <header>
      <img src="../public/assets/phone.png" className="imag" height="80px" width="176px"/>
      <ToggleSwitch setSeeArchive={setSeeArchive} seeArchive={seeArchive} />
    </header>
  );
};

export default Header;
