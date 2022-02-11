import React from "react";
import "./App.css"
import {CryptosState} from "./context/CryptosState";
import CryptoList from "./components/CryptoList";

function App() {



  return (
    <div className="App">
      <CryptosState>
        <CryptoList />
      </CryptosState>
    </div>
  );
}

export default App;
