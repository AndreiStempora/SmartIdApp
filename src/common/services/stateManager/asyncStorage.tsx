import AsyncStorage from '@react-native-async-storage/async-storage';

type DefaultValues = { [key: string]: any };

const defaultValues: DefaultValues = {
    //when you change this also change in ts types file
    app: {
        stack: 'dealership',
        domain: '',
        token: '',
        appraisal: '',
        searchWord: '',
        language: 'en',
        dealerships: [],
        appraisalDeletedModalVisibility: false,
        photoUploadingList: [],
        uploadServiceEnabled: true,
    },
    translation: {
        dealerships: {
            title: 'Dealerships',
            button: 'add dealership',
            text: 'Franchised car dealerships are the front line for car manufacturers to get their products on the road.',
        },
        dealershipScanner: {
            text: 'Please scan the QR code of the dealership.',
            modals: {
                error: {
                    title: 'Couldn’t detect a dealership',
                    text: 'Please try again.',
                    button: 'OK',
                },
                duplicate: {
                    title: 'Dealership already added',
                    text: 'Duplicate dealership found, not adding the new item.',
                    button: 'OK',
                },
            },
        },
    },
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
