import React from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import GoogleMap from './GoogleMap';
import { useState } from 'react';
import { Colors } from '../utils/AppColors';

const { width } = Dimensions.get('screen');


const AddressForm = () => {
    const [showMap, setShowMap] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors }, register, setValue } = useForm({
        defaultValues: {
            deliveryAddress: '',
            phoneNumber: '',
            receiverName: '',
            postalCode: ''
        }
    });

    const getMapData = (data: any) => {
        setValue("deliveryAddress", data)
        setShowMap(false);
    }

    const onSubmit = (data: any) => console.log(data);


    return (
        <ScrollView contentContainerStyle={styles.deliveryAddressView}>
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
                        placeholder='Delivery Address'
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
                        placeholder='Phone Number'
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
                        placeholder='Receiver Name'
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
                        placeholder='Postal Code'
                        secureTextEntry={true}
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

            <TouchableOpacity onPress={() => setShowMap(true)} style={styles.showMapButton}>
                <Text style={{ color: Colors.WHITE, alignSelf: 'center' }}>
                    Use Google Map
                </Text>
            </TouchableOpacity>
            <Modal visible={showMap}>
                <GoogleMap getAddress={getMapData} />
            </Modal>
        </ScrollView>
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
    },
    errorMessage: {
        fontSize: 14,
        color:  Colors.RED,
        marginVertical: 5
    },
    borderRed: {
        borderColor: Colors.RED
    },
    showMapButton : {
        backgroundColor: Colors.YELLOW,
        padding: 10, 
        marginTop: 15, 
        borderRadius: 10,
        minHeight: 44 
    }
});


