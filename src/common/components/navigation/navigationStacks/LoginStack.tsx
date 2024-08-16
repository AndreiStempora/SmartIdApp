import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import LoginScreen from '../../../../screens/loginStack/login/LoginScreen.tsx';

const Stack = createStackNavigator();
const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'black' }, // Set screen background color to transparent
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerShadowVisible: false,
                headerTransparent: true,
                // Make the header transparent
                headerShown: false,
                gestureEnabled: false,
                ...TransitionPresets.ModalFadeTransition,
            }}>
            <Stack.Screen name={'Login'} component={LoginScreen} />
        </Stack.Navigator>
    );
};

export default LoginStack;
