import { FlatList, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import VehicleNameWithIcon, {
    Name,
} from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import ListItem from '../../../common/components/smallComponents/listItem/ListItem.tsx';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import ItemWithIcon from '../../../common/components/Items/itemWithIcon/ItemWithIcon.tsx';
import { useIsFocused } from '@react-navigation/native';
import useRecon from '../../../common/services/hooks/reconHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getApp,
    getAppraisalDeletedModalVisibility,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';

const DetailsScreen = ({ navigation }: any) => {
    const { postRequest } = apiHeadersHook();
    const [res, setRes] = useState({
        sections: [],
        details: [],
        appraisal: {} as Name,
    });
    const [elements, setElements] = useState([]);
    const [showBackBtn, setShowBackBtn] = useState(false);
    const isFocused = useIsFocused();
    const { reset } = useRecon();
    const showModal = useSelector(getAppraisalDeletedModalVisibility);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useText();
    const app = useSelector(getApp);

    useEffect(() => {
        isFocused &&
            (async () => {
                console.log('details focused', app);
                const response = await postRequest(
                    '/novotradein/app/appraisal/details',
                    {}
                );
                if (response?.status === 'ok') {
                    setRes(response);
                }
                decideBackBtn();
            })();
    }, [isFocused]);

    useEffect(() => {
        if (res?.sections?.length > 0) {
            const el = res.sections.map((section: any) => {
                if (section.section === 'images') {
                    return {
                        icon: 'image',
                        name: t('details.sections.images'),
                        press: () => {
                            navigation.navigate('Images');
                        },
                    };
                }
                if (section.section === 'info') {
                    return {
                        icon: 'info',
                        name: t('details.sections.info'),
                        press: () => {
                            navigation.navigate('Info');
                        },
                    };
                }
                if (section.section === 'market') {
                    return {
                        icon: 'monitoring',
                        name: t('details.sections.market'),
                        press: () => {
                            navigation.navigate('Market');
                        },
                    };
                }
                if (section.section === 'obd') {
                    return {
                        icon: 'troubleshoot',
                        name: t('details.sections.obd'),
                        press: () => {
                            navigation.navigate('Obd');
                        },
                    };
                }
                if (section.section === 'recon') {
                    return {
                        icon: 'vehicleOptions',
                        name: t('details.sections.recon'),
                        press: () => {
                            reset();
                            navigation.navigate('Recon');
                        },
                    };
                }
                if (section.section === 'client') {
                    return {
                        icon: 'accountSettings',
                        name: t('details.sections.client'),
                        press: () => {
                            navigation.navigate('Client');
                        },
                    };
                }
                if (section.section === 'trims') {
                    return {
                        icon: 'style',
                        name: t('details.sections.trims'),
                        press: () => {
                            navigation.navigate('Trims');
                        },
                    };
                }
                if (section.section === 'options') {
                    return {
                        icon: 'vehicleRepair',
                        name: t('details.sections.options'),
                        press: () => {
                            navigation.navigate('Options');
                        },
                    };
                }
            });
            //@ts-ignore
            setElements(el);
        }
    }, [res]);

    const decideBackBtn = () => {
        //@ts-ignore
        const routes = navigation.getState().routes;
        // console.log(routes, 'routes');
        if (
            routes[routes.length - 1].name === 'Details' &&
            routes[routes.length - 2].name === 'BrowseAppraisals'
        ) {
            // console.log('show back btn');
            setShowBackBtn(true);
        } else {
            // console.log('hide back btn');
            setShowBackBtn(false);
        }
    };

    const handleAppraisalDeleted = () => {
        // console.log('appraisal deleted');
        dispatch(updateAppInfo({ appraisalDeletedModalVisibility: false }));
        navigation.navigate('Dashboard');
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('details.title')}
                    backBtn={showBackBtn}
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
                title={t('details.modals.error.title')}
                buttons={[
                    {
                        title: t('details.modals.error.button'),
                        onPress: handleAppraisalDeleted,
                    },
                ]}>
                <View>
                    <Text style={styles.modalText}>
                        {t('details.modals.error.text')}
                    </Text>
                </View>
            </CustomModal>
            <View style={styles.mainContainer}>
                <View>
                    <VehicleNameWithIcon name={res?.appraisal} />
                    <FlatList
                        style={styles.listItemsContainer}
                        scrollEnabled={false}
                        data={res?.details}
                        renderItem={({ item }) => {
                            return (
                                <ListItem
                                    name={item.title}
                                    value={item.value}
                                />
                            );
                        }}
                        ItemSeparatorComponent={() => (
                            <View style={styles.separator}></View>
                        )}
                        keyExtractor={(item: any) => item.title}
                    />
                </View>
                <FlatList
                    style={styles.navigationListContainer}
                    data={elements}
                    scrollEnabled={true}
                    renderItem={({ item }) => {
                        return (
                            <ItemWithIcon
                                onPress={item.press}
                                icon={item.icon}
                                name={item.name}
                            />
                        );
                    }}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator}></View>
                    )}
                    keyExtractor={(item: any) => item.name}
                />
                {/*</View>*/}
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    listItemsContainer: {
        marginTop: h(24),
    },
    navigationListContainer: {
        marginTop: h(24),
    },
    scrollListContainer: {},
    mainContainer: {
        height: '100%',
    },
    modalText: {
        ...commonFonts.regularTextSmall,
    },
});

export default DetailsScreen;
