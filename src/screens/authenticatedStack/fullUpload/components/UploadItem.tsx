import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import Icon from '../../../../common/components/icons/Icon.tsx';
import boldBigWatch from '../../../../../assets/generatedIcons/BoldBigWatch.tsx';
import { useEffect, useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
    updateSlotsData,
    updateTakenPicturesData,
} from '../../../../common/store/slices/photoSlice.tsx';
import { AppDispatch } from '../../../../common/store/store.tsx';
import { useDispatch } from 'react-redux';

type Props = {
    slot: string;
    name: string;
    required: boolean;
    editable: boolean;
    mask: string[];
    src?: string;
    navigation: any;
};
const UploadItem = ({
    slot,
    name,
    required,
    editable,
    mask,
    src,
    navigation,
}: Props) => {
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleTakePhoto = () => {
        navigation.navigate('Camera2', { slot: slot });
    };
    const handleCrop = () => {
        ImageCropPicker.openCropper({
            //@ts-ignore
            path: src,
        }).then(croppedImage => {
            console.log(croppedImage, 'cropped image');
            dispatch(
                updateSlotsData({
                    //@ts-ignore
                    slot: router.params?.slot,
                    src: src,
                })
            );
        });
    };

    useEffect(() => {
        console.log(
            'UploadItem mounted',
            slot,
            name,
            required,
            editable,
            mask,
            src
        );
    }, []);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                {src?.length ? (
                    <Image
                        source={{ uri: src }}
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <Icon
                        icon={'boldBigWatch'}
                        width={w(40)}
                        height={h(40)}
                        fill={Colors.black500}
                    />
                )}
            </View>
            <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {name}
                </Text>
            </View>
            {editable && (
                <View>
                    {src?.length ? (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.halfButton}
                                onPress={handleTakePhoto}>
                                <Icon
                                    icon={'boldRetry'}
                                    width={w(24)}
                                    height={h(24)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.halfButton}
                                onPress={handleCrop}>
                                <Icon
                                    icon={'boldCropRotate'}
                                    width={w(24)}
                                    height={h(24)}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.localButtonContainer}
                            onPress={handleTakePhoto}>
                            <Icon
                                icon={'camera'}
                                width={w(24)}
                                height={h(24)}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        borderWidth: w(1),
        borderColor: Colors.black400,
        borderRadius: w(4),
        padding: w(16),
        gap: w(16),
        flexDirection: 'column',
        backgroundColor: Colors.black300,
        maxWidth: '50%',
    },
    imageContainer: {
        width: w(136),
        height: h(136),
        borderWidth: w(1),
        borderColor: Colors.black500,
        borderRadius: w(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...commonFonts.boldTitle,
        color: Colors.white,
        textAlign: 'center',
    },
    localButtonContainer: {
        width: '100%',
        borderRadius: w(4),
        borderWidth: w(1),
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: h(56),
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: w(8),
    },
    halfButton: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black300,
        paddingVertical: h(15),
        borderWidth: w(1),
        borderRadius: w(4),
        borderColor: Colors.black400,
    },
});

export default UploadItem;
