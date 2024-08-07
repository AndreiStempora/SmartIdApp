import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
    duration?: number;
    from: number | string;
    to: number | string;
    nativeDrivers?: boolean;
};

//REMINDER: to use this hook twice in a component you need to redefine values like this:
// const {interpolationValue: interpolationValue1, animationForward: animationForward1, animationReturn: animationReturn1} = useBasicAnimation({duration: 250, from: 0, to: 1});
const useBasicAnimation = ({ duration, from, to, nativeDrivers }: Props) => {
    const animateForward = useRef(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const interpolationValue = animatedValue.interpolate({
        inputRange: [0, 1],
        //@ts-ignore
        outputRange: [from ?? 0, to ?? 1],
    });
    const animationForward = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration ?? 250,
            easing: Easing.linear,
            useNativeDriver: nativeDrivers !== false,
        }).start();
    };

    const animationReturn = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration ?? 250,
            easing: Easing.linear,
            useNativeDriver: nativeDrivers !== false,
        }).start();
    };

    const animation = () => {
        animateForward.current ? animationReturn() : animationForward();
        animateForward.current = !animateForward.current;
    };

    return {
        interpolationValue,
        animation,
    };
};

export default useBasicAnimation;
