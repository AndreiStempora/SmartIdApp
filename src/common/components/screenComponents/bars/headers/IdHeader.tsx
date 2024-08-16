import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../icons/Icon.tsx';
import { h, w } from '../../../../styles/PixelPerfect.tsx';
import React from 'react';
import { commonFonts } from '../../../../styles/constants.tsx';

type Props = {
    navigation: any;
    title?: string;
    navigate?: () => void;
};

const IdHeader = ({ navigation, title, navigate }: Props) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.backBtnContainer}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => {
                        if (navigate) {
                            navigate();
                            return;
                        }
                        navigation.goBack();
                    }}>
                    <Icon icon={'backBtnIcon'} height={h(39)} width={h(39)} />
                </TouchableOpacity>
            </View>
            {title && (
                <Text numberOfLines={1} style={styles.pageTitle}>
                    {title}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: h(52),
        flexDirection: 'row',
        position: 'absolute',
        top: h(16),
        alignItems: 'center',
        paddingHorizontal: w(0),
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(6),
    },
    backBtnContainer: {
        width: w(52),
        height: h(52),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        position: 'absolute',
        left: w(-6),
        zIndex: 1,
    },
    pageTitle: {
        ...commonFonts.boldText,
        fontSize: w(18),
        color: 'white',
        textAlign: 'center',
        width: '100%',
        paddingHorizontal: w(52),
    },
});

export default IdHeader;
