import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Todos from "./Todos";
import Comments from "./Comments";

export const UserContext = React.createContext();

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ id: 0 });

  const renderUsers = () =>
    users.map((i) => (
      <li
        onClick={() => getUserTodos(i.id)}
        id={uuid() + "-" + i.name}
        key={uuid() + "-" + i.name}
      >
        {i.name}
      </li>
    ));

  useEffect(() => {
    console.log("mounting-rendering");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    return () => {
      console.log("unmount done");
    };
  }, []);

  const getUserTodos = (id) => setSelectedUser(users.find((i) => i.id === id));
  const contextData = { selectedUser };

  return (
    <div>
      <h1>Users</h1>
      <ol>{renderUsers()}</ol>
      <UserContext.Provider value={contextData}>
        <Todos id={selectedUser.id} />
        <Comments id={selectedUser.id} />
      </UserContext.Provider>
    </div>
  );
}
