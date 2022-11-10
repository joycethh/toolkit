import { Routes, Route } from "react-router-dom";
import PostLists from "./features/posts/PostLists";
import Form from "./features/posts/Form";
import SinglePost from "./features/posts/SinglePost";
import Layout from "./components/Layout";
import UpdatePost from "./features/posts/UpdatePost";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostLists />} />

        <Route path="post">
          <Route index element={<Form />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<UpdatePost />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
