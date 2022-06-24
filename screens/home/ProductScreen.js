import React from "react";
import {AuthContext} from "../login/AuthContext";
import {View, Text, Button, FlatList, SafeAreaView, TextInput} from "react-native";
import ProductBox from "../../components/ProductBox";
import {styles} from "../../components/Styles";

const ProductScreen = ({navigation}) => {
    const {signOut} = React.useContext(AuthContext);
    const [data, setData] = React.useState([]);

    const getProducts = (keyword) => {
        console.log(keyword);
        return fetch(`http://192.168.56.1:3000/products?_embed=product_images?name_like=${keyword}`)
            .then((t) => t.json())
            .then((t) => {
                setData(t);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        getProducts();
    }, []);

    return <SafeAreaView style={styles.container}>
        {/*<Button*/}
            {/*title={"Sign Out"}*/}
            {/*onPress={signOut}*/}
        {/*/>*/}
        <TextInput
            style={styles.input}
            onPressIn={() => {
                navigation.navigate('Search', {
                    onGoBack: (keyword) => getProducts(keyword)
                });
            }}
        />
        <FlatList
            data={data}
            renderItem={({item}) =>
                <ProductBox title={item.name}
                            price={item.price}
                            showDetail={() => {
                                navigation.navigate('ProductDetailScrollView', {
                                    id: item.id
                                });
                            }}
                            imageDefault={item.product_images && item.product_images.length > 0 ? item.product_images[0]["path"] : "https://via.placeholder.com/256x128.png?text=Not Found"}
                />
            }
            numColumns={2}
        />

    </SafeAreaView>
};
export default ProductScreen