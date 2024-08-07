import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import ScannerScreen from '../../../../screens/dealerships/Scanner/ScannerScreen.tsx';
import DealershipScreen from '../../../../screens/dealerships/dealerships/DealershipScreen.tsx';

const Stack = createStackNavigator();
const DealershipStack = () => {
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
                cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                        cardStyle: {
                            opacity: current.progress,
                        },
                    };
                },
            }}>
            <Stack.Screen name={'Dealership'} component={DealershipScreen} />
            <Stack.Screen
                name={'DealershipScanner'}
                component={ScannerScreen}
            />
        </Stack.Navigator>
    );
};

export default DealershipStack;
