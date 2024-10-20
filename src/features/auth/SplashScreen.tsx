import React, { FC, useEffect } from 'react'
import { View, Image, StyleSheet, Alert } from 'react-native'
import { Colors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Logo from "@assets/images/splash_logo.jpeg"
import Geolocation from "@react-native-community/geolocation"
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { resetAndNavigate } from '@utils/NavigationUtils'

const SplashScreen: FC = () => {
const {user,setUser}= useAuthStore()

const tokenCheck=async()=>{
    const accessToken=tokenStorage.getString('accessToken') as string
    const refreshToken=tokenStorage.getString('refreshToken') as string

    if(accessToken){

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