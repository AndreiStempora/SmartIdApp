import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../icons/Icon.tsx';
import { f, h } from '../../../styles/PixelPerfect.tsx';
import { Colors } from '../../../styles/constants.tsx';

type Props = {
    onPress: () => void;
    onLongPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    icon: string;
    border?: string;
    background?: string;
};
type iconProps = {
    iconName: string;
};

const CustomIcon = ({ iconName }: iconProps) => {
    return <Icon icon={iconName} width={f(24)} height={f(24)} />;
};

const CustomIconButton = ({
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    icon,
    border,
    background,
}: Props) => {
    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                styles.btn,
                border ? { borderColor: border } : null,
                background ? { backgroundColor: background } : null,
            ]}>
            <CustomIcon iconName={icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        padding: h(14),
        borderRadius: 4,
        alignSelf: 'flex-start',
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.primary,
        // margin: 10,
    },
});
export default CustomIconButton;
