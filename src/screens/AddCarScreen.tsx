import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddCarScreen = () => {
    const [vin, setVin] = useState<string>('')
    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.scanButton}>
                    <Text style={styles.buttonTitle}>
                        Scan Vin
                    </Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.vinInput}
                    value={vin}
                    onChangeText={(text: string) => setVin(text)} />
            </View>
            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.buttonTitle}>
                    Search
                </Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.addCarManuallyTitle}>Or Add Car Manually</Text>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.addCarManuallyButton}>
                        <View style={styles.paginationBox}>
                            <Text>1</Text>
                        </View>
                        <Text style={{color: 'black'}}>Car Maker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addCarManuallyButton, {opacity: 0.3}]} disabled>
                        <View style={styles.paginationBox}>
                            <Text>2</Text>
                        </View>
                        <Text>Model</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addCarManuallyButton, {opacity: 0.3}]} disabled>
                        <View style={styles.paginationBox}>
                            <Text>3</Text>
                        </View>
                        <Text>Modification</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddCarScreen;

const styles = StyleSheet.create({
    topContainer: {

        flexDirection: 'row',
        marginBottom: 20
    },
    vinInput: {
        height: 60,
        flex: 1,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#CFCFCF',
        fontSize: 20,
        paddingHorizontal: 10
    },
    scanButton: {
        width: 150,
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#ffdd00'
    },
    searchButton: {
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#ffdd00'
    },
    buttonTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    addCarManuallyTitle: {
        fontSize: 18,
        color: '#000',
        marginVertical: 20
    },
    bottomContainer: {

    },
    addCarManuallyButton: {
        flexDirection: 'row',
        backgroundColor: '#ffdd00',
        paddingHorizontal: 20,
        paddingVertical: 30,
        margin: 3,
        alignItems: 'center'

    },
    paginationBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20

    }
})