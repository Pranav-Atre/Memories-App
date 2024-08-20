import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});   

API.interceptors.request.use((req)=>{
   if(localStorage.getItem("profile")){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
   }
   return req;
})

export const fetchPost = (id)=>{ return API.get(`/posts/${id}`)};
export const fetchPosts = (page)=>{ return API.get(`/posts?page=${page}`)};
export const fetchPostsBySearch = (searchQuery)=>{ 
   
   return API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
};
export const makePosts = (newPost)=>API.post('/posts',newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData)=> API.post('/user/signIn', formData);
export const signUp = (formData)=> API.post('/user/signUp', formData);  

export const comment = (value, id)=> API.post(`/posts/${id}/comment`, {value});