import { useEffect } from 'react';
import { BackHandler, BackHandlerStatic } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const useAndroidBackButton = () => {
    const isFocused = useIsFocused();
    const handleBackButton = () => {
        console.log('back button pressed');
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

    return null;
};

export default useAndroidBackButton;
