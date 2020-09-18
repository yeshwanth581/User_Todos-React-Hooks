import React, { useState } from "react";
import "./styles.css";
import Users from "./Users";

export const AppContext = React.createContext();

export default function App() {
  let [showUsers, setShowUser] = useState(true);
  const toggleUsersView = () => setShowUser(!showUsers);
  let appContextData = { name: "appContextData", toggleUsersView };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happens!</h2>
      <button onClick={toggleUsersView}>toggle users data display</button>
      <AppContext.Provider value={appContextData}>
        {showUsers ? <Users /> : null}
      </AppContext.Provider>
    </div>
  );
}
