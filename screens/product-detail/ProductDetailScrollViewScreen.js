import React from "react";
import {AuthContext} from "../login/AuthContext";
import {ActivityIndicator, View, Text, Button, FlatList, SafeAreaView} from "react-native";
import ProductBox from "../../components/ProductBox";
import {styles} from "../../components/Styles";
import {DetailWithScrollWiewBox} from "../../components/DetailBox";

const ProductDetailScrollViewScreen = ({route, navigation}) => {
    const {id} = route.params;
    const {signOut} = React.useContext(AuthContext);
    const [data, setData] = React.useState({});
    const [datas, setDatas] = React.useState([]);

    const getProduct = () => {
        return fetch(`http://192.168.56.1:3000/products/${id}?_embed=product_images`)
            .then((t) => t.json())
            .then((t) => {
                setData(t);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getProducts = () => {
        return fetch('http://192.168.56.1:3000/products')
            .then((t) => t.json())
            .then((t) => {
                setDatas(t);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        getProduct();
        getProducts();
    }, []);

    return <SafeAreaView style={styles.container}>
        {
            Object.keys(data).length > 0 ? <DetailWithScrollWiewBox
                images={data.product_images}
                title={data.name}
                readyQty={data.quantity}
                description={data.description}
            >
                <FlatList
                    data={datas}
                    renderItem={({item}) =>
                        <ProductBox title={item.name}
                                    price={item.price}
                                    showDetail={() => {
                                        navigation.navigate('ProductDetail', {
                                            id: item.id
                                        });
                                    }}
                        />
                    }
                    numColumns={2}
                />
            </DetailWithScrollWiewBox> : <ActivityIndicator size="large" color="#00ff00" />
        }
    </SafeAreaView>
};
export default ProductDetailScrollViewScreen;