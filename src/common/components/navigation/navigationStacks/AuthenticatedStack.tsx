import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';

import DashboardScreen from '../../../../screens/authenticatedStack/dashboard/DashboardScreen.tsx';
import AnalyzingScreen from '../../../../screens/authenticatedStack/analyzing/AnalyzingScreen.tsx';
import MatchesScreen from '../../../../screens/authenticatedStack/matches/MatchesScreen.tsx';
import ProfileScreen from '../../../../screens/authenticatedStack/profile/ProfileScreen.tsx';
import DetailsScreen from '../../../../screens/authenticatedStack/details/DetailsScreen.tsx';
import AnalyzingAuthenticityScreen from '../../../../screens/authenticatedStack/analyzingAuthenticity/AnalyzingAuthenticity.tsx';
import FakeScreen from '../../../../screens/authenticatedStack/fake/FakeScreen.tsx';
import CameraScreen from '../../../../screens/authenticatedStack/camera/CameraScreen.tsx';
import InitialImageUploadScreen from '../../../../screens/authenticatedStack/initialImageUpload/InitialImageUploadScreen.tsx';
import FullUploadScreen from '../../../../screens/authenticatedStack/fullUpload/FullUploadScreen.tsx';
import CameraScreen2 from '../../../../screens/authenticatedStack/camera/CameraScreen2.tsx';
import ImageProcessingScreen from '../../../../screens/authenticatedStack/imageProcessing/ImageProcessingScreen.tsx';
import PlaceholderScreen from '../../../../screens/placeholder/PlaceholderScreen.tsx';
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
            <Stack.Screen name={'Dashboard'} component={DashboardScreen} />
            <Stack.Screen name={'Analyzing'} component={AnalyzingScreen} />
            <Stack.Screen
                name={'Authenticity'}
                component={AnalyzingAuthenticityScreen}
            />
            <Stack.Screen name={'Matches'} component={MatchesScreen} />
            <Stack.Screen name={'Profile'} component={ProfileScreen} />
            <Stack.Screen name={'Details'} component={DetailsScreen} />
            <Stack.Screen name={'Fake'} component={FakeScreen} />
            <Stack.Screen name={'Camera'} component={CameraScreen} />
            <Stack.Screen name={'Camera2'} component={CameraScreen2} />
            <Stack.Screen name={'FullUpload'} component={FullUploadScreen} />
            <Stack.Screen
                name={'InitialUpload'}
                component={InitialImageUploadScreen}
            />
            <Stack.Screen
                name={'ImageProcessing'}
                component={ImageProcessingScreen}
            />
            <Stack.Screen name={'Placeholder'} component={PlaceholderScreen} />
        </Stack.Navigator>
    );
};

export default AuthenticatedStack;
