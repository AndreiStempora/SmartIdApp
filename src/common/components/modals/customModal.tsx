import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
    StatusBar,
} from 'react-native';
import React from 'react';
import { h, w } from '../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../styles/constants.tsx';

type Props = {
    children: React.ReactNode;
    isVisible: boolean;
    setIsVisible?: () => void;
    animationType?: 'none' | 'slide' | 'fade';
    title?: string;
    blueTitle?: boolean;
    buttons: {
        title: string;
        onPress: () => void;
        color?: 'red' | 'blue';
    }[];
};

const CustomModal = ({
    children,
    isVisible,
    animationType,
    title,
    blueTitle,
    buttons,
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
                    <View style={styles.buttonsContainer}>
                        {buttons.map((button, index) => (
                            <TouchableOpacity
                                key={index}
                                // activeOpacity={1}
                                onPress={button.onPress}
                                style={[
                                    styles.button,
                                    buttons.length == 2 && styles.doubleButton,
                                ]}>
                                <Text
                                    style={[
                                        styles.buttonTitle,
                                        button.color == 'red' &&
                                            styles.buttonTitleRed,
                                        button.color == 'blue' &&
                                            styles.buttonTitleBlue,
                                    ]}>
                                    {button.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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
        paddingHorizontal: w(16),
    },
    contentContainer: {
        width: '100%',
        borderRadius: 8,
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
        paddingHorizontal: w(24),
        paddingVertical: h(24),
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
});

export default CustomModal;
