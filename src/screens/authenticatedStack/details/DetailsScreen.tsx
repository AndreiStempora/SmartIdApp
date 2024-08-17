import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { useRoute } from '@react-navigation/native';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';

import { MatchItem } from '../matches/components/MatchesItem.tsx';
import ConfidenceContainer from '../../../common/components/smallComponents/confidenceContainer/ConfidenceContainer.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import DetailsList from './components/DetailsList.tsx';
import ImageCarousel from './components/ImageCarousel.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';

const DetailsScreen = ({ navigation }: any) => {
    const router = useRoute();
    const { postRequest } = useApiHeaders();
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(false);
    const [item, setItem] = useState<MatchItem>({
        brand: '',
        confidence: 0,
        model: '',
        details: [],
        images: [],
        reference: '',
        code: '',
    });
    const handleRegisterWatch = async () => {
        console.log('register watch', item);
        const response = await postRequest('/register', {
            code: item.code,
            reference: item.reference,
            model: item.model,
        });
        if (response.status === 'ok') {
            setIsVisible(true);
        } else {
            setError(true);
            setIsVisible(true);
        }
    };
    useEffect(() => {
        setItem(router.params as MatchItem);
        console.log('images', item.images);
    }, []);

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
                {item.images.length !== 1 ? (
                    <ImageCarousel images={item.images} />
                ) : (
                    <Image
                        style={styles.img}
                        source={{ uri: item.images[0] }}
                    />
                )}
                <ConfidenceContainer confidence={item.confidence} />
            </View>
            <View style={styles.contentContainer}>
                <CustomTextButton
                    onPress={handleRegisterWatch}
                    text={'register watch'}
                    icon={'watch'}
                    background={Colors.black300}
                    border={Colors.black400}
                />
                <View style={styles.listContainer}>
                    {/*<ImageCarousel images={dummyImages} />*/}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        data={item.details}
                        keyExtractor={(item, index) => index.toString()}
                        //@ts-ignore
                        renderItem={({ item }) => <DetailsList item={item} />}
                        ItemSeparatorComponent={() => (
                            <View style={styles.transparentSeparator} />
                        )}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: h(16),
        flexGrow: 1,
    },
    contentContainer: {
        paddingHorizontal: w(16),
        gap: h(24),
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
        left: w(16),
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default DetailsScreen;
