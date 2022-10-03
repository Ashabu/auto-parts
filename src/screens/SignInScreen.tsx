import React, { useState } from 'react'
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { Images } from '../utils/Images';
import { useForm, Controller } from "react-hook-form";
import { SignIn } from '../Api/authService';
import { useAuth } from '../Context/Context';
import { storeData } from '../services/StorageService';
import { Colors } from '../utils/AppColors';
import { useTranslation } from 'react-i18next';

const SignInScreen = ({ route }: any) => {
    const routeObj = route.params;
    const {t} = useTranslation()
    const { handleSetUser, handleSignIn } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    const onSubmit = (data: any) => {
        if (Object.keys(errors).length > 0) return;
        Keyboard.dismiss();
        setIsLoading(true);
        const signInData = {
            username: data.username,
            password: data.password
        };
        SignIn(signInData).then(res => {
            setIsLoading(false);
            storeData('access_token', res.data.cookie).then(() => {
                handleSetUser(res.data.user);
                handleSignIn(true);
                
                    navigate('Home', {
                        screen: 'HomeS'
                    })

            }).catch((err: any) => {
                setIsLoading(false);
                Alert.alert(JSON.parse(JSON.stringify(err.response.data.message)));
            });
        }).catch((e: any) => {
            setIsLoading(false);
            Alert.alert(JSON.parse(JSON.stringify(e.response.data.message)));
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Images.APP_LOGO} style={styles.appLogo} />
                </View>
                <View style={{ flex: 2, justifyContent: 'center' }}>
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
                                style={[styles.input, errors.password && styles.borderRed]}
                                placeholder={t('username')}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="username"
                    />
                    {
                        errors.username &&
                        <Text style={styles.errorMessage}>
                            {errors.username.message}
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
                                style={[styles.input, errors.password && styles.borderRed]}
                                placeholder={t('password')}
                                secureTextEntry={true}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="password"
                    />
                    {
                        errors.password &&
                        <Text style={styles.errorMessage}>
                            {errors.password.message}
                        </Text>
                    }
                    <TouchableOpacity
                        style={[styles.authButton, styles.authBtnBg]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isLoading}>
                        {
                            isLoading ?
                                <ActivityIndicator size='small' color='#000' />
                                :
                                <Text style={[styles.btnTitle, { color: '#000' }]}>
                                    {t('signIn')}
                                </Text>
                        }
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={[styles.authButton, styles.smsAuthBtnBg]}
                        disabled={isLoading}>
                        <Text style={[styles.btnTitle, { color: '#FFFFFF' }]}>
                            SMS LOGIN
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={{ marginTop: 15 }}
                        onPress={() => navigate('SignUp')}
                        disabled={isLoading}>
                        <Text style={[styles.btnTitle, { color: '#ffdd00' }]}>
                        {t('signUp')}
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20
    },

    appLogo: {
        width: 264,
        height: 58
    },

    input: {
        backgroundColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 8,
    },
    authButton: {
        justifyContent: "center",
        minHeight: 44,
        padding: 10,
        borderRadius: 10,
    },

    btnTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },

    authBtnBg: {
        backgroundColor: Colors.YELLOW,
    },
    singInTitle: {
        color: '#000',
    },
    smsAuthBtnBg: {
        backgroundColor: 'green',
    },
    errorMessage: {
        fontSize: 14,
        color: Colors.RED,
        marginVertical: 5
    },
    borderRed: {
        borderColor: Colors.RED
    }

})