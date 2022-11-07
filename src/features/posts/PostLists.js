import React from "react";
import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";
import Author from "./Author";
export const PostLists = () => {
  const posts = useSelector(allPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p className="postCredit">
        <Author userId={post.userId} />
      </p>
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
