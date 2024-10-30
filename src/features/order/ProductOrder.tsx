import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomHeader from '@components/ui/CustomHeader'
import OrderList from './OrderList'
import { useCartStore } from '@state/cartStore'
import BillDetails from './BillDetails'
import CustomText from '@components/ui/CustomText'
import { hocStyles } from '@styles/globalStyles'
import { useAuthStore } from '@state/authStore'
import { RFValue } from 'react-native-responsive-fontsize'
import ArrowButton from '@components/ui/ArrowButton'
import { navigate } from '@utils/NavigationUtils'
import { createOrder } from '@service/orderService'

const ProductOrder:FC = () => {
    const {getTotalPrice,cart,clearCart}=useCartStore()
    const {user,setCurrentOrder,currentOrder}=useAuthStore()
    const totalItemPrice =getTotalPrice()
    const [loading,setLoading]=useState(false)

    const handlePlaceOrder=async()=>{
        if(currentOrder!==null){
            Alert.alert("Let your first order to be delivered")
            return
        }
        const formattedData=cart.map(item=>({
            id:item._id,
            item:item._id,
            count:item.count
        }))
        if(formattedData.length==0){
            Alert.alert("Add items to place order");
            return
        }
        setLoading(true)
        const data=await createOrder(formattedData,totalItemPrice)

        if(data!=null){
            console.log("dataaaaaa of order",data)
            setCurrentOrder(data)
            clearCart()
            navigate('OrderSuccess',{...data})
        }else{
            Alert.alert("There was an error")
        }
        setLoading(false)
    }
  return (
    <View style={styles.container}>
        <CustomHeader title='Checkout'/>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList/>

        <BillDetails totalItemPrice={totalItemPrice}/>

        <View style={styles.flexRowBetween}>
            <View>
                <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={{textAlign:'left'}}> 
                Cancellation Policy
                </CustomText>
                <CustomText variant='h9' style={styles.cancelText} fontFamily={Fonts.SemiBold}> 
                Orders cannot be cancelled once packed for delivery
                </CustomText>
            </View>
        </View>
       </ScrollView>

       <View style={hocStyles.cartContainer}>
            <View style={styles.absoluteContainer}>
                <View style={styles.addressContainer}>
                    <View style={styles.flexRow}>
                        <Image source={require('@assets/icons/home.png')} style={{width:20,height:20}}/>
                        <View style={{width:'75%'}}>
                            <CustomText variant='h8' style={{textAlign:'left'}} fontFamily={Fonts.Medium}>Delivering to Home</CustomText>
                            <CustomText variant='h8' fontFamily={Fonts.Medium} numberOfLines={2} style={{opacity:0.6,textAlign:'left'}}>{user?.address}</CustomText>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <CustomText variant='h8' style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>Change</CustomText>
                    </TouchableOpacity>
                </View>


                <View style={styles.paymentGateway}>
                    <View style={{width:'30%'}}>
                        <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular} style={{textAlign:'left'}}>💵 PAY USING</CustomText>
                        <CustomText fontFamily={Fonts.Regular} variant='h9' style={{marginTop:2,textAlign:'left'}}>Cash on Delivery</CustomText>
                    </View>
                    <View style={{width:'70%'}}>
                        <ArrowButton
                        loading={loading}
                        price={totalItemPrice}
                        title='Place Order'
                        onPress={async()=>{
                            await handlePlaceOrder()
                        }}
                        />
                    </View>

                </View>

            </View>
       </View>
    </View>
  )
}

export default ProductOrder

const styles = StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'#fff'
    },
    absoluteContainer:{
        marginVertical:15,
        marginBottom:Platform.OS=='ios'?30:10
    },
    flexRow:{
        alignItems:'center',
        flexDirection:'row',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12
    },
    scrollContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        paddingBottom:250
    },
    flexRowBetween:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:'row'
    },
    cancelText:{
        marginTop:4,
        opacity:0.6,
        
    },
    addressContainer:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingBottom:10,
        borderBottomWidth:0.7,
        borderColor:Colors.border
    },
    paymentGateway:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:14
    }
})