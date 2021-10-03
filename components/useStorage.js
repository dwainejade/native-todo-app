import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


function useAsyncStorage(key, defaultValue){
    const [storageValue, updateStorageValue] = useState(defaultValue);
    const [updated, setUpdated] = useState(false);

    async function getStorageValue() {
        let value = defaultValue;
        try {
            value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
        } catch (e) {
        } finally {
            updateStorageValue(value);
            setUpdated(true);
        }
    }

    async function updateStorage(newValue) {
        try {
            if (newValue === null) {
                await AsyncStorage.removeItem(key);
            } else {
                const value = JSON.stringify(newValue);
                await AsyncStorage.setItem(key, value);
            }
        } catch (e) {
        } finally {
            setUpdated(false);
            getStorageValue();
        }
    }

    useEffect(() => {
        getStorageValue();
        // console.log(storageValue)
    }, [updated]);

    return [storageValue, updateStorage];
};

export default useAsyncStorage
