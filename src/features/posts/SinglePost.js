import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PostAuthor from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./Reactions";
import { selectPostById } from "./postsSlice";

const SinglePost = ({ post }) => {
  const postId = useParams();
  const dispatch = useDispatch();
  const seletedPost = useSelector((state) =>
    selectPostById(state, Number(postId))
  );

  if (!seletedPost) {
    return (
      <section>
        <h1>Post not found!</h1>
      </section>
    );
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
export default SinglePost;
