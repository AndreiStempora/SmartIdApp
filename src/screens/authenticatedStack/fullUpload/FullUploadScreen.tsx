import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import React from 'react';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import UploadItem from './components/UploadItem.tsx';

const FullUploadScreen = ({ navigation }: any) => {
    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            <View style={styles.buttonFloater}>
                <IdHeader navigation={navigation} title={'Capture Watch'} />
            </View>
            <View style={styles.contentContainer}>
                <UploadItem />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    buttonFloater: {
        position: 'absolute',
        zIndex: 100,
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        marginTop: h(84),
        paddingHorizontal: w(16),
        paddingVertical: h(16),
        // backgroundColor: 'white',
    },
});

export default FullUploadScreen;
