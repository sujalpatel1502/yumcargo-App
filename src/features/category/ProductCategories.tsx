import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors } from '@utils/Constants'
import Sidebar from './Sidebar'
import { getAllCategories, getProductsByCategoryId } from '@service/productService'
import ProductList from './ProductList'
import withCart from '@features/cart/WithCart'

const ProductCategories = () => {
    const[categories,setCategories]=useState<any[]>([])
    const[selectedCategory,setSelectedCategory]=useState<any>(null)
    const[products,setProducts]=useState<any[]>([])
    const[categoriesLoading,setCategoriesLoading]=useState<boolean>(true)
    const[productsLoading,setproductsLoading]=useState<boolean>(false)

const fetchCategories=async()=>{
    try {
        setCategoriesLoading(true)
        const data=await getAllCategories()
        setCategories(data)
        // console.log("dataaa",data)
        if(data && data.length>0){
            setSelectedCategory(data[0])
        }
    } catch (error) {
        console.error("Error fetching Categories",error)
    }finally{
        setCategoriesLoading(false)
    }
}

useEffect(()=>{
    fetchCategories()
},[])


const fetchProducts=async(categoryId:string)=>{
    try {
        setproductsLoading(true)
        const data=await getProductsByCategoryId(categoryId)
        // console.log("dataaaa of products",data)
        setProducts(data)
    } catch (error) {
        console.error("Error fetching products",error)
    }finally{
        setproductsLoading(false)
    }
}

useEffect(()=>{
    if(selectedCategory?._id){
        fetchProducts(selectedCategory?._id)
    }
},[selectedCategory])



  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || "Categories"} search/>
      <View style={styles.subContainer}>
        {
            categoriesLoading?(
                <ActivityIndicator size="small" color={Colors.border}/>
            ):(
                <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryPress={(category:any)=>setSelectedCategory(category)}
                />
            )
        }

{
            productsLoading?(
                <ActivityIndicator size="large" color={Colors.border} style={styles.center}/>
            ):(
                <ProductList
                data={products || []}
                />
            )
        }
      </View>
    </View>
  )
}

export default withCart(ProductCategories)

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"white"
    },
    subContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})