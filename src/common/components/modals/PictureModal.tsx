import {
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { h, w } from '../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../styles/constants.tsx';
import React from 'react';
import Icon from '../icons/Icon.tsx';

type Props = {
    children: React.ReactNode;
    isVisible: boolean;
    setVisibility?: (el: boolean) => void;
    animationType?: 'none' | 'slide' | 'fade';
    title?: string;
    blueTitle?: boolean;
    buttons: {
        title: string;
        onPress: () => void;
        color?: 'red' | 'blue';
    }[];
};
const PictureModal = ({
    children,
    isVisible,
    animationType,
    setVisibility,
    title,
    blueTitle,
}: Props) => {
    return (
        <Modal
            animationType={animationType || 'fade'}
            transparent={true}
            visible={isVisible}
            style={[styles.modal]}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0.5)" />
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        {title && (
                            <View style={styles.titleContainer}>
                                <Text
                                    style={[
                                        styles.title,
                                        blueTitle && styles.titleBlue,
                                    ]}>
                                    {title}
                                </Text>
                            </View>
                        )}
                        {children}
                    </View>
                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={() => {
                            if (setVisibility) {
                                setVisibility(false);
                            }
                        }}>
                        <View style={styles.btn}>
                            <Icon icon={'close'} width={w(24)} height={h(24)} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {},
    flex: {
        flex: 1,
        backgroundColor: '#30578E80',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: w(0),
    },
    contentContainer: {
        width: '100%',
        // borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: Colors.black300,
        // backgroundColor: 'red',
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        ...commonFonts.boldText,
        // fontFamily:Fonts.Semi,
        // fontSize: f(16),
        // lineHeight: f(24),
        color: Colors.error,
        textAlign: 'center',
    },
    titleBlue: {
        color: Colors.skyBlue,
    },
    textContainer: {
        paddingHorizontal: w(0),
        paddingVertical: h(0),
        alignItems: 'center',
        gap: h(12),
    },
    buttonsContainer: {
        backgroundColor: Colors.black400,
        gap: w(2),
        flexDirection: 'row',
        height: h(50),
    },
    button: {
        // paddingVertical: h(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black300,
        marginTop: h(2),
        flexGrow: 1,
    },
    doubleButton: {
        width: '50%',
    },
    buttonTitle: {
        ...commonFonts.boldTitle,
        textTransform: 'capitalize',
    },
    buttonTitleRed: {
        color: Colors.error,
    },
    buttonTitleBlue: {
        color: Colors.skyBlue,
    },

    btnContainer: {
        position: 'absolute',
        top: h(19),
        right: w(10),
        padding: w(6),
        // backgroundColor: 'red',
    },
    btn: {
        borderWidth: 1,
        borderColor: Colors.black400,
        borderRadius: 50,
        width: w(40),
        height: w(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black300,
    },
});

export default PictureModal;
