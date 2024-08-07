import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { f, h, w } from '../../../styles/PixelPerfect.tsx';

type CustomSearchItemProps = {
    item: {
        code: string;
        date: string;
        make: string;
        model: string;
        style: string;
        trim: string;
        vin: string;
        year: string;
        __count: number;
        sections?: string[];
    };
    onPress: (item: any) => void;
};

const CustomSearchItem = ({ item, onPress }: CustomSearchItemProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                onPress(item);
            }}
            // activeOpacity={1}
        >
            <View style={[styles.nameContainer]}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.carName} numberOfLines={2}>
                        <Text>{item?.year}</Text>
                        <Text style={styles.blueText}>
                            {' '}
                            {item?.make} {item?.model} {item?.trim}
                        </Text>
                        <Text> {item?.style}</Text>
                    </Text>
                </View>
                <View>
                    {item?.sections?.length &&
                        item.sections?.map(section => (
                            <Text key={section} style={styles.vehicleStock}>
                                {section}
                            </Text>
                        ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: h(12),
    },
    nameContainer: {
        width: '100%',
        // height: h(48),
        gap: h(2),
    },
    vehicleNameBlue: {
        ...commonFonts.boldText,
        color: Colors.skyBlue,
    },
    vehicleName: {
        ...commonFonts.boldText,
    },
    inlineTexts: {
        flexDirection: 'row',
        marginTop: h(4),
    },

    vehicleStock: {
        ...commonFonts.regularTextSmall,
        color: Colors.metal,
        fontSize: f(12),
        lineHeight: f(18),
    },
    vehicleVin: {
        ...commonFonts.regularText,
        color: Colors.metal,
    },
    separator: {
        marginHorizontal: w(5),
        color: Colors.white,
        top: h(2),
    },
    carName: {
        ...commonFonts.boldTitle,
    },
    blueText: {
        color: Colors.skyBlue,
    },
});

export default CustomSearchItem;
