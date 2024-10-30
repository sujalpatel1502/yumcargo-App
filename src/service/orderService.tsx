import { appAxios } from "./apiInterceptors"

export const createOrder = async(items:any,totalPrice:number)=>{
    
    try {
        const response = await appAxios.post(`/order`,{
            items:items,
            branch:"670b86136f1ef7dd6f010051",
            totalPrice:totalPrice
        })
        return response.data
    } catch (error) {
        console.log("Create Order Error",error)
        return null
    }
}

export const getOrderById = async(id:string)=>{
    console.log("iddd",id)
    
    try {
        const response = await appAxios.get(`/order/${id}`)
        // console.log("responseeee",response)
        return response.data
    } catch (error) {
        console.log("get Order by id Error",error)
        return null
    }
}

export const fetchCustomerOrders = async(userId:string)=>{
    try {
        const response = await appAxios.get(`/order?customerId=${userId}`)
        // console.log("responseeee",response)
        return response.data
    } catch (error) {
        console.log("get customer Order by id Error",error)
        return null
    }
}