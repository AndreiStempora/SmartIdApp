import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import React, { useEffect, useState } from 'react';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomSelect from '../../../common/components/forms/formComponents/select/CustomSelect.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import CustomInput from '../../../common/components/forms/formComponents/inputs/customInput/CustomInput.tsx';
import CustomIconButton from '../../../common/components/buttons/buttonIcon/CustomIconButton.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import DefaultScannerComponent from '../../../common/components/camera/scanners/DefaultScannerComponent.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAppraisal,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import { Item } from '../selectVehicle/SelectVehicleScreen.tsx';

const ScanVinScreen = ({ navigation }: any) => {
    const [dealerships, setDealerships] = useState([]);
    const [formError, setFormError] = useState({
        error: '',
        message: '',
    });
    const [res, setRes] = useState({});
    const appraisal = useSelector(getAppraisal);
    const { getRequest, postRequest } = apiHeadersHook();
    const dispatch = useDispatch<AppDispatch>();
    const { changeScreen } = useChangeScreen();
    const [scannerIsOpened, setScannerIsOpened] = useState(false);
    const [vin, setVin] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        vin: '',
        dealership: '',
        odometer: '',
    });

    const { t } = useText();

    useEffect(() => {
        (async () => {
            try {
                const response = await getRequest(
                    '/novotradein/app/dealerships'
                );
                if (response.status === 'ok') {
                    setDealerships(response.dealerships);
                }
                console.log('dealerships', dealerships);
            } catch (error) {
                console.log('error', error);
            }
        })();
    }, []);

    useEffect(() => {
        // console.log('data', formData);
    }, [formData]);
    const handleOpenScanner = () => {
        setScannerIsOpened(!scannerIsOpened);
    };

    useEffect(() => {
        if (dealerships?.length) {
            setFormData(prev => ({
                ...prev, //@ts-ignore
                dealership: dealerships[0]?.id,
            }));
        }
    }, [dealerships]);

    const handleContinue = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/create',
            formData
        );
        if (response.status === 'ok') {
            setRes(response);
            dispatch(updateAppInfo({ appraisal: response.appraisal }));
            // changeScreen(response);
        }
        if (response.status === 'error') {
            setFormError(response);
            setShowModal(true);
        }
    };

    const handleCreateAppraisal = async () => {
        setShowModal(false);
        navigation.navigate('SelectVehicle', {
            ...formData,
        });
    };

    useEffect(() => {
        //@ts-ignore
        if (res.appraisal === appraisal) {
            //@ts-ignore
            changeScreen(res);
        }
    }, [appraisal]);

    return (
        <>
            {scannerIsOpened ? (
                <DefaultScannerComponent
                    handleOpenScanner={handleOpenScanner}
                    onScan={code => {
                        setVin(code);
                        setFormData(prev => ({
                            ...prev,
                            vin: code,
                        }));
                    }}
                />
            ) : (
                <ScreenContainer
                    nav={navigation}
                    header={
                        <HeaderComponent
                            title={t('scanVin.title')}
                            backBtn={false}
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
                        isVisible={showModal}
                        buttons={[
                            {
                                title: t('scanVin.modals.vinError.buttons.ok'),
                                onPress: () => handleCreateAppraisal(),
                            },
                            {
                                title: t(
                                    'scanVin.modals.vinError.buttons.cancel'
                                ),
                                onPress: () => setShowModal(false),
                            },
                        ]}
                        title={`Error: ${formError.error}`}>
                        <View>
                            <Text style={styles.modalText}>
                                {t('scanVin.modals.vinError.text')}
                            </Text>
                        </View>
                    </CustomModal>
                    <ScrollView
                        contentContainerStyle={styles.mainContainer}
                        scrollEnabled={false}>
                        {dealerships.length > 1 && (
                            <CustomSelect
                                data={dealerships}
                                label={t('scanVin.dealership')}
                                onChange={item => {
                                    // setSelectedDealership(item);
                                    setFormData((prev: any) => ({
                                        ...prev, //@ts-ignore
                                        dealership: item?.id,
                                    }));
                                }}
                            />
                        )}
                        <View style={styles.inputVin}>
                            <View style={styles.inputContainer}>
                                <CustomInput
                                    onChange={incomingVin => {
                                        setVin(incomingVin);
                                        setFormData(prev => ({
                                            ...prev,
                                            vin: vin,
                                        }));
                                    }}
                                    type={'text'}
                                    label={t('scanVin.vin')}
                                    value={vin}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <CustomIconButton
                                    onPress={handleOpenScanner}
                                    icon={'barcodeScanner'}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputContainer}>
                                <CustomInput
                                    value={formData.odometer}
                                    onChange={text => {
                                        setFormData(prev => ({
                                            ...prev,
                                            odometer: text,
                                        }));
                                    }}
                                    type={'number'}
                                    label={t('scanVin.odometer')}
                                />
                            </View>
                            <View style={styles.floatingText}>
                                <Text style={styles.text}>
                                    {t('scanVin.distanceUnit')}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.sendBtnContainer}>
                            <CustomTextButton
                                onPress={handleContinue}
                                text={t('scanVin.button')}
                            />
                        </View>
                    </ScrollView>
                </ScreenContainer>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        gap: h(16),
        // backgroundColor: 'red',
        flex: 1,
    },

    inputVin: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    buttonContainer: {
        // position: 'absolute',
        right: 0,
        // top: h(0.5),
        borderBottomWidth: h(2),
        borderBottomColor: Colors.white,
        height: h(58),
    },
    inputContainer: {
        flexGrow: 0,
        flexShrink: 1,
        // backgroundColor: Colors.white,
    },
    floatingText: {
        // backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        width: w(56),
        top: 0,
        justifyContent: 'center',
        height: '100%',
        pointerEvents: 'none',
    },
    text: {
        ...commonFonts.regularTitle,
        textAlign: 'center',
    },
    sendBtnContainer: {
        marginTop: 'auto',
    },
    modalText: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
});

export default ScanVinScreen;
