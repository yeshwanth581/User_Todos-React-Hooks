import React, { useState } from "react";
import "./styles.css";
import Users from "./Users";

export const AppContext = React.createContext();

export default function App() {
  let [showUsers, setShowUser] = useState(true);
  let appContextData = { name: "appContextData" };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happes!</h2>
      <button onClick={() => setShowUser(!showUsers)}>
        toggle users data display
      </button>
      <AppContext.Provider value={appContextData}>
        {showUsers ? <Users /> : null}
      </AppContext.Provider>
    </div>
  );
}
