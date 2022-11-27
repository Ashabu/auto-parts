import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, NativeScrollEvent, View } from 'react-native';
import NotificationBox from '../components/NotificationBox';
import { useLang } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { useCategoriesStore, vehicleStore } from '../store/Store';
import SavedCardList from '../components/SavedCardList';
import { GetParentCategories } from '../Api';

const { width, height } = Dimensions.get('screen');
console.log(width, height)

const offersData = [
    {
        title: 'This Is First Offer',
        id: 0
    },
    {
        title: 'This Is Second Offer',
        id: 1
    },
    {
        title: 'This Is Third Offer',
        id: 2
    }
]


const HomeScreen = () => {
    // const {width, height} = useWindowDimensions();

    const CarouselRef = useRef<ScrollView>(null);
    const { categories, setCategories } = useCategoriesStore();

    const SavedVehicles = vehicleStore(state => state.savedVehicles);
    const { t, i18n } = useTranslation();
    const { lang } = useLang();
    const [carouselStep, setCarouselStep] = useState<number>(0)
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    console.log('active Car', SavedVehicles[0]);

    const handleCarouselSwipe = (nativeEvent: NativeScrollEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != carouselStep) {
                setCarouselStep(slide);
            };
        };
    };

    const getCategories = () => {
        GetParentCategories(SavedVehicles?.[0].linkageTargetId).then(res => {
            console.log('categories', res.data.data.array)
            setCategories(res.data.data.array);
        }).catch(err => {
            console.log(JSON.stringify(err.response))
        })
    }

    useEffect(() => {
        if (SavedVehicles?.[0]?.linkageTargetId)
            getCategories();
    }, [SavedVehicles?.[0]?.linkageTargetId]);



    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <NotificationBox notification='this is a astification' position='Bottom' timeOutTime={3000} /> */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {SavedVehicles.length > 0 &&
                    <TouchableOpacity style={styles.addCarButton} onPress={() => setIsSelecting(!isSelecting)}>
                        <Text style={styles.addCarTitle}>{SavedVehicles?.[0].mfrName}, {SavedVehicles?.[0].description.split('(')[0]}</Text>
                    </TouchableOpacity>
                }
                {
                    SavedVehicles.length > 0 && isSelecting ?
                        SavedVehicles.splice(1, SavedVehicles.length).map((v, index) => (
                            <SavedCardList key={index} vehicle={v} callback={() => setIsSelecting(false)} />
                        ))
                        :
                        <TouchableOpacity style={styles.addCarButton} onPress={() => navigate('AddCar')}>
                            <Text style={styles.addCarTitle}>{t("addCar")}</Text>
                            <Text style={styles.addCarTitle}>+</Text>
                        </TouchableOpacity>

                }
                <ScrollView
                    ref={CarouselRef}
                    onScroll={({ nativeEvent }) => handleCarouselSwipe(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    horizontal>
                    {
                        offersData.map(item => (
                            <View key={item.id} style={styles.slideStyle}>
                                <Text style={{ color: Colors.BLACK, fontSize: 20 }}>{item.title}</Text>
                            </View>
                        ))
                    }
                </ScrollView>

                {
                    categories.length > 0 &&
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ color: Colors.BLACK, fontSize: 20, marginBottom: 20 }}>Categories</Text>
                        {
                            categories.map(el => (
                                <TouchableOpacity
                                    key={el.assemblyGroupNodeId}
                                    style={styles.categoryItem}
                                    onPress={() => navigate('ProductDetail', { data: { assemblyGroupNodeId: el.assemblyGroupNodeId } })}
                                >
                                    <Text style={styles.categoryItemLabel}>{el.assemblyGroupName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {

    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchInput: {
        width: '100%',
        paddingHorizontal: 10,
    },
    searchIcon: {
        width: 18,
        height: 19
    },
    addCarButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.YELLOW,
        padding: 20,

    },
    addCarTitle: {
        fontSize: 20
    },
    slideStyle: {
        width: width - 44,
        marginVertical: 20,
        marginHorizontal: 22,
        height: height / 5,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryItem: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: Colors.YELLOW,
        padding: 10,
        marginVertical: 5
    },
    categoryItemLabel: {
        color: Colors.BLACK,
        fontSize: 16
    }
})