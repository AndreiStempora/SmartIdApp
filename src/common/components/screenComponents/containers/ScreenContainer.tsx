import {
    View,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    StatusBar,
    ScrollView,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ErrorScreen from '../errors/ErrorScreen';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import { useSelector } from 'react-redux';
import { commonFonts } from '../../../styles/constants.tsx';
import { getPageError } from '../../../store/slices/errorSlice.tsx';
import Toast from 'react-native-toast-message';
import { getApp } from '../../../store/slices/appSlice.tsx';
import useSkipInitialRender from '../../../services/hooks/skipInitialrenderHook.tsx';

type Props = {
    children: React.ReactNode;
    barStyle?: 'dark-content' | 'light-content';
    contentStyle?: any;
    borderTop?: boolean;
    borderBottom?: boolean;
    nav: any;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    fullScreen?: boolean;
    removeBg?: boolean;
};

// const paddingBotForAndroid = () => {
//     if (Platform.OS === 'android') {
//         return 20;
//     }
//     return 0;
// };

const ScreenContainer = ({
    children,
    contentStyle,
    nav,
    header,
    footer,
    fullScreen,
    removeBg,
}: Props) => {
    const insets = useSafeAreaInsets();
    const error = useSelector(getPageError);
    const app = useSelector(getApp);

    useSkipInitialRender(() => {
        if (app.connected) {
            Toast.show({
                type: 'internetReconnect',
                text1: 'Connected',
                position: 'top',
                autoHide: true,
                visibilityTime: 1500,
            });
        } else {
            Toast.show({
                type: 'internetError',
                text1: 'No internet connection',
                position: 'top',
                autoHide: false,
            });
        }
        console.log('this works');
    }, app.connected);

    return (
        <View style={styles.mainPageView}>
            <ScrollView
                scrollEnabled={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled">
                <StatusBar
                    backgroundColor="#454545"
                    animated={true}
                    barStyle={'light-content'}
                />
                <OrientationLocker
                    orientation={PORTRAIT}
                    // onChange={orientation => console.log('onChange', orientation)}
                    // onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
                />
                {removeBg ? (
                    <View style={styles.imgBg}>
                        {header && header}
                        <SafeAreaView
                            style={[
                                styles.safeArea,
                                !header && { paddingTop: insets.top },
                                !footer && { marginBottom: insets.bottom },
                            ]}>
                            <View
                                style={[
                                    styles.safeArea,
                                    styles.safeAreaInner,
                                    fullScreen && styles.safeAreaInnerFull,
                                ]}>
                                <View
                                    style={[
                                        styles.fullContentContainer,
                                        contentStyle,
                                        fullScreen &&
                                            styles.fullContentContainerFull,
                                    ]}>
                                    {error ? (
                                        <ErrorScreen nav={nav} />
                                    ) : (
                                        <>{children}</>
                                    )}
                                </View>
                            </View>
                        </SafeAreaView>
                        {footer && footer}
                    </View>
                ) : (
                    <ImageBackground
                        source={require('../../../../../assets/images/AppBackground.png')}
                        style={styles.imgBg}>
                        {header && header}
                        <SafeAreaView
                            style={[
                                styles.safeArea,
                                !header && { paddingTop: insets.top },
                                !footer && { marginBottom: insets.bottom },
                            ]}>
                            <View
                                style={[
                                    styles.safeArea,
                                    styles.safeAreaInner,
                                    fullScreen && styles.safeAreaInnerFull,
                                ]}>
                                <View
                                    style={[
                                        styles.fullContentContainer,
                                        contentStyle,
                                        fullScreen &&
                                            styles.fullContentContainerFull,
                                    ]}>
                                    {/*<Toast config={toastConfig} />*/}
                                    {error ? (
                                        <ErrorScreen nav={nav} />
                                    ) : (
                                        <>{children}</>
                                    )}
                                </View>
                            </View>
                        </SafeAreaView>
                        {footer && footer}
                    </ImageBackground>
                )}
                {/*<View style={styles.bottom}></View>*/}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainPageView: {
        flex: 1,
    },
    dismissKeyboard: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,

        // backgroundColor: 'yellow',
    },
    imgBg: {
        flex: 1,
        backgroundColor: '#161616',
    },
    safeArea: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
    },
    safeAreaInner: {
        paddingHorizontal: w(16),
    },
    safeAreaInnerFull: {
        paddingHorizontal: w(0),
    },
    safeAreaNoHeader: {},

    fullContentContainer: {
        // marginVertical: h(16),

        flex: 1,
    },
    fullContentContainerFull: {
        marginVertical: h(0),
    },
    background: {
        flex: 1,
    },
    text: {
        ...commonFonts.regularTextSmall,
    },
});

export default ScreenContainer;
