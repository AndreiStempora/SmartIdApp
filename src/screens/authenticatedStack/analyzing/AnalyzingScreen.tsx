import React, { useEffect, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { useRoute } from '@react-navigation/native';
import useBlob from '../../../common/services/hooks/blobHook.tsx';

const AnalyzingScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { upload } = useBlob();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            (async () => {
                //@ts-ignore
                const res = await upload({ image: { ...route.params.file } });
                if (res.status === 'ok') {
                    setSuccess(true);
                    setTimeout(() => {
                        navigation.navigate('Matches', { code: res.code });
                    }, 2000);
                } else {
                    setError(true);
                }
            })();
        } catch (error) {
            console.error('Error in AnalyzingScreen: ', error);
        }
    }, []);

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
                                onPress={() => {}}
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
