import { StyleSheet, Text, View } from 'react-native';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';

type Props = {
    confidence: number;
};
const ConfidenceContainer = ({ confidence }: Props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.confidenceContainer}>
                <Text
                    style={[
                        styles.confidenceText,
                        confidence < 70 && styles.confidenceLow,
                    ]}>
                    {confidence}%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        position: 'absolute',
        bottom: h(8),
        right: w(8),
        alignItems: 'flex-end',
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
