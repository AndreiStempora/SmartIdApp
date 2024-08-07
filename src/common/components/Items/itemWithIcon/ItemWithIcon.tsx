import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import Icon from '../../icons/Icon.tsx';
import { useSelector } from 'react-redux';
import { getApp } from '../../../store/slices/appSlice.tsx';

type Props = {
    onPress: () => void;
    icon: string;
    name: string;
    color?: boolean;
    setting?: undefined | true;
};
const ItemWithIcon = ({ onPress, icon, name, color, setting }: Props) => {
    const app = useSelector(getApp);
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemContainer}>
                <View>
                    <Icon
                        icon={icon}
                        width={w(24)}
                        height={h(24)}
                        fill={color ? Colors.error : Colors.white}></Icon>
                </View>
                <View style={styles.name}>
                    <Text style={[styles.nameText, color && styles.red]}>
                        {name}
                    </Text>
                </View>
                {setting === true ? (
                    <View style={styles.textContainer}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: app.uploadServiceEnabled
                                        ? Colors.skyBlue
                                        : Colors.metal,
                                },
                            ]}>
                            {app.uploadServiceEnabled ? 'Enabled' : 'Disabled'}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.forwardIconContainer}>
                        <Icon
                            icon={'arrowCircleRight'}
                            width={w(24)}
                            height={h(24)}
                            fill={Colors.skyBlue}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        height: h(72),
        alignItems: 'center',
        gap: w(16),
    },
    name: {
        flexGrow: 1,
    },
    nameText: {
        ...commonFonts.boldText,
    },
    red: {
        color: Colors.error,
    },
    forwardIconContainer: {
        width: w(56),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        // backgroundColor: 'green',
    },
    text: {
        ...commonFonts.boldTitle,
        color: Colors.skyBlue,
    },
});

export default ItemWithIcon;
