import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import CustomHeaderIconButton from '../../../../buttons/buttonIcon/CustomHeaderIconButton.tsx';
import { Colors } from '../../../../../styles/constants.tsx';
import { h } from '../../../../../styles/PixelPerfect.tsx';
import Flash from '../../../../../../screens/authenticatedStack/camera/Flash.tsx';
import { useEffect } from 'react';
import useBasicAnimation from '../../../../../services/hooks/animationHook.tsx';

type Props = {
    title?: string;
    backBtn?: boolean;
    rightSide?: React.ReactNode;
    bigIcon?: boolean;
    leftSide?: React.ReactNode;
    isPortrait: boolean;
    setFl: (val: string) => void;
};

const HeaderComponentCamera = ({
    backBtn,
    leftSide,
    isPortrait,
    setFl,
}: Props) => {
    const nav = useNavigation();
    const insets = useSafeAreaInsets();
    const { interpolationValue, animation } = useBasicAnimation({
        duration: 500,
        from: 1,
        to: 0,
    });
    const { interpolationValue: interpolationValue2, animation: animation2 } =
        useBasicAnimation({ duration: 500, from: 0, to: 1 });

    const handleBackButton = () => {
        //@ts-ignore
        nav.goBack();
    };

    useEffect(() => {
        // console.log('aaaa', isPortrait);
        animation();
        animation2();
    }, [isPortrait]);

    return (
        <View style={[{ paddingTop: insets.top }, styles.mainContainer]}>
            <View
                style={[
                    styles.contentContainer,
                    !backBtn && !leftSide && styles.contentRight,
                ]}>
                {backBtn !== false && !leftSide && (
                    <View>
                        <CustomHeaderIconButton
                            onPress={handleBackButton}
                            icon={'arrowPrevious'}
                        />
                    </View>
                )}
                {leftSide && <View>{leftSide}</View>}
                <View>
                    <Flash
                        press={val => {
                            setFl(val.toLowerCase());
                        }}
                        isPortrait={isPortrait}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.charcoal,
        borderBottomWidth: h(2),
        borderBottomColor: Colors.metal,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: h(56),
        marginHorizontal: 0,
    },
    contentRight: {
        justifyContent: 'flex-end',
    },
    flashContainer: {
        backgroundColor: 'green',
    },
});

export default HeaderComponentCamera;
