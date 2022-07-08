import axios from "axios";
const server = "http://localhost:5500/api/"

const get = (url)=>{
   return axios.get(`${server}${url}`)
} 

const post =(url, data)=>{
  return  axios.post(`${server}${url}`, data)
}

const update =(url, data)=>{
   return axios.put(`${server}${url}`, data)
}

const deleteItem = (url)=>{
    return axios.delete(`${server}${url}`)
}

export {get, post, update, deleteItem}