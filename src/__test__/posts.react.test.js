import { fireEvent, render, screen, within } from "@testing-library/react";
import moxios from "moxios";
import axios from "../api/axios";
import PostsComponent from "../PostsComponent";
import { mockResponse, WrapProvider } from "./mock/utils";
import { posts } from "./mock/data";
import { store } from "../redux/store";
import * as postsActions from "../redux/slices/postsSlice";

describe("PostsComponent", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should render the posts", async () => {
    mockResponse({
      status: 200,
      response: posts,
    });
    await store.dispatch(postsActions.fetchPosts());
    render(WrapProvider(<PostsComponent />));
    const postsRendered = screen.queryAllByTestId("post");
    expect(postsRendered).toHaveLength(posts.length);
  });

  test("should delete the post", async () => {
    mockResponse({
      status: 200,
      response: posts,
    });
    await store.dispatch(postsActions.fetchPosts());
    render(WrapProvider(<PostsComponent />));
    const postsRendered = screen.queryAllByTestId("post");

    expect(postsRendered).toHaveLength(posts.length);

    fireEvent.click(within(postsRendered[0]).getByText("Remove"));

    const updatedPosts = screen.queryAllByTestId("post");
    expect(updatedPosts).toHaveLength(posts.length - 1);
  });
});
