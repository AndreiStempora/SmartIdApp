import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import CustomModal from '../../../../common/components/modals/customModal.tsx';
import React, { useEffect, useState } from 'react';

type Props = {
    navigation: any;
    code: string | undefined;
    fakeRegister: string | null;
};
const HiddenButton = ({ navigation, code, fakeRegister }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [number, setNumber] = useState(-1);

    const nav = (nr: number) => {
        setNumber(nr);
        console.log(nr, fakeRegister);
        if (fakeRegister !== null) {
            setIsVisible(true);
            return;
        }
        if (fakeRegister === null) {
            navigation.navigate('Fake', {
                nr: nr,
                code: code,
            });
        }
    };
    return (
        <View style={styles.mainContainer}>
            <CustomModal
                isVisible={isVisible}
                buttons={[
                    {
                        title: 'yes',
                        onPress: () => {
                            setIsVisible(false);
                            navigation.navigate('Fake', {
                                nr: number,
                                code: code,
                            });
                        },
                    },
                    {
                        title: 'no',
                        onPress: () => setIsVisible(false),
                    },
                ]}
                title={'Do you want to retry the random authenticity check?'}>
                <Text style={styles.modalText}>
                    This will override the previous results.
                </Text>
            </CustomModal>
            <Icon icon={'shuffle'} height={h(24)} width={w(24)} />
            <Text style={styles.text}>Random authenticity check</Text>
            <View style={styles.hiddenButtonsContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.btn1}
                    onPress={() => {
                        nav(1);
                    }}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.btn2}
                    onPress={() => {
                        nav(2);
                    }}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.btn3}
                    onPress={() => {
                        nav(3);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalText: {
        ...commonFonts.regularText,
        textAlign: 'center',
        marginTop: h(16),
    },
    hiddenButtonsContainer: {
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: h(48),
        flexDirection: 'row',
    },
    mainContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: w(8),
        borderRadius: w(8),
        backgroundColor: Colors.primary,
        height: h(48),
        marginTop: h(8),
        marginBottom: h(24),
    },
    text: {
        ...commonFonts.regularTitle,
        color: Colors.white,
    },
    hiddenSmall: {
        width: '25%',
        height: '100%',
    },
    btn1: { flexGrow: 1, height: '100%' },
    btn2: {
        flexGrow: 2,
        height: '100%',
    },
    btn3: {
        flexGrow: 3,
        height: '100%',
    },
    hiddenBig: {
        width: '50%',
        height: '100%',
    },
});

export default HiddenButton;
