import PostLists from "./features/posts/PostLists";
import Form from "./features/posts/Form";
const App = () => {
  return (
    <main className="app">
      <Form />
      <PostLists />
    </main>
  );
};

export default App;
