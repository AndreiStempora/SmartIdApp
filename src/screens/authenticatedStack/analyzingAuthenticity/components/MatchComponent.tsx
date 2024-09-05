import { StyleSheet, Text, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { useEffect, useState } from 'react';

type Props = {
    similarity: number;
};
const MatchComponent = ({ similarity }: Props) => {
    const [sim, setSim] = useState('Low');

    useEffect(() => {
        console.log('MatchComponent', similarity);
        if (similarity > 0.001) {
            setSim('Low');
        } else if (similarity > 0.0006) {
            setSim('Medium');
        } else {
            setSim('High');
        }
        console.log('MatchComponent', sim);
    }, []);
    return (
        <>
            {sim === '' && <></>}
            {sim === 'High' && (
                <View style={[styles.mainContainer, styles.highBorder]}>
                    <Icon icon={'dataHigh'} height={h(24)} width={w(24)} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            High confidence in authenticity! Verification
                            nearing completion.
                        </Text>
                    </View>
                </View>
            )}
            {sim === 'Medium' && (
                <View style={[styles.mainContainer, styles.mediumBorder]}>
                    <Icon icon={'dataMedium'} height={h(24)} width={w(24)} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            50% confidence in authenticity! Further verification
                            needed.
                        </Text>
                    </View>
                </View>
            )}
            {sim === 'Low' && (
                <View style={[styles.mainContainer, styles.lowBorder]}>
                    <Icon icon={'dataLow'} height={h(24)} width={w(24)} />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Low confidence in authenticity! Result uncertain.
                        </Text>
                    </View>
                </View>
            )}
        </>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: h(74),
        borderWidth: 1,

        borderRadius: 8,
        paddingHorizontal: w(16),
        paddingVertical: h(12),
        gap: w(16),
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.black300,
    },
    highBorder: {
        borderColor: Colors.lime,
    },
    mediumBorder: {
        borderColor: Colors.yellow100,
    },
    lowBorder: {
        borderColor: Colors.error,
    },
    text: {
        ...commonFonts.regularTitle,
        color: Colors.white,
    },
    textContainer: { flexShrink: 1 },
});

export default MatchComponent;
