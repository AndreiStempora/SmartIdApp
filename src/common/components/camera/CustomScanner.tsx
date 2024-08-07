import {
    Camera,
    CodeType,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';
import React, { useEffect, useState } from 'react';
import {
    Linking,
    Platform,
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomModal from '../modals/customModal.tsx';
import { commonFonts } from '../../styles/constants.tsx';
import { useIsForeground } from '../../services/hooks/isForegroundHook.tsx';

type Props = {
    onCodeScanned: (codes: QRCodes) => void;
    scanTypes: CodeType[];
};

export interface QRCodes {
    corners?: { x: number; y: number }[][];
    frame: { height: number; width: number; x: number; y: number };
    type: string;
    value: string;
    [key: string]: any;
}

const CustomScanner = ({ onCodeScanned, scanTypes }: Props) => {
    const [isActive, setIsActive] = useState(false);
    const device = useCameraDevice('back');
    const isFocused = useIsFocused();
    const [showModal, setShowModal] = useState(false);
    const nav = useNavigation();
    const isForeground = useIsForeground();

    const codeScanner = useCodeScanner({
        codeTypes: scanTypes,
        onCodeScanned: codes => {
            //@ts-ignore
            onCodeScanned(codes);
        },
    });

    // useEffect(() => {
    //     (isFocused || isForeground) &&
    //         (async () => {
    //             if (Platform.OS === 'android') {
    //                 try {
    //                     if (device) {
    //                         if (!showModal) {
    //                             const granted =
    //                                 await PermissionsAndroid.request(
    //                                     PermissionsAndroid.PERMISSIONS.CAMERA
    //                                 );
    //
    //                             if (
    //                                 granted ===
    //                                 PermissionsAndroid.RESULTS.GRANTED
    //                             ) {
    //                                 console.log('You can use the camera');
    //                                 setIsActive(true);
    //                             } else {
    //                                 console.log('Camera permission denied');
    //                                 setShowModal(true);
    //                             }
    //                         }
    //                     }
    //                 } catch (err) {
    //                     console.warn(err);
    //                 }
    //             } else {
    //                 if (device) {
    //                     console.log(
    //                         'dev true',
    //                         Camera.getCameraPermissionStatus()
    //                     );
    //
    //                     if (
    //                         Camera.getCameraPermissionStatus() ===
    //                         'not-determined'
    //                     ) {
    //                         const permission =
    //                             await Camera.requestCameraPermission();
    //                         if (permission) {
    //                             setIsActive(true);
    //                         }
    //                     }
    //                     if (Camera.getCameraPermissionStatus() === 'denied') {
    //                         setShowModal(true);
    //                     }
    //                     if (Camera.getCameraPermissionStatus() === 'granted') {
    //                         setShowModal(false);
    //                         setIsActive(true);
    //                     }
    //                 }
    //             }
    //         })();
    //
    //     return () => {
    //         setIsActive(false);
    //     };
    // }, [isForeground, isFocused]);
    useEffect(() => {
        const checkCameraPermissions = async () => {
            if (!device) return;

            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('You can use the camera');
                        setShowModal(false);
                        setIsActive(true);
                    } else {
                        console.log('Camera permission denied');
                        setShowModal(true);
                    }
                } else {
                    const status = await Camera.getCameraPermissionStatus();
                    if (status === 'not-determined') {
                        const permission =
                            await Camera.requestCameraPermission();
                        if (permission === 'granted') {
                            setIsActive(true);
                        }
                    } else if (status === 'denied') {
                        setShowModal(true);
                    } else if (status === 'granted') {
                        setShowModal(false);
                        setIsActive(true);
                    }
                }
            } catch (err) {
                console.warn(err);
            }
        };

        if (isFocused || isForeground) {
            checkCameraPermissions();
        }

        return () => {
            setIsActive(false);
        };
    }, [isFocused, isForeground, device]);

    if (!device) return null;

    return (
        <View style={styles.container}>
            <CustomModal
                isVisible={showModal}
                buttons={[
                    {
                        title: 'Open Settings',
                        onPress: async () => {
                            // setShowModal(false);
                            await Linking.openSettings();
                        },
                    },
                    {
                        title: 'Cancel',
                        onPress: () => {
                            setShowModal(false);
                            nav.goBack();
                        },
                    },
                ]}
                title={'Permission Required'}>
                <View>
                    <Text style={styles.text}>
                        Our app requires camera access to provide essential
                        functionalities: Scanning QR codes, barcodes, and
                        data-matrix codes to streamline data entry, and taking
                        pictures of vehicles to support accurate vehicle
                        management.
                    </Text>
                </View>
            </CustomModal>
            {isActive && (
                <Camera
                    device={device}
                    isActive={isActive}
                    codeScanner={codeScanner}
                    style={[styles.camera]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: -1,
    },
    view: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
    },
    active: {
        opacity: 1,
    },
    camera: {
        width: '100%',
        height: '100%',
        // zIndex:-100
    },
    text: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
});
export default CustomScanner;
