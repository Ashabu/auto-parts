import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SignUp } from '../Api/authService';
import { ISignUpRequest, IWPressError } from '../Api/types';
import { navigate } from '../navigation/Navigation';


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;


const SignUpScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {t} = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: ''

        }
    });
    const onSubmit = (data: any) => {
        if(Object.keys(errors).length > 0) return;
        Keyboard.dismiss();
        setIsLoading(true);
        const signUpData: ISignUpRequest = {
            username: data.userName,
            user_login: data.userName,
            user_email: data.email,
            email: data.email,
            display_name: data.firsName,
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password,
            user_pass: data.password,
        }
        SignUp(signUpData).then(res => {
            setIsLoading(false);
            navigate('Home', {
                screen: 'HomeS'
            })
        }).catch((e: any) => {
            setIsLoading(false);
            Alert.alert(JSON.parse(JSON.stringify(e.response.data.message)));
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }} >
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Text style={styles.inputLabel}>
                    {t("profileDetails")}
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: t("pleaseFillOut")
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder= {t("firstName")}
                            style={[styles.input, errors.firstName ? styles.borderRed : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="words"
                            returnKeyType="next"
                        />
                    )}
                    name="firstName"
                />
                {
                    errors.firstName &&
                    <Text style={styles.errorMessage}>
                        {errors.firstName.message}
                    </Text>
                }
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: t("pleaseFillOut")
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder= {t("lastName")}
                            style={[styles.input, errors.lastName ? styles.borderRed : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="words"
                            returnKeyType="next"
                        />
                    )}
                    name="lastName"
                />
                {
                    errors.lastName &&
                    <Text style={styles.errorMessage} >
                        {errors.lastName.message}
                    </Text>
                }
                <Text style={[styles.inputLabel, { marginTop: 20 }]}>
                {t("accountDetails")}
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: t("pleaseFillOut")
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder= {t("username")}
                            style={[styles.input, errors.userName ? styles.borderRed : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="userName"
                />
                {
                    errors.userName &&
                    <Text style={styles.errorMessage}>
                        {errors.userName.message}
                    </Text>
                }
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: t("pleaseFillOut")
                        },
                        pattern: {
                            value: EMAIL_REGEX,
                            message: t("invalidEmail")
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder= {t("email")}
                            style={[styles.input, errors.email ? styles.borderRed : null]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                />
                {
                    errors.email &&
                    <Text style={styles.errorMessage}>
                        {errors.email.message}</Text>
                }
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: t("pleaseFillOut")
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder= {t("password")}
                            secureTextEntry={true}
                            style={[styles.input, errors.password ? styles.borderRed : null]}
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
                <View>
                </View>
                <TouchableOpacity 
                style={styles.singUpBtn} 
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}>
                    {
                        isLoading ?
                            <ActivityIndicator size='small' color='#FFFFFF' />
                            :
                            <Text style={styles.singUpBtnTitle}> {t("signUp")}</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 16,
        margin: 10,
        color: '#000'
    },

    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: 8,

    },
    singUpBtn: {
        backgroundColor: Colors.YELLOW,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 30
    },
    singUpBtnTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 14,
        color: '#e11818',
        marginTop: 5
    },
    borderRed: {
        borderBottomColor: '#e11818'
    }
})