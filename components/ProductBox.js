import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

const ProductBox = (props) => {

    return <TouchableOpacity
        onPress={props.showDetail}
        style={styles.box}>
        <View style={styles.imageBox}>
            <View style={styles.liteBox}>
                <Image
                    style={styles.image}
                    source={{
                        uri: props.imageDefault,
                    }}
                />
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
        width: '50%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    innerBox: {
        marginTop: 20,
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
        width: '50%',
        height: 115,
        position: 'absolute',
        bottom: 16
    },
    imageBox: {
        height: 115
    },
    liteBox: {
        backgroundColor: '#69a69c',
        alignItems: 'center',
        margin: 10,
        marginTop: 20,
        borderRadius: 16,
        height: 115,
    }
});

export default ProductBox;