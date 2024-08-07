import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import LanguageScreen from '../../../../screens/language/language/LanguageScreen.tsx';

const Stack = createStackNavigator();

const AuthenticatedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'black' }, // Set screen background color to transparent
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerShadowVisible: false,
                headerTransparent: true, // Make the header transparent
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.ModalFadeTransition,
            }}>
            <Stack.Screen name={'Language'} component={LanguageScreen} />
        </Stack.Navigator>
    );
};

export default AuthenticatedStack;
