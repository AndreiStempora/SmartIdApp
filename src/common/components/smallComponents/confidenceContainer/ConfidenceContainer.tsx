import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import Icon from '../../icons/Icon.tsx';

type Props = {
    confidence: number;

    cssPosition?: { bottom: number; right: number };
};
const ConfidenceContainer = ({
    confidence,

    cssPosition,
}: Props) => {
    return (
        <TouchableOpacity
            style={[styles.mainContainer, cssPosition]}
            onPress={() => {}}>
            <View style={styles.confidenceContainer}>
                {/*<Icon*/}
                {/*    icon={selectedPos ? 'checked' : 'unchecked'}*/}
                {/*    width={w(24)}*/}
                {/*    height={24}*/}
                {/*    fill={confidence < 70 ? Colors.yellow100 : Colors.lime}*/}
                {/*/>*/}
                <Text
                    style={[
                        styles.confidenceText,
                        confidence < 70 && styles.confidenceLow,
                    ]}>
                    {confidence}%
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // width: '100%',
        position: 'absolute',
        bottom: h(8),
        right: w(8),
        alignItems: 'flex-end',
        // backgroundColor: 'green',
    },
    confidenceContainer: {
        height: h(43),
        borderWidth: 1,
        borderColor: Colors.black400,
        backgroundColor: Colors.black300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: w(12),
        borderRadius: w(8),
        // flexGrow: 0,
        flexDirection: 'row',
        gap: w(8),
    },
    confidenceText: {
        ...commonFonts.regularText,
        color: Colors.lime,
        textAlign: 'center',
        lineHeight: h(19.2),
    },
    confidenceLow: {
        color: Colors.yellow100,
    },
});

export default ConfidenceContainer;
