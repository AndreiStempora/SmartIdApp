import AsyncStorage from '@react-native-async-storage/async-storage';

type DefaultValues = { [key: string]: any };

const defaultValues: DefaultValues = {
    //when you change this also change in ts types file
    app: {
        stack: 'authenticated',
        // domain: 'https://v2.smartid.stempora.me/api/smartid-ai/',
        domain: 'https://smartid.stempora.com/api/smartid-ai/',
        token: '',
        language: 'en',
        connected: true,
    },
    translation: {},
};

export const setItemInStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // console.log('could not save item to storage', e);
    }
};
export const getItemFromStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return await JSON.parse(value);
        } else {
            const defaultValue = defaultValues[key];
            if (defaultValue) {
                await setItemInStorage(key, defaultValue);
                return defaultValue;
            } else {
                console.log(`Default value for key '${key}' not found.`);
                return null;
            }
        }
    } catch (e) {
        console.log('could not get item from storage', e);
    }
};

export const updateItemInStorage = async (key: string, newValue: object) => {
    try {
        const oldValue = await getItemFromStorage(key);
        // console.log('old value', key, oldValue, newValue);
        const mergedValue = { ...oldValue, ...newValue };
        // console.log('mergedValue', key, mergedValue);
        await AsyncStorage.setItem(key, JSON.stringify(mergedValue));
    } catch (e) {
        console.log(
            'could not update item -' + key + '- in storage because',
            e
        );
    }
};

export const replaceItemInStorage = async (key: string, newValue: object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
        console.log(
            'could not replace item -' + key + '- in storage because',
            e
        );
    }
};

export const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (e) {
        console.log('could not get all keys from storage', e);
    }
};

export const deleteItemFromStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('could not delete item from storage');
    }
};
