import React, { useState, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Button, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

interface IMapProps {
    getAddress: (value: string) => void
};

interface IMarkerData {
    coordinate: {
        latitude: number,
        longitude: number,
    }
};

interface IPosition {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
};

const GoogleMap: React.FC<IMapProps> = ({ getAddress }) => {
    const [position, setPosition] = useState<IPosition>({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        if (position.latitude == 0) {
            handleUserCurrentLocation();
        } else {
            handleChosenLocation();
        }
    }, [position.latitude]);

    const handleUserCurrentLocation = () => {
        try {
            Geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAEcJIqCTZ_7yfBQZl0I6EzffHx8qzTyL0`).then(res => {
                    console.log('google maps cord response ==>', res.data.results)
                    let streetName = res.data.results[0].formatted_address.split(',');
                    if (streetName[0].indexOf(' ') >= 0) {
                        setAddress(streetName[0]);
                    } else {
                        setAddress(streetName[1]);
                    };
                }).catch((error: any) => {
                    console.log(error);
                });
                setPosition({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                });
            });
        } catch (err) {
            console.log(err);
        };
    };

    const handleSetMarkerCords = (data: IMarkerData) => {
        setPosition(prev => {
            return {
                ...prev,
                latitude: data.coordinate.latitude,
                longitude: data.coordinate.longitude
            }
        });
    };

    const handleChosenLocation = () => {
        try {
            const { latitude, longitude } = position;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAEcJIqCTZ_7yfBQZl0I6EzffHx8qzTyL0`).then(res => {
                console.log('google maps cord response ==>', res.data.results)
                let streetName = res.data.results[0].formatted_address.split(',');
                if (streetName[0].indexOf(' ') >= 0) {
                    setAddress(streetName[0]);
                } else {
                    setAddress(streetName[1]);
                };
            }).catch((error: any) => {
                console.log(error)
            });
        } catch (err) {
            console.log(err);
        };
    };

    const sendAddress = () => {
        getAddress(address)
    };

    return (
        <>
            <MapView
                onLongPress={({ nativeEvent }) => handleSetMarkerCords(nativeEvent)}
                style={styles.map}
                initialRegion={position}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                showsCompass={true}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
            >
                <Marker
                    title={address}
                    //  description='This is a description'
                    coordinate={position} />
            </MapView>
            {/* <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyAEcJIqCTZ_7yfBQZl0I6EzffHx8qzTyL0',
            language: 'en',
          }}
        /> */}
            <View style={{ width: 200, alignSelf: 'center' }}>
                <Button title='Send Location' onPress={sendAddress}></Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GoogleMap;