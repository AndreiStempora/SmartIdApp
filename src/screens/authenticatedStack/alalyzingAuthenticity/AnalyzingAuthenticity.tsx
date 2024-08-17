import { Text } from 'react-native';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';

type ResponseProps = {
    status: string;
    similarity: number;
};

const AnalyzingAuthenticityScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { postRequest } = useApiHeaders();
    const [wait, setWait] = useState(true);
    const [response, setResponse] = useState<ResponseProps>({
        status: '',
        similarity: 0,
    });
    const inFocus = useIsFocused();
    const [outcome, setOutcome] = useState<'good' | 'ok' | 'bad' | ''>('');
    useEffect(() => {
        const abortController = new AbortController();
        inFocus &&
            (async () => {
                setTimeout(() => setWait(false), 2000);
                const res = await postRequest(
                    '/check',
                    {
                        //@ts-ignore
                        code: route.params.code,
                    },
                    { signal: abortController.signal }
                );
                if (res.status === 'ok') {
                    console.log('response', res);
                    setResponse(res);
                }
            })();
        console.log(route.params, 'caca');
        return () => {
            abortController.abort();
            console.log('aborted');
        };
    }, [inFocus]);

    useEffect(() => {
        console.log('similarity', response.similarity);
        if (!wait && response.status === 'ok') {
            if (response.similarity > 66) {
                setOutcome('good');
            } else if (response.similarity > 33) {
                setOutcome('ok');
            } else {
                setOutcome('bad');
            }
        }
    }, [wait, response]);

    const handleTryAgain = () => {
        navigation.goBack();
    };
    const handleDone = () => {
        navigation.goBack();
    };

    const handleAbort = () => {
        navigation.goBack();
    };

    return (
        <ScreenContainer nav={navigation} removeBg={true}>
            <>
                {/*{!error && !success && (*/}
                {outcome === '' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.black400}
                        iconName={'dataSafe'}
                        textTitle={'Analyzing Authenticity'}
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

                {outcome === 'good' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.lime}
                        iconName={'dataHigh'}
                        textContent={
                            'High confidence in authenticity! Verification nearing completion.'
                        }
                        // dots={true}
                        backBtn={true}
                        footerBtn={
                            <CustomTextButton
                                background={Colors.black300}
                                border={Colors.black400}
                                onPress={handleDone}
                                text={'Done'}
                            />
                        }
                    />
                )}
                {outcome === 'ok' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.yellow100}
                        iconName={'dataMed'}
                        textContent={
                            '50% confidence in authenticity! Further verification needed.'
                        }
                        // dots={true}
                        backBtn={true}
                        footerBtn={
                            <CustomTextButton
                                onPress={handleTryAgain}
                                text={'Check again'}
                            />
                        }
                    />
                )}
                {outcome === 'bad' && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.error}
                        iconName={'dataLow'}
                        textContent={
                            'Low confidence in authenticity! Result uncertain.'
                        }
                        // dots={true}
                        backBtn={true}
                        footerBtn={
                            <CustomTextButton
                                onPress={handleTryAgain}
                                text={'Check again'}
                            />
                        }
                    />
                )}
            </>
        </ScreenContainer>
    );
};

export default AnalyzingAuthenticityScreen;
