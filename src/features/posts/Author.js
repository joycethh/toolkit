import React from "react";
import { useSelector } from "react-redux";
import { allUsers } from "../users/usersSlice";

const Author = ({ userId }) => {
  const users = useSelector(allUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "Unknow author"} </span>;
};

export default Author;
