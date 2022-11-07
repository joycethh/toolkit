import React from "react";
import { useSelector } from "react-redux";
import { allPosts } from "./postsSlice";
import Author from "./Author";
import TimeAgo from "./TimeAgo";
export const PostLists = () => {
  const posts = useSelector(allPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p className="postCredit">
        <Author userId={post.userId} />
        <TimeAgo timestamp={post.date} />
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
