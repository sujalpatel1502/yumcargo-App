import axios from "axios";
import { BASE_URL } from "./config";



export const getAllCategories = async()=>{
    // console.log("baseeee",BASE_URL,phone)
    try {
        const response = await axios.get(`${BASE_URL}/categories`)
        return response.data
    } catch (error) {
        console.error("Categories Error",error)
        return []
    }
}

export const getProductsByCategoryId = async(id:string)=>{
    // console.log("baseeee",BASE_URL,phone)
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`)
        return response.data
    } catch (error) {
        console.error("Categories Error",error)
        return []
    }
}