import React, { useEffect, useContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { UserContext } from "./Users";

let initalState = { comments: [], isCommentsLoading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS":
      return { ...state, comments: [], isCommentsLoading: true };
    case "FETCH_COMMENTS_SUCCESS":
      return { ...state, comments: action.payload, isCommentsLoading: false };
    default:
      return state;
  }
};

export default function Comments(props) {
  //use context code
  const userContextHookData = useContext(UserContext);

  const [state, dispatch] = useReducer(reducer, initalState);

  const renderComments = () => {
    return state.comments.map((i) => (
      <li id={uuid() + "-" + i.name} key={uuid() + "-" + i.name}>
        {i.name}
      </li>
    ));
  };

  const getComments = (id) => {
    dispatch({ type: "FETCH_COMMENTS", payload: [] });
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_COMMENTS_SUCCESS", payload: data });
      });
  };

  useEffect(() => {
    getComments(props.id);
  }, [props.id]);

  useEffect(() => {
    console.log("comments changed");
  }, [state.comments]);

  return (
    <div>
      <h1>Comments</h1>
      <div>
        User name is ==
        {userContextHookData ? userContextHookData.selectedUser.name : null}
      </div>
      <ol>{!state.isCommentsLoading ? renderComments() : <p>loading...</p>}</ol>
    </div>
  );
}
