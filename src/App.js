import { Routes, Route } from "react-router-dom";
import PostLists from "./features/posts/PostLists";
import Form from "./features/posts/Form";
import SinglePost from "./features/posts/SinglePost";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostLists />} />

        <Route path="post">
          <Route index element={<Form />} />
          <Route path=":postId" element={<SinglePost />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
