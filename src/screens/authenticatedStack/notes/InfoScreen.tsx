import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import VehicleNameWithIcon, {
    Name,
} from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import CustomSelect from '../../../common/components/forms/formComponents/select/CustomSelect.tsx';
import CustomInput from '../../../common/components/forms/formComponents/inputs/customInput/CustomInput.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';

const InfoScreen = ({ navigation }: any) => {
    const { postRequest, getRequest } = apiHeadersHook();
    const { changeScreen } = useChangeScreen();
    const [res, setRes] = useState({
        appraisal: {} as Name,
        info: { category: '', note: '' },
    });
    const { t } = useText();
    const [cats, setCats] = useState([]);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        (async () => {
            const response = await postRequest(
                '/novotradein/app/appraisal/info',
                {}
            );
            if (response.status === 'ok') {
                setRes(response);
            }
            const catsResponse = await getRequest(
                '/novotradein/app/appraisal/categories'
            );
            if (catsResponse.status === 'ok') {
                setCats(catsResponse.categories);
            }
        })();
    }, []);

    const getIndex = () => {
        const result = cats.findIndex((el: any) => el.id === res.info.category);
        if (result !== -1) {
            return Number(result);
        } else {
            console.log('else');
            return -1;
        }
    };

    const handleSave = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/update',
            formData
        );
        if (response.status === 'ok') {
            changeScreen(response);
        }
        console.log(response, 'response', formData, 'form sent');
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('info.title')}
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
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <VehicleNameWithIcon name={res?.appraisal} />
                <View style={styles.formContainer}>
                    {cats.length > 0 && (
                        <CustomSelect
                            label={t('info.source')}
                            onChange={el => {
                                if (el !== undefined) {
                                    setFormData(prev => {
                                        // @ts-ignore
                                        return { ...prev, category: el.id };
                                    });
                                }
                            }}
                            selectedIndex={getIndex()}
                            data={cats}
                        />
                    )}
                    <CustomInput
                        value={res.info.note}
                        multiline={'7'}
                        onChange={val => {
                            setFormData(prev => {
                                return { ...prev, note: val };
                            });
                        }}
                        type={'textarea'}
                        label={t('info.notes')}
                    />
                </View>
                <View style={{ marginTop: 'auto' }}>
                    <CustomTextButton
                        onPress={handleSave}
                        text={t('info.button')}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        gap: h(16),
        marginVertical: h(24),
    },
});

export default InfoScreen;
