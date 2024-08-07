/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense, useEffect } from 'react';
import { Modal, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/common/store/store.tsx';
import Router from './src/common/components/navigation/routers/Router.tsx';
import SplashScreen from 'react-native-splash-screen';
import { changeBarColors } from '@aladdinstudios/react-native-immersive-bars';

function App(): React.JSX.Element {
    useEffect(() => {
        (async () => {
            setTimeout(() => {
                SplashScreen.hide();
            }, 1000);
        })();
    }, []);

    changeBarColors(false, 'blue', 'green');

    return (
        <Provider store={store}>
            <Suspense fallback={<Text>Suspense increased</Text>}>
                <Router />
            </Suspense>
        </Provider>
    );
}

export default App;
