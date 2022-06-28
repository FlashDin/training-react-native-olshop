import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";

const DetailBox = (props) => {
    const [imageData, setImageData] = React.useState([]);

    React.useEffect(() => {
        showImage(0);
    }, []);

    const showImage = (index) => {
        const imageDefault = "https://via.placeholder.com/256x128.png?text=Not Found";
        let imgData = [
            {
                id: 0,
                productId: 0,
                path: imageDefault,
                isShow: true
            }
        ];
        if (props.images.length > 0) {
            imgData = props.images.map((v, i) => {
                let isShown = false;
                if (index < imageData.length) {
                    isShown = index === i;
                } else {
                    isShown = i === 0;
                }
                return {
                    ...v,
                    isShow: isShown
                }
            });
        }
        setImageData(imgData);
    };

    return <View>
        <View style={styles.box}>
            {
                imageData.map((v, i) => <TouchableOpacity
                    style={styles.showImage(v.isShow)}
                    onPress={() => {
                        showImage(1 + i);
                    }}
                >
                    <Image source={{
                        uri: v.path,
                    }}
                           style={styles.image}
                    />
                    <Text>{1 + i}</Text>
                </TouchableOpacity>)
            }
            <View style={styles.addToChartBox}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.readyQty}>Quantity: {props.readyQty}</Text>
            </View>
            <View style={styles.addToChartBox}>
                <Button
                    title="-"
                    style={styles.qtyBtn}
                />
                <TextInput
                    style={styles.textInput}
                    defaultValue="1"
                />
                <Button
                    title="+"
                    style={styles.qtyBtn}
                />
                <View style={styles.addToChartBtn}>
                    <Button
                        title="ADD"
                    />
                </View>
            </View>
            <Text style={styles.description}>{props.description}</Text>
        </View>
        <View>
            {props.children}
        </View>
    </View>
};

const DetailWithScrollWiewBox = (props) => {
    const [imageData, setImageData] = React.useState([]);
    const [num, setNum] = React.useState(1);

    const screenWidth = Dimensions.get('window').width;

    React.useEffect(() => {
        showImage(0);
    }, []);

    const showImage = (index) => {
        const imageDefault = "https://via.placeholder.com/256x128.png?text=Not Found";
        let imgData = [
            {
                id: 0,
                productId: 0,
                path: imageDefault
            }
        ];
        if (props.images.length > 0) {
            imgData = props.images;
        }
        setImageData(imgData);
    };

    const scrollViewRef = React.useRef();

    return <View>
        <View style={styles.box}>
            <ScrollView style={styles.scrollView}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        onScroll={(event) => {
                            const scrolling = event.nativeEvent.contentOffset.x;
                            if (scrolling === screenWidth / 2) {
                                scrollViewRef.current.scrollTo({ x: screenWidth, y: 0, animated: false })
                            } else {
                                scrollViewRef.current.scrollTo({ x: scrolling + screenWidth, y: 0, animated: false })
                            }
                            // if (scrolling > 100) {
                            // }
                        }}
                        // scrollEventThrottle={screenWidth}
                        ref={scrollViewRef}
                        // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                        // onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: screenWidth, y: 0, animated: true })}
            >
            {
                imageData.map((v, i) => <View style={{
                    width: screenWidth,
                    ...styles.showImage(true)
                }}>
                    <Image source={{
                        uri: v.path,
                    }}
                           style={styles.image}
                    />
                    <Text>{1 + i}</Text>
                </View>)
            }
            </ScrollView>
            <View style={styles.addToChartBox}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.readyQty}>Quantity: {props.readyQty}</Text>
            </View>
            <View style={styles.addToChartBox}>
                <Button
                    title="-"
                    style={styles.qtyBtn}
                    onPress={() => {
                        setNum(num - 1);
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    value={num.toString()}
                />
                <Button
                    title="+"
                    style={styles.qtyBtn}
                    onPress={() => {
                        setNum(num + 1);
                    }}
                />
                <View style={styles.addToChartBtn}>
                    <Button
                        title="ADD"
                    />
                </View>
            </View>
            <Text style={styles.description}>{props.description}</Text>
        </View>
        <View>
            {props.children}
        </View>
    </View>
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#fff",
    },
    image: {
        height: 200
    },
    scrollView: {
        height: 200,
        marginTop: 16
    },
    title: {
        padding: 10
    },
    addToChartBox: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    qtyBtn: {},
    textInput: {
        borderWidth: 1,
    },
    addToChartBtn: {
        position: 'absolute',
        right: 0,
        paddingRight: 10,
        borderWidth: 1
    },
    description: {
        padding: 10
    },
    readyQty: {
        position: 'absolute',
        right: 0,
        paddingRight: 10
    },
    showImage: (isShow) => ({
        display: isShow ? 'flex' : 'none'
    })
});

export {
    DetailBox,
    DetailWithScrollWiewBox
};