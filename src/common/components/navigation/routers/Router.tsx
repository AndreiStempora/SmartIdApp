import { NavigationContainer } from '@react-navigation/native';
import LoginStack from '../navigationStacks/LoginStack.tsx';
import AuthenticatedStack from '../navigationStacks/AuthenticatedStack.tsx';
import React, { useEffect } from 'react';
import { getAppStack, updateAppInfo } from '../../../store/slices/appSlice.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store.tsx';
import { getItemFromStorage } from '../../../services/stateManager/asyncStorage.tsx';
import DealershipStack from '../navigationStacks/DealershipStack.tsx';
import LanguageStack from '../navigationStacks/LanguageStack.tsx';
import { View } from 'react-native';
import { updateTranslation } from '../../../store/slices/translationSlice.tsx';

const Router = () => {
    const dispatch = useDispatch<AppDispatch>();

    const stack = useSelector(getAppStack);

    useEffect(() => {
        (async () => {
            const app = await getItemFromStorage('app');
            if (app?.photoUploadingList === undefined) {
                app.photoUploadingList = [];
            }
            if (app?.uploadServiceEnabled === undefined) {
                app.uploadServiceEnabled = true;
            }
            const translation = await getItemFromStorage('translation');
            dispatch(updateAppInfo(app));
            dispatch(updateTranslation(translation));
        })();
    }, []);

    return (
        <>
            <View></View>
            <NavigationContainer>
                {stack === 'login' && <LoginStack />}
                {stack === 'authenticated' && <AuthenticatedStack />}
                {stack === 'dealership' && <DealershipStack />}
                {stack === 'language' && <LanguageStack />}
            </NavigationContainer>
        </>
    );
};

export default Router;
