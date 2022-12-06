import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import GoogleMap from './GoogleMap';
import { useState } from 'react';
import { Colors } from '../utils/AppColors';
import { useTranslation } from 'react-i18next';
import { IAddress } from './SavedAddress';
import { storeData } from '../services/StorageService';
import { useIsFocused } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const { width } = Dimensions.get('screen');

interface IAddressFormProps {
    submitAddressData?: (data: any) => void;
    stepBack?: () => void;
    onPageMove?: (value: number, width: number) => void;
    address?: IAddress;
    isForEdit?: boolean
}

const AddressForm: React.FC<IAddressFormProps> = ({ submitAddressData, stepBack, address, onPageMove, isForEdit = false }) => {
    const isFocused = useIsFocused();
    const [showMap, setShowMap] = useState<boolean>(false);
    const { t } = useTranslation();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            deliveryAddress: '',
            orderPersonName: '',
            phoneNumber: '',
            receiverName: '',
            receiverPhoneNumber: '',

        }
    });

    const [isForOtherPerson, setIsForOtherPerson] = useState<boolean>(false);

    const handleSaveAddress = (data: IAddress) => {
        let userAddress = JSON.stringify(data);
        storeData('address', userAddress).then(() => {
            onPageMove!(0, width);
        }).catch(e => {
            Alert.alert('Error', JSON.parse(JSON.stringify(e.response.data.message)));
        });
    };


    const getMapData = (data: any) => {
        setValue("deliveryAddress", data);
        setShowMap(false);
    }

    const onSubmit = (data: any) => {
        if (Object.keys(errors).length > 0) {
            return;
        };
        if (isForEdit) {
            handleSaveAddress(data);
        } else {
            submitAddressData!(data);
        };
    };

    useEffect(() => {
        if (!isFocused) {
            console.log('here')
            setValue('deliveryAddress', '');
            setValue('phoneNumber', '');
            setValue('receiverName', '');

        }
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.deliveryAddressView}>
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
                                placeholderTextColor={Colors.BLACK}
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
                                placeholderTextColor={Colors.BLACK}
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
                                placeholderTextColor={Colors.BLACK}
                                placeholder={t('orderPersonName')}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="orderPersonName"
                    />
                    {
                        errors.receiverName &&
                        <Text style={styles.errorMessage}>
                            {errors.receiverName.message}
                        </Text>
                    }
                    <View style={{flexDirection: 'row', alignItems: 'center', }}>
                    <CheckBox  value={isForOtherPerson} onValueChange={(newValue) => setIsForOtherPerson(newValue)}/>
                    <Text style={{color: Colors.BLACK}}>For Other Person</Text>
                    </View>
                
                    {
                        isForOtherPerson &&
                        <>
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
                                        style={[styles.input, errors.receiverPhoneNumber && styles.borderRed]}
                                        placeholderTextColor={Colors.BLACK}
                                        placeholder={t('postalCode')}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="receiverPhoneNumber"
                            />
                            {
                                errors.receiverPhoneNumber &&
                                <Text style={styles.errorMessage}>
                                    {errors.receiverPhoneNumber.message}
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
                                        placeholderTextColor={Colors.BLACK}
                                        placeholder={t('postalCode')}
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
                        </>
                    }

                </View>
                <TouchableOpacity onPress={() => setShowMap(true)} style={styles.showMapButton}>
                    <Text style={{ color: Colors.WHITE, alignSelf: 'center' }}>
                        {t('useGoogleMaps')}
                    </Text>
                </TouchableOpacity>
                <Modal visible={showMap}>
                    <GoogleMap getAddress={getMapData} />
                </Modal>
            </ScrollView>
            {
                isForEdit ?
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity style={styles.editButton} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.buttonTitle}>
                                Сохранить адрес
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={stepBack}>
                            <Text style={styles.btnText}>
                                {t('back')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonNext]} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.btnText}>
                                {t('next')}
                            </Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    );
};

export default AddressForm;

const styles = StyleSheet.create({
    deliveryAddressView: {
        width: width,
        padding: 15

    },
    deliveryTextStyle: {
        fontSize: 18,
        marginBottom: 15
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
        color: Colors.BLACK
    },
    errorMessage: {
        fontSize: 14,
        color: Colors.RED,
        marginVertical: 5
    },
    borderRed: {
        borderColor: Colors.RED
    },
    showMapButton: {
        backgroundColor: Colors.YELLOW,
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        minHeight: 44
    },
    footerContainer: {
        flexDirection: 'row'
    },
    btnText: {
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        flex: 1,
        padding: 20
    },
    buttonBack: {
        backgroundColor: '#CFCFCF',
    },
    buttonNext: {
        backgroundColor: '#ffdd00'
    },
    editButton: {
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
});


