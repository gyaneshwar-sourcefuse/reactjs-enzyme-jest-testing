import moxios from "moxios";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export const WrapProvider = (OriginalComponent) => {
  return <Provider store={store}>{OriginalComponent}</Provider>;
};

/**
 * 
 * @param {object} data { status: number, response: object } 
 */
export const mockResponse = (data) => {
  return moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith(data);
  });
};

/**
 * 
 * @param {string} url api url 
 * @param {*} data { status: number, response: object } 
 */
export const mockApi = (url, data) => {
  return moxios.stubRequest(url, data);
}

export const mockWait = (cb, timeout = 0) => {
  moxios.wait(() => {
    cb();
  }, timeout)
}