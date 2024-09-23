import { StyleSheet, View, Image, Text, Keyboard } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormComponent from '../../../common/components/forms/customForm/FormComponent.tsx';
import DeviceInfo from 'react-native-device-info';
import { updateAppInfo } from '../../../common/store/slices/appSlice.tsx';
import { useDispatch } from 'react-redux';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../common/components/screenComponents/toasts/CustomToast.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';

const LoginScreen = ({ navigation }: any) => {
    const bundleId = DeviceInfo.getBundleId();
    const { postRequest } = useApiHeaders();
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState('');
    const formFields = [
        {
            name: 'user',
            placeholder: '',
            type: 'text',
            required: true,
            title: 'Username',
        },
        {
            name: 'password',
            placeholder: '',
            type: 'password',
            required: true,
            title: 'Password',
        },
    ];
    const version = DeviceInfo.getVersion();

    const handleForm = async () => {
        Keyboard.dismiss();
        const response = await postRequest('/login', formData);
        console.log('response', response);
        if (response?.status !== 'ok') {
            setFormError(response.status);
        } else {
            dispatch(
                updateAppInfo({ token: response.token, stack: 'authenticated' })
            );
        }
    };

    useEffect(() => {}, [formError]);
    return (
        <ScreenContainer nav={navigation} removeBg={true}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.screenContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        style={{
                            width: h(100),
                            height: h(62),
                            resizeMode: 'contain',
                        }}
                        source={require('../../../../assets/images/logo.png')}
                    />
                    <Text style={styles.title}>
                        {bundleId.split('.').slice(-1).pop()}
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <FormComponent
                        fields={formFields}
                        formData={data => {
                            setFormData(data);
                        }}
                        err={formError}
                        setErr={setFormError}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomTextButton
                        onPress={handleForm}
                        text={'submit'}
                        stretch={false}
                        iconRight={true}
                        icon={'boldLogin'}
                    />
                </View>
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>
                        {bundleId.split('.').slice(-1).pop()} {version}
                    </Text>
                </View>
                <Toast config={toastConfig} />
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
        marginTop: h(82),
        alignItems: 'center',
        marginBottom: h(64),
    },
    formContainer: {
        marginBottom: h(64),
    },
    title: {
        marginTop: h(48),
        textTransform: 'capitalize',
        ...commonFonts.boldText,
        fontSize: h(18),
    },
    screenContainer: {
        // flex: 1,
        // marginBottom: 10,
        // justifyContent: 'center',
        // ...ST.scrollChild,
        minHeight: '100%',
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
    versionContainer: {
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: h(24),
    },
    versionText: {
        textAlign: 'center',
        ...commonFonts.regularTitle,
        textTransform: 'capitalize',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: h(16),
    },
});
export default LoginScreen;
