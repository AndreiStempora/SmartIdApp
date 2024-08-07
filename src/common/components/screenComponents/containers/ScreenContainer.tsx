import {
    View,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Platform,
    StatusBar,
    Text,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ErrorScreen from '../errors/ErrorScreen';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';
import CustomModal from '../../modals/customModal.tsx';
import {
    getApp,
    getAppInfo,
    updateAppInfo,
} from '../../../store/slices/appSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store.tsx';
import { commonFonts } from '../../../styles/constants.tsx';
import { useRoute } from '@react-navigation/native';
import { getPageError } from '../../../store/slices/errorSlice.tsx';

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

const paddingBotForAndroid = () => {
    if (Platform.OS === 'android') {
        return 20;
    }
    return 0;
};

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
    // const error = false;
    // const app = useSelector(getApp);

    return (
        <View style={styles.mainPageView}>
            <StatusBar translucent backgroundColor="transparent" />
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
                    source={require('../../../../../assets/images/AppBackground.jpg')}
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
        // backgroundColor:'yellow'
    },
    imgBg: { flex: 1 },
    safeArea: {
        // backgroundColor:'red',
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
        marginVertical: h(16),
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