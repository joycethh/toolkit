import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
//get the single user
//display posts belong to this user
//compare the post.userId to the userId

import { selectUserById } from "./usersSlice";
import {
  //   allPosts as selectAllPosts,
  selectPostsByUser,
} from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  //   const postsForUser = useSelector((state) => {
  //     const allPosts = selectAllPosts(state);
  //     return allPosts.filter((post) => post.userId === Number(userId));
  //   });

  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
