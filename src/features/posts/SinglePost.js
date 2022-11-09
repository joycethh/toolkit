import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import PostAuthor from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./Reactions";
import { selectPostById } from "./postsSlice";

const SinglePost = ({ post }) => {
  const { postId } = useParams();
  console.log("postId", postId);
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
      <h3>{seletedPost.title}</h3>
      <p>{seletedPost.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${seletedPost.id}`}>Edit Post</Link>
        <PostAuthor userId={seletedPost.userId} />
        <TimeAgo timestamp={seletedPost.date} />
      </p>
      <ReactionButtons post={seletedPost} />
    </article>
  );
};
export default SinglePost;
