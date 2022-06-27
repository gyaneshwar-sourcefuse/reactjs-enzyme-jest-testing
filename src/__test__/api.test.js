import axios from "../api/axios";
import moxios from "moxios";
import Sinon from "sinon";
import { url, getPosts, deletePostById } from "../api";
import { posts } from "./mock/data";
import { mockApi, mockWait } from "./mock/utils";

describe("API test", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it("should return the posts", (done) => {
    mockApi("posts", {
      status: 200,
      response: posts,
    });

    let onFulfilled = Sinon.spy();
    getPosts().then(onFulfilled);

    mockWait(() => {
      const response = onFulfilled.getCall(0).args[0].data;
      expect(response).toEqual(posts);
      done();
    });
  });

  it("should delete the post", (done) => {

    const post = posts[0];

    mockApi("posts/1", {
      status: 200,
      response: post,
    });

    let onFulfilled = Sinon.spy();
    deletePostById(post.id).then(onFulfilled);

    mockWait(() => {
      const response = onFulfilled.getCall(0).args[0].data;
      expect(response).toEqual(post);
      done();
    });
  });
});
