import axios from 'axios';
import { uniqid } from './GlobalHelpers';

// Constants
const API_URL = process.env.NODE_ENV === 'production' ? 'https://appreadable.herokuapp.com' : 'http://localhost:3001';
const AUTHTOKEN = uniqid('auth_');
const AUTHORIZATION = window.localStorage.getItem('auth') === null ? AUTHTOKEN : window.localStorage.getItem('auth');

if (window.localStorage.getItem('auth') === null) {
    window.localStorage.setItem('auth', AUTHTOKEN);
}

// Set default authorization header
axios.defaults.headers.common['Authorization'] = AUTHORIZATION;

// GET /posts
export const getPosts = () => axios.get(`${API_URL}/posts`);

// GET /categories
export const getCategories = () => axios.get(`${API_URL}/categories`);

// PUT /categories
export const addCategory = body => axios.put(`${API_URL}/categories`, {
    ...body
});

// GET /:category/posts
export const getPostsByCategory = category => axios.get(`${API_URL}/${category}/posts`);

// POST /posts
/* PARAMS:
    id - UUID should be fine, but any unique id will work
    timestamp - timestamp in whatever format you like, you can use Date.now() if you like
    title - String
    body - String
    author - String
    category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
 */
export const addPost = body => axios.post(`${API_URL}/posts`, {
    ...body
});

// GET /posts/:id
export const getSinglePost = id => axios.get(`${API_URL}/posts/${id}`);

// POST /posts/:id
/* PARAMS:
    option - String: Either "upVote" or "downVote"
 */
export const voteOnPost = (id, option) => axios.post(`${API_URL}/posts/${id}`, {
    option
});

// PUT /posts/:id
/* PARAMS:
    title - String
    body - String
*/
export const editPost = (id, body) => axios.put(`${API_URL}/posts/${id}`, {
    ...body
});

// PUT /posts/:id/favorite
export const favoritePost = id => axios.put(`${API_URL}/posts/${id}/favorite`)

// DELETE /posts/:id
export const deletePost = id => axios.delete(`${API_URL}/posts/${id}`);

// POST /posts/:id/publish
export const publishPost = id => axios.post(`${API_URL}/posts/${id}/publish`);

// GET /posts/:id/comments
export const getComments = id => axios.get(`${API_URL}/posts/${id}/comments`);

// POST /comments
/* PARAMS:
    id: Any unique ID. As with posts, UUID is probably the best here.
    timestamp: timestamp. Get this however you want.
    body: String
    author: String
    parentId: Should match a post id in the database.
*/
export const addComment = body => axios.post(`${API_URL}/comments`, {
    ...body
});

// GET /comments/:id
export const getComment = id => axios.post(`${API_URL}/comments/${id}`);

// POST /comments/:id
/* PARAMS:
    option - String: Either "upVote" or "downVote"
*/
export const voteOnComment = (id, option) => axios.post(`${API_URL}/comments/${id}`, {
    option
});

// PUT /comments/:id
/* PARAMS:
    timestamp: timestamp. Get this however you want.
    body: String
*/
export const editComment = (id, body) => axios.put(`${API_URL}/comments/${id}`, {
    ...body
});

// DELETE /comments/:id
export const deleteComment = id => axios.delete(`${API_URL}/comments/${id}`);

// PUT /comments/:id/publish
export const publishComment = id => axios.put(`${API_URL}/comments/${id}/publish`);

// Get initial data
export const getInitialData = () => Promise.all([
    getPosts(),
    getCategories(),
]).then(([posts, categories]) => ({
    posts,
    categories
}))