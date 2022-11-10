import React from "react";
import { useSelector } from "react-redux";
import { allPosts, getPostsError, getPostsStatus } from "./postsSlice";
import { selectPostIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

export const PostLists = () => {
  // const posts = useSelector(allPosts);
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    // content = orderedPosts.map((post) => (
    //   <PostsExcerpt key={post.id} post={post} />
    // ));
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return <section>{content}</section>;
};

export default PostLists;
