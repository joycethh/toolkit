import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./Reactions";
let PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Details</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

PostsExcerpt = React.memo(PostsExcerpt);

export default PostsExcerpt;
