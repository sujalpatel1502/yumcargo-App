import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { adData, categories } from '@utils/dummyData'
import AdCarousel from './AdCarousel'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCarousel adData={adData}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={{textAlign:"left"}}>
            Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={{textAlign:"left"}}>
            BestSellers
      </CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={{textAlign:"left"}}>
            Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={{textAlign:"left"}}>
            Home & Lifestyle
      </CustomText>
      <CategoryContainer data={categories}/>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20
    }
})