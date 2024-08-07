import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../styles/constants.tsx';
import Icon from '../../../icons/Icon.tsx';
import React from 'react';

export type Item = {
    make: string;
    model: string;
    style: string;
    year: string;
    id: string;
    trim: string;
    class: string;
    selected: boolean;
};

type Props = {
    item: Item;
    onChange: (ind: number) => void;
    unselect: boolean;
    index: number;
    error: boolean;
};
const RadioItem = ({ item, onChange, index, error }: Props) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={() => {
                    onChange(index);
                }}>
                <View
                    style={[
                        styles.insideContainer,
                        item.selected && styles.insideContainerSelected,
                        error && styles.insideContainerError,
                    ]}>
                    <View>
                        <Icon
                            icon={
                                item.selected
                                    ? 'radioChecked'
                                    : 'radioUnchecked'
                            }
                            height={h(24)}
                            fill={
                                item.selected
                                    ? Colors.skyBlue
                                    : error
                                    ? Colors.error
                                    : Colors.white
                            }
                            width={w(24)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text
                            style={[
                                styles.text,
                                item.selected && styles.textSelected,
                                error && styles.textError,
                            ]}
                            numberOfLines={1}>
                            {item.trim} {item.style}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {},
    insideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(16),
        borderWidth: h(2),
        borderColor: Colors.white,
        height: h(48),
        borderRadius: 50,
        paddingHorizontal: w(16),
    },
    insideContainerSelected: {
        borderColor: Colors.skyBlue,
    },
    insideContainerError: {
        borderColor: Colors.error,
    },
    textContainer: {
        flexGrow: 0,
        flexShrink: 1,
    },
    text: {
        ...commonFonts.regularTextSmall,
    },
    textSelected: {
        color: Colors.skyBlue,
    },
    textError: {
        color: Colors.error,
    },
});
export default RadioItem;
