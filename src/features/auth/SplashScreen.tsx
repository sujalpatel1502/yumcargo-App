import React, { FC, useEffect } from 'react'
import { View, Image, StyleSheet, Alert } from 'react-native'
import { Colors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Logo from "@assets/images/splash_logo.jpeg"
import Geolocation from "@react-native-community/geolocation"
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import {jwtDecode} from 'jwt-decode'
import { refetchUser, refresh_tokens } from '@service/authService'


interface DecodedToken{
  exp:number;
}

const SplashScreen: FC = () => {
const {user,setUser}= useAuthStore()

const tokenCheck=async()=>{
    const accessToken=tokenStorage.getString('accessToken') as string
    const refreshToken=tokenStorage.getString('refreshToken') as string

    console.log("acessssssss",accessToken,refreshToken)

    if(accessToken){

      console.log("acessssssss",accessToken)
        const decodedAccessToken=jwtDecode<DecodedToken>(accessToken)
        const decodedRefreshToken=jwtDecode<DecodedToken>(refreshToken)


        const currentTime=Date.now()/1000;

        if(decodedRefreshToken?.exp < currentTime){
          resetAndNavigate('CustomerLogin');
          Alert.alert("Session Expired please login again")
          return false;
        }
        if(decodedAccessToken?.exp < currentTime){
          try {
            refresh_tokens()
            await refetchUser(setUser)
          } catch (error) {
            console.log("error",error)
            Alert.alert("There was error in refreshing the access token")
            return false;
          }
        }

        if(user?.role==='Customer'){
          resetAndNavigate("ProductDashboard")
        }else{
          resetAndNavigate("DeliveryDashboard")
        }


        return true;

    }
    resetAndNavigate("CustomerLogin")
    return false
}

// "react-native-mmkv": "^2.10.1",

  useEffect(() => {
    const fetchUserlocation = async () => {
      try {
        Geolocation.requestAuthorization()
        tokenCheck()
      } catch (error) {
        Alert.alert("Sorry give location access")
      }
    };

  const timeootId=setTimeout(fetchUserlocation,1000)
  return ()=> clearTimeout(timeootId)
  }, []);

 Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
  });

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: "contain"
  }
})

export default SplashScreen