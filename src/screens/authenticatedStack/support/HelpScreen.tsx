import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import Icon from '../../../common/components/icons/Icon.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import FormComponent from '../../../common/components/forms/customForm/FormComponent.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';

const HelpScreen = ({ navigation }: any) => {
    const { t } = useText();
    const [extraHeight, setExtraHeight] = useState(0);
    const { postRequest } = useApiHeaders();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [formFields, setFormFields] = useState([
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
    ]);
    const [formData, setFormData] = useState({});

    useEffect(() => {}, []);
    const handleSendMessage = async () => {
        console.log('formData', formData);
        const response = await postRequest(
            '/novotradein/app/support',
            formData
        );
        console.log('response', response);
        setModalVisibility(true);
        if (response.status === 'ok') {
            setSuccessModal(true);
        } else {
            setSuccessModal(false);
        }
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('help.title')}
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
            <CustomModal
                isVisible={modalVisibility}
                title={
                    successModal
                        ? t('help.modals.success.title')
                        : t('help.modals.error.title')
                }
                buttons={[
                    {
                        title: successModal
                            ? t('help.modals.success.button')
                            : t('help.modals.error.button'),
                        onPress: () => {
                            successModal
                                ? navigation.goBack()
                                : setModalVisibility(false);
                        },
                    },
                ]}
                blueTitle={successModal ? true : false}>
                <View>
                    <Text style={styles.contentText}>
                        {successModal
                            ? t('help.modals.success.text')
                            : t('help.modals.error.text')}
                    </Text>
                </View>
            </CustomModal>
            <KeyboardAwareScrollView
                onKeyboardDidShow={e => {
                    //@ts-ignore
                    setExtraHeight(e.endCoordinates.height);
                }}
                showsVerticalScrollIndicator={false}
                keyboardOpeningTime={0}
                extraScrollHeight={Platform.OS === 'android' ? extraHeight : 0}
                enableOnAndroid={true}
                keyboardShouldPersistTaps={'handled'}
                enableAutomaticScroll={true}
                contentContainerStyle={[styles.screenContainer]}>
                <View style={{ gap: h(24), flexGrow: 1 }}>
                    <View style={styles.logoContainer}>
                        <Icon
                            icon={'logoNovotradeInNew'}
                            width={w(270)}
                            height={h(46)}></Icon>
                    </View>
                    <View>
                        <Text style={styles.contentTitle}>
                            {t('help.contentTitle')}
                        </Text>
                        <Text style={styles.contentText}>
                            {t('help.contentText')}
                        </Text>
                        <FormComponent
                            fields={formFields}
                            formData={setFormData}></FormComponent>
                        <View style={styles.formButtonContainer}>
                            <CustomTextButton
                                onPress={handleSendMessage}
                                text={t('help.form.button')}
                            />
                        </View>
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerText}>
                                {t('help.footerText')}
                            </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        marginTop: h(24),
        alignItems: 'center',
        marginBottom: h(72),
    },
    contentTitle: {
        ...commonFonts.boldText,
        color: Colors.skyBlue,
    },
    contentText: {
        ...commonFonts.regularTextSmall,
        marginVertical: h(16),
    },
    formButtonContainer: {
        marginTop: h(24),
    },
    footerTextContainer: {},
    footerText: {
        textAlign: 'center',
        marginVertical: h(16),
        ...commonFonts.regularTextSmall,
        color: Colors.metal,
    },
    screenContainer: {
        // flex: 1,
        // marginBottom: 10,
        // backgroundColor: Colors.white,
        // justifyContent: 'center',
        // height: '100%',
        // ...ST.scrollChild,
        // paddingBottom: h(300),
    },
});

export default HelpScreen;
