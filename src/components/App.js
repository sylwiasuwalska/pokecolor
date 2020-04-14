import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./Store";
import Header from "./Header";
import PokeContainer from "./PokeContainer";

import "../styles/App.css";
import ButtonContainer from "./ButtonContainer";

function App() {
  return (
    <Store>
      <div className="App">
        <Header />
        <ButtonContainer />
        <PokeContainer />
      </div>
    </Store>
  );
}

export default App;
