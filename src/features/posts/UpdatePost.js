import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { allUsers } from "../users/usersSlice";
import { updatePost, selectPostById } from "./postsSlice";
//1. get the seletedPost, populate the form witht the info
//1. get user's input
//2. send the updatedPost to api --dispatch
//3. navigate to the singlePost page

const UpdatePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const seletedToUpdate = useSelector((state) =>
    selectPostById(state, Number(postId))
  );

  const [title, setTitle] = useState(seletedToUpdate.title);
  const [content, setContent] = useState(seletedToUpdate.body);
  const [userId, setUserId] = useState(seletedToUpdate.userId);
  const users = useSelector(allUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ title, body: content, userId: userId, id: postId }));
  };

  return (
    <section>
      <h2>Update the Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={handleSubmit} disabled={!canSave}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default UpdatePost;
