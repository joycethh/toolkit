import React from "react";
import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";
export const PostLists = () => {
  const posts = useSelector(allPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </article>
  ));
  return (
    <section>
      <h2>Posts Lists</h2>
      {renderedPosts}
    </section>
  );
};

export default PostLists;
