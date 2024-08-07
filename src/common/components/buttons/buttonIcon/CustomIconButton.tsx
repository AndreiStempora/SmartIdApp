import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../icons/Icon.tsx';
import { f } from '../../../styles/PixelPerfect.tsx';

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
    return <Icon icon={iconName} width={f(24)} height={f(24)}></Icon>;
};

const CustomIconButton = ({
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
        padding: 16,
        alignSelf: 'flex-start',
        // margin: 10,
    },
});
export default CustomIconButton;
