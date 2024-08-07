import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import Icon from '../../icons/Icon.tsx';
import React, { useEffect } from 'react';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store.tsx';
import {
    getCurrentSelection,
    updateCurrentVehicle,
} from '../../../store/slices/selectedVehiclesSlice.tsx';
import handleImagesHook, {
    Spot,
} from '../../../services/hooks/handleImagesHook.tsx';

type Props = {
    nav: any;
    item: Spot;
};
const CustomSpot = ({ item, nav }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { generatePicturePath } = handleImagesHook();
    const currentSelection = useSelector(getCurrentSelection);

    useEffect(() => {
        (async () => {})();
    }, []);

    const handlePress = () => {
        // console.log('item', item.id, nav)
        dispatch(updateCurrentVehicle({ spot: item.id }));
        if (item.photo.length) {
            nav.navigate('Image');
        } else {
            nav.navigate('Camera');
        }
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.button}
                // activeOpacity={1}
                onPress={handlePress}>
                <View style={styles.imgContainer}>
                    <View style={styles.smallImageContainer}>
                        {item.photo.length ? (
                            <Image
                                source={{
                                    uri: generatePicturePath(
                                        currentSelection.vehicleVin,
                                        item.photo
                                    ),
                                }}
                                style={styles.image}
                            />
                        ) : (
                            <Icon
                                icon={'carIcon'}
                                height={h(24)}
                                width={w(24)}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.info} numberOfLines={2}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.counterContainer}>
                    <Icon icon={'itemArrowIcon'} width={w(24)} height={h(24)} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'transparent',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
    },
    imgContainer: {
        justifyContent: 'center',
    },
    smallImageContainer: {
        position: 'relative',
        backgroundColor: Colors.lightCharcoal,
        width: w(64),
        height: h(48),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: w(16),
        flexShrink: 1,
        gap: h(4),
    },
    webview: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        textAlign: 'center',
    },

    info: {
        ...commonFonts.boldText,
    },
    counterContainer: {
        justifyContent: 'center',
        gap: h(8),
        paddingHorizontal: w(12),
        height: h(72),
        width: w(48),
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default CustomSpot;
