import { useEffect, useState } from "react";
import { Keyboard } from "react-native";


export default function useKeyboardOffsetHeight(){
    const [keyboardOffsetHeight,setkeyboardOffsetHeight]=useState(0)

    useEffect(()=>{

        const keyboardWillAndroidShowListener=Keyboard.addListener(
            'keyboardDidShow',e=>{
                setkeyboardOffsetHeight(e.endCoordinates.height)
            }
        )

        const keyboardWillAndroidHideListener=Keyboard.addListener(
            'keyboardDidHide',e=>{
                setkeyboardOffsetHeight(0)
            }
        )

        const keyboardWillShowListener=Keyboard.addListener(
            'keyboardWillShow',e=>{
                setkeyboardOffsetHeight(e.endCoordinates.height)
            }
        )

        const keyboardWillHideListener=Keyboard.addListener(
            'keyboardWillHide',e=>{
                setkeyboardOffsetHeight(e.endCoordinates.height)
            }
        )

        return ()=>{
            keyboardWillAndroidHideListener.remove()
            keyboardWillAndroidShowListener.remove()
            keyboardWillHideListener.remove()
            keyboardWillShowListener.remove()
        }

    },[])

    return keyboardOffsetHeight
}