import { Platform, StyleSheet, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import VehicleNameWithIcon from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import { useIsFocused } from '@react-navigation/native';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import FormComponent from '../../../common/components/forms/customForm/FormComponent.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';

const ClientScreen = ({ navigation }: any) => {
    const [res, setRes] = useState({});
    const [formFields, setFormFields] = useState([]);
    const { postRequest } = apiHeadersHook();
    const isFocused = useIsFocused();
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState('');
    const { changeScreen } = useChangeScreen();
    const { t } = useText();
    const [extraHeight, setExtraHeight] = useState(0);

    useEffect(() => {
        isFocused &&
            (async () => {
                const response = await postRequest(
                    '/novotradein/app/appraisal/customerFields',
                    {}
                );
                console.log(response.fields, 'response');
                if (response?.status === 'ok') {
                    let fields;
                    if (response.client !== null) {
                        console.log('client', response.client);
                        fields = response.fields.map((field: any) => {
                            return {
                                ...field,
                                value: response.client[field.name],
                            };
                        });
                        setFormFields(fields);
                    } else {
                        setFormFields(response.fields);
                    }
                    setRes(response);
                }
            })();
    }, []);

    const handleSave = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/updateCustomer',
            formData
        );
        if (response.status === 'ok') {
            changeScreen(response);
        }
    };
    const fields333 = [
        {
            name: 'title',
            placeholder: '',
            type: 'text',
            required: true,
            title: t('help.form.screen'),
        },
        {
            name: 'message',
            placeholder: '',
            type: 'textarea',
            required: true,
            title: t('help.form.error'),
            textarea: { rows: 5 },
        },
    ];

    return (
        // <ScreenContainer nav={}
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('client.title')}
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
            <KeyboardAwareScrollView
                onKeyboardDidShow={e => {
                    //@ts-ignore
                    setExtraHeight(e.endCoordinates.height);
                }}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps={'handled'}
                keyboardOpeningTime={0}
                extraScrollHeight={Platform.OS === 'android' ? extraHeight : 0}
                // extraScrollHeight={255}
                enableAutomaticScroll={true}>
                <View style={{ gap: h(24), flexGrow: 1 }}>
                    {/*//@ts-ignore*/}
                    <VehicleNameWithIcon name={res?.appraisal} />
                    {/*//@ts-ignore*/}
                    {res?.fields?.length && (
                        <FormComponent
                            fields={formFields}
                            // fields={fields333}
                            formData={data => {
                                setFormData(data);
                            }}
                            err={formError}
                            setErr={setFormError}
                        />
                    )}
                    <View style={styles.buttonContainer}>
                        <CustomTextButton
                            onPress={handleSave}
                            text={t('client.button')}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 0,
    },
});

export default ClientScreen;
