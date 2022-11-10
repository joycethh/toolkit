import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import PostAuthor from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./Reactions";
import { selectPostById, deletePost } from "./postsSlice";

const SinglePost = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const handleDelete = () => {
    dispatch(deletePost(seletedPost.id));
    console.log("dispatch should be fired");
  };
  return (
    <article>
      <h3>{seletedPost.title}</h3>
      <p>{seletedPost.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${seletedPost.id}`}>Edit Post</Link>
        <PostAuthor userId={seletedPost.userId} />
        <TimeAgo timestamp={seletedPost.date} />
      </p>
      <button onClick={handleDelete}>Delete</button>
      <ReactionButtons post={seletedPost} />
    </article>
  );
};
export default SinglePost;
