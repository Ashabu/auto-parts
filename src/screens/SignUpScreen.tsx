import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text>
                Profile Details
            </Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="lastName"
            />
            {errors.lastName && <Text>This is required.</Text>}
            <Text>
                Account Details
            </Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',
        padding: 15
    },
    singUpBtn: {
       
    },
    singUpBtnTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '700'
    }
})