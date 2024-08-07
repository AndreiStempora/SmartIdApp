import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { f, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, Fonts } from '../../../common/styles/constants.tsx';
import { useEffect, useState } from 'react';
import useBasicAnimation from '../../../common/services/hooks/animationHook.tsx';

type Props = {
    onChange: (ultraWide: boolean) => void;
    isPortrait: boolean;
};

const ChangeCameraType = ({ onChange, isPortrait }: Props) => {
    const [ultraWide, setUltraWide] = useState(false);
    const { interpolationValue, animation } = useBasicAnimation({
        duration: 200,
        from: '0deg',
        to: '90deg',
        // nativeDrivers: true,
    });

    useEffect(() => {
        animation();
    }, [isPortrait]);

    useEffect(() => {
        onChange(ultraWide);
    }, [ultraWide]);
    return (
        <View style={styles.container}>
            {/*<Text>Change Camera Type</Text>*/}
            <TouchableOpacity
                style={styles.paddings}
                onPress={() => {
                    setUltraWide(true);
                }}>
                <Animated.View
                    style={[
                        styles.borderElement,
                        ultraWide && styles.borderElementActive,
                        {
                            transform: [
                                {
                                    rotate: interpolationValue,
                                },
                            ],
                        },
                    ]}>
                    <Text style={[styles.text, ultraWide && styles.textActive]}>
                        x0.5
                    </Text>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.paddings}
                onPress={() => {
                    setUltraWide(false);
                }}>
                <Animated.View
                    style={[
                        styles.borderElement,
                        !ultraWide && styles.borderElementActive,
                        {
                            transform: [
                                {
                                    rotate: interpolationValue,
                                },
                            ],
                        },
                    ]}>
                    <Text
                        style={[styles.text, !ultraWide && styles.textActive]}>
                        x1
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: w(14),
    },
    borderElement: {
        width: w(38),
        height: w(38),
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: w(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderElementActive: {
        borderColor: Colors.white,
    },
    text: {
        fontFamily: Fonts.Semi,
        fontSize: f(10),
        color: Colors.gray,
    },
    textActive: { color: Colors.white },
    paddings: {
        padding: w(10),
    },
});

export default ChangeCameraType;
