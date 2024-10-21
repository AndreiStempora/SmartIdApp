import { FlatList, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { useRoute } from '@react-navigation/native';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';

// import { MatchItem } from '../matches/components/MatchesItem.tsx';
import ConfidenceContainer from '../../../common/components/smallComponents/confidenceContainer/ConfidenceContainer.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import DetailsList from './components/DetailsList.tsx';
import ImageCarousel from './components/ImageCarousel.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import CustomImageComponent from '../../../common/components/smallComponents/imageCompoent/CustomImageComponent.tsx';
// import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';
import HiddenButton from './components/HiddenButton.tsx';
import { useSelector } from 'react-redux';
import { getPhotoSliceData } from '../../../common/store/slices/photoSlice.tsx';

const DetailsScreen = ({ navigation }: any) => {
    // useAndroidBackButton();

    const { postRequest } = useApiHeaders();
    const [isVisible, setIsVisible] = useState(false);
    // const [isVisibleNew, setIsVisibleNew] = useState(false);
    const [error, setError] = useState(false);
    const [images, setImages] = useState([]);
    const photoSlice = useSelector(getPhotoSliceData);
    useEffect(() => {
        console.log(photoSlice, 'photoSlice');
    }, []);
    const handleRegisterWatch = async () => {
        // console.log('register watch', item);
        // const response = await postRequest('/register', {
        //     code: item.code,
        //     // reference: item.reference,
        //     model: item.reference,
        // });
        // if (response.status === 'ok') {
        //     setIsVisible(true);
        // } else {
        //     setError(true);
        //     setIsVisible(true);
        // }
    };
    useEffect(() => {
        (async () => {
            // const response = await postRequest('/scans/details', {
            //     code: photoSlice.initialPhotoResponse.code,
            // });
            // setItem(response.scan);
            // console.log(response, 'response');
            // setImages(response.scan.images);
        })();
    }, []);

    const handleAuthenticity = () => {
        // navigation.navigate('Authenticity', { ...item });
    };
    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            <CustomModal
                isVisible={isVisible}
                buttons={[
                    {
                        title: 'Ok',
                        onPress: () => setIsVisible(false),
                    },
                ]}>
                {error ? (
                    <Text style={styles.modalText}>
                        Error registering watch
                    </Text>
                ) : (
                    <Text style={styles.modalText}>
                        The picture you took was registered as being of this
                        watch
                    </Text>
                )}
            </CustomModal>
            <View style={styles.buttonFloater}>
                <IdHeader navigation={navigation} />
            </View>
            <View style={styles.imageContainer}>
                {images.length !== 1 ? (
                    <ImageCarousel images={images} />
                ) : (
                    <CustomImageComponent
                        image={images[0]}
                        resizeMode={'contain'}
                        // btnPosition={{ top: h(20), right: w(16) }}
                    />
                )}
                {/*<ConfidenceContainer*/}
                {/*    confidence={item.confidence}*/}
                {/*    // selectedPos={item.selectedPos}*/}
                {/*    cssPosition={{ bottom: h(16), right: w(16) }}*/}
                {/*/>*/}
            </View>
            {/*<View style={styles.contentContainer}>*/}
            {/*    <View style={styles.btnContainer}>*/}
            {/*        <View style={styles.individualBtnContainer}>*/}
            {/*            <CustomTextButton*/}
            {/*                onPress={handleRegisterWatch}*/}
            {/*                text={'register'}*/}
            {/*                icon={'watch'}*/}
            {/*                background={Colors.black300}*/}
            {/*                border={Colors.black400}*/}
            {/*            />*/}
            {/*        </View>*/}
            {/*        <View style={styles.individualBtnContainer}>*/}
            {/*            <CustomTextButton*/}
            {/*                onPress={handleAuthenticity}*/}
            {/*                text={'Authenticity'}*/}
            {/*                icon={'verified'}*/}
            {/*                background={Colors.black300}*/}
            {/*                border={Colors.black400}*/}
            {/*            />*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    /!*<HiddenButton*!/*/}
            {/*    /!*    navigation={navigation}*!/*/}
            {/*    /!*    code={item.code}*!/*/}
            {/*    /!*    //@ts-ignore*!/*/}
            {/*    /!*    fakeRegister={router.params.fakeResult}*!/*/}

            {/*    <View style={styles.listContainer}>*/}
            {/*        /!*<ImageCarousel images={dummyImages} />*!/*/}
            {/*        <FlatList*/}
            {/*            showsVerticalScrollIndicator={false}*/}
            {/*            style={{ flex: 1 }}*/}
            {/*            contentContainerStyle={{ paddingBottom: h(16) }}*/}
            {/*            data={item.details}*/}
            {/*            keyExtractor={(item, index) => index.toString()}*/}
            {/*            //@ts-ignore*/}
            {/*            renderItem={({ item }) => <DetailsList item={item} />}*/}
            {/*            ItemSeparatorComponent={() => (*/}
            {/*                <View style={styles.transparentSeparator} />*/}
            {/*            )}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*</View>*/}
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    individualBtnContainer: {
        flex: 1,
    },
    listContainer: {
        // paddingBottom: h(),
        flexGrow: 1,
    },
    contentContainer: {
        paddingHorizontal: w(16),
        // gap: h(24),
        marginTop: h(16),
        flex: 1,
    },
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    transparentSeparator: {
        height: h(24),
    },
    listItemsContainer: {
        marginTop: h(24),
    },
    navigationListContainer: {
        marginTop: h(24),
    },
    scrollListContainer: {},
    mainContainer: {
        height: '100%',
    },
    modalText: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
    imageContainer: {
        height: h(250),
    },
    buttonFloater: {
        position: 'absolute',
        top: h(0),
        left: w(0),
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btnContainer: {
        gap: h(8),
        flexDirection: 'row',
    },
});

export default DetailsScreen;
