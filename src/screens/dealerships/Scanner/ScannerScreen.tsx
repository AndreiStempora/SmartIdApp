import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomScanner, {
    QRCodes,
} from '../../../common/components/camera/CustomScanner.tsx';
import CustomTextTabBar from '../../../common/components/screenComponents/bars/tabBars/CustomTextTabBar.tsx';
import {
    getAppDealerships,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../common/store/store.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import { commonFonts } from '../../../common/styles/constants.tsx';

const ScannerScreen = ({ navigation }: any) => {
    const [code, setCode] = useState<QRCodes>();
    const dealerships = useSelector(getAppDealerships);
    const dispatch = useDispatch<AppDispatch>();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [duplicateModalVisible, setDuplicateModalVisible] = useState(false);
    const { t } = useText();
    const scanHandler = (codes: QRCodes) => {
        if (codes[0].value !== code?.value) {
            setCode(codes[0]);
        }
    };

    useEffect(() => {
        try {
            if (code?.value) {
                // console.log('Scanned code:', code.value);
                const decoded = JSON.parse(code.value);
                if (decoded.type === 'NovoTrade-in') {
                    if (
                        !dealerships.some(
                            item => item.dealership === decoded.dealership
                        )
                    ) {
                        dispatch(
                            updateAppInfo({
                                dealerships: [...dealerships, decoded],
                            })
                        );
                        navigation.goBack();
                    } else {
                        console.log(
                            'Duplicate dealership found, not adding the new item.'
                        );
                        setDuplicateModalVisible(true);
                    }
                }
            }
        } catch (e) {
            setErrorModalVisible(true);
        }
    }, [code]);

    return (
        <ScreenContainer
            nav={navigation}
            header={<HeaderComponent backBtn={true} />}
            fullScreen
            removeBg
            footer={<CustomTextTabBar text={t('dealershipScanner.text')} />}>
            <CustomModal
                isVisible={errorModalVisible}
                setIsVisible={() => {}}
                buttons={[
                    {
                        title: t('dealershipScanner.modals.error.button'),
                        onPress: () => {
                            setErrorModalVisible(false);
                        },
                    },
                ]}
                title={t('dealershipScanner.modals.error.title')}>
                <View>
                    <Text style={styles.text}>
                        {t('dealershipScanner.modals.error.text')}
                    </Text>
                </View>
            </CustomModal>
            <CustomModal
                isVisible={duplicateModalVisible}
                setIsVisible={() => {}}
                buttons={[
                    {
                        title: t('dealershipScanner.modals.duplicate.button'),
                        onPress: () => {
                            setDuplicateModalVisible(false);
                        },
                    },
                ]}
                title={t('dealershipScanner.modals.duplicate.title')}>
                <View>
                    <Text style={styles.text}>
                        {t('dealershipScanner.modals.duplicate.text')}
                    </Text>
                </View>
            </CustomModal>
            <View style={styles.scannerContainer}>
                <CustomScanner onCodeScanned={scanHandler} scanTypes={['qr']} />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    scannerContainer: {
        flex: 1,
        // backgroundColor:'red'
    },
    text: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
});
export default ScannerScreen;
