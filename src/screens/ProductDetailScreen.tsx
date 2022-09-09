import React, { createRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, NativeScrollEvent, Dimensions } from 'react-native';

const ProductDetailScreen = ({ route }: any) => {
    const { stock_quantity, name, price } = route.params.item;
    const carouselRef = createRef<ScrollView>();
    const slideStyle = {
        width: Dimensions.get('screen').width,
    };
    const [activeTab, setActiveTab] = useState<number>(0);

    const data = [
        {
            title: '',
        },
        {
            title: '',
        },
        {
            title: '',
        },
    ]

    const onChange = (nativeEvent: NativeScrollEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
            );
            if (slide != activeTab) {
                setActiveTab(slide);
            };
        };
    };

    const handleMoveTab = (index: number) => {
        setActiveTab(index);
        console.log(index * Dimensions.get('screen').width)
        carouselRef.current?.scrollTo({
          x: index * Dimensions.get('screen').width,
          
          animated: true,
        });
      };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 60 }}></View>
            <View style={{ flex: 3 }}>
                <View style={styles.infoBox}>
                    <Text>Mark</Text>
                    <Text> KYB</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>OEM</Text>
                    <Text> A204321106</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>{name}</Text>
                    <Text style={styles.textStyle}>${price}</Text>
                </View>
            </View>
            <View style={{ flex: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab == 0 ? styles.btnActive : {}]}
                        onPress={() => handleMoveTab(0)} >
                        <Text style={styles.textStyle}>Description</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBtn, activeTab == 1 ? styles.btnActive : {}]}
                        onPress={() => handleMoveTab(1)}>
                        <Text style={styles.textStyle}>Features</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabBtn, activeTab == 2 ? styles.btnActive : {}]}
                        onPress={() => handleMoveTab(2)}>
                        <Text style={styles.textStyle}>Reviews</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        ref={carouselRef}
                        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        horizontal
                        scrollEnabled>
                        {
                            data.map((item: any, index: number) => (
                                <View key={index} style={[slideStyle, { backgroundColor: index == 0 ? 'blue' : index == 1 ? 'yellow' : 'green' }]}>
                                    <Text>{item.title}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'red', flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#CFCFCF', flex: 1 }}>
                </View>
                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: stock_quantity > 0 ? '#ffdd00' : 'red' }]}
                    activeOpacity={1}>
                    {
                        stock_quantity > 0 ?
                            <Text style={styles.actionBtnTitle}>BUY NOW</Text>
                            :
                            <Text style={styles.actionBtnTitle}>OUT OF STOCK</Text>
                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoBox: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CFCFCF',
        borderRadius: 5,
        marginVertical: 10
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 2
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#CFCFCF'
    },
    btnActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#ffdd00'
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionBtnTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    }

})