import { StyleSheet, Text, View } from 'react-native';
import Icon from '../../icons/Icon.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import React from 'react';

export type Name = {
    year: string;
    make: string;
    model: string;
    trim: string;
    style: string;
};

type Props = {
    name: Name | undefined;
};
const VehicleNameWithIcon = ({ name }: Props) => {
    return (
        <View style={styles.nameContainer}>
            <View>
                <Icon
                    icon={'vehicleInfo'}
                    fill={Colors.skyBlue}
                    width={w(48)}
                    height={h(48)}
                />
            </View>
            <View style={{ flexShrink: 1 }}>
                <Text style={styles.carName} numberOfLines={2}>
                    <Text>{name?.year}</Text>
                    <Text style={styles.blueText}>
                        {' '}
                        {name?.make} {name?.model} {name?.trim}
                    </Text>
                    <Text> {name?.style}</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        gap: w(16),
        alignItems: 'center',
        width: '100%',
    },
    carName: {
        ...commonFonts.boldTitle,
    },
    blueText: {
        color: Colors.skyBlue,
    },
});

export default VehicleNameWithIcon;
