import React, { useEffect, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { useIsFocused, useRoute } from '@react-navigation/native';
import useBlob from '../../../common/services/hooks/blobHook.tsx';

const AnalyzingScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { upload } = useBlob();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const inFocus = useIsFocused();
    useEffect(() => {
        const abortController = new AbortController();

        try {
            inFocus &&
                (async () => {
                    const res = await upload(
                        //@ts-ignore
                        { image: { ...route.params.file } },
                        { signal: abortController.signal }
                    );
                    if (res.status === 'ok') {
                        setSuccess(true);
                        setTimeout(() => {
                            navigation.navigate('Matches', {
                                code: res.code,
                                //@ts-ignore
                                file: { ...route.params.file },
                            });
                        }, 2000);
                    } else {
                        setError(true);
                    }
                })();
        } catch (error) {
            console.error('Error in AnalyzingScreen: ', error);
        }

        return () => {
            abortController.abort();
            console.log('aborted');
        };
    }, [inFocus]);

    const handleAbort = () => {
        navigation.navigate('Dashboard');
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
                {error && (
                    <Analyse
                        navigation={navigation}
                        borderColor={Colors.error}
                        iconName={'dataFail'}
                        textTitle={'Failed analysis'}
                        textContent={'No data found'}
                        // dots={true}
                        backBtn={false}
                        footerBtn={
                            <CustomTextButton
                                onPress={() => {}}
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
