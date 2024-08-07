import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import Icon from '../../icons/Icon.tsx';
import React, { useRef, useState } from 'react';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { Dealership } from '../../../tsTypes/commonTypes.tsx';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store.tsx';
import { updateAppInfo } from '../../../store/slices/appSlice.tsx';

import { Swipeable } from 'react-native-gesture-handler';
type Props = {
    item: Dealership;
    openModal: (visible: boolean) => void;
    index: number;
    getActiveElement: (ind: number, ref: any) => void;
};

const CustomDealershipItem = ({
    item,
    openModal,
    index,
    getActiveElement,
}: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const handlePress = () => {
        dispatch(updateAppInfo({ domain: item.link, stack: 'login' }));
    };
    const [moving, setMoving] = useState(false);
    const self = useRef(null);
    const [elementWidth, setElementWidth] = useState(0);

    const renderLeftActions = () => {
        return (
            <View style={moving ? styles.leftActionMoving : styles.leftAction}>
                {/*<Text style={styles.actionText}>Swipe to perform action</Text>*/}
                <View style={styles.actionContainerSmall}>
                    <Icon
                        icon={'trashcan'}
                        height={h(24)}
                        width={w(24)}
                        fill={Colors.error}></Icon>
                </View>
            </View>
        );
    };

    return (
        <View
        // onLayout={e => {
        //     console.log('layout', e.nativeEvent.layout.width);
        //     setElementWidth(e.nativeEvent.layout.width + w(8));
        // }}
        >
            <Swipeable
                overshootLeft={false}
                ref={self}
                childrenContainerStyle={[
                    moving ? styles.itemContainerBlack : styles.itemContainer,
                    // { width: elementWidth },
                ]}
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={() => {
                    // console.log('open');
                    openModal(true);
                    getActiveElement(index, self.current);
                }}
                onSwipeableClose={() => {
                    console.log('close');
                    setMoving(false);
                }}
                onSwipeableOpenStartDrag={() => {
                    console.log('start drag');
                    setMoving(true);
                }}
                onSwipeableLeftOpen={() =>
                    console.log('left action activated')
                }>
                <View style={styles.itemContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={1}
                        onPressIn={() => setMoving(true)}
                        onPress={handlePress}>
                        <View style={styles.imgContainer}>
                            <View style={styles.smallImageContainer}>
                                <Image
                                    resizeMode={'contain'}
                                    source={{
                                        uri: item.logo,
                                    }}
                                    style={{
                                        width: w(48),
                                        height: h(32),
                                        margin: w(8),
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.info} numberOfLines={2}>
                                {item?.dealership}
                            </Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <Icon
                                icon={'arrowNext'}
                                width={w(24)}
                                height={h(24)}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Swipeable>
        </View>
    );
};

const styles = StyleSheet.create({
    leftAction: {
        height: '100%',
        opacity: 0,
        justifyContent: 'center',
    },
    leftActionMoving: {
        justifyContent: 'center',
        height: '100%',
        opacity: 1,
    },
    actionContainerSmall: {
        justifyContent: 'center',
        marginVertical: h(8),
        borderLeftWidth: w(3),
        height: h(48),
        borderLeftColor: Colors.error,
        paddingHorizontal: w(24),
    },
    actionText: {},

    itemContainer: {
        backgroundColor: 'transparent',
        width: '100%',
        // width: '100%',
        // paddingLeft: w(8),
        // marginLeft: w(-8),
    },
    itemContainerBlack: {
        width: '100%',
        // backgroundColor: 'black',
        // width: '100%',
        // marginLeft: w(-8),
        // paddingLeft: w(8),
        // marginHorizontal: w(-8),
    },
    button: {
        flexDirection: 'row',
    },
    imgContainer: {
        justifyContent: 'center',
    },
    smallImageContainer: {
        position: 'relative',
        backgroundColor: Colors.white,
        width: w(64),
        height: h(48),
    },
    textContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        marginLeft: w(16),
        flexShrink: 1,
        gap: h(4),
    },
    webview: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        textAlign: 'center',
    },

    info: {
        ...commonFonts.boldText,
    },
    counterContainer: {
        justifyContent: 'center',
        gap: h(8),
        paddingHorizontal: w(12),
        height: h(72),
        width: w(48),
    },
});

export default CustomDealershipItem;
