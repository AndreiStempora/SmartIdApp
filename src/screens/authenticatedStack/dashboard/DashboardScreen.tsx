import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import ItemWithIcon from '../../../common/components/Items/itemWithIcon/ItemWithIcon.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import {
    getApp,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../../common/components/icons/Icon.tsx';
import UserIcon from '../../../common/components/smallComponents/user/UserIcon.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';

const DashboardScreen = ({ navigation }: any) => {
    const { getRequest } = apiHeadersHook();
    const dispatch = useDispatch<AppDispatch>();
    const [elements, setElements] = useState<{ section: string }[]>([]);
    const { t } = useText();

    useEffect(() => {
        (async () => {
            // try {
            const response = await getRequest('/novotradein/app/dashboard');
            if (response.status === 'ok') {
                setElements(response.dashboard);
            }
            dispatch(updateAppInfo({ appraisal: '', searchWord: '' }));
            // } catch (error) {
            //     console.log('error', error);
            // }
            // console.log(
            //     'texts',
            //     texts,
            //     await getItemFromStorage('translation')
            // );
        })();
    }, []);

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('dashboard.title')}
                    backBtn={false}
                    leftSide={<UserIcon nav={navigation} />}
                />
            }>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Icon
                        icon={'novotradeinLogo'}
                        width={w(252)}
                        height={h(38)}
                    />
                </View>
                <FlatList
                    style={{
                        flexGrow: 0,
                    }}
                    data={elements}
                    //@ts-ignore
                    renderItem={({ item }) => {
                        if (item.section === 'scanvin') {
                            return (
                                <ItemWithIcon
                                    onPress={() => {
                                        navigation.navigate('ScanVin');
                                    }}
                                    icon={'barcodeScanner'}
                                    name={t('dashboard.buttons.scan')}
                                />
                            );
                        }
                        if (item.section === 'select') {
                            return (
                                <ItemWithIcon
                                    onPress={() => {
                                        navigation.navigate(
                                            'SelectVehicle',
                                            {}
                                        );
                                    }}
                                    icon={'vehicle'}
                                    name={t('dashboard.buttons.select')}
                                />
                            );
                        }
                        if (item.section === 'browse') {
                            return (
                                <ItemWithIcon
                                    onPress={() => {
                                        navigation.navigate('BrowseAppraisals');
                                    }}
                                    icon={'search'}
                                    name={t('dashboard.buttons.browse')}
                                />
                            );
                        }
                        if (item.section === 'support') {
                            return (
                                <ItemWithIcon
                                    onPress={() => {
                                        navigation.navigate('Help');
                                    }}
                                    icon={'help'}
                                    name={t('dashboard.buttons.help')}
                                />
                            );
                        }
                    }}
                    keyExtractor={item => item.section}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    logoContainer: {
        position: 'absolute',
        top: h(48),
        width: '100%',
        alignItems: 'center',
        marginBottom: h(96),
    },
});

export default DashboardScreen;
