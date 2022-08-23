import React, { createRef, useEffect, useState } from 'react'
import { Dimensions, Image, NativeScrollEvent, Platform, ScrollView, StyleSheet, Text, View, } from 'react-native';
import PaginationDots from '../components/PaginationDots';
import { useOnboarding } from '../Context/Context';


const ONBOARDING_DATA = [
    {
        desc: 'This is Onboarding Screen One',
        imgUrl: require('../../assets/images/Onboarding_One.png')
    },
    {
        desc: 'This is Onboarding Screen Two',
        imgUrl: require('../../assets/images/Onboarding_Two.png'),
    },
    {
        desc: 'This is Onboarding Screen Three',
        imgUrl: require('../../assets/images/Onboarding_Three.png'),
    },
    {

    }
]

const OnboardingScreen = () => {
    const [onboardingStep, setOnboardingStep] = useState<number>(0);
    const carouselRef = createRef<ScrollView>();
    const { handleOnBoarding } = useOnboarding();

    const ItemStyle = {
        width: Dimensions.get('screen').width,
    };

    const onChange = (nativeEvent: NativeScrollEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
            );
            console.log('slide ==>', onboardingStep)
            if (slide != onboardingStep) {
                //if(slide === 3) return;
                setOnboardingStep(slide);
              }
        };
    };

    const moveNext = (index: number) => {
        carouselRef.current?.scrollTo({
            x: index * Dimensions.get('screen').width,
            animated: true,
        });
    };

    const nextStep = () => {
        setOnboardingStep(s => {
            if (s >= 3) {
                return s;
            }
            moveNext(s + 1);
            return s + 1;
        });
    };

    useEffect(() => {
        if (onboardingStep > ONBOARDING_DATA.length - 2) {
            handleOnBoarding(true);
        };
    }, [onboardingStep])



    return (
        <View style={styles.screenContainer}>
            <View style={styles.carouselContainer}>
                <View style={styles.headerContainer}>

                </View>
                <ScrollView
                    ref={carouselRef}
                    onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    horizontal>
                    {ONBOARDING_DATA.map((item, index) => (
                        <View key={index} style={ItemStyle}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={item.imgUrl}
                                    resizeMode={'contain'}
                                />
                            </View>
                            <Text style={styles.desc}>{item.desc}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.dotsContainer}>
                    <PaginationDots dotNumber={ONBOARDING_DATA.length-1} step={onboardingStep} />
                </View>
            </View>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingVertical: 16,
        justifyContent: 'flex-end',
        width: '100%',
        alignSelf: 'center',
    },
    carouselContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        paddingHorizontal: 30
    },
    image: {
        width: 230,
        //height: 200
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    desc: {
        fontSize: 23,
        alignSelf: 'center',
        fontFamily: 'FiraGO-Bold',
        paddingBottom: 36,
        textAlign: 'center',
        maxWidth: 327,
    },

    dotsContainer: {
        padding: 28,
        width: '100%',
        alignSelf: 'center',
    },
    nextButtonView: {
        width: '100%',
        maxWidth: 327,
        paddingBottom: 54,
        alignSelf: 'center',
    },

    authorizeText: {
        fontFamily: 'FiraGO-Medium',
        fontSize: 14,
        lineHeight: 16,

    },
    langSwitchText: {
        fontFamily: 'FiraGO-Regular',
        fontSize: 14,
        lineHeight: 16,

    },
});