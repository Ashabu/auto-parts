import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity,  NativeScrollEvent, View, Image, ActivityIndicator } from 'react-native';
import { useLang } from '../Context/Context';
import { navigate } from '../navigation/Navigation';
import { Colors } from '../utils/AppColors';
import { useCategoriesStore  } from '../store/Store';
import SavedCardList from '../components/SavedCardList';
import { GetParentCategories, GetArticles } from '../Api';
import { useCar, useCarDispatch } from '../Context/CarsContext';

const { width, height } = Dimensions.get('screen');

const offersData = [
    {
        title: 'This Is First Offer',
        banner: require('./../../assets/images/sales-one.jpeg'),
        id: 0
    },
    {
        title: 'This Is Second Offer',
        banner: require('./../../assets/images/sales-two.jpeg'),
        id: 1
    },
    {
        title: 'This Is Third Offer',
        banner: require('./../../assets/images/sales-three.jpeg'),
        id: 2
    }
]


const HomeScreen = () => {
    // const {width, height} = useWindowDimensions();

    const CarouselRef = useRef<ScrollView>(null);
    const { categories, setCategories, setOemNumbers } = useCategoriesStore();
    const { savedCars } = useCar();
    const dispatch = useCarDispatch();
    const { t, i18n } = useTranslation();
    const { lang } = useLang();
    const [carouselStep, setCarouselStep] = useState<number>(0)
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onSelectCar = (id: number) => {
        let tempCars = savedCars.map(car => {
            if (id == car.vehicleModelSeriesId) {
                car.isSelected = true;
            } else {
                car.isSelected = false;
            };
            return car
        });
        let activeCar = tempCars.filter(car => car.isSelected == true)[0];
        let inactiveCars = tempCars.filter(car => car.isSelected == false);
        dispatch({ savedCars: [activeCar, ...inactiveCars] });
        setIsSelecting(false);
    };

    const onRemoveCar = (id: number) => {
        let tempCars = savedCars.filter(car => car.vehicleModelSeriesId !== id);
        if (tempCars.every(car => car.isSelected == false)) {
            tempCars[0].isSelected = true;
        };
        dispatch({ savedCars: [...tempCars] });
    };

    const handleCarouselSwipe = (nativeEvent: NativeScrollEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != carouselStep) {
                setCarouselStep(slide);
            };
        };
    };

    const getCategories = () => {
        setIsLoading(true);
        GetParentCategories(savedCars?.[0]?.linkageTargetId!).then(res => {
            setCategories(res.data.data.array);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false)
            console.log(JSON.stringify(err.response))
        });
    };

    const handleProductsCategory = (assemblyGroupNodeId: number, type: string = 'GET_SINGLE_ARTICLE') => {
        let data = {
            assemblyGroupNodeId: assemblyGroupNodeId,
            linkageTargetId: savedCars?.[0].linkageTargetId,
            linkageTargetType: 'P'
        };
        GetArticles(type, data).then(res => {
            const response = res.data.articles;
            let oemNumbers: any[] = [];
            response?.map(el => {
                el.oemNumbers.map(item => {
                    if (item.articleNumber) {
                        oemNumbers.push(item.articleNumber);
                    };
                });
            });
            let uniqueOemNumbers = [... new Set(oemNumbers)];
            setOemNumbers(uniqueOemNumbers || []);
        }).catch(err => {
            console.log(JSON.stringify(err.response));
        }).finally(() => {
            navigate('Search');
        })
    };

    useEffect(() => {
        if (savedCars?.[0]?.linkageTargetId) {
            getCategories();
        };
    }, [savedCars?.[0]?.linkageTargetId]);

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang]);


    return (
        <SafeAreaView style={{ flex: 1}}>
            {savedCars.length > 0 &&
                <TouchableOpacity style={styles.addCarButton} onPress={() => setIsSelecting(!isSelecting)}>
                    <Text style={styles.addCarTitle}>{savedCars?.[0]?.mfrName}, {savedCars?.[0]?.description?.split('(')[0]}</Text>
                </TouchableOpacity>
            }
            {
                savedCars?.length > 0 && isSelecting ?
                    savedCars.slice(1, savedCars.length).map((v, index) => (
                        <SavedCardList
                            key={index}
                            vehicle={v}
                            callback={(id) => onSelectCar(id)}
                            removeCar={(id) => onRemoveCar(id)}
                        />
                    ))
                    :
                    null
            }
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ScrollView
                    ref={CarouselRef}
                    onScroll={({ nativeEvent }) => handleCarouselSwipe(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    horizontal>
                    {
                        offersData.map(item => (
                            <View key={item.id} style={styles.slideStyle}>
                                <Image source={item.banner} resizeMode="cover" style={{ width: width - 44, height: height / 5, borderRadius: 7 }} />
                            </View>
                        ))
                    }
                </ScrollView>
                {
                    (categories.length == 0 || isLoading) &&
                    <View style={{  flex: 6 }}>
                        <View style={{ alignSelf: 'center' }}>
                            {
                                isLoading ?
                                    <ActivityIndicator size='large' color={Colors.YELLOW} />
                                    :
                                    <TouchableOpacity 
                                    onPress={() => navigate('AddCar')}
                                    style={{ backgroundColor: Colors.YELLOW, width: 200, height: 50, borderRadius: 7, justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', color: Colors.BLACK, fontWeight: '600' }}>ADD CAR</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                }
                {
                    categories.length > 0 && !isLoading && 
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ color: Colors.BLACK, fontSize: 20, marginBottom: 20 }}>Categories</Text>
                        {
                            categories.map(el => (
                                <TouchableOpacity
                                    key={el.assemblyGroupNodeId}
                                    style={styles.categoryItem}
                                    onPress={() => handleProductsCategory(el.assemblyGroupNodeId)}
                                // onPress={() => navigate('ProductDetail', { data: { assemblyGroupNodeId: el.assemblyGroupNodeId } })}
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