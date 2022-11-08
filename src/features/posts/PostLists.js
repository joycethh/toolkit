import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allPosts,
  fetchPosts,
  getPostsError,
  getPostsStatus,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

export const PostLists = () => {
  const dispatch = useDispatch();

  const posts = useSelector(allPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [dispatch, postsStatus]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts Lists</h2>
      {content}
    </section>
  );
};

export default PostLists;
