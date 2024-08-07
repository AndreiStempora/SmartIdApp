import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
    StatusBar,
    Platform,
} from 'react-native';
import React from 'react';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

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

const ReconModal = ({ children, isVisible, animationType, buttons }: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <Modal
            animationType={animationType || 'fade'}
            transparent={true}
            visible={isVisible}
            style={[styles.modal]}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0.5)" />
            {Platform.OS === 'android' ? (
                <>
                    <BlurView
                        blurAmount={2}
                        blurType={'dark'}
                        style={[
                            styles.modalContainer,
                            Platform.OS === 'android' &&
                                styles.modalContainerAndroid,
                        ]}></BlurView>
                    <View
                        style={[
                            styles.contentContainer,
                            {
                                marginTop: insets.top + h(56) + h(16),
                                marginBottom: insets.bottom + h(24),
                            },
                            Platform.OS === 'android' &&
                                styles.contentContainerAndroid,
                        ]}>
                        <View style={styles.childrenContainer}>{children}</View>
                        <View style={styles.buttonsContainer}>
                            {buttons.map((button, index) => (
                                <TouchableOpacity
                                    key={index}
                                    // activeOpacity={1}
                                    onPress={button.onPress}
                                    style={[
                                        styles.button,
                                        buttons.length == 2 &&
                                            styles.doubleButton,
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
                </>
            ) : (
                <BlurView
                    blurAmount={2}
                    blurType={'dark'}
                    style={[
                        styles.modalContainer,
                        styles.modalContainerAndroid,
                    ]}>
                    <View
                        style={[
                            styles.contentContainer,
                            {
                                marginTop: insets.top + h(56) + h(16),
                                marginBottom: insets.bottom + h(24),
                            },

                            styles.contentContainerAndroid,
                        ]}>
                        <View style={styles.childrenContainer}>{children}</View>
                        <View style={styles.buttonsContainer}>
                            {buttons.map((button, index) => (
                                <TouchableOpacity
                                    key={index}
                                    // activeOpacity={1}
                                    onPress={button.onPress}
                                    style={[
                                        styles.button,
                                        buttons.length == 2 &&
                                            styles.doubleButton,
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
                </BlurView>
            )}

            {/*</View>*/}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {},
    childrenContainer: {
        // backgroundColor: 'green',
        paddingHorizontal: w(16),
        flexGrow: 1,

        paddingBottom: h(16),
    },
    flex: { flex: 1, backgroundColor: '#30578E80' },
    modalContainer: {
        // backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: w(16),
        height: '100%',
        width: '100%',
    },

    contentContainer: {
        // width: '100%',
        flexGrow: 1,
        flexShrink: 1,
        borderRadius: 8,
        overflow: 'hidden',
        height: '100%',
        marginHorizontal: w(16),
        backgroundColor: Colors.darkGray,
        zIndex: 1000,
    },
    modalContainerAndroid: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        // // flexGrow: 1,
        // paddingHorizontal: w(16),
        // backgroundColor: 'rgba(0,244,0,0.5)',
        // zIndex: 100,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    contentContainerAndroid: {
        marginTop: h(56),
        paddingTop: h(16),
        // paddingHorizontal: w(16),
        // width: '100%',
        flexGrow: 1,
        // alignSelf: 'center',
        // marginHorizontal: w(8),
        // width: 'auto',
        // marginTop: h(116),
        // marginBottom: h(116),
        // flexGrow: 1,
        // flexShrink: 1,
        // marginHorizontal: w(16),
        // borderRadius: 8,
        // overflow: 'hidden',
        // height: 'auto',
        // marginTop: h(116),
        // backgroundColor: 'green',
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
        backgroundColor: Colors.gray,
        gap: w(2),
        flexDirection: 'row',
        height: h(50),
        marginTop: 'auto',
    },
    button: {
        paddingVertical: h(12),
        alignItems: 'center',
        backgroundColor: Colors.darkGray,
        marginTop: h(2),
        flexGrow: 1,
    },
    doubleButton: {
        width: '50%',
    },
    buttonTitle: {
        // fontFamily:Fonts.Semi,
        // fontSize: f(16),
        // lineHeight: f(24),
        // color: Colors.white,
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

export default ReconModal;
