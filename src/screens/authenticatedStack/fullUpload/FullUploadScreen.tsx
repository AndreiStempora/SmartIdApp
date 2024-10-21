import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import React, { useEffect, useState } from 'react';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import UploadItem from './components/UploadItem.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPhotoSliceData,
    updateSlotsData,
} from '../../../common/store/slices/photoSlice.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';

const FullUploadScreen = ({ navigation }: any) => {
    const [slots, setSlots] = useState([]);
    const { postRequest } = useApiHeaders();
    const photoSlice = useSelector(getPhotoSliceData);
    const dispatch = useDispatch<AppDispatch>();
    const [enableUpload, setEnableUpload] = useState(false);

    useEffect(() => {
        (async () => {
            console.log(photoSlice, 'photoSlice');
            const response = await postRequest('/images/slots', {
                id: photoSlice.selectedMatch.id,
                code: photoSlice.initialPhotoResponse.code,
            });
            console.log(response.slots, 'slots');
            dispatch(updateSlotsData(response.slots));
        })();
    }, []);

    useEffect(() => {
        console.log(photoSlice.slotsData, 'slotsData');
        const xx = photoSlice.slotsData.every(slot => slot?.src !== undefined);
        setEnableUpload(xx);
    }, [photoSlice.slotsData]);

    const handleUpload = () => {
        navigation.navigate('ImageProcessing');
    };
    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            <View style={styles.buttonFloater}>
                <IdHeader navigation={navigation} title={'Capture Watch'} />
            </View>

            <FlatList
                style={styles.contentHolder}
                data={photoSlice.slotsData}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.contentContainer}
                numColumns={2}
                renderItem={({ item }) => (
                    <UploadItem
                        slot={item.slot}
                        name={item.name}
                        required={item.required}
                        editable={item.editable}
                        mask={item.mask}
                        src={item.src}
                        navigation={navigation}
                    />
                )}
                columnWrapperStyle={{ gap: 8 }}
            />
            <View style={styles.btnContainer}>
                <CustomTextButton
                    onPress={handleUpload}
                    text={'Upload'}
                    disabled={!enableUpload}
                />
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

    contentHolder: {
        marginTop: h(84),
        marginBottom: h(16),
    },
    contentContainer: {
        // flex: 1,

        paddingHorizontal: w(16),
        paddingVertical: h(16),
        gap: h(8),

        // backgroundColor: 'white',
    },
    btnContainer: {
        paddingHorizontal: w(16),
        paddingBottom: h(16),
    },
});

export default FullUploadScreen;
