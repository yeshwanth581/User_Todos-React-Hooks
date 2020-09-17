import React, { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { AppContext } from "./App";
import { UserContext } from "./Users";

export default function Todos(props) {
  const [todos, setTodos] = useState([]);

  //use context code
  const userContextHookData = useContext(UserContext);
  const appContextHookData = useContext(AppContext);

  const renderTodos = () =>
    todos.map((i) => (
      <li
        onClick={() =>
          setTodos(
            todos.map((item) =>
              item.title === i.title ? { ...i, completed: !i.completed } : item
            )
          )
        }
        id={uuid() + "-" + i.title}
        key={uuid() + "-" + i.title}
      >
        {i.completed ? <strike>{i.title}</strike> : i.title}
      </li>
    ));

  const getUserTodos = (id) =>
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });

  useEffect(() => {
    setTodos([]);
    getUserTodos(props.id);
  }, [props.id]);

  useEffect(() => {
    console.log("todos changes");
  }, [todos]);

  return (
    <div>
      <h1>Todos</h1>
      <h2>Context with nested callbak</h2>
      <AppContext.Consumer>
        {(app) => {
          console.log(app);
          return (
            <UserContext.Consumer>
              {(user) => {
                console.log(user);
                return (
                  <div>
                    <div>App name is == {app.name}</div>;
                    <div>
                      User name is == {user ? user.selectedUser.name : null}
                    </div>
                    ;
                  </div>
                );
              }}
            </UserContext.Consumer>
          );
        }}
      </AppContext.Consumer>
      <h2>Context with hooks</h2>
      <div>App name is == {appContextHookData.name}</div>;
      <div>
        User name is =={" "}
        {userContextHookData ? userContextHookData.selectedUser.name : null}
      </div>
      ;<ol>{renderTodos()}</ol>
    </div>
  );
}
