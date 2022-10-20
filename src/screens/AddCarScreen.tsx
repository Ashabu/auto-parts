import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, Alert, ActivityIndicator } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { GetVehiclesByVin, GetVehiclesByCarMaker, GetVehiclesByCarModel } from '../Api';
import callGoogleVisionAsync from '../Api/googleVisionService';
import SelectElement from '../components/SelectElement/SelectElement';
import { VIMLIST } from '../utils/VimList';
import { IGetVehiclesByCarMakerResponse, IGetVehiclesByVinResponse, IGetVehiclesByCarModelResponse } from '../Api/types';

const AddCarScreen = () => {
    const [vin, setVin] = useState<string>('');
    //vehicles by vin
    const [searchByVinLoader, setSearchByVinLoader] = useState<boolean>(false);
    const [vehiclesByVin, setVehiclesByVinData] = useState<IGetVehiclesByVinResponse["data"]["matchingVehicles"]["array"]>([]);
    const [showVehiclesByVin, setShowVehiclesByVin] = useState<boolean>(false);
    const [selectedCarByVin, setSelectedCarByVin] = useState<{
        manuId?: number,
        modelId?: number,
        carId?: number,
        vehicleTypeDescription?: string,
        carName?: string
    }[]>([])

    //vehicles by Car Maker
    const [searchByCarMakerLoader, setSearchCarMakerLoader] = useState<boolean>(false);
    const [vehiclesByCarMaker, setVehiclesByCarMaker] = useState<IGetVehiclesByCarMakerResponse["data"]["array"]>([]);
    const [showVehiclesByCarMaker, setShowVehiclesByCarMaker] = useState<boolean>(false);
    const [selectedCarMaker, setSelectedCarMaker] = useState<{
        favorFlag?: number,
        linkingTargetTypes?: string,
        manuId?: number,
        manuName?: string
    }>({})

    //vehicles by Car Model
    const [searchByCarModelLoader, setSearchCarModelLoader] = useState<boolean>(false);
    const [vehiclesByCarModel, setVehiclesByCarModel] = useState<IGetVehiclesByCarModelResponse["data"]["array"]>([]);
    const [showVehiclesByCarModel, setShowVehiclesByCarModel] = useState<boolean>(false);
    const [selectedCarModel, setSelectedCarModel] = useState<{
        favorFlag?: number,
        modelId?: number,
        modelname?: string
    }>({});



    const onPress = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'cameraPermission',
                message: 'needAccesToCamera',
                buttonNegative: 'cancel',
                buttonPositive: 'ok',
            },
        ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera({ mediaType: 'photo', includeBase64: true, quality: 0.5 }, async (media: any) => {
                    if (!!media && media.assets) {
                        const googleText = await callGoogleVisionAsync(media.assets[0].base64);
                        if (googleText.code == 403) {
                            Alert.alert(JSON.stringify(googleText.code), googleText.message);
                            return;
                        };
                        const matches = googleText?.text;
                        console.log('googleText ==>', googleText.text.trim());
                        if (matches) {
                            try {
                                const vmies = matches.match(/[A-HJ-NPR-Z0-9]{17}/);
                                console.log('>>>>>>>>>>>>', vmies);
                                for (let i = 0; i < VIMLIST.length; i++) {
                                    const index = vmies.findIndex((m: any) => m.startsWith(VIMLIST[i]));
                                    if (index >= 0) {
                                        console.log(vmies[index]);
                                        setVin(vmies[index]), () => {
                                        }
                                        return;
                                        //return matches[index];
                                    };
                                };
                            } catch (err) { console.log(err) }
                        };
                    };
                });
            };
        });
    };


    const handleGetVehiclesByVin = () => {
        setSearchByVinLoader(true);
        try {
            GetVehiclesByVin(vin).then(res => {
                console.log(res.data.data)
                setVehiclesByVinData(res.data.data.matchingVehicles?.array);
                setShowVehiclesByVin(true);
                setSearchByVinLoader(false);
            });
        } catch (err: any) {
            setSearchByVinLoader(false);
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByCarMaker = () => {
        setSearchCarMakerLoader(true);
        try {
            GetVehiclesByCarMaker().then(res => {
                setVehiclesByCarMaker(res.data.data?.array);
                setShowVehiclesByCarMaker(true);
                setSearchCarMakerLoader(false);

            });
        } catch (err: any) {
            setSearchCarMakerLoader(false);
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByCarModel = () => {
        setSearchCarModelLoader(true);
        try {
            GetVehiclesByCarModel(selectedCarMaker.manuId!).then(res => {
                console.log(res.data)
                setVehiclesByCarModel(res.data.data?.array);
                setShowVehiclesByCarModel(true);
                setSearchCarModelLoader(false);
            });
        } catch (err: any) {
            setSearchCarModelLoader(false);
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };



    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <SelectElement
                listData={vehiclesByVin}
                showList={showVehiclesByVin}
                displayName='carName'
                callBack={({ val, data }) => {
                    setShowVehiclesByVin(val);
                    setSelectedCarByVin(prev => {
                        return [...prev, data]
                    })
                }} />
            <SelectElement
                listData={vehiclesByCarMaker}
                showList={showVehiclesByCarMaker}
                displayName='manuName'
                callBack={({ val, data }) => {
                    setShowVehiclesByCarMaker(val);
                    setSelectedCarMaker(data)
                }} />
            <SelectElement
                listData={vehiclesByCarModel}
                showList={showVehiclesByCarModel}
                displayName='modelname'
                callBack={({ val, data }) => {
                    console.log('val, data', data)
                    setShowVehiclesByCarModel(val);
                    setSelectedCarModel(data);
                }} />

            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.scanButton} onPress={onPress}>
                    <Text style={styles.buttonTitle}>
                        Scan Vin
                    </Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.vinInput}
                    value={vin}
                    onChangeText={(text: string) => setVin(text)} />
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleGetVehiclesByVin}>
                {
                    searchByVinLoader ?
                        <ActivityIndicator size='small' color='#000' />
                        :
                        <Text style={styles.buttonTitle}>
                            Search
                        </Text>
                }
            </TouchableOpacity>
            <View>
                {selectedCarByVin?.map((el, index: number) => (
                    <Text key={index} style={{fontSize: 20, paddingVertical: 5}}>
                        {el.carName}
                    </Text>
                ))}
                
            </View>
            <View>
                <Text style={styles.addCarManuallyTitle}>Or Add Car Manually</Text>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.addCarManuallyButton} onPress={handleGetVehiclesByCarMaker}>
                        <View style={styles.paginationBox}>
                            <Text>1</Text>
                        </View>
                        {
                            searchByCarMakerLoader ?
                                <ActivityIndicator size='small' color='#000' />
                                :
                                selectedCarMaker.manuName ?
                                    <Text>{selectedCarMaker.manuName}</Text>
                                    :
                                    <Text style={{ color: 'black' }}>Car Maker</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.addCarManuallyButton, { opacity: vehiclesByCarMaker!?.length > 0 ? 1 : 0.3 }]} disabled={vehiclesByCarMaker!?.length > 0 ? false : true}
                        onPress={handleGetVehiclesByCarModel}>
                        <View style={styles.paginationBox}>
                            <Text>2</Text>
                        </View>
                        {
                            searchByCarModelLoader ?
                                <ActivityIndicator size='small' color='#000' />
                                :
                                selectedCarModel.modelname ?
                                    <Text>{selectedCarModel.modelname}</Text>
                                    :
                                    <Text>Model</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addCarManuallyButton, { opacity: vehiclesByCarModel!?.length > 0 ? 1 : 0.3 }]} disabled={vehiclesByCarModel!?.length > 0 ? false : true}>
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
});