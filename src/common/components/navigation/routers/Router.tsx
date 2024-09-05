import { NavigationContainer } from '@react-navigation/native';
import LoginStack from '../navigationStacks/LoginStack.tsx';
import AuthenticatedStack from '../navigationStacks/AuthenticatedStack.tsx';
import React, { useEffect } from 'react';
import { getAppStack, updateAppInfo } from '../../../store/slices/appSlice.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store.tsx';
import { getItemFromStorage } from '../../../services/stateManager/asyncStorage.tsx';
import { View } from 'react-native';
import { updateTranslation } from '../../../store/slices/translationSlice.tsx';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Toast from 'react-native-toast-message';
import { useNetInfo } from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

const Router = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { type, isConnected } = useNetInfo();
    const stack = useSelector(getAppStack);
    const bundleId = DeviceInfo.getBundleId();
    useEffect(() => {
        (async () => {
            const app = await getItemFromStorage('app');
            const str = bundleId.split('.').slice(-1).pop();
            app.domain =
                // 'https://v2.smartid.stempora.me/api/smartid-ai/' + str + '/';
                'https://smartid.stempora.com/api/smartid-ai/' + str + '/';
            const translation = await getItemFromStorage('translation');
            dispatch(updateAppInfo(app));
            dispatch(updateTranslation(translation));
            changeNavigationBarColor('#000000', true, true);
        })();
    }, []);

    useEffect(() => {
        console.log('stack', stack);
    }, [stack]);

    useEffect(() => {
        if (isConnected) {
            dispatch(updateAppInfo({ connected: true }));
        } else {
            dispatch(updateAppInfo({ connected: false }));
        }
    }, [isConnected]);

    return (
        <NavigationContainer>
            {stack === 'login' && <LoginStack />}
            {stack === 'authenticated' && <AuthenticatedStack />}
            {/*{stack === 'dealership' && <DealershipStack />}*/}
            {/*{stack === 'language' && <LanguageStack />}*/}
        </NavigationContainer>
    );
};

export default Router;
