import axios from "../api/axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com";
export const url = (path) => {
    return `${BASE_URL}/${path}`
}

export const getPosts = () => {
    return axios.get("posts");
}

export const deletePostById = (id) => {
    return axios.delete(`posts/${id}`);
}