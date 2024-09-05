import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import useAndroidBackButton from '../../../common/services/hooks/androidBackButtonHook.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import Analyse from '../../../common/components/screenComponents/analysingTemplate/Analyse.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';

type RouteProps = {
    code: string;
    nr: number;
};
const FakeScreen = ({ navigation }: any) => {
    useAndroidBackButton();
    const route = useRoute().params as RouteProps;
    const [item, setItem] = useState<RouteProps>({
        code: '',
        nr: -1,
    });
    const { postRequest } = useApiHeaders();

    useEffect(() => {
        const x = setTimeout(() => {
            setItem(route);
        }, 5000);
        return () => {
            clearTimeout(x);
            console.log('clear!!!!!');
        };
    }, []);

    useEffect(() => {
        if (item?.nr !== -1) {
            (async () => {
                const response = await postRequest('/fake', {
                    code: item.code,
                    result: item.nr,
                });
                console.log(response, 'fake response');
            })();
        }
    }, [item]);
    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            {item.nr === -1 && (
                <Analyse
                    navigation={navigation}
                    borderColor={Colors.black400}
                    iconName={'dataLoader'}
                    textTitle={'Analysing data'}
                    textContent={'Please wait'}
                    dots={true}
                    backBtn={false}
                    footerBtn={
                        <CustomTextButton
                            background={Colors.black300}
                            text={'Cancel'}
                            onPress={() => navigation.goBack()}
                        />
                    }
                />
            )}
            {item.nr === 1 && (
                <Analyse
                    navigation={navigation}
                    borderColor={Colors.error}
                    iconName={'dataLow'}
                    textTitle={'Low Confidence!'}
                    textContent={'Item is probably fake.'}
                    dots={false}
                    backBtn={true}
                />
            )}
            {item.nr === 2 && (
                <Analyse
                    navigation={navigation}
                    borderColor={Colors.yellow100}
                    iconName={'dataMed'}
                    textTitle={'Medium Confidence!'}
                    textContent={'Further verification is needed.'}
                    dots={false}
                    backBtn={true}
                />
            )}
            {item.nr === 3 && (
                <Analyse
                    navigation={navigation}
                    borderColor={Colors.lime}
                    iconName={'dataHigh'}
                    textTitle={'High Confidence!'}
                    textContent={'Item is probably genuine.'}
                    dots={false}
                    backBtn={true}
                />
            )}
        </ScreenContainer>
    );
};

export default FakeScreen;
