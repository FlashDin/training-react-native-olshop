import React from "react";
import {AuthContext} from "../login/AuthContext";
import {View, TouchableOpacity, Text, Button, FlatList, SafeAreaView, TextInput} from "react-native";
import ProductBox from "../../components/ProductBox";
import {styles} from "../../components/Styles";

const ProductScreen = ({navigation: { goBack }, ...props}) => {
    const {signOut} = React.useContext(AuthContext);
    const [data, setData] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");

    const getProducts = (keyword) => {
        if (keyword !== "") {
            fetch(`http://192.168.56.1:3000/products?name_like=${keyword}`)
                .then((t) => t.json())
                .then((t) => {
                    setData(t);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setData([]);
        }
    };

    const searchBack = (keyword) => {
        // back to product screen
        // route.params.onGoBack(keyword);
        props.route.params.onGoBack(keyword);
        goBack();
    };

    const clearSearchField = () => {
        setSearchText("");
        getProducts("");
    };

    return <SafeAreaView style={styles.container}>
        {/*<Button*/}
        {/*title={"Sign Out"}*/}
        {/*onPress={signOut}*/}
        {/*/>*/}
        <View
            style={styles.viewInput}
        >
            <TextInput
                style={{
                    width: '100%'
                }}
                onChangeText={(value) => {
                    setSearchText(value);
                    getProducts(value);
                }}
                onSubmitEditing={() => {
                    searchBack(searchText);
                }}
                value={searchText}
            />
            <TouchableOpacity
                style={styles.clear}
                onPress={() => clearSearchField()}
            >
                <Text>x</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data={data}
            renderItem={({item}) =>
                <TouchableOpacity
                    onPress={() => {
                        searchBack(item.name);
                    }}
                >
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            }
        />

    </SafeAreaView>
};
export default ProductScreen