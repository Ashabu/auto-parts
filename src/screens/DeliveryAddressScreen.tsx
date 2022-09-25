import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, NativeScrollEvent, TextInput } from 'react-native';
import { Animated } from 'react-native-maps';
import { Colors } from '../utils/AppColors';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('screen');

const DeliveryAddressScreen = () => {
    const [edit, setEdit] = useState(true);
    const carouselRef = useRef<ScrollView>(null);
    const [screen, SetScreen] = useState<number>(0)
    const { t } = useTranslation();
    const onChange = (nativeEvent?: NativeScrollEvent) => {
        if (nativeEvent) {
            console.log('nativeEvent.contentOffset', nativeEvent.contentOffset)
            const slide = Math.ceil(
                nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
            );
            if (slide != screen) {
                SetScreen(slide);
            };
        };
    }

    const moveNext = (screen: number) => {
        carouselRef.current?.scrollTo({
            x: screen * width,
            animated: true
        })
    }

    const { control, handleSubmit, formState: { errors }, register, setValue } = useForm({
        defaultValues: {
            deliveryAddress: '',
            phoneNumber: '',
            receiverName: '',
            postalCode: ''
        }
    });

    
    const onSubmit = (data: any) => {
        if (Object.keys(errors).length > 0) {
            return;
        };
        moveNext(0)
    };




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                ref={carouselRef}
                // onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEnabled={true}
                horizontal>
                <View style={{ width: width }}>
                    <View style={{ flex: 9 }}>
                        <View style={styles.infoRow}>
                            <Text style={[styles.textStyle, { fontWeight: '700' }]}>Город</Text>
                            <Text style={[styles.textStyle, { fontWeight: '400' }]}>Тбилиси</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.textStyle, { fontWeight: '700' }]}>Улица</Text>
                            <Text style={[styles.textStyle, { fontWeight: '400' }]}>Шалва Нуцубидзе</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.textStyle, { fontWeight: '700' }]}>Корпус</Text>
                            <Text style={[styles.textStyle, { fontWeight: '400' }]}>18</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.textStyle, { fontWeight: '700' }]}>Номер подъезда</Text>
                            <Text style={[styles.textStyle, { fontWeight: '400' }]}>2</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[styles.textStyle, { fontWeight: '700' }]}>Квартира</Text>
                            <Text style={[styles.textStyle, { fontWeight: '400' }]}>14</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => moveNext(1)}>
                            {
                                edit ?
                                    <Text style={styles.buttonTitle}>
                                        Изменить адрес
                                    </Text>
                                    :
                                    <Text style={styles.buttonTitle}>
                                        Добавить адрес
                                    </Text>
                            }
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={{ width: width }}>
                    <View style={{ flex: 1 }}>
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please Fill In The Field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.deliveryAddress && styles.borderRed]}
                                    placeholder={t('deliveryAddress')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="deliveryAddress"
                        />
                        {
                            errors.deliveryAddress &&
                            <Text style={styles.errorMessage}>
                                {errors.deliveryAddress.message}
                            </Text>
                        }
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please Fill In The Field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.phoneNumber && styles.borderRed]}
                                    placeholder={t('phoneNumber')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="phoneNumber"
                        />
                        {
                            errors.phoneNumber &&
                            <Text style={styles.errorMessage}>
                                {errors.phoneNumber.message}
                            </Text>
                        }
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please Fill In The Field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.receiverName && styles.borderRed]}
                                    placeholder={t('receiverName')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="receiverName"
                        />
                        {
                            errors.receiverName &&
                            <Text style={styles.errorMessage}>
                                {errors.receiverName.message}
                            </Text>
                        }
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please Fill In The Field'
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.postalCode && styles.borderRed]}
                                    placeholder={t('postalCode')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="postalCode"
                        />
                        {
                            errors.postalCode &&
                            <Text style={styles.errorMessage}>
                                {errors.postalCode.message}
                            </Text>
                        }
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        {
                            edit ?
                                <Text style={styles.buttonTitle}>
                                    Изменить адрес
                                </Text>
                                :
                                <Text style={styles.buttonTitle}>
                                    Добавить адрес
                                </Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView >



        </SafeAreaView >
    );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.YELLOW,
        borderRadius: 10,
        paddingVertical: 15
    },
    buttonTitle: {
        fontSize: 17,
        lineHeight: 23,
        color: Colors.BLACK,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: Colors.GREY_SECONDARY,
        borderBottomWidth: 1,
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 22,
        color: Colors.BLACK,
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
    },
    valueText: {
        fontWeight: '700',
    },
    input: {
        backgroundColor: Colors.WHITE,
        borderColor: Colors.WHITE,
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 8,
    },
    errorMessage: {
        fontSize: 14,
        color: Colors.RED,
        marginVertical: 5
    },
    borderRed: {
        borderColor: Colors.RED
    },
})