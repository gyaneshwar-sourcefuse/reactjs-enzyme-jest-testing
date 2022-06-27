import axios from "../../api/axios";
import { deletePost, fetchPosts, deleteAllPosts, setPostsError } from "../../redux/slices/postsSlice";
import { store } from "../../redux/store";
import { posts } from "../mock/data";
import MockAdapter from "axios-mock-adapter";

describe("Posts redux", () => {
  let mock;
  beforeEach( async () => {
    mock = new MockAdapter(axios);
    await store.dispatch(deleteAllPosts({ posts: [] }));
    await store.dispatch(setPostsError({ error: null }));
  });

  afterEach(() => {
    mock.reset();
  });

  it("should update the posts correctly", async () => {
    
    mock.onGet("posts").reply(200, posts);

    await store.dispatch(fetchPosts());
    const state = store.getState();
    expect(state.posts.posts).toEqual(posts);
  });

  it("should delete the post", async () => {
    const payload = posts;

    const expectedState = posts.slice(0, 2);

    mock.onGet("posts").reply(200, payload);

    await store.dispatch(fetchPosts());
    await store.dispatch(deletePost({ id: 3 }));
    const state = store.getState();

    expect(state.posts.posts).toEqual(expectedState);
  });

  it('should set error - fetchPosts', async () => {
    
    const error = { message: "Error fetching posts" };
    mock.onGet("posts").reply(500, error);
    
    await store.dispatch(fetchPosts())
    const state = store.getState();
    expect(state.posts.error).toEqual(error);
  });
});
