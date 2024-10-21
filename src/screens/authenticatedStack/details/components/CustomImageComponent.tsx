import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Icon from '../../../../common/components/icons/Icon.tsx';
import PictureModal from '../../../../common/components/modals/PictureModal.tsx';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors } from '../../../../common/styles/constants.tsx';

type Props = {
    image: string;
    btnPosition?: { top: number; right: number };
    resizeMode?: 'cover' | 'contain';
};
const CustomImageComponent = ({ image, btnPosition, resizeMode }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <View style={[styles.mainContainer]}>
            <View style={[styles.imgContainer]}>
                <Image
                    style={[
                        styles.img,
                        resizeMode && { resizeMode: resizeMode },
                    ]}
                    source={{ uri: image }}
                />
            </View>
            <TouchableOpacity
                style={[styles.btnContainer, btnPosition]}
                onPress={() => {
                    setIsVisible(!isVisible);
                }}>
                <View style={styles.btn}>
                    <Icon icon={'fullscreen'} width={w(24)} height={h(24)} />
                </View>
            </TouchableOpacity>
            <PictureModal
                isVisible={isVisible}
                buttons={[]}
                // @ts-ignore
                setVisibility={setIsVisible}>
                <View style={{ height: '100%', width: '100%' }}>
                    <ReactNativeZoomableView
                        minZoom={1}
                        maxZoom={2}
                        initialZoom={1}
                        bindToBorders={true}>
                        <Image
                            style={[styles.innerImage]}
                            source={{ uri: image }}
                        />
                    </ReactNativeZoomableView>
                </View>
            </PictureModal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {},
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    btnContainer: {
        position: 'absolute',
        top: h(19),
        right: w(16),
        padding: w(6),
    },
    btn: {
        borderWidth: 1,
        borderColor: Colors.black400,
        borderRadius: 50,
        width: w(40),
        height: w(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black300,
    },
    innerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default CustomImageComponent;
