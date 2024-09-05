import { FlatList, StyleSheet, Text, View } from 'react-native';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomImageComponent from '../../../common/components/smallComponents/imageCompoent/CustomImageComponent.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import ImageCarousel from '../details/components/ImageCarousel.tsx';
import DetailsList from '../details/components/DetailsList.tsx';
import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';
import MatchComponent from './components/MatchComponent.tsx';

type ResponseProps = {
    status: string;
    similarity: number;
    model: string;
    details: object;
};

const AnalyzingAuthenticityScreen = ({ navigation }: any) => {
    useAndroidBackButton();
    const route = useRoute();
    const { postRequest } = useApiHeaders();
    const [wait, setWait] = useState(true);
    const [response, setResponse] = useState<ResponseProps>({
        status: '',
        similarity: -1,
        model: '',
        details: {},
    });
    const [item, setItem] = useState({
        brand: '',
        confidence: 0,
        model: '',
        details: [],
        images: [],
        reference: '',
        code: '',
        position: 0,
        selectedPos: false,
    });
    const inFocus = useIsFocused();
    const [showDetails, setShowDetails] = useState(false);
    const [screen, setScreen] = useState('analyzing');

    useEffect(() => {
        const abortController = new AbortController();
        // console.log(route.params.code, 'code');
        inFocus &&
            (async () => {
                // setTimeout(() => setWait(false), 2000);
                const res = await postRequest(
                    '/check',
                    {
                        //@ts-ignore
                        code: route.params.code,
                    },
                    { signal: abortController.signal }
                );
                // console.log('response cccccccc+++++c', res, res.details);
                if (res.status === 'ok') {
                    setResponse(res);
                    setItem(res.details);
                    setScreen('details');
                } else {
                    setScreen('error');
                }
            })();
        return () => {
            abortController.abort();
            console.log('aborted');
        };
    }, [inFocus]);

    useEffect(() => {
        // console.log('similarity', response.similarity, response);
        // if (!wait && response.status === 'ok') {
        // }
        // if (response.details !== undefined) {
        //     setShowDetails(true);
        //     setResponse(response);
        //     setItem(response.details);
        //     setOutcome('good');
        // }
        //     if (response.similarity < 0.0006) {
        //         setOutcome('good');
        //     } else if (
        //         response.similarity < 0.0006 &&
        //         response.similarity > 0.001
        //     ) {
        //         setOutcome('ok');
        //     } else {
        //         setOutcome('bad');
        //     }
        // }
    }, [wait, response]);

    useEffect(() => {
        console.log('item', item);
    }, [item]);

    const handleTryAgain = () => {
        navigation.goBack();
    };
    const handleDone = () => {
        navigation.goBack();
    };

    const handleAbort = () => {
        navigation.goBack();
    };

    const handleRegisterWatch = async () => {};
    const handleAuthenticity = () => {};

    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            <>
                {/*{!error && !success && (*/}
                {screen === 'analyzing' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.black400}
                        iconName={'dataSafe'}
                        textTitle={'Analyzing Authenticity'}
                        textContent={'Please wait'}
                        dots={true}
                        backBtn={true}
                        footerBtn={
                            <CustomTextButton
                                onPress={handleAbort}
                                text={'cancel'}
                                background={Colors.black300}
                                border={Colors.black400}
                            />
                        }
                    />
                )}
                {screen === 'error' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.error}
                        iconName={'dataFail'}
                        textTitle={'Not the same watch'}
                        // textContent={'Please wait'}
                        dots={false}
                        backBtn={true}
                        // footerBtn={
                        //     <CustomTextButton
                        //         onPress={handleAbort}
                        //         text={'cancel'}
                        //         background={Colors.black300}
                        //         border={Colors.black400}
                        //     />
                        // }
                    />
                )}
                {screen === 'details' && (
                    <>
                        <View style={styles.buttonFloater}>
                            <IdHeader navigation={navigation} />
                        </View>
                        <View style={styles.imageContainer}>
                            {item.images.length > 1 ? (
                                <ImageCarousel images={item.images} />
                            ) : (
                                <CustomImageComponent
                                    image={item.images[0]}
                                    resizeMode={'contain'}
                                />
                            )}
                        </View>
                        <View style={styles.contentContainer}>
                            <MatchComponent similarity={response.similarity} />
                            {/*<MatchComponent similarity={0.08} />*/}
                            <View style={styles.listContainer}>
                                {/*<ImageCarousel images={dummyImages} />*/}
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingBottom: h(16),
                                    }}
                                    style={{ flex: 1 }}
                                    data={item.details}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                    //@ts-ignore
                                    renderItem={({ item }) => (
                                        <DetailsList item={item} />
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={styles.transparentSeparator}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </>
                )}
            </>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        // paddingBottom: h(16),
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
        left: w(0),
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btnContainer: {
        gap: h(8),
    },
});

export default AnalyzingAuthenticityScreen;
