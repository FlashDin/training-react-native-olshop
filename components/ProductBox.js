import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

const ProductBox = (props) => {

    return <TouchableOpacity
        onPress={props.showDetail}
        style={styles.box}>
        <View style={styles.imageBox}>
            <Image
                style={styles.image}
                source={{
                    uri: props.imageDefault,
                }}
            />
            <View style={styles.liteBox}>

            </View>
        </View>
        <View style={styles.innerBox}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.price}>
                {props.price}
            </Text>
        </View>
    </TouchableOpacity>;
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#fff",
        margin: 4,
        minHeight: 250,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#fff",
        width: '50%'
    },
    innerBox: {
        padding: 10
    },
    title: {
        margin: 4
    },
    price: {
        color: "#81C784",
        margin: 4
    },
    image: {
        width: '100%',
        height: 115,
    },
    imageBox: {
        height: 115
    },
    liteBox: {

    }
});

export default ProductBox;