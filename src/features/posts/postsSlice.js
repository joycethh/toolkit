import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
};

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});

export const addPost = createAsyncThunk("/posts/addPost", async (newPost) => {
  try {
    const response = await axios.post(POSTS_URL, newPost);

    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updatePost = createAsyncThunk(
  "/posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "/posts/deletePost",
  async (post) => {
    const { id } = post.id;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      console.log("delete response", response);
      if (response?.status === 200) return post;
      return `${response?.status}`;
    } catch (error) {
      return error.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const seletedPost = state.posts.find((post) => post.id === postId);
      if (seletedPost) {
        seletedPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log("updatePost action.payload", action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const restPosts = state.posts.filter((post) => post.id !== id);
        state.posts = [...restPosts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("delete post is not complete");
          return;
        }
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload?.id
        );
        console.log("state.posts", state.posts);
      });
  },
});

console.log("postsSlice", postsSlice);

export const allPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

//memoized selector
export const selectPostsByUser = createSelector(
  [allPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
export const { increaseCount, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
