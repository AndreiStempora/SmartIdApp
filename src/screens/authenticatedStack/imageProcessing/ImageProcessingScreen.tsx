import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPhotoSliceData,
    getSlotsData,
    getTakenPicturesData,
    updateCode,
} from '../../../common/store/slices/photoSlice.tsx';
import UploadPictureElement from './components/UploadPictureElement.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';

const ImageProcessingScreen = ({ navigation }: any) => {
    useAndroidBackButton(() => {});
    const picturesData = useSelector(getTakenPicturesData);
    const slots = useSelector(getSlotsData);
    const [uploaded, setUploaded] = useState({});
    const [showBackButton, setShowBackButton] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // @ts-ignore
        if (slots.every(slot => uploaded[slot.slot])) {
            // dispatch(updateCode())
            navigation.navigate('Details');
        } else {
            setShowBackButton(true);
        }
    }, [uploaded]);

    return (
        <ScreenContainer nav={navigation}>
            <View style={styles.buttonFloater}>
                <IdHeader
                    navigation={navigation}
                    title={'Process Images'}
                    backFalse={showBackButton}
                />
            </View>
            <FlatList
                style={styles.contentHolder}
                contentContainerStyle={styles.contentContainer}
                data={slots}
                renderItem={({ item }) => (
                    <UploadPictureElement
                        slot={item}
                        onFinished={el => {
                            setUploaded(prev => ({ ...prev, [item.slot]: el }));
                        }}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: h(8) }} />}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    buttonFloater: {
        position: 'absolute',
        zIndex: 100,
        left: w(-16),
        right: w(-16),
        height: h(84),
    },
    contentHolder: {
        marginTop: h(84),
        marginBottom: h(16),
    },
    contentContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
    },
});

export default ImageProcessingScreen;
