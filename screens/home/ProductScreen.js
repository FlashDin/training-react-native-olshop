import React from "react";
import {AuthContext} from "../login/AuthContext";
import {Image, RefreshControl, View, Text, Button, FlatList, SafeAreaView, TextInput, TouchableOpacity, Dimensions} from "react-native";
import ProductBox from "../../components/ProductBox";
import {styles} from "../../components/Styles";

const ProductScreen = ({navigation}) => {
    const {signOut} = React.useContext(AuthContext);
    const [data, setData] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const screenWidth = Dimensions.get('window').width;

    const getProducts = (keyword) => {
        setSearchText(keyword);
        return fetch(`http://192.168.56.1:3000/products?_embed=product_images&name_like=${keyword}`)
            .then((t) => t.json())
            .then((t) => {
                setData(t);
                setRefreshing(false);
            })
            .catch((error) => {
                console.error(error);
                setRefreshing(false);
            });
    };

    React.useEffect(() => {
        getProducts("");
    }, []);

    const _onRefresh = () => {
        setRefreshing(true);
        getProducts("");
    };

    const clearSearchField = () => {
        getProducts("");
    };

    return <SafeAreaView>
        {/*<Button*/}
            {/*title={"Sign Out"}*/}
            {/*onPress={signOut}*/}
        {/*/>*/}
        <View style={{
            flexDirection: 'row'
        }}>
            <View style={{
                width: 50,
                justifyContent: 'flex-end',
                paddingBottom: 32
            }}>
                <Text style={{
                    transform: [{ rotate: '270deg'}],
                    borderTopWidth: 5,
                    padding: 5,
                    borderColor: '#FF8F00'
                }}>HEHE</Text>
                <Text style={{
                    transform: [{ rotate: '270deg'}],
                    marginTop: 32,
                    padding: 5
                }}>HEHE</Text>
            </View>
            <View
                style={{
                    width: screenWidth - 50,
                    backgroundColor: 'white',
                    paddingTop: 100
                }}
            >
                <View
                    style={{
                        ...styles.viewInput,
                        position: 'absolute',
                        width: '100%',
                        top: 50,
                        left: -20,
                        zIndex: 1
                    }}
                >
                    <TextInput
                        style={{
                            width: '90%'
                        }}
                        onPressIn={() => {
                            navigation.navigate('Search', {
                                onGoBack: (keyword) => getProducts(keyword)
                            });
                        }}
                        placeholder="Search..."
                        value={searchText}
                    />
                    <TouchableOpacity
                        style={styles.clear}
                        onPress={() => clearSearchField()}
                    >
                        {/*<Text>x</Text>*/}
                        <Image
                            source={{
                                uri: "data:image/png;base64,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"
                            }}
                            style={{
                                height: 32,
                                width: 32
                            }}
                        />
                    </TouchableOpacity>
                </View>
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                />
            </View>
        </View>
    </SafeAreaView>
};
export default ProductScreen