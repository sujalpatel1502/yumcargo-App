import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAuthStore } from '@state/authStore'
import { getOrderById } from '@service/orderService';
import { Colors, Fonts } from '@utils/Constants';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import withLiveStatus from './withLiveStatus';

const LiveTracking:FC = () => {
    const {currentOrder,setCurrentOrder}=useAuthStore();
    // console.log("currrr",currentOrder)
    const fetchOrderDetails=async()=>{
        const data=await getOrderById(currentOrder?._id as any)
        // console.log("dataaa",data)
        setCurrentOrder(data)
    }

    useEffect(()=>{
        fetchOrderDetails()
    },[])

    let msg="packing your order"
    let time="Arriving in 10 minutes"
    if(currentOrder?.status=='confirmed'){
        msg="Arriving soon"
        time="Arriving in 8 minutes"
    }else if(currentOrder?.status=='arriving'){
        msg="Order Picked up"
        time="Arriving in 6 minutes"
    }else if(currentOrder?.status=='arriving'){
        msg="Order Delivered"
        time="Fastest Delivery ⚡️"
    }
  return (
    <View style={styles.container}>
      <LiveHeader
      type="Customer" title={msg} secondTitle={time}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <LiveMap/>
            <View style={styles.flexRow}>
                <View style={styles.iconContainer}>
                    <Icon name={currentOrder?.deliveryPartner?'phone':'shopping'} color={Colors.disabled} size={RFValue(20)}/>
                    </View>
                    <View style={{width:'82%'}}>

                   

                    {/* {
                        currentOrder?.deliveryPartner && */}
                        <CustomText numberOfLines={1} variant='h7' fontFamily={Fonts.SemiBold} style={{textAlign:'left'}}>
                            {currentOrder?.deliveryPartner?.name || "We will assign delivery partner soon"}
                        </CustomText>
                    {/* } */}

                    {
                        currentOrder?.deliveryPartner &&
                        <CustomText variant='h7' fontFamily={Fonts.Medium}>
                            {currentOrder?.deliveryPartner?.phone}
                        </CustomText>
                    }
{/* 
{
                        currentOrder?.deliveryPartner && */}
                        <CustomText variant='h9' fontFamily={Fonts.Medium} style={{textAlign:'left'}}>
                            {currentOrder?.deliveryPartner ? "For Delivery instructions you can contact here":msg }
                        </CustomText>
                    {/* } */}
                     </View>
            </View>
            <DeliveryDetails details={currentOrder?.customer}/>
            <OrderSummary order={currentOrder}/>
            <CustomText
      variant='h6'
      fontFamily={Fonts.SemiBold}

      style={{textAlign:'left',opacity:0.6,
        marginTop:20
      }}
      >
        Sujal Patel X Blinkit
      </CustomText>
      </ScrollView>
    </View>
  )
}

export default withLiveStatus(LiveTracking)

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.secondary
    },
    scrollContent:{
        paddingBottom:150,
        backgroundColor:Colors.backgroundSecondary,
        padding:15
    },
    flexRow:{
        flexDirection:'row',
        // justifyContent:"center",
        alignItems:"center",
        gap:10,
        width:'100%',
        borderRadius:15,
        marginTop:15,
        paddingVertical:10,
        backgroundColor:'#fff',
        padding:10,
        borderBottomWidth:0.7,
        borderColor:Colors.border

    },
    iconContainer:{
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100,
        padding:10,
        justifyContent:"center",
        alignItems:'center'
    }
})