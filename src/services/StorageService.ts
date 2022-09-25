import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any, callback?: ((error?: Error | null | undefined) => void) | undefined) => {
    try {
        return await AsyncStorage.setItem(key, value, callback)
    } catch (e) {
        console.log('Error Storing Data ==>', e)
    };
};

export const getData = async (key: string, callback?: ((error?: Error | null | undefined, result?: string | null | undefined) => void) | undefined) => {
    try {
        return AsyncStorage.getItem(key, callback)
    } catch (e) {
        console.log('Error Retrieving Data ==>', e)
    }
}

export const removeData = async (key: string, callback?: ((error?: Error | null | undefined) => void) | undefined) => {
    try {
        return AsyncStorage.removeItem(key, callback)
    } catch (e) {
        console.log('Error Removing Data ==>', e)
    };
}
