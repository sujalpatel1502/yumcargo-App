import { View, Text, StyleSheet, Animated, Image, SafeAreaView, Keyboard, Alert } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import { resetAndNavigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import CustomInput from '@components/ui/CustomInput'
import CustomButton from '@components/ui/CustomButton'
import useKeyboardOffsetHeight from '@utils/useKeyBoardOffestHeight'
import { RFValue } from 'react-native-responsive-fontsize'
import { customerLogin } from '@service/authService'


const CustomerLogin:FC = () => {
    const [phoneNumber,setPhoneNumber]=useState('');
    const [loading,setLoading]=useState(false)

    const [gestureSequence,setGestureSequence]=useState<string []>([])

    const keyboardOffsetHeight = useKeyboardOffsetHeight();

    const handleGesture=({nativeEvent}:any)=>{
        if(nativeEvent.state === State.END){
            const{translationX,translationY}=nativeEvent;
            let direction =''
            if(Math.abs(translationX)>Math.abs(translationY)){
                direction=translationX>0?'right':'left'
            } else{
                direction=translationY>0?'down':'up'
            }

            console.log(translationX,translationY,direction)

            const newSequence=[...gestureSequence,direction].slice(-5)
            setGestureSequence(newSequence);
            if(newSequence.join(' ')==='up up down left right'){
                setGestureSequence([])
                resetAndNavigate('DeliveryLogin')
            }
        }
    }

    const animatedValue=useRef(new Animated.Value(0)).current

    useEffect(()=>{
        if(keyboardOffsetHeight==0){
            Animated.timing(animatedValue,{
                toValue:0,
                duration:500,
                useNativeDriver:true
            }).start()
        }else{
            Animated.timing(animatedValue,{
                toValue:-keyboardOffsetHeight *0.84,
                duration:1000,
                useNativeDriver:true
        }).start()
    }
    },[keyboardOffsetHeight])

    const handleAuth=async()=>{
        Keyboard.dismiss();
        setLoading(true)
        try {
            await customerLogin(phoneNumber)
            resetAndNavigate('ProductDashboard')
        } catch (error) {
            Alert.alert("Login Failed")
        }finally{
            setLoading(false)
        }

    }
  return (
    <GestureHandlerRootView
    style={styles.container}
    >
        <View style={styles.container}>
            <CustomSafeAreaView>
            <ProductSlider/>
            <PanGestureHandler onHandlerStateChange={handleGesture}>
                <Animated.ScrollView
                bounces={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.subContainer}
                style={{transform:[{translateY:animatedValue}]}}
                >
                    <View style={styles.content}>
                        <Image source={require('@assets/images/logo.png')} style={styles.logo}/>
                        <CustomText variant='h2' fontFamily={Fonts.Bold}>India's last minute app</CustomText>
                        <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>Log in or sign up</CustomText>

                        <CustomInput
                        onChangeText={(text)=>{setPhoneNumber(text.slice(0,10))}}
                        onClear={()=>setPhoneNumber('')}
                        value={phoneNumber}
                        left={
                            <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={{
                                    marginLeft:10
                            }}>
                                +91
                            </CustomText>
                        }
                        placeholder='Enter mobile number'
                        inputMode='numeric'
                        />
                        <CustomButton
                        disabled={phoneNumber?.length!=10}
                        onPress={()=>{handleAuth()}}
                        loading={loading}
                        title='continue'/>
                    </View>


                </Animated.ScrollView>
            </PanGestureHandler>
            </CustomSafeAreaView>


            <View style={styles.footer}>
                <SafeAreaView>
                    <CustomText fontSize={RFValue(6)}>

                        By Continuing you agree to our terms
                    </CustomText>
                </SafeAreaView>

            </View>
        
        </View>
      
    </GestureHandlerRootView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        marginTop:2,
        marginBottom:25,
        opacity:0.8
    },
    subContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20
    },
    logo:{
        height:50,
        width:50,
        borderRadius:20,
        marginVertical:10
    },
    content:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        backgroundColor:"white",
        paddingHorizontal:20,
        paddingBottom:20,
        position:"absolute",
        bottom:10
    },
    footer:{
        borderTopWidth:0.8,
        borderColor:Colors.border,
        paddingBottom:10,
        zIndex:22,
        position:"absolute",
        bottom:0,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:"#f8f9fc",
        width:"100%"
    }
})

export default CustomerLogin