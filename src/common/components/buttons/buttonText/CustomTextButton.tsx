import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import Icon from '../../icons/Icon.tsx';

type Props = {
    onPress: () => void;
    text: string;
    stretch?: boolean;
    background?: string;
    border?: string;
    icon?: string;
    iconRight?: boolean;
};
const CustomTextButton = ({
    onPress,
    text,
    stretch,
    background,
    border,
    icon,
    iconRight,
}: Props) => {
    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={onPress}
            style={[
                styles.button,
                stretch && styles.buttonStretch,
                background ? { backgroundColor: background } : null,
                border ? { borderColor: border } : null,
            ]}>
            {/*<LinearGradient*/}
            {/*    colors={['#017CFF', '#185EA9', '#222527', '#717274']}*/}
            {/*    angle={190}*/}
            {/*    useAngle={true}*/}
            {/*    locations={[0, 0.1, 0.85, 1]}*/}
            {/*    style={styles.linearGradient}>*/}
            {/*    <LinearGradient*/}
            {/*        colors={['#202124', '#202124']}*/}
            {/*        start={{ x: 0, y: 0.5 }}*/}
            {/*        end={{ x: 1, y: 0.5 }}*/}
            {/*        style={styles.linearGradient2}>*/}
            {icon && !iconRight && (
                <Icon icon={icon} height={h(24)} width={w(24)} />
            )}

            <Text style={styles.text}>{text}</Text>
            {icon && iconRight && (
                <Icon icon={icon} height={h(24)} width={w(24)} />
            )}
            {/*    </LinearGradient>*/}
            {/*</LinearGradient>*/}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        height: h(48),
        borderRadius: h(4),
        // overflow: 'hidden',
        paddingHorizontal: w(24),
        borderWidth: 1,
        borderColor: 'transparent',
        gap: w(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStretch: {
        width: '100%',
    },
    text: {
        marginVertical: 'auto',
        ...commonFonts.regularTitle,
        color: 'white',
        textAlign: 'center',
        textTransform: 'capitalize',
        // marginHorizontal: 'auto',
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
