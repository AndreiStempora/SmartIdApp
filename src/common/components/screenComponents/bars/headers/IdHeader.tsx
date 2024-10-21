import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../icons/Icon.tsx';
import { h, w } from '../../../../styles/PixelPerfect.tsx';
import React from 'react';
import { Colors, commonFonts } from '../../../../styles/constants.tsx';

type Props = {
    navigation: any;
    title?: string;
    navigate?: () => void;
    backFalse?: boolean;
};

const IdHeader = ({ navigation, title, navigate, backFalse }: Props) => {
    return (
        <View style={styles.headerContainer}>
            {!backFalse && (
                <TouchableOpacity
                    style={styles.backBtnContainer}
                    onPress={() => {
                        if (navigate) {
                            navigate();
                            return;
                        }
                        navigation.goBack();
                    }}>
                    <View style={styles.backBtn}>
                        <Icon
                            icon={'backArrowNew'}
                            height={h(24)}
                            width={w(24)}
                        />
                    </View>
                </TouchableOpacity>
            )}

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

        // backgroundColor: 'red',
        paddingHorizontal: w(16),
    },
    backBtn: {
        backgroundColor: Colors.black300,
        // flexDirection: 'row',
        width: w(40),
        height: w(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.black400,
        borderRadius: w(40),
        // alignItems: 'center',
        // gap: w(6),
    },
    backBtnContainer: {
        width: w(52),
        height: w(52),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        position: 'absolute',
        left: w(10),
        zIndex: 1,
    },
    pageTitle: {
        ...commonFonts.boldText,
        fontSize: w(18),
        color: Colors.white,
        textAlign: 'center',
        width: '100%',
        paddingHorizontal: w(52),
        // backgroundColor: Colors.black300,
    },
});

export default IdHeader;
