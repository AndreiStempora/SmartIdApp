import React, { useEffect, useRef, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { useIsFocused, useRoute } from '@react-navigation/native';
import useBlob from '../../../common/services/hooks/blobHook.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';

type ResponseProps = {
    status: string;
    code: string;
    next?: string;
    text?: string;
    finish?: boolean;
};
const AnalyzingScreen = ({ navigation }: any) => {
    // useAndroidBackButton();
    const route = useRoute();
    const { upload } = useBlob();
    const { postRequest } = useApiHeaders();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [tryAgain, setTryAgain] = useState(false);
    const signal = useRef<AbortController>();
    const inFocus = useIsFocused();
    const [uploading, setUploading] = useState(true);
    const [next, setNext] = useState<ResponseProps>({
        status: '',
        code: '',
        next: '',
        finish: false,
    });
    //@ts-ignore
    const nextRequest = async () => {
        try {
            console.log('nextRequest', next?.next);
            const response = await postRequest(
                `/${next?.next}`,
                { code: next.code },
                { signal: signal.current?.signal }
            );
            if (response.status === 'ok') {
                if (response.next) {
                    setNext(response);
                }
                if (response.finish) {
                    setSuccess(true);
                    setTimeout(() => {
                        navigation.navigate('Matches', {
                            code: response.code,
                            //@ts-ignore
                            file: { ...route.params.file },
                        });
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error in AnalyzingScreen: ', error);
            setError(true);
        }
    };
    useEffect(() => {
        inFocus &&
            (async () => {
                try {
                    const abortController = new AbortController();
                    signal.current = abortController;
                    const res = await upload(
                        //@ts-ignore
                        { image: { ...route.params.file } },
                        { signal: signal.current?.signal }
                    );
                    if (res.status === 'ok') {
                        setUploading(false);
                        if (res.next) {
                            setNext(res);
                        }
                    } else {
                        setError(true);
                    }
                } catch (error) {
                    console.error('Error in AnalyzingScreen: ', error);
                    setError(true);
                }
            })();
    }, [inFocus]);

    useEffect(() => {
        if (next.code !== '' && next.finish !== true) {
            const abortController = new AbortController();
            signal.current = abortController;
            (async () => {
                await nextRequest();
            })();
        }
    }, [next, tryAgain]);

    const handleAbort = async () => {
        signal.current?.abort();
        if (!uploading) {
            const response = await postRequest('/delete', { code: next.code });
            if (response.status === 'ok') {
                console.log('deleted');
                navigation.navigate('Dashboard');
            }
        }
    };

    const handleTryAgain = () => {
        setError(false);
        setSuccess(false);
        setTryAgain(true);
    };

    return (
        <ScreenContainer nav={navigation} removeBg={true}>
            <>
                {!error && !success && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.black400}
                        iconName={'dataLoader'}
                        textTitle={'Analyzing data'}
                        textContent={next?.text || 'Please wait'}
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
                {error && (
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
                            />
                        }
                    />
                )}
                {success && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.lime}
                        iconName={'dataCompleted'}
                        textTitle={'Completed analysis'}
                        textContent={'Loading data'}
                        dots={true}
                        backBtn={true}
                    />
                )}
            </>
        </ScreenContainer>
    );
};

export default AnalyzingScreen;
