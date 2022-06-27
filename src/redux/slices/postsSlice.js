import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../api";

export const postsInitialState = {
  posts: [],
  error: null,
  loading: false
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const res = await getPosts();
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    deleteAllPosts: (state, action) => {
      state.posts = [];
    },
    setPostsError: (state, action) => {
      state.error = null;
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
        state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
        state.posts = action.payload;
        state.loading = false;
    },
    [fetchPosts.rejected]: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    }
  }
});

export const { deletePost, setPostsError, deleteAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
