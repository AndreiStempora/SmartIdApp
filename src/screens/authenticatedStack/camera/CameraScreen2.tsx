import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import CustomCamera from '../../../common/components/camera/CustomCamera.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import CustomIconBigButton from './components/CustomIconBigButton.tsx';
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { AppDispatch } from '../../../common/store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSlotsData,
    updateInitialPhotoDetails,
    updateSlotsData,
    updateTakenPicturesData,
} from '../../../common/store/slices/photoSlice.tsx';
import { useRoute } from '@react-navigation/native';

const CameraScreen2 = ({ navigation }: any) => {
    const camera = useRef(null);
    const dispatch = useDispatch<AppDispatch>();
    const [img, setImg] = useState({});
    const router = useRoute();
    const slots = useSelector(getSlotsData);

    useEffect(() => {
        console.log(slots, 'caca');
    }, [slots]);

    const handleGalleryImage = async () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            width: 300,
            height: 300,
            cropping: false,
        }).then(image => {
            console.log(image, 'rrr');
            setImg(image);
            //@ts-ignore
            ImageCropPicker.openCropper({
                path: image.path,
            }).then(croppedImage => {
                console.log(croppedImage, 'cropped image', image);
                dispatch(
                    updateSlotsData({
                        //@ts-ignore
                        slot: router.params?.slot,
                        src: image.path,
                    })
                );
                dispatch(
                    updateTakenPicturesData({
                        //@ts-ignore
                        slot: router.params?.slot,
                        image: image,
                    })
                );

                navigation.navigate('FullUpload');
            });
        });
    };

    const handleCameraImage = async () => {
        if (camera.current === null) {
            return console.log('camera not ready');
        }
        //@ts-ignore
        camera.current.takePhoto().then(image => {
            console.log(image, 'data22222222');
            if (!image.path.startsWith('file://')) {
                image.path = 'file://' + image.path;
                // if image.path ends with .jpg,jpeg set mime to image/jpeg
                if (image.path.match(/\.(jpeg|jpg)$/)) {
                    image.mime = 'image/jpeg';
                } else if (image.path.match(/\.(png)$/)) {
                    image.mime = 'image/png';
                }
            }

            dispatch(
                //@ts-ignore
                updateSlotsData({ slot: router.params?.slot, src: image.path })
            );
            dispatch(
                updateTakenPicturesData({
                    //@ts-ignore
                    slot: router.params?.slot,
                    image: image,
                })
            );

            // dispatch(updateInitialPhotoDetails(image));
            // // navigation.navigate('Details', { image: data });
            navigation.navigate('FullUpload');
        });
    };

    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            <View style={styles.buttonFloater}>
                <IdHeader navigation={navigation} title={'Capture Watch'} />
            </View>
            <CustomCamera
                photo={true}
                cam={cam => {
                    //@ts-ignore
                    camera.current = cam;
                }}
            />
            <View style={styles.coverContainer}>
                <View style={styles.topEdge} />
                <View
                    style={[
                        styles.clearContainer,
                        { height: Dimensions.get('window').width },
                    ]}>
                    <View style={[styles.topLeft, styles.cube]} />
                    <View style={[styles.topRight, styles.cube]} />
                    <View style={[styles.center, styles.cube]}>
                        <View style={[styles.centerVertical]} />
                        <View style={[styles.centerHorizontal]} />
                    </View>
                    <View style={[styles.bottomLeft, styles.cube]} />
                    <View style={[styles.bottomRight, styles.cube]} />
                </View>
                <View style={styles.bottomEdge}>
                    <CustomIconBigButton
                        onPress={handleGalleryImage}
                        icon={'gallery'}
                        bgColor={Colors.black300}
                        borderColor={Colors.black400}
                    />
                    <CustomIconBigButton
                        onPress={handleCameraImage}
                        icon={'camera'}
                        btnPadding={25}
                    />
                    <CustomIconBigButton
                        onPress={() => {}}
                        icon={'camera'}
                        transparent
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    coverContainer: {
        position: 'absolute',
        top: h(0),
        left: w(0),
        width: '100%',
        height: '100%',
    },
    topEdge: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
    },
    clearContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topLeft: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        top: 0,
        left: 0,
    },
    topRight: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        top: 0,
        right: 0,
    },
    center: {
        position: 'relative',
    },
    centerVertical: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.white,
        position: 'absolute',
        top: '50%',
    },
    centerHorizontal: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.white,
        position: 'absolute',
        left: '50%',
    },
    bottomLeft: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
        bottom: 0,
        right: 0,
    },
    cube: {
        width: w(26),
        height: h(26),
        borderColor: Colors.white,
        position: 'absolute',
    },
    bottomEdge: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        verticalAlign: 'middle',
        justifyContent: 'space-evenly',
    },
    buttonFloater: {
        position: 'absolute',
        top: h(0),
        left: w(0),
        width: '100%',
        height: h(52),
        // backgroundColor: 'red',
        zIndex: 1,
    },
});

export default CameraScreen2;
