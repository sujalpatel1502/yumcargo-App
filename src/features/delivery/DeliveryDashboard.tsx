import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '@state/authStore'

const DeliveryDashboard = () => {
  const {user}=useAuthStore()
  console.log("user",user)
  return (
    <View>
      <Text>DeliveryDashboard</Text>
    </View>
  )
}

export default DeliveryDashboard