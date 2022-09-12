import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            userName: '',
            eMail: '',
            password: ''

        }
    });
    const onSubmit = (data: any) => console.log(data);
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
            <ScrollView>
                <Text style={styles.inputLabel}>
                    Profile Details
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='First Name'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="firstName"
                />
                {errors.firstName && <Text>This is required.</Text>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Last Name'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="lastName"
                />
                {errors.lastName && <Text>This is required.</Text>}
                <Text style={[styles.inputLabel, {marginTop: 20}]}>
                    Account Details
                </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                        placeholder='Username'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="userName"
                />
                {errors.userName && <Text>This is required.</Text>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="eMail"
                />
                {errors.eMail && <Text>This is required.</Text>}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text>This is required.</Text>}
                <TouchableOpacity style={styles.singUpBtn}>
                    <Text style={styles.singUpBtnTitle}>Sign Up</Text>
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
        paddingHorizontal: 15
    },
    singUpBtn: {
        backgroundColor: '#ffdd00',
        padding: 15,
        borderRadius: 10,
        marginTop: 20
    },
    singUpBtnTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'center'
    }
})