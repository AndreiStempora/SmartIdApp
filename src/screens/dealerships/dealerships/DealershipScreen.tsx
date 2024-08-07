import { FlatList, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import CustomScrollContainerCenter from '../../../common/components/screenComponents/containers/CustomScrollContainerCenter.tsx';
import React, { useState } from 'react';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { useDispatch, useSelector } from 'react-redux';
import CustomDealershipItem from '../../../common/components/Items/customDealershipItem/CustomDealershipItem.tsx';
import {
    getAppDealerships,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';

const DealershipScreen = ({ navigation }: any) => {
    const dealerships = useSelector(getAppDealerships);
    const { t } = useText();
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const dispatch = useDispatch<AppDispatch>();
    const handleAddDealership = () => {
        navigation.navigate('DealershipScanner');
    };
    const [visibleModal, setVisibleModal] = React.useState(false);

    const handleDeleteDealership = () => {
        console.log(dealerships, 'dealerships');
        console.log(deleteIndex, 'deleteIndex');
        const newList = dealerships.filter(
            (item, index) => index !== deleteIndex
        );
        dispatch(updateAppInfo({ dealerships: newList }));
        setVisibleModal(false);
    };
    const handleCancelDelete = () => {
        setVisibleModal(false);
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('dealerships.title')}
                    backBtn={false}
                />
            }>
            <CustomModal
                buttons={[
                    {
                        title: t('dealerships.modals.delete.buttons.yes'),
                        onPress: () => handleDeleteDealership(),
                    },
                    {
                        title: t('dealerships.modals.delete.buttons.no'),
                        onPress: () => handleCancelDelete(),
                    },
                ]}
                isVisible={visibleModal}
                title={t('dealerships.modals.delete.title')}>
                <View>
                    <Text style={styles.modalText}>
                        {t('dealerships.modals.delete.content')}
                    </Text>
                </View>
            </CustomModal>
            <CustomScrollContainerCenter>
                <View>
                    {dealerships.length > 0 && (
                        <>
                            <Text style={styles.text}>
                                {t('dealerships.text')}
                            </Text>

                            <FlatList
                                data={dealerships}
                                scrollEnabled={false}
                                style={{ flexGrow: 0, marginBottom: h(24) }}
                                renderItem={({ item, index }) => (
                                    <CustomDealershipItem
                                        item={item}
                                        index={index}
                                        openModal={setVisibleModal}
                                        getActiveElement={(ind, ref) => {
                                            ref.close();
                                            setDeleteIndex(ind);
                                        }}
                                    />
                                )}
                                keyExtractor={item => item.dealership}
                                ItemSeparatorComponent={() => (
                                    <View style={styles.separator} />
                                )}
                            />
                        </>
                    )}
                </View>

                <CustomTextButton
                    onPress={handleAddDealership}
                    text={t('dealerships.button')}
                />
            </CustomScrollContainerCenter>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    modalText: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    text: {
        ...commonFonts.regularTextSmall,
        marginBottom: h(24),
    },
});
export default DealershipScreen;
