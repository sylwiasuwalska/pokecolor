import React from "react";
import Store from "./Store";
import Header from "./Header";
import PokeContainer from "./PokeContainer";

import "../App.css";

function App() {
  return (
    <Store>
      <div className="App">
          <Header/>
        <PokeContainer />
      </div>
    </Store>
  );
}

export default App;
