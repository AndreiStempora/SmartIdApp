import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../icons/Icon.tsx';
import { h, w } from '../../../styles/PixelPerfect.tsx';

type Props = {
    onPress: () => void;
    onLongPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    icon: string;
};
type iconProps = {
    iconName: string;
};

const CustomIcon = ({ iconName }: iconProps) => {
    return <Icon icon={iconName} width={w(24)} height={h(24)}></Icon>;
};

const CustomHeaderIconButton = ({
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    icon,
}: Props) => {
    return (
        <TouchableOpacity
            // activeOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.btn}>
            <CustomIcon iconName={icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        paddingVertical: h(16),
        paddingHorizontal: w(17),
        alignSelf: 'flex-start',
        // backgroundColor: 'red',
    },
});
export default CustomHeaderIconButton;
