import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/Scaling'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import  { Svg,Defs, G, Path, Use } from 'react-native-svg'
import { wavyData } from '@utils/dummyData'

const Notice:FC = () => {
  return (
    <View style={{height:NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
            <SafeAreaView style={{padding:10}}>
                <CustomText style={styles.heading} variant='h8' fontFamily={Fonts.SemiBold}>
                    It's raining near this location
                </CustomText>
                <CustomText style={styles.textCenter} variant='h9'>
                    Our delivery partner may take longer to reach you
                </CustomText>
            </SafeAreaView>
        </View>
      </View>
       
    </View>
  )
}

export default Notice

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#CCD5E4"
    },
    noticeContainer:{
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:"#CCD5E4"
    },
    textCenter:{
        textAlign:"center",
        marginBottom:8
    },
    heading:{
        color:"#2D3875",
        marginBottom:8
    }
})