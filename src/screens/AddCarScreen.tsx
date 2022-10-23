import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import {GetVehiclesByVin,  GetLinkageTargets} from '../Api';
import callGoogleVisionAsync from '../Api/googleVisionService';
import SelectElement from '../components/SelectElement/SelectElement';
import { VIMLIST } from '../utils/VimList';
import {, IGetVehiclesByVinResponse, IgGtLinkageTargetsResponse} from '../Api/types';

const AddCarScreen = () => {
    const [vin, setVin] = useState<string>('');
    //vehicles by vin
    const [searchByVinLoader, setSearchByVinLoader] = useState<boolean>(true);
    const [vehiclesByVin, setVehiclesByVinData] = useState<IGetVehiclesByVinResponse["data"]["matchingVehicles"]["array"]>([]);
    const [showVehiclesByVin, setShowVehiclesByVin] = useState<boolean>(false);

    //vehicles by Car Maker
    const [searchByCarMakerLoader, setSearchCarMakerLoader] = useState<boolean>(true);
    const [vehiclesByCarMaker, setVehiclesByCarMaker] = useState<IgGtLinkageTargetsResponse["mfrFacets"]["count"]>([]);
    const [showVehiclesByCarMaker, setShowVehiclesByCarMaker] = useState<boolean>(false);
    const [selectedCarMaker, setSelectedCarMaker] = useState<{
        id?: number,
        name?: string,
        count?: number
    }>({})

    //vehicles by Car Model
    const [searchByCarModelLoader, setSearchCarModelLoader] = useState<boolean>(true);
    const [vehiclesByCarModel, setVehiclesByCarModel] = useState<IGetVehiclesByVinResponse["data"]["matchingVehicles"]["array"]>([]);
    const [showVehiclesByCarModel, setShowVehiclesByCarModel] = useState<boolean>(false);

    //vehicles by Car Model

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
                        }
                        const matches = googleText?.text;
                        console.log('googleText ==>', googleText.text.trim())
                        if (matches) {
                            try {
                                const vmies = matches.match(/[A-HJ-NPR-Z0-9]{15}/);
                                console.log('>>>>>>>>>>>>', vmies);
                                for (let i = 0; i < VIMLIST.length; i++) {
                                    const index = vmies.findIndex((m: any) => m.startsWith(VIMLIST[i]));

                                    if (index >= 0) {
                                        console.log(vmies[index]);
                                        setVin(vmies[index]), () => {
                                        }
                                        return;
                                        //return matches[index];
                                    }
                                }

                                //    if( vmies?.length) {
                                //        const value = {
                                //          vin: vmies[0]
                                //        }
                                //        this.setState({value, isLoading: false})
                                //    }
                            } catch (err) { console.log(err) }
                        }
                    }
                })
            }
        })

    };




    const handleGetVehiclesByVin = () => {
        try {
            GetVehiclesByVin(vin).then(res => {
                console.log(res.data.data)
                setVehiclesByVinData(res.data.data.matchingVehicles?.array);
                setShowVehiclesByVin(true);
            });
        } catch (err: any) {
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByCarMaker = () => {
        let data = {
            includeMfrFacets: true
        }
        try {
            GetLinkageTargets(data).then(res => {
                setVehiclesByCarMaker(res.data.mfrFacets?.counts);
                setShowVehiclesByCarMaker(true);
            });
        } catch (err: any) {
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByCarModel = () => {
        let data = {
            includeVehicleModelSeriesFacets: true,
            mfrIds: selectedCarMaker.id
        }
        try {
            GetLinkageTargets(data).then(res => {
                setVehiclesByCarModel(res.data.vehicleModelSeriesFacets?.counts);
                setShowVehiclesByCarModel(true);
            });
        } catch (err: any) {
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };

    const handleGetVehiclesByModelSeries = () => {
        let data = {
           
            mfrIds: selectedCarMaker.id
        }
        try {
            GetLinkageTargets(data).then(res => {
                setVehiclesByCarModel(res.data.vehicleModelSeriesFacets?.counts);
                setShowVehiclesByCarModel(true);
            });
        } catch (err: any) {
            console.log(JSON.parse(JSON.stringify(err.response.data)))
        };
    };



    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <SelectElement
                listData={vehiclesByVin}
                showList={showVehiclesByVin}
                displayName='carName'
                callBack={({ val, data }) => setShowVehiclesByVin(val)} />
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
                displayName='manuName'
                callBack={({ val, data }) => {
                    console.log('val, data', data)
                    setShowVehiclesByCarModel(val);
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
                <Text style={styles.buttonTitle}>
                    Search
                </Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.addCarManuallyTitle}>Or Add Car Manually</Text>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.addCarManuallyButton} onPress={handleGetVehiclesByCarMaker}>
                        <View style={styles.paginationBox}>
                            <Text>1</Text>
                        </View>
                        <Text style={{ color: 'black' }}>Car Maker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addCarManuallyButton, { opacity: vehiclesByCarMaker?.length > 0 ? 1 : 0.3 }]} disabled={vehiclesByCarMaker?.length > 0 ? false : true}>
                        <View style={styles.paginationBox}>
                            <Text>2</Text>
                        </View>
                        <Text>Model</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addCarManuallyButton, { opacity: 0.3 }]} disabled>
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