import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { h, w } from '../../../../styles/PixelPerfect.tsx';
import React from 'react';

type Props = {
    children?: React.ReactNode;
};
const CustomTabBar = ({ children }: Props) => {
    const insets = useSafeAreaInsets();
    console.log('insets', insets);
    return (
        <View style={[{ paddingBottom: insets.bottom }, styles.mainContainer]}>
            <View style={styles.contentContainer}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // position:'absolute',
        // bottom:0,
        // width:'100%',
        backgroundColor: '#1A1A1A',
    },
    contentContainer: {
        zIndex: 100,
        height: h(56),
        borderTopWidth: h(2),
        // borderBottomWidth:h(2),
        borderTopColor: '#8E9297',
        justifyContent: 'center',
        gap: w(64),
        flexDirection: 'row',
    },
});

export default CustomTabBar;
