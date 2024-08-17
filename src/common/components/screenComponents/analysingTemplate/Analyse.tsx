import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../icons/Icon.tsx';
import { f, h, w } from '../../../styles/PixelPerfect.tsx';
import React, { useEffect } from 'react';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import IdHeader from '../bars/headers/IdHeader.tsx';

type Props = {
    navigation: any;
    backBtn?: boolean;
    borderColor: string;
    iconName: string;
    footerBtn?: React.ReactNode;
    dots?: boolean;
    textTitle?: string;
    textContent?: string;
};
const Analyse = ({
    navigation,
    backBtn,
    borderColor,
    iconName,
    footerBtn,
    textTitle,
    textContent,
    dots,
}: Props) => {
    const [dotCount, setDotCount] = React.useState(0);
    useEffect(() => {
        if (dots) {
            setInterval(() => {
                setDotCount(dotCount => (dotCount + 1) % 4);
            }, 600);
        }
    }, []);

    return (
        <View style={[styles.mainContainer]}>
            {backBtn && <IdHeader navigation={navigation} />}
            <View style={[styles.mainBlock, { borderColor: borderColor }]}>
                <Icon icon={iconName} height={h(64)} width={w(64)} />
                {textTitle && <Text style={styles.text1}>{textTitle}</Text>}
                {textContent && (
                    <Text style={[styles.text2]}>
                        {textContent}
                        {'.'.repeat(dotCount)}
                    </Text>
                )}
            </View>
            {footerBtn && <View style={styles.btnContainer}>{footerBtn}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        position: 'absolute',
        bottom: h(16),
    },
    mainBlock: {
        width: w(255),
        height: h(255),
        borderWidth: 1,
        borderColor: Colors.black400,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: w(8),
        gap: h(15),
    },
    text1: {
        ...commonFonts.boldText,
        fontSize: f(18),
        paddingHorizontal: w(32),
        textAlign: 'center',
    },
    text2: {
        ...commonFonts.regularText,
        color: Colors.white,
        minWidth: w(105),
        paddingHorizontal: w(32),
        textAlign: 'center',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(6),
    },
    backBtnContainer: {
        position: 'absolute',
        top: h(16),
        left: w(16),
    },
    backBtnText: {
        ...commonFonts.boldText,
    },
});

export default Analyse;
