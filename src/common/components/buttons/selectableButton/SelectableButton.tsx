import { StyleSheet, View, Animated, Text, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { f, h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import { Option } from '../../../../screens/authenticatedStack/recon/components/ReconDrawerItem.tsx';
import useRecon from '../../../services/hooks/reconHook.tsx';
import useApiHeaders from '../../../services/hooks/apiHeadersHook.tsx';
import Slider from '@react-native-community/slider';

type Props = {
    buttons: Option[];
};

const SelectableButton = ({ buttons }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [v, setV] = useState(-1);
    const [left, setLeft] = useState('0%');
    const [interpolationValues, setInterpolationValues] = useState([
        Colors.metal,
        Colors.metal,
    ]);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const interpolateColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: interpolationValues, // Colors: Red to Blue
    });
    const sliderMoving = useRef(false);

    const {
        reconList,
        differentOptionSelected,
        item,
        setOptionIndex,
        optionsList,
        values,
        optionIndex,
        updateValues,
    } = useRecon();
    const { postRequest } = useApiHeaders();

    useEffect(() => {
        const index = optionsList?.findIndex(
            button => button.oid === values?.oid
        );

        if (values?.oid?.length && !differentOptionSelected) {
            setOptionIndex(index);
        } else {
            if (!differentOptionSelected) {
                setOptionIndex(-1);
            }
        }
        setSelectedIndex(index);
    }, [reconList]);

    const api = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/reconUpdate',
            {
                item: item.id,
                option: optionsList[selectedIndex].oid,
            }
        );
        updateValues(response.recon);
    };

    useEffect(() => {
        (async () => {
            if (selectedIndex >= 0 && selectedIndex !== optionIndex) {
                await api();
            }
        })();

        setLeft(`${(selectedIndex / (buttons?.length - 1)) * 100}%`);
        setV(selectedIndex);
        console.log('selectedIndex', selectedIndex);
    }, [selectedIndex]);

    useEffect(() => {
        setLeft(`${(v / (buttons?.length - 1)) * 100}%`);
        // setBorderColor(interpolateColor);
        animatedValue.setValue(v - Math.floor(v));
        setInterpolationValues([
            buttons[Math.floor(v)]?.bg ?? Colors.metal,
            buttons[Math.ceil(v)]?.bg ?? Colors.metal,
        ]);
        console.log('vvvvvv', v, Math.floor(v));
    }, [v]);

    return (
        <View style={styles.mainContainer}>
            <Animated.View
                style={[
                    styles.sliderContainer,
                    { borderColor: interpolateColor },
                ]}>
                <View style={styles.outerCirclesContainer}>
                    {buttons?.map((button, i) => {
                        return (
                            <View
                                key={i}
                                style={[
                                    styles.btnRound,
                                    { borderColor: buttons[i].bg },
                                ]}></View>
                        );
                    })}
                </View>
                <View style={styles.thumbContainer}>
                    <View
                        style={{
                            // backgroundColor: 'green',
                            height: '100%',
                            marginRight: h(22),
                            marginLeft: h(6.85),
                            justifyContent: 'center',
                        }}>
                        <Animated.View
                            style={[
                                styles.thumb,
                                //@ts-ignore
                                {
                                    left: left,
                                    backgroundColor: interpolateColor,
                                },
                            ]}></Animated.View>
                    </View>
                </View>
                <View style={styles.sliderComponentContainer}>
                    <Slider
                        style={[
                            { width: '100%' },
                            Platform.OS === 'android' && { height: h(38) },
                        ]}
                        maximumValue={buttons?.length - 1}
                        value={v}
                        onSlidingComplete={e => {
                            setV(Math.round(e));
                            setSelectedIndex(Math.round(e));
                            console.log('complete', e);
                            sliderMoving.current = false;
                        }}
                        onValueChange={e => {
                            if (sliderMoving.current) {
                                setV(e);
                                console.log('intermediate' + '', e);
                            }
                        }}
                        onSlidingStart={e => {
                            sliderMoving.current = true;
                        }}
                        thumbTintColor={'transparent'}
                        minimumTrackTintColor={'transparent'}
                        maximumTrackTintColor={'transparent'}
                        tapToSeek={true}></Slider>
                </View>
            </Animated.View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {buttons[Math.round(v)]?.name !== undefined
                        ? buttons[Math.round(v)]?.name
                        : '-'}
                </Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    textContainer: {
        width: '100%',
        marginTop: h(5),
    },
    text: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
    thumbContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        marginRight: 30,
        // backgroundColor: 'grey',
    },
    thumb: {
        width: h(15),
        height: h(15),
        borderRadius: 100,
        // backgroundColor: 'yellow',
    },
    outerCirclesContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        paddingRight: h(5),
        // backgroundColor: 'red',
    },
    sliderComponentContainer: {
        // marginHorizontal: w(3),
        marginTop: h(-5),
    },
    btnRound: {
        width: h(24),
        height: h(24),
        borderWidth: h(2),
        borderColor: Colors.metal,
        borderRadius: 100,
        top: h(2),
        left: h(2.5),
    },
    sliderContainer: {
        width: '100%',
        height: h(32),
        borderWidth: h(2),
        borderRadius: h(40),
        // position: 'absolute',
        // top: h(5),
        // backgroundColor: 'green',
    },
    btnShell: {
        width: '100%',
        height: '100%',
        borderTopWidth: h(2),
        borderBottomWidth: h(2),
        borderColor: Colors.metal,
    },
    btnShellFirst: {
        borderTopLeftRadius: h(14),
        borderBottomLeftRadius: h(14),
        borderLeftWidth: h(2),
    },
    btnShellLast: {
        borderTopRightRadius: h(14),
        borderBottomRightRadius: h(14),
        borderRightWidth: h(2),
    },
    color: { borderColor: Colors.metal },
    outerCircle: {
        marginLeft: w(3),
        marginTop: w(2.5),
        borderWidth: h(2),
        borderRadius: 100,
        width: w(20),
        height: w(20),
        borderColor: Colors.metal,
    },
    innerCircle: {
        marginTop: w(3),
        marginLeft: w(3),
        borderRadius: 20,
        width: w(10),
        height: w(10),
        backgroundColor: 'transparent',
        opacity: 0,
    },
    btnContainer: {
        height: '100%',
        flexGrow: 1,
    },
    mainContainer: {
        marginTop: h(12),
        flexDirection: 'column',
        // height: h(50),
    },
    mainElementContainer: {
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
        gap: h(4),
    },
    labelContainer: {
        marginTop: h(4),
    },
    labelText: {
        ...commonFonts.regularTextSmall,
        fontSize: f(12),
        lineHeight: h(15.6),
    },
    buttonsContainer: {
        height: h(28),
        flexDirection: 'row',
    },
    descriptionContainer: {
        marginLeft: w(4),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // opacity: 0,
    },
    descriptionText: {
        ...commonFonts.regularTextSmall,
        fontSize: f(12),
        lineHeight: h(18),
    },
    cameraButtonContainer: {
        width: w(56),
        height: '100%',
        justifyContent: 'center',
    },
});
export default SelectableButton;
