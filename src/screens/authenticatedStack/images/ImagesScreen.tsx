import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import VehicleNameWithIcon from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import CustomWhiteButton from '../../../common/components/buttons/buttonWhite/CustomWhiteButton.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import { Name } from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { useIsFocused } from '@react-navigation/native';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { uploadingList } from '../../../common/store/slices/uploadSlice.tsx';

const ImagesScreen = ({ navigation }: any) => {
    const { postRequest } = apiHeadersHook();
    const [res, setRes] = useState({
        appraisal: {} as Name,
        images: [],
    });
    const [elementWidth, setElementWidth] = useState<number>(0);
    const list = useSelector(uploadingList);
    const { t } = useText();
    const { changeScreen } = useChangeScreen();
    const [refresh, setRefresh] = useState(false);
    const isFocused = useIsFocused();

    const getImages = async () => {
        console.log('--------------------------------------');
        const response = await postRequest(
            '/novotradein/app/appraisal/images',
            {}
        );

        if (response.status === 'ok') {
            setRes({ ...response, images: [...response.images] });
        }
    };

    useEffect(() => {
        (async () => {
            if (list.length === 0) {
                await getImages();
            }
        })();
    }, [list]);

    useEffect(() => {
        isFocused &&
            (async () => {
                await getImages();
            })();
    }, [isFocused]);

    useEffect(() => {
        refresh &&
            (async () => {
                await getImages().then(() => {
                    setRefresh(false);
                });
            })();
    }, [refresh]);

    const handleTakePhotos = () => {
        navigation.navigate('Camera');
    };

    const handleContinue = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/imagesSave',
            {}
        );
        if (response.status === 'ok') {
            changeScreen(response);
        }
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('images.title')}
                    backBtn={true}
                    rightSide={
                        <CustomHeaderIconButton
                            icon={'home'}
                            onPress={() => {
                                navigation.navigate('Dashboard');
                            }}
                        />
                    }
                />
            }>
            {/*<CustomModal isVisible={} buttons={}></CustomModal>*/}
            <VehicleNameWithIcon name={res?.appraisal} />
            <View
                style={{ flex: 1 }}
                onLayout={event => {
                    console.log(event.nativeEvent.layout.width, 'cccccccccc');
                    setElementWidth(
                        (event.nativeEvent.layout.width - h(8) * 2) / 3
                    );
                }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.listContainer}
                    numColumns={3}
                    columnWrapperStyle={{ gap: h(8) }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent:
                            res?.images?.length === 0 ? 'center' : 'flex-start',
                        gap: h(8),
                    }}
                    data={[
                        ...res?.images,
                        { length2: list.length, last2: true },
                    ]}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: elementWidth,
                                }}>
                                {item.last2 ? (
                                    <>
                                        {item.length2 === 0 ? null : (
                                            <View
                                                style={
                                                    styles.uploadingContainer
                                                }>
                                                <View
                                                    style={{
                                                        height: h(70),
                                                        width: '100%',
                                                    }}></View>
                                                <View
                                                    style={
                                                        styles.spinnerContainer
                                                    }>
                                                    <ActivityIndicator
                                                        size={'large'}
                                                        color={Colors.skyBlue}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </>
                                ) : (
                                    <View style={styles.trueImageContainer}>
                                        <Image
                                            style={{
                                                height: h(70),
                                                width: '100%',
                                                resizeMode: 'cover',
                                            }}
                                            //@ts-ignore
                                            source={{ uri: item.url }}
                                        />
                                    </View>
                                )}
                            </View>
                        );
                    }}
                    refreshing={refresh}
                    onRefresh={() => {
                        setRefresh(true);
                    }}
                    keyExtractor={(item: any) => item.url}
                    ListEmptyComponent={() => (
                        <View style={styles.listContainer}>
                            <Text style={styles.emptyListText}>
                                {t('images.emptyListText')}
                            </Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <CustomWhiteButton
                    onPress={handleTakePhotos}
                    text={t('images.buttons.upload')}
                />
                <CustomTextButton
                    onPress={handleContinue}
                    text={t('images.buttons.continue')}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    trueImageContainer: {
        backgroundColor: Colors.lightBlack,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    buttonsContainer: {
        gap: h(8),
        marginTop: 'auto',
    },
    scrollerContent: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        marginVertical: h(24),
    },
    emptyListText: {
        ...commonFonts.regularTextSmall,
        color: Colors.metal,
        textAlign: 'center',
    },
    uploadingContainer: {
        position: 'relative',
    },
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default ImagesScreen;
