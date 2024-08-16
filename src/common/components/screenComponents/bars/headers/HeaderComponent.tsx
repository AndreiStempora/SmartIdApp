import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { h, w } from '../../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../styles/constants.tsx';
import CustomHeaderIconButton from '../../../buttons/buttonIcon/CustomHeaderIconButton.tsx';

type Props = {
    title?: string;
    backBtn?: boolean;
    rightSide?: React.ReactNode;
    bigIcon?: boolean;
    leftSide?: React.ReactNode;
};

const HeaderComponent = ({ title, backBtn, rightSide, leftSide }: Props) => {
    const nav = useNavigation();
    const insets = useSafeAreaInsets();

    const handleBackButton = () => {
        //@ts-ignore
        const routes = nav.getState().routes;
        if (
            routes[routes.length - 1].name === 'VehicleDetails' &&
            routes[routes.length - 2].name === 'AddVehicle'
        ) {
            //@ts-ignore
            nav.pop(2);
        } else {
            if (
                routes[routes.length - 1].name === 'Camera' &&
                routes[routes.length - 2].name === 'Image'
            ) {
                //@ts-ignore
                nav.pop(2);
            } else {
                if (nav.canGoBack()) {
                    nav.goBack();
                }
            }
        }
    };

    return (
        <View style={[{ paddingTop: insets.top }, styles.mainContainer]}>
            <View
                style={[
                    styles.contentContainer,
                    !backBtn && !leftSide && styles.contentRight,
                ]}>
                {backBtn !== false && !leftSide && (
                    <View
                        style={{
                            justifyContent: 'center',
                        }}>
                        <CustomHeaderIconButton
                            onPress={handleBackButton}
                            icon={'arrowLeft'}
                        />
                    </View>
                )}
                {leftSide && (
                    <View
                        style={{
                            justifyContent: 'center',
                        }}>
                        {leftSide}
                    </View>
                )}
                <View style={[styles.titleContainer]}>
                    {title && (
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.headerTitle}>
                            {title}
                        </Text>
                    )}
                </View>
                {rightSide && (
                    <View style={styles.rightSideBtn}>{rightSide}</View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: h(0),
        borderBottomColor: Colors.metal,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: h(52),
        marginHorizontal: 0,
        marginVertical: h(16),
    },
    contentRight: {
        justifyContent: 'flex-end',
    },
    titleContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        paddingHorizontal: w(52),
        pointerEvents: 'none',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    headerTitle: {
        ...commonFonts.boldText,
        textAlign: 'center',
        fontSize: h(18),
    },
    containerBigIcon: {},
    centerContainer: {},
    rightSideBtn: {},
});

export default HeaderComponent;
