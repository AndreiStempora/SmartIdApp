import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { commonFonts } from '../../../styles/constants.tsx';

type Props = {
    onPress: () => void;
    text: string;
    stretch?: boolean;
};
const CustomTextButton = ({ onPress, text, stretch }: Props) => {
    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={onPress}
            style={[styles.button, stretch && styles.buttonStretch]}>
            <LinearGradient
                colors={['#017CFF', '#185EA9', '#222527', '#717274']}
                angle={190}
                useAngle={true}
                locations={[0, 0.1, 0.85, 1]}
                style={styles.linearGradient}>
                <LinearGradient
                    colors={['#202124', '#202124']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.linearGradient2}>
                    <Text style={styles.text}>{text}</Text>
                </LinearGradient>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        height: h(52),
        borderRadius: h(26),
        overflow: 'hidden',
    },
    buttonStretch: {
        width: '100%',
    },
    text: {
        marginVertical: 'auto',
        ...commonFonts.boldTitle,
        color: 'white',
        textAlign: 'center',
        textTransform: 'capitalize',
    },

    linearGradient: {
        flex: 1,
        paddingLeft: h(2),
        paddingRight: h(2),
        borderRadius: h(26),
    },
    linearGradient2: {
        // flex: 1,
        paddingLeft: w(28),
        paddingRight: w(28),
        height: h(48),
        top: h(2),
        borderRadius: h(25),
        overflow: 'hidden',
    },
});

export default CustomTextButton;
