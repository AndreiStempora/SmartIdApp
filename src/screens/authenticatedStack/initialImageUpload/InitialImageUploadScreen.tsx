import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getInitialPhotoDetails,
    updateInitialPhotoResponse,
} from '../../../common/store/slices/photoSlice.tsx';
import useBlob from '../../../common/services/hooks/blobHook.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';

const InitialImageUploadScreen = ({ navigation }: any) => {
    const [outcome, setOutcome] = useState('loading');
    const initialImage = useSelector(getInitialPhotoDetails);
    const { upload } = useBlob();
    const signal = useRef<AbortController>();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        try {
            (async () => {
                const abortController = new AbortController();
                signal.current = abortController;
                // if initialImage.path does not start with file:// then add it

                const file = {
                    //@ts-ignore
                    type: initialImage.mime,
                    //@ts-ignore
                    uri: initialImage.path,
                    //@ts-ignore
                    name: initialImage.path.split('/').pop(),
                };
                console.log(file, 'file');
                const res = await upload(
                    '/scans/create',
                    //@ts-ignore
                    { image: file },
                    { signal: signal.current?.signal }
                );
                if (res.status === 'ok') {
                    dispatch(updateInitialPhotoResponse(res));
                    setOutcome('success');
                } else {
                    setOutcome('error');
                }
            })();
        } catch (e) {
            console.log(e, 'error');
        }
    }, []);

    useEffect(() => {
        if (outcome === 'success') {
            navigation.navigate('Matches');
        }
    }, [outcome]);

    const handleAbort = () => {
        signal.current?.abort();
        console.log('abort');
        navigation.goBack();
    };
    const handleTryAgain = () => {
        navigation.goBack();
    };

    useAndroidBackButton(handleAbort);
    return (
        <ScreenContainer nav={navigation} removeBg={true}>
            <View style={styles.container}>
                {outcome === 'loading' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.black400}
                        iconName={'dataLoader'}
                        textTitle={'Analyzing Image'}
                        textContent={'Please wait'}
                        dots={true}
                        backBtn={false}
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

                {outcome === 'error' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.error}
                        iconName={'dataFail'}
                        textTitle={'Failed analysis'}
                        textContent={'No data found'}
                        // dots={true}
                        backBtn={true}
                        footerBtn={
                            <CustomTextButton
                                onPress={handleTryAgain}
                                text={'Scan again'}
                                background={Colors.black300}
                                border={Colors.black400}
                                icon={'boldRetry'}
                                iconRight={true}
                            />
                        }
                    />
                )}
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { color: 'red' },
    next: {},
});

export default InitialImageUploadScreen;
