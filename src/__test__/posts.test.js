import { mount } from "enzyme";
import moxios from "moxios";
import PostsComponent from "../PostsComponent";
import { store } from "../redux/store";
import * as postsActions from "../redux/slices/postsSlice"
import { posts } from "./mock/data";
import { mockResponse, WrapProvider } from "./mock/utils";
import axios from "../api/axios";


describe.skip("PostsComponent", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should render the posts", async () => {
    mockResponse({
      status: 200,
      response: posts,
    })

    await store.dispatch(postsActions.fetchPosts());
    const wrapper = mount(WrapProvider(<PostsComponent />));
    expect(wrapper.find("Col.post").length).toBeGreaterThan(0);
  });

  it("should delete the post", async () => {
    mockResponse({
      status: 200,
      response: posts,
    })

    await store.dispatch(postsActions.fetchPosts());
    const wrapper = mount(WrapProvider(<PostsComponent />));
    wrapper.find("Col.post").first().find('Button.delete').simulate('click');
    expect(wrapper.find("Col.post").length).toBe(posts.length - 1);
  });
});
