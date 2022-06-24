import moxios from "moxios";
import { deletePost, fetchPosts } from "../../redux/slices/postsSlice";
import { store } from "../../redux/store";
import { posts } from "../mock/data";
import { mockResponse } from "../mock/utils";

describe("Posts redux", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should update the posts correctly", async () => {
    mockResponse({
      status: 200,
      response: posts,
    });

    await store.dispatch(fetchPosts());
    const state = store.getState();
    expect(state.posts.posts).toEqual(posts);
  });

  it("should delete the post", async () => {
    const payload = posts;

    const expectedState = posts.slice(0, 2);

    mockResponse({
      status: 200,
      response: payload,
    });

    await store.dispatch(fetchPosts());
    await store.dispatch(deletePost({ id: 3 }));
    const state = store.getState();

    expect(state.posts.posts).toEqual(expectedState);
  });
});
