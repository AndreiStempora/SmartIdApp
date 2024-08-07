import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from '../../icons/Icon.tsx';

import { h, w } from '../../../styles/PixelPerfect.tsx';
import { commonFonts } from '../../../styles/constants.tsx';
import { AppDispatch } from '../../../store/store.tsx';
import { useDispatch } from 'react-redux';
import { updateCurrentVehicle } from '../../../store/slices/selectedVehiclesSlice.tsx';
import { useIsFocused } from '@react-navigation/native';
import useUtility from '../../../services/hooks/utilityHook.tsx';

const SettingsCategoryItem = ({ item, nav }: any) => {
    const [pictureTakenCount, setPictureTakenCount] = useState(0);
    const [numberOfSpots, setNumberOfSpots] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const isFocused = useIsFocused();
    const { c, usedSpots, currentSelection, usedSpotsInCategory } =
        useUtility();

    useEffect(() => {
        isFocused &&
            (async () => {
                setPictureTakenCount(
                    await usedSpotsInCategory(
                        currentSelection.vehicleVin,
                        item.id
                    )
                );
            })();
    }, [isFocused]);

    const handlePress = () => {
        dispatch(updateCurrentVehicle({ category: item.id }));
        nav.navigate('PictureCategory', { category: item });
    };
    return (
        <TouchableOpacity
            style={styles.container}
            // activeOpacity={1}
            onPress={handlePress}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Text style={styles.counter}>
                    {pictureTakenCount} / {item.spots.length}
                </Text>
                <Icon
                    icon={'itemArrowIcon'}
                    width={w(24)}
                    height={h(24)}></Icon>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: h(70),
    },
    titleContainer: {},
    counter: {
        ...commonFonts.regularTextSmall,
    },
    title: {
        ...commonFonts.boldText,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(12),
    },
});

export default SettingsCategoryItem;
