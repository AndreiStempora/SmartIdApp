import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../common/store/store.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import Icon from '../../../common/components/icons/Icon.tsx';
import FormComponent from '../../../common/components/forms/customForm/FormComponent.tsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';

import { updateAppInfo } from '../../../common/store/slices/appSlice.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import { updateTranslation } from '../../../common/store/slices/translationSlice.tsx';

type Field = {
    name: string;
    placeholder: string;
    type: string;
    required: boolean;
    title: string;
};

const LoginScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({});
    const { postRequest } = useApiHeaders();
    const { t, texts } = useText();
    const [formError, setFormError] = useState('');
    const [formFields, setFormFields] = useState<Field[]>([]);

    useEffect(() => {
        (async () => {
            const response = await postRequest('/languages/details', {});
            if (response.status === 'ok') {
                dispatch(
                    updateTranslation(
                        response.language['novosteer-tradein-app']
                    )
                );
            }
        })();
    }, []);

    useEffect(() => {
        if (texts?.login?.formFields?.user?.length) {
            setFormFields([
                {
                    name: 'user',
                    placeholder: '',
                    type: 'text',
                    required: true,
                    title: t('login.formFields.user'),
                },
                {
                    name: 'password',
                    placeholder: '',
                    type: 'password',
                    required: true,
                    title: t('login.formFields.password'),
                },
            ]);
        }
    }, [texts]);

    const handleLogin = async () => {
        const response = await postRequest('/novotradein/app/login', formData);
        if (response.status !== 'ok') {
            setFormError(t('login.formErrorTitle'));
        } else {
            dispatch(
                updateAppInfo({ token: response.token, stack: 'authenticated' })
            );
        }
    };

    const handleBackToDealership = () => {
        dispatch(updateAppInfo({ stack: 'dealership' }));
    };

    return (
        <ScreenContainer nav={navigation}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.screenContainer}>
                <View style={styles.logoContainer}>
                    <Icon
                        icon={'logoNovotradeInNew'}
                        width={w(270)}
                        height={h(46)}
                    />
                </View>
                <View style={{ marginBottom: h(32) }}>
                    {formFields?.length > 0 && (
                        <FormComponent
                            fields={formFields}
                            formData={data => {
                                setFormData(data);
                            }}
                            err={formError}
                            setErr={setFormError}
                        />
                    )}
                </View>
                <View style={styles.buttonsContainer}>
                    <CustomTextButton
                        onPress={handleLogin}
                        text={t('login.signIn')}
                    />
                    <TouchableOpacity
                        onPress={handleBackToDealership}
                        // activeOpacity={1}
                    >
                        <Text style={styles.backToDealershipBtn}>
                            {t('login.backToDealership')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: h(96),
    },
    screenContainer: {
        flex: 1,
        marginBottom: 10,
        justifyContent: 'center',
        // ...ST.scrollChild,
    },
    screenContent: {
        justifyContent: 'center',
        flex: 1,
    },
    buttonsContainer: {
        gap: h(8),
    },
    backToDealershipBtn: {
        ...commonFonts.boldTitle,
        color: Colors.skyBlue,
        textAlign: 'center',
        paddingVertical: h(14),
    },
});
export default LoginScreen;
