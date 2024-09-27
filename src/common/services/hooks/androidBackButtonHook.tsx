import { useEffect, useState } from 'react';
import { BackHandler, BackHandlerStatic } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const useAndroidBackButton = (func: Function) => {
    const isFocused = useIsFocused();

    const handleBackButton = () => {
        console.log('back button pressed');
        func && func();
        return true;
    };
    useEffect(() => {
        let backHandler: any;

        if (isFocused) {
            console.log('back button listener added---------------------');
            backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton
            );
        }

        return () => {
            if (backHandler) {
                backHandler.remove();
                console.log(
                    'back button listener removed---------------------'
                );
            }
        };
    }, [isFocused]);

    return;
};

export default useAndroidBackButton;
