import {
  PhoneStyle,
  PhoneContainer,
  BottomNavBarStyle,
  ContactsStyle,
  ContactsContainer,
  GreenContainer,
  GridStyle,
  GridContainerStyle,
  SettingsStyle,
  SettingsContainer,
  DotStyle,
  DotContainer
} from "./BottomNavBarStyles";
import { useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom';

/* Initialize control button values with the phone being the default true value.
This will be used for the buttons on the bottom -- for when they are currently active
or not */
let initControlBtns = [
  {
    isActive: true,
    name: "phone"
  },
  {
    isActive: false,
    name: "contacts"
  },
  {
    isActive: false,
    name: "settings"
  },
  {
    isActive: false,
    name: "dot"
  }
];

export default function BottomNavBar() {
  const [controlBtns, setControlBtns] = useState(initControlBtns);

  /* First reset all of the isActive values in controlBtns, then update the button clicked
  to have a true isActive value */
  const handleControlClick = (controlBtns, name) => {
    let resetActive = controlBtns.map((btn) => {
      let btnCopy = Object.assign({}, btn);
      btnCopy.isActive = false;
      return btnCopy;
    });
    let newControlBtns = resetActive.map((btn) => {
      let btnCopy = Object.assign({}, btn);
      if (name === btn.name) {
        btnCopy.isActive = true;
      }
      return btnCopy;
    });
    setControlBtns(newControlBtns);
  };

  const handleGreenHighlight = () => {
    return "height: 4px;";
  };

  return (
    <BottomNavBarStyle>
      <PhoneContainer
        onClick={() => handleControlClick(controlBtns, "phone")}
        greenHighlight={() => handleGreenHighlight(controlBtns)}
        isActive={controlBtns[0].isActive}
      >
        <PhoneStyle />
      </PhoneContainer>
      <ContactsContainer
        onClick={() => handleControlClick(controlBtns, "contacts")}
        greenHighlight={() => handleGreenHighlight(controlBtns)}
        isActive={controlBtns[1].isActive}
      >
        <ContactsStyle />
      </ContactsContainer>
      <GridContainerStyle>
        <GreenContainer>
          <GridStyle />
        </GreenContainer>
      </GridContainerStyle>
      <SettingsContainer
        onClick={() => handleControlClick(controlBtns, "settings")}
        greenHighlight={() => handleGreenHighlight(controlBtns)}
        isActive={controlBtns[2].isActive}
      >
        <SettingsStyle />
      </SettingsContainer>
      <DotContainer
        onClick={() => handleControlClick(controlBtns, "dot")}
        greenHighlight={() => handleGreenHighlight(controlBtns)}
        isActive={controlBtns[3].isActive}
      >
        <DotStyle />
      </DotContainer>
    </BottomNavBarStyle>
  );
}
