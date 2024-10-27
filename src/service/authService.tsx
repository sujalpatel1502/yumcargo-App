import axios from "axios"
import { BASE_URL } from "./config"
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";
import { resetAndNavigate } from "@utils/NavigationUtils";
import { appAxios } from "./apiInterceptors";

export const customerLogin = async(phone:string)=>{
    console.log("baseeee",BASE_URL,phone)
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`,{phone})
        console.log("response 000-----",response)
        const {accessToken,refreshToken,customer}=response.data;
        tokenStorage.set("accessToken",accessToken);
        tokenStorage.set("refreshToken",refreshToken);
        const{setUser}=useAuthStore.getState()
        console.log("ressss",response.data.customer)
        setUser(customer)
        // return response.data
    } catch (error) {
        console.log("Login Error",error)
    }
}


export const deliveryLogin = async(email:string,password:string)=>{
    // console.log("baseeee",BASE_URL,phone)
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`,{email,password})
        console.log("response 000-----",response)
        const {accessToken,refreshToken,deliveryPartner}=response.data;
        tokenStorage.set("accessToken",accessToken);
        tokenStorage.set("refreshToken",refreshToken);
        const{setUser}=useAuthStore.getState()
        console.log("ressss",response.data.customer,accessToken)
        setUser(deliveryPartner)
        // return response.data
    } catch (error) {
        console.log("Login Error",error)
    }
}


export const refetchUser = async(setUser:any)=>{
    
    try {
        const response = await appAxios.get(`/user`)

        setUser(response.data.user)
        
        
    } catch (error) {
        console.log("Login Error",error)
    }
}


export const refresh_tokens = async()=>{
    
    try {
        const refreshToken=tokenStorage.getString('refreshToken');
        const response =await axios.post(`${BASE_URL}/refresh-token`,{
            refreshToken
        })
        const new_access_token=response.data.accessToken;
        const new_refresh_token=response.data.refreshToken;
        tokenStorage.set("accessToken",new_access_token);
        tokenStorage.set("refreshToken",new_refresh_token);
        return new_access_token
    } catch (error) {
        console.log("Refresh Token error",error)
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
    }
}