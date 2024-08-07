import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../../icons/Icon.tsx';
import {f, h, w} from "../../../styles/PixelPerfect.tsx";
import {Colors} from "../../../styles/constants.tsx";
import LinearGradient from "react-native-linear-gradient";

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
    return <Icon icon={iconName} width={f(14)} height={f(14)}></Icon>;
};

const CustomRoundButton = ({
                              onPress,
                              onLongPress,
                              onPressIn,
                              onPressOut,
                              icon,
                          }: Props) => {
    return (
        <TouchableOpacity
            // activeOpacity={0.7}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.btnContainer}
        >
        <LinearGradient
            colors={['#54A6FF', '#3C4043']}
            angle={225}
            useAngle={true}
            style={styles.gradient}
        >
        <View style={styles.btnInside} >
            <CustomIcon iconName={icon} />
        </View>
        </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer:{
        position: 'absolute',
        bottom:h(2 ),
        borderRadius: 24,
        overflow: 'hidden',
        width: w(48),
        height: w(48),
        alignSelf:"center"
    } ,
    gradient: {
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
    },
    btnInside:{
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
        left:w(2),
        top:h(2),
        width: w(44),
        height: w(44),
        borderRadius: 24,
        backgroundColor: Colors.lightCharcoal,
    },
    btn: {
        // padding: 14,
        // justifyContent: 'center',
        // alignItems: 'center',
        // // margin: 10,
        // width: w(48),
        // height: w(48),
        // borderRadius: 24,
        // borderWidth: 2,
        // // borderColor: 'red',
        // backgroundColor: Colors.lightCharcoal,

    },
});
export default CustomRoundButton;

