import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import CustomCamera from '../../../common/components/camera/CustomCamera.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import Icon from '../../../common/components/icons/Icon.tsx';
import { useIsFocused } from '@react-navigation/native';
import CustomCameraTabBar from '../../../common/components/screenComponents/bars/tabBars/CustomCameraTabBar.tsx';
import { accelerometer } from 'react-native-sensors';
import useBasicAnimation from '../../../common/services/hooks/animationHook.tsx';
import useBackgroundUpload from '../../../common/services/hooks/backgroundUploadHook.tsx';
import ChangeCameraType from './ChangeCameraType.tsx';
import HeaderComponentCamera from '../../../common/components/screenComponents/bars/headers/reusableHeaders/HeaderComponentCamera.tsx';
import useRecon from '../../../common/services/hooks/reconHook.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import { getApp } from '../../../common/store/slices/appSlice.tsx';
import { useSelector } from 'react-redux';
import useBlob from '../../../common/services/hooks/blobHook.tsx';

const CameraScreen2 = ({ navigation }: any) => {
    const camera = useRef(null);
    const isFocused = useIsFocused();
    const [isPortrait, setIsPortrait] = useState(false);
    const { switchOpenedModal } = useRecon();
    const { upload2 } = useBackgroundUpload();
    const { uploadThis2 } = useBlob();
    const app = useSelector(getApp);
    const [wideScreen, setWideScreen] = useState(false);
    const [ultraWideExists, setUltraWideExists] = useState(false);
    const { interpolationValue, animation } = useBasicAnimation({
        duration: 500,
        from: 1,
        to: 0,
    });
    const [buttonUnusable, setButtonUnusable] = useState(false);
    const { interpolationValue: interpolationValue2, animation: animation2 } =
        useBasicAnimation({ duration: 500, from: 0, to: 1 });
    const [fl, setFl] = useState('');
    const { t } = useText();
    useEffect(() => {
        isFocused && (async () => {})();
    }, [isFocused]);

    useEffect(() => {
        let lastUpdate = 0;
        const debounceTime = 500; // milliseconds
        const accelerometerObservable = accelerometer;

        const subscription = accelerometerObservable.subscribe(
            accelerometerData => {
                const now = Date.now();
                if (now - lastUpdate > debounceTime) {
                    const { x, y } = accelerometerData;
                    let angle = Math.atan2(y, x) * (180 / Math.PI);
                    if (Platform.OS === 'ios') {
                        angle = Math.atan2(y, -x) * (180 / Math.PI);
                    }
                    setIsPortrait(Math.abs(angle) > 60); // Check if the device is tilted beyond 45 degrees
                    lastUpdate = now;
                }
            },
            error => {
                console.log('Error:', error);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        // console.log('aaaa', isPortrait);
        animation();
        animation2();
    }, [isPortrait]);

    const saveCam = (cam: any) => {
        camera.current = cam;
    };

    const takePic = async () => {
        //@ts-ignore
        try {
            setButtonUnusable(true);
            if (!app.uploadServiceEnabled) {
                //@ts-ignore
                camera.current
                    .takePhoto({ flash: fl })
                    .then(async (data: any) => {
                        return await uploadThis2(
                            'novotradein/app/appraisal/reconUploadImage',
                            data.path
                        ).then(() => {
                            setButtonUnusable(false);
                        });
                    });
            } else {
                //@ts-ignore
                camera.current
                    .takePhoto({ flash: fl })
                    .then(async (data: any) => {
                        await upload2(
                            '/novotradein/app/appraisal/reconUploadImage',
                            data.path
                        ).then(() => {
                            setButtonUnusable(false);
                        });
                    });
            }
        } catch (e) {
            console.log(e, 'take pic error');
        }
    };

    const handleGoBack = () => {
        switchOpenedModal();
        navigation.goBack();
    };

    return (
        //@ts-ignore
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponentCamera
                    isPortrait={isPortrait}
                    backBtn={false}
                    leftSide={
                        !app.uploadServiceEnabled && buttonUnusable ? (
                            <></>
                        ) : (
                            <CustomHeaderIconButton
                                icon={'arrowPrevious'}
                                onPress={handleGoBack}
                            />
                        )
                    }
                    setFl={val => {
                        setFl(val);
                    }}
                />
            }
            fullScreen
            removeBg
            footer={
                <CustomCameraTabBar>
                    <View style={{ zIndex: 30, position: 'relative' }}></View>
                    {ultraWideExists && (
                        <ChangeCameraType
                            isPortrait={isPortrait}
                            onChange={e => {
                                setWideScreen(e);
                                // camera.current.changeCameraType(e);
                            }}
                        />
                    )}
                    <Animated.View
                        style={[
                            styles.takePicBtnContainer,
                            { opacity: interpolationValue2 },
                            (isPortrait || buttonUnusable) && {
                                pointerEvents: 'none',
                            },
                        ]}>
                        {buttonUnusable ? (
                            <View style={styles.activityContainer}>
                                <ActivityIndicator color={Colors.skyBlue} />
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.takePicBtn}
                                onPress={takePic}>
                                <View style={styles.innerBtn}></View>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                </CustomCameraTabBar>
            }>
            {/*<OrientationLocker orientation={"UNLOCK"}   />*/}
            <View
                style={{
                    height: '100%',
                }}>
                <Animated.View
                    style={[styles.coverFoil, { opacity: interpolationValue }]}>
                    <Icon
                        icon={'rotateCamera'}
                        width={w(48)}
                        height={h(48)}></Icon>
                    <Text style={styles.turnText}>{t('camera.text')}</Text>
                </Animated.View>
                <CustomCamera
                    photo={true}
                    cam={saveCam}
                    //@ts-ignore
                    ultraWideExists={e => setUltraWideExists(e)}
                    wideScreen={wideScreen}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    coverFoil: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.charcoal,
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    turnText: {
        ...commonFonts.regularTextSmall,
        color: Colors.white,
        textAlign: 'center',
        marginTop: h(10),
        paddingHorizontal: w(48),
    },
    takePicBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: h(2),
    },
    takePicBtn: {
        width: h(70),
        height: h(70),
        borderRadius: 70,
        backgroundColor: Colors.darkGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: w(5),
        borderColor: Colors.white,
        paddingHorizontal: w(2),
        paddingVertical: h(2),
    },
    innerBtn: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        backgroundColor: Colors.white,
    },
    activityContainer: {
        width: h(70),
        height: h(70),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CameraScreen2;
