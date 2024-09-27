import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors } from '../../../../common/styles/constants.tsx';

type Props = {
    icon: string;
    onPress: () => void;
    btnPadding?: number;
    bgColor?: string;
    borderColor?: string;
    transparent?: boolean;
};
const CustomIconBigButton = ({
    icon,
    onPress,
    btnPadding,
    bgColor,
    borderColor,
    transparent,
}: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.btn,
                {
                    padding: h(btnPadding ? btnPadding : 15),
                    backgroundColor: bgColor ? bgColor : Colors.primary,
                    borderColor: borderColor ? borderColor : Colors.primary,
                },
                transparent && { opacity: 0 },
            ]}>
            <Icon icon={icon} height={h(24)} width={w(24)} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        borderRadius: 4,
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
});
export default CustomIconBigButton;
