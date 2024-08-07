import {
    FlatList,
    LayoutAnimation,
    StyleSheet,
    TouchableOpacity,
    View,
    Animated,
} from 'react-native';
import { useEffect, useState } from 'react';
import Icon from '../../../common/components/icons/Icon.tsx';
import CustomIconButton from '../../../common/components/buttons/buttonIcon/CustomIconButton.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import useBasicAnimation from '../../../common/services/hooks/animationHook.tsx';

type Props = {
    press: (val: string) => void;
    isPortrait: boolean;
};

const Flash = ({ press, isPortrait }: Props) => {
    const possibleFlash = ['Off', 'On', 'Auto'];
    const [currentFlash, setCurrentFlash] = useState('Off');
    const [containerOpened, setContainerOpened] = useState(false);
    const { interpolationValue, animation } = useBasicAnimation({
        duration: 200,
        from: '0deg',
        to: '90deg',
        // nativeDrivers: true,
    });

    const pressHandler = (newFlash: string) => {
        // animation();
        setContainerOpened(!containerOpened);
        setCurrentFlash(newFlash);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    const handleOpenFlashMenu = () => {
        setContainerOpened(!containerOpened);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    useEffect(() => {
        press(currentFlash);
    }, [currentFlash]);

    useEffect(() => {
        animation();
    }, [isPortrait]);
    return (
        <View
            style={[
                styles.container,
                containerOpened ? { width: '100%' } : { width: w(56) },
            ]}>
            <TouchableOpacity
                style={styles.flashButton}
                onPress={handleOpenFlashMenu}>
                <Animated.View
                    style={{
                        transform: [
                            {
                                rotate: interpolationValue,
                            },
                        ],
                    }}>
                    <Icon icon={`flash` + currentFlash} />
                </Animated.View>
            </TouchableOpacity>

            <FlatList
                data={possibleFlash}
                // style={{ flexDirection: 'row' }}
                keyExtractor={fl => fl}
                contentContainerStyle={{ flexDirection: 'row' }}
                renderItem={fl => {
                    if (fl.item !== currentFlash) {
                        return (
                            <View>
                                <Animated.View
                                    style={{
                                        transform: [
                                            {
                                                rotate: interpolationValue,
                                            },
                                        ],
                                    }}>
                                    <CustomIconButton
                                        onPress={() => pressHandler(fl.item)}
                                        icon={`flash` + fl.item}
                                    />
                                </Animated.View>
                            </View>
                        );
                    } else {
                        return <></>;
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        // width: w(56),
        overflow: 'hidden',
    },
    flashButton: {
        width: w(56),
        height: h(56),
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    rotate: {
        transform: [{ rotate: '90deg' }],
        // transformOrigin: 'center center',
    },
});
export default Flash;
