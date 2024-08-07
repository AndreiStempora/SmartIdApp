import { Platform, StyleSheet, Text, View } from 'react-native';
import Icon from '../../../icons/Icon.tsx';
import SelectDropdown from 'react-native-select-dropdown';
import React, { useState } from 'react';
import { f, h, w } from '../../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../styles/constants.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    label: string;
    onChange: (value: object) => void;
    data: { string: string }[];
    selectedIndex?: number;
};
const LanguageSelect = ({ label, onChange, data, selectedIndex }: Props) => {
    const [selectOpened, setSelectOpened] = useState(false);
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.mainContainer, selectOpened && styles.borderBlue]}>
            <View style={styles.labelContainer}>
                <Text
                    style={[
                        styles.labelTitle,
                        selectOpened && styles.blueText,
                    ]}>
                    {label}
                </Text>
            </View>
            {data.length > 0 && (
                <SelectDropdown
                    dropdownOverlayColor={'rgba(0,0,0,0.7)'}
                    defaultValueByIndex={selectedIndex || 0}
                    // defaultValueByIndex={}
                    data={data}
                    disableAutoScroll
                    dropdownStyle={{
                        backgroundColor: Colors.lightBlack,
                        marginTop:
                            Platform.OS === 'android' ? h(-insets.top) : 0,
                    }}
                    onFocus={() => {
                        setSelectOpened(true);
                    }}
                    onBlur={() => {
                        setSelectOpened(false);
                    }}
                    onSelect={selectedItem => {
                        onChange(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={[styles.initialBtnContainer]}>
                                <Text
                                    style={[
                                        styles.btnText,
                                        Platform.OS === 'android' &&
                                            styles.androidText,
                                    ]}>
                                    {selectedItem?.title}
                                </Text>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        icon={
                                            isOpened
                                                ? 'arrowCircleUp'
                                                : 'arrowCircleDown'
                                        }></Icon>
                                </View>
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        // console.log('item', item, isSelected);
                        return (
                            <View style={styles.itemContainer}>
                                <Text
                                    style={[
                                        styles.btnText,
                                        Platform.OS === 'android' &&
                                            styles.androidText,
                                        isSelected && styles.blueText,
                                    ]}>
                                    {item?.title}
                                </Text>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'green',
        gap: h(4),
        borderBottomWidth: h(2),
        borderBottomColor: Colors.white,
    },
    labelContainer: {
        position: 'absolute',
        top: h(4),
        left: 0,
        zIndex: 1,
        width: '100%',
        pointerEvents: 'none',
    },
    labelTitle: {
        ...commonFonts.label,
    },
    blueText: {
        color: Colors.skyBlue,
    },
    borderBlue: {
        borderBottomColor: Colors.skyBlue,
    },
    initialBtnContainer: {
        // backgroundColor: 'red',
        height: h(56),
        paddingTop: h(23.6),
        paddingLeft: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: w(56),
        height: h(56),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        ...commonFonts.regularTitle,
        // backgroundColor: 'green',
        height: f(24),
        paddingBottom: h(8),
    },
    androidText: {
        paddingBottom: 0,
    },
    dropdownStyle: {
        backgroundColor: Colors.lightBlack,
    },
    itemContainer: {
        height: h(48),
        paddingHorizontal: w(16),
        backgroundColor: Colors.darkGray,
        borderBottomWidth: h(2),
        borderBottomColor: Colors.gray,
        justifyContent: 'center',
    },
});
export default LanguageSelect;
