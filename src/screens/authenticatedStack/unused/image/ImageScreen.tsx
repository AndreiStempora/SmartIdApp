import React, { useEffect, useState } from 'react';
import ScreenContainer from '../../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import { Image, StyleSheet, View } from 'react-native';
import useUtility from '../../../../common/services/hooks/utilityHook.tsx';
import { useIsFocused } from '@react-navigation/native';
import useHandleImages from '../../../../common/services/hooks/handleImagesHook.tsx';
import CustomFooterIconButton from '../../../../common/components/buttons/buttonIcon/CustomFooterIconButton.tsx';
import CustomTabBar from '../../../../common/components/screenComponents/bars/tabBars/CustomTabBar.tsx';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const ImageScreen = ({ navigation }: any) => {
    const { currentSelection } = useUtility();
    const { readFile, generatePicturePath } = useHandleImages();
    const [photo, setPhoto] = useState<string>();
    const [spotName, setSpotName] = useState<string>('');
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused &&
            (async () => {
                const spots = await readFile(currentSelection.vehicleVin);
                spots.spots
                    .filter((x: any) => x.id === currentSelection.spot)
                    .map((x: any) => {
                        setPhoto(
                            generatePicturePath(
                                currentSelection.vehicleVin,
                                x.photo
                            )
                        );
                        setSpotName(x.name);
                    });
            })();
    }, [isFocused]);

    const handleRetake = () => {
        navigation.navigate('Camera');
    };

    return (
        <ScreenContainer
            nav={navigation}
            header={<HeaderComponent title={spotName} />}
            fullScreen
            removeBg
            footer={
                <CustomTabBar>
                    <CustomFooterIconButton
                        icon={'restartIcon'}
                        onPress={handleRetake}
                    />
                </CustomTabBar>
            }>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {photo && (
                    <ReactNativeZoomableView
                        maxZoom={4}
                        minZoom={1}
                        // panEnabled={false}
                        bindToBorders={true}>
                        <Image source={{ uri: photo }} style={styles.image} />
                    </ReactNativeZoomableView>
                )}
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 'auto',
        resizeMode: 'contain',
        aspectRatio: 0.75,
    },
});

export default ImageScreen;
