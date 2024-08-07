import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import Icon from '../../icons/Icon.tsx';
import React from 'react';

type Props = {
    onPress: () => void;
    text?: string;
    icon?: string;
    stretch?: boolean;
};
const CustomWhiteButton = ({ onPress, text, stretch, icon }: Props) => {
    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={onPress}
            style={[styles.button, stretch && styles.buttonStretch]}>
            <View style={styles.contentContainer}>
                <Text style={styles.text}>
                    {text ? text : 'text not provided!'}
                </Text>
                <Icon
                    icon={icon ? icon : 'camera'}
                    width={h(24)}
                    height={h(24)}></Icon>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#202124',
        height: h(52),
        borderWidth: h(2),
        borderColor: Colors.white,
        borderRadius: h(26),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStretch: {},
    text: {
        ...commonFonts.boldTitle,
        textTransform: 'capitalize',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: w(12),
    },
});

export default CustomWhiteButton;
