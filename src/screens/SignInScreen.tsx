import React from 'react'
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { navigate } from '../navigation/Navigation';
import { Images } from '../utils/Images';
import { useForm, Controller } from "react-hook-form";

const SignInScreen = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1,
                borderBottomColor: '#FFFFFF'
            }}>
                <Image source={Images.APP_LOGO} style={styles.appLogo} />
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="username"
                />
                {errors.username && <Text>This is required.</Text>}

                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text>This is required.</Text>}
                <TouchableOpacity style={styles.signInBtn}>
                    <Text style={styles.singInTitle}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.smsAuthBtn}>
                    <Text style={{...styles.singInTitle, color: '#FFFFFF'}}>SMS LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 15}} onPress={()=> navigate('Sign Up')}>
                    <Text style={styles.signUpTitle}>REGISTER</Text>
                </TouchableOpacity>
            </View>
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
        width: 300,
        height: 66
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        marginVertical: 10,
        padding: 15,
        borderRadius: 10
    },
    signInBtn: {
        backgroundColor: '#ffdd00',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10
    },
    singInTitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#000',
    },
    smsAuthBtn: {
        backgroundColor: 'green',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10
    },
    signUpTitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#ffdd00',
    }
})