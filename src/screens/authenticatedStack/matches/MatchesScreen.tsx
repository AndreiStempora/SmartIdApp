import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';

import React, { useEffect } from 'react';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';

import MatchesItem from './components/MatchesItem.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import CustomImageComponent from '../../../common/components/smallComponents/imageCompoent/CustomImageComponent.tsx';

import { useSelector } from 'react-redux';
import { getInitialPhotoResponse } from '../../../common/store/slices/photoSlice.tsx';
import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';

const MatchesScreen = ({ navigation }: any) => {
    const initialPhoto = useSelector(getInitialPhotoResponse);
    useEffect(() => {
        console.log('initialPhoto', initialPhoto);
    }, []);
    // useAndroidBackButton();
    // const { postRequest } = useApiHeaders();
    // const [isVisible, setIsVisible] = useState(false);
    // const [newSelectedPos, setNewSelectedPos] = useState(0);
    // const [selectedPos, setSelectedPos] = useState(-1);
    // const [item, setItem] = useState<ItemContent>({
    //     title: '',
    //     subtitle: '',
    //     date: '',
    //     tn: '',
    //     code: '',
    //     ref: '',
    //     conf: 0,
    //     fakeResult: null,
    // });
    // const [fakeResult, setFakeResult] = useState(null);
    // const [color, setColor] = useState(Colors.white);
    //
    // const [matches, setMatches] = useState([]);
    // const router = useRoute();
    // const [isVisibleModal, setIsVisibleModal] = useState(false);
    //
    // const getOpacityColor = (color: string, opacity: number) => {
    //     return color + Math.round(opacity * 255).toString(16);
    // };
    // const setColorByConfidence = () => {
    //     //@ts-ignore
    //     if (router.params?.fakeResult === '1') {
    //         setColor(Colors.error);
    //     }
    //     //@ts-ignore
    //     if (router.params?.fakeResult === '2') {
    //         setColor(Colors.yellow100);
    //     }
    //     //@ts-ignore
    //     if (router.params?.fakeResult === '3') {
    //         setColor(Colors.lime);
    //     }
    // };
    //
    // useEffect(() => {
    //     console.log('selectedPos', selectedPos, newSelectedPos);
    // }, [selectedPos, newSelectedPos]);
    // useEffect(() => {
    //     setItem(router.params as ItemContent);
    //     console.log('fileUri set!!!!!!!', router.params);
    //     //@ts-ignore
    //     setColorByConfidence();
    //     //@ts-ignore
    //     if (router.params?.file) {
    //         //@ts-ignore
    //         setItem(prev => ({ ...prev, tn: router.params?.file.uri }));
    //     }
    //     (async () => {
    //         await fetchData();
    //     })();
    // }, []);
    //
    // useEffect(() => {
    //     console.log('------', item);
    // }, [item]);
    // const fetchData = async () => {
    //     const response = await postRequest('/scan', {
    //         //@ts-ignore
    //         code: router?.params?.code,
    //     });
    //     console.log(response, 'matches+++++');
    //
    //     console.log('settingItem!!!!!');
    //     setFakeResult(response?.fakeResult);
    //     if (response?.matches !== undefined) {
    //         setMatches(response.matches);
    //         if (response.selectedPos !== null) {
    //             setSelectedPos(Number(response.selectedPos));
    //         } else {
    //             setSelectedPos(response.selectedPos);
    //         }
    //     }
    //
    //     console.log(response, 'matches++');
    // };
    // const handleBack = () => {
    //     console.log('selectedPos', selectedPos);
    //     if (selectedPos === null) {
    //         setIsVisibleModal(true);
    //     } else {
    //         navigation.navigate('Dashboard');
    //     }
    // };
    //
    // const handleChangePos = async () => {
    //     try {
    //         const response = await postRequest('/update', {
    //             code: item.code,
    //             position: newSelectedPos,
    //         });
    //         console.log('response', response);
    //         if (response.status === 'ok') {
    //             console.log('position changed');
    //             await fetchData();
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         setIsVisible(false);
    //     }
    // };
    //
    // const handleNoMatch = async () => {
    //     setNewSelectedPos(-1);
    //     setIsVisible(true);
    // };

    const handleBack = () => {
        navigation.navigate('Dashboard');
    };
    useAndroidBackButton(handleBack);
    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            {/*<CustomModal*/}
            {/*    isVisible={isVisible}*/}
            {/*    buttons={[*/}
            {/*        {*/}
            {/*            title: 'Cancel',*/}
            {/*            onPress: () => setIsVisible(false),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: 'yes',*/}
            {/*            onPress: handleChangePos,*/}
            {/*        },*/}
            {/*    ]}>*/}
            {/*    <Text style={styles.modalText}>Are you sure?</Text>*/}
            {/*</CustomModal>*/}
            {/*<CustomModal*/}
            {/*    isVisible={isVisibleModal}*/}
            {/*    buttons={[*/}
            {/*        {*/}
            {/*            title: 'Ok',*/}
            {/*            onPress: () => {*/}
            {/*                setIsVisibleModal(false);*/}
            {/*            },*/}
            {/*        },*/}
            {/*    ]}>*/}
            {/*    <Text style={styles.modalText}>*/}
            {/*        Please select an option before leaving the page*/}
            {/*    </Text>*/}
            {/*</CustomModal>*/}
            <View style={styles.imageContainer}>
                {initialPhoto.images.length && (
                    <CustomImageComponent
                        image={initialPhoto.images[0]}
                        btnPosition={{ top: h(19), right: w(10) }}
                    />
                )}
                {/*@ts-ignore*/}
                {/*{router.params?.fakeResult && (*/}
                {/*<View*/}
                {/*    style={[*/}
                {/*        styles.checkContainer,*/}
                {/*        {*/}
                {/*            // borderColor: color,*/}
                {/*            backgroundColor: Colors.black300,*/}
                {/*        },*/}
                {/*    ]}>*/}
                {/*    <Icon*/}
                {/*        icon={'verifiedCheck'}*/}
                {/*        fill={'red'}*/}
                {/*        width={w(28)}*/}
                {/*        height={h(28)}*/}
                {/*    />*/}
                {/*</View>*/}
                {/*)}*/}
            </View>
            <View style={styles.buttonFloater}>
                <IdHeader navigation={navigation} navigate={handleBack} />
            </View>
            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={{ gap: h(16), paddingBottom: h(30) }}>
                <FlatList
                    scrollEnabled={false}
                    data={initialPhoto.matches}
                    contentContainerStyle={{ paddingBottom: h(0) }}
                    renderItem={({ item }) => {
                        return (
                            <MatchesItem
                                item={item}
                                //@ts-ignore
                                code={item.reference}
                                // fakeResult={fakeResult}
                                navigation={navigation}
                                // changeSelectedPos={num => {
                                //     console.log('num', num);
                                //     setNewSelectedPos(num);
                                //     setIsVisible(true);
                                // }}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: h(24) }} />
                    )}
                />
                {/*<CustomTextButton*/}
                {/*    icon={!(selectedPos === -1) ? 'unchecked' : 'checked'}*/}
                {/*    onPress={handleNoMatch}*/}
                {/*    text={'No Match'}*/}
                {/*    background={Colors.black300}*/}
                {/*    border={Colors.black400}*/}
                {/*    // red*/}
                {/*    disabled={selectedPos === -1}*/}
                {/*/>*/}
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    checkContainer: {
        position: 'absolute',
        right: w(16),
        top: h(70),
        borderWidth: 1,
        borderRadius: 50,
        width: w(40),
        height: w(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: h(250),
    },
    buttonFloater: {
        position: 'absolute',
        top: h(0),
        left: w(0),
        width: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(6),
    },
    backBtnContainer: {
        position: 'absolute',
        top: h(16),
        left: w(0),
        backgroundColor: 'rgba(22, 22, 22, 0.24)',
        height: h(52),
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: w(16),
    },
    backBtnText: {
        ...commonFonts.boldText,
    },
    percentContainer: {
        position: 'absolute',
        bottom: h(8),
        right: w(8),
        height: h(43),
        borderWidth: 1,
        borderColor: Colors.black400,
        backgroundColor: Colors.black300,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: w(77),
    },
    percentText: {
        ...commonFonts.regularText,
        color: Colors.lime,
    },
    contentContainer: {
        padding: h(16),
        gap: h(16),
        flex: 1,
    },
    modalText: {
        ...commonFonts.regularText,
        color: Colors.white,
        textAlign: 'center',
    },
});

export default MatchesScreen;
