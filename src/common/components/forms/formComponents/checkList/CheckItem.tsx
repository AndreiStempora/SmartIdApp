import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../icons/Icon.tsx';
import { h, w } from '../../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../styles/constants.tsx';
import React from 'react';

export type OptionItem = {
    name: string;
    selected: boolean;
    id: string;
    price: number | null;
};

type Props = {
    item: OptionItem;
    onChange: (ind: number) => void;
    index: number;
    // error: boolean;
};
const CheckItem = ({ item, onChange, index }: Props) => {
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
                    ]}>
                    <View>
                        <Icon
                            icon={item.selected ? 'boxChecked' : 'boxUnchecked'}
                            height={h(24)}
                            fill={item.selected ? Colors.skyBlue : Colors.white}
                            width={w(24)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{ flexGrow: 1, flexShrink: 1 }}>
                            <Text
                                style={[
                                    styles.text,
                                    item.selected && styles.textSelected,
                                ]}
                                numberOfLines={1}>
                                {item.name}
                            </Text>
                        </View>
                        {item?.price === null ? (
                            <></>
                        ) : item?.price.toString().startsWith('-') ? (
                            <View style={{ marginLeft: 'auto' }}>
                                <Text style={styles.redText}>
                                    ({item?.price})
                                </Text>
                            </View>
                        ) : (
                            <View style={{ marginLeft: 'auto' }}>
                                <Text style={styles.greenText}>
                                    ({item?.price})
                                </Text>
                            </View>
                        )}
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
        flexDirection: 'row',
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
    greenText: {
        ...commonFonts.regularTextSmall,
        color: Colors.lime,
        marginLeft: 'auto',
    },
    redText: {
        ...commonFonts.regularTextSmall,
        color: Colors.error,
        marginLeft: 'auto',
    },
});
export default CheckItem;
