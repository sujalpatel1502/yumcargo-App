import { hocStyles } from "@styles/globalStyles"
import { FC, useEffect, useRef, useState } from "react"
import { Animated } from "react-native"


interface CartAnimationWrapperProps{
    cartCount:number
    children:React.ReactNode
}

const CartAnimationWrapper:FC<CartAnimationWrapperProps>=({cartCount,children})=>{
    const slideAnim=useRef(new Animated.Value(0)).current
    const [hasAnimated,setHsAnimated]=useState(false)
    useEffect(()=>{
        if(cartCount>0 && !hasAnimated){
            Animated.timing(slideAnim,{
                toValue:1,
                duration:300,
                useNativeDriver:true
            }).start(()=>{
                setHsAnimated(true)
            })
        }else if(cartCount===0 && hasAnimated){
            Animated.timing(slideAnim,{
                toValue:0,
                duration:300,
                useNativeDriver:true
            }).start(()=>{
                setHsAnimated(false)
            })
        }
    },[cartCount,hasAnimated])

    const slideUpStyle={
        transform:[
            {translateY:slideAnim.interpolate({
                inputRange:[0,1],
                outputRange:[100,0]
            })}
        ],
        opacity:slideAnim
    }
    return(
        <Animated.View style={[hocStyles.cartContainer,slideUpStyle]}>{children}</Animated.View>
    )
}


export default CartAnimationWrapper