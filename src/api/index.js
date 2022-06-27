import axios from "../api/axios";

export const url = (path) => {
    return `https://jsonplaceholder.typicode.com/${path}`
}

export const getPosts = () => {
    return axios.get("posts");
}

export const deletePostById = (id) => {
    return axios.delete(`posts/${id}`);
}