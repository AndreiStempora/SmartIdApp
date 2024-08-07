import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../icons/Icon.tsx';
import { f, h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts, Fonts } from '../../../styles/constants.tsx';
import { AppDispatch } from '../../../store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getIsSelectable,
    getSelectAll,
    getSelectedVehicles,
    updateCurrentVehicle,
} from '../../../store/slices/selectedVehiclesSlice.tsx';
import {
    updateIsSelectable,
    updateSelectedVehicles,
} from '../../../store/slices/selectedVehiclesSlice.tsx';
import React, { useEffect, useState } from 'react';
import useUtility from '../../../services/hooks/utilityHook.tsx';
import useHandleImages from '../../../services/hooks/handleImagesHook.tsx';
import { useIsFocused } from '@react-navigation/native';

type Props = {
    element: {
        vehicle_id: string;
        vehicle_vin: string;
        vehicle_stock: null;
        vehicle_odometer: null;
        vehicle_year: string;
        brand_name: string;
        model_name: string;
        trim_name: string;
        __count: number;
    };
    index?: number;
    nav: any;
};

const CustomItemButton = ({ element, index, nav }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const isSelectable = useSelector(getIsSelectable);
    const selectedVehicles = useSelector(getSelectedVehicles);
    const selectAll = useSelector(getSelectAll);
    const [selected, setSelected] = useState(false);
    const { c, numberOfSpots, usedSpots, currentSelection } = useUtility();
    const { readFile, generatePicturePath } = useHandleImages();
    const [totalSpots, setTotalSpots] = useState(0);
    const [spotsWithPhoto, setSpotsWithPhoto] = useState(0);
    const [mainPicture, setMainPicture] = useState('');

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused &&
            (async () => {
                console.log('this does not work');
                setTotalSpots(numberOfSpots());
                setSpotsWithPhoto(await usedSpots(element.vehicle_vin));
                const arg = await readFile(element.vehicle_vin);
                const photos = arg.spots.filter((x: any) => x.photo !== '');
                if (photos.length) {
                    setMainPicture(
                        generatePicturePath(
                            element.vehicle_vin,
                            photos[0].photo
                        )
                    );
                }
            })();
    }, [isFocused]);

    useEffect(() => {
        if (!isSelectable) {
            setSelected(false);
            dispatch(updateSelectedVehicles([]));
        }
    }, [isSelectable]);

    useEffect(() => {
        c(selectedVehicles, 'selectedVehicles');
    }, [selectedVehicles]);

    useEffect(() => {
        if (selected) {
            dispatch(
                updateSelectedVehicles([
                    ...selectedVehicles,
                    element.vehicle_vin,
                ])
            );
        } else {
            dispatch(
                updateSelectedVehicles(
                    selectedVehicles.filter(
                        item => item !== element.vehicle_vin
                    )
                )
            );
        }
    }, [selected]);

    useEffect(() => {
        setTimeout(() => {
            setSelected(selectAll);
        }, 0);
    }, [selectAll]);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.button}
                // activeOpacity={1}
                onPress={() => {
                    console.log('a');
                    if (isSelectable) {
                        setSelected(!selected);
                    } else {
                        dispatch(
                            updateCurrentVehicle({
                                vehicleVin: element.vehicle_vin,
                            })
                        );
                        nav.navigate('VehicleDetails', { vehicle: element });
                    }
                }}
                onLongPress={() => {
                    if (!isSelectable) {
                        setSelected(true);
                        dispatch(updateIsSelectable(true));
                    }
                }}>
                <View style={styles.imgContainer}>
                    <View style={styles.smallImageContainer}>
                        <View style={styles.imageContainer}>
                            {mainPicture ? (
                                <Image
                                    source={{ uri: mainPicture }}
                                    style={styles.image}
                                />
                            ) : (
                                <Icon
                                    icon={'carIcon'}
                                    height={h(24)}
                                    width={w(24)}></Icon>
                            )}
                        </View>
                        {isSelectable && (
                            <>
                                {selected ? (
                                    <View
                                        style={[
                                            styles.checkmark,
                                            styles.checkmarkFull,
                                        ]}>
                                        <Icon
                                            icon={'smallCheckmarkIcon'}></Icon>
                                    </View>
                                ) : (
                                    <View
                                        style={[
                                            styles.checkmark,
                                            styles.checkmarkEmpty,
                                        ]}></View>
                                )}
                            </>
                        )}
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {element.vehicle_vin}
                    </Text>
                    <Text style={styles.info} numberOfLines={2}>
                        {element.vehicle_year} {element.brand_name}{' '}
                        {element.model_name} {element.trim_name}
                    </Text>
                </View>
                <View style={styles.counterContainer}>
                    {!isSelectable && (
                        <>
                            <Icon
                                icon={'itemArrowIcon'}
                                width={w(24)}
                                height={h(24)}></Icon>
                            <Text style={styles.numbers}>
                                <Text style={styles.numbers}>
                                    {spotsWithPhoto}
                                </Text>
                                /
                                <Text style={styles.numbers}>{totalSpots}</Text>
                            </Text>
                        </>
                    )}
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
        // backgroundColor:'red'
    },
    imgContainer: {
        justifyContent: 'center',
        // backgroundColor:'blue',
    },
    // smallImageContainer: {
    //     position:'relative',
    //     // backgroundColor:'green',
    // },
    checkmark: {
        position: 'absolute',
        right: w(-8),
        top: h(-8),
        width: w(20),
        height: h(20),
        borderRadius: w(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkEmpty: {
        borderWidth: w(2),
        borderColor: Colors.skyBlue,
        backgroundColor: Colors.charcoal,
        overflow: 'hidden',
    },
    checkmarkFull: {
        backgroundColor: Colors.skyBlue,
    },
    textContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: w(16),
        flexShrink: 1,
        gap: h(4),
    },
    title: {
        fontFamily: Fonts.Semi,
        fontSize: f(16),
        lineHeight: f(20.8),
        color: Colors.white,
    },
    info: {
        fontFamily: Fonts.Med,
        fontSize: f(14),
        lineHeight: f(21),
        color: Colors.metal,
    },
    counterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: h(8),
        paddingHorizontal: w(12),
        height: h(91),
        width: w(65),
    },
    imageContainer: {
        width: w(64),
        height: h(48),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    smallImageContainer: {
        position: 'relative',
        backgroundColor: Colors.lightCharcoal,
        width: w(64),
        height: h(48),
        justifyContent: 'center',
        alignItems: 'center',
    },
    numbers: {
        ...commonFonts.regularTextSmall,
    },
});
export default CustomItemButton;
