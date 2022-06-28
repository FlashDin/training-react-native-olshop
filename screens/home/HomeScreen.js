import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProductScreen from "./ProductScreen";
import ProductDetailScreen from "../product-detail/ProductDetailScreen";
import ProductDetailScrollViewScreen from "../product-detail/ProductDetailScrollViewScreen";
import SearchScreen from "./SearchSceen";
import {Text, Button} from "react-native";

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {

    return <Stack.Navigator initialRouteName="Home"
                            screenOptions={{
                                headerShown: false
                            }}
    >
        <Stack.Screen name="Product" component={ProductScreen}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen}/>
        <Stack.Screen name="ProductDetailScrollView" component={ProductDetailScrollViewScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
    </Stack.Navigator>
};
export default HomeScreen