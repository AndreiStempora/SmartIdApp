import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import ProfileScreen from '../../../../screens/authenticatedStack/profile/ProfileScreen.tsx';
import PlaceholderScreen from '../../../../screens/placeholder/PlaceholderScreen.tsx';
import DashboardScreen from '../../../../screens/authenticatedStack/dashboard/DashboardScreen.tsx';
import ScanVinScreen from '../../../../screens/authenticatedStack/scanVin/ScanVinScreen.tsx';
import BrowseAppraisalsScreen from '../../../../screens/authenticatedStack/browseAppraisals/BrowseAppraisalsScreen.tsx';
import TrimsScreen from '../../../../screens/authenticatedStack/trims/TrimsScreen.tsx';
import OptionsScreen from '../../../../screens/authenticatedStack/options/OptionsScreen.tsx';
import ImagesScreen from '../../../../screens/authenticatedStack/images/ImagesScreen.tsx';
import ReconScreen from '../../../../screens/authenticatedStack/recon/ReconScreen.tsx';
import InfoScreen from '../../../../screens/authenticatedStack/notes/InfoScreen.tsx';
import DetailsScreen from '../../../../screens/authenticatedStack/details/DetailsScreen.tsx';
import ClientScreen from '../../../../screens/authenticatedStack/client/ClientScreen.tsx';
import CameraScreen from '../../../../screens/authenticatedStack/camera/CameraScreen.tsx';
import CameraScreen2 from '../../../../screens/authenticatedStack/camera/CameraScreen2.tsx';
import LanguageScreen from '../../../../screens/language/language/LanguageScreen.tsx';
import HelpScreen from '../../../../screens/authenticatedStack/support/HelpScreen.tsx';
import SelectVehicleScreen from '../../../../screens/authenticatedStack/selectVehicle/SelectVehicleScreen.tsx';

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
            <Stack.Screen name={'Client'} component={ClientScreen} />
            <Stack.Screen name={'Info'} component={InfoScreen} />
            <Stack.Screen name={'Images'} component={ImagesScreen} />
            <Stack.Screen name={'ScanVin'} component={ScanVinScreen} />
            <Stack.Screen name={'Trims'} component={TrimsScreen} />
            <Stack.Screen name={'Options'} component={OptionsScreen} />
            <Stack.Screen name={'Recon'} component={ReconScreen} />
            <Stack.Screen name={'Details'} component={DetailsScreen} />
            <Stack.Screen name={'Camera'} component={CameraScreen} />
            <Stack.Screen name={'Camera2'} component={CameraScreen2} />
            <Stack.Screen name={'Obd'} component={PlaceholderScreen} />
            <Stack.Screen name={'Market'} component={PlaceholderScreen} />
            <Stack.Screen
                name={'SelectVehicle'}
                component={SelectVehicleScreen}
            />
            <Stack.Screen
                name={'BrowseAppraisals'}
                component={BrowseAppraisalsScreen}
            />
            <Stack.Screen name={'Help'} component={HelpScreen} />
            <Stack.Screen name={'Profile'} component={ProfileScreen} />
            <Stack.Screen name={'Placeholder'} component={PlaceholderScreen} />

            <Stack.Screen name={'Language'} component={LanguageScreen} />
        </Stack.Navigator>
    );
};

export default AuthenticatedStack;
