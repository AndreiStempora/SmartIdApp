import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ScreenContainer from '../../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderUnselectable from '../../../../common/components/screenComponents/bars/headers/reusableHeaders/HeaderUnselectable.tsx';
import CustomRoundButton from '../../../../common/components/buttons/buttonIcon/CustomRoundButton.tsx';
import handleImagesHook from '../../../../common/services/hooks/handleImagesHook.tsx';
import CustomItemButton from '../../../../common/components/Items/customItemButton/CustomItemButton.tsx';
import { Vehicle } from '../../../../common/tsTypes/commonTypes.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { useIsFocused } from '@react-navigation/native';
import apiHeadersHook from '../../../../common/services/hooks/apiHeadersHook.tsx';
import CustomTabBar from '../../../../common/components/screenComponents/bars/tabBars/CustomTabBar.tsx';
import CustomFooterIconButton from '../../../../common/components/buttons/buttonIcon/CustomFooterIconButton.tsx';
import {
    getIsSelectable,
    getSelectedVehicles,
} from '../../../../common/store/slices/selectedVehiclesSlice.tsx';
import MainModal from './modals/MainModal.tsx';
import { useNetInfo } from '@react-native-community/netinfo';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import SelectableButton from '../../../../common/components/buttons/selectableButton/SelectableButton.tsx';

const VehiclesScreen = ({ navigation }: any) => {
    const buttons = [
        { title: 'Good', color: 'green' },
        { title: 'Fair1', color: 'yellow' },
        { title: 'Fair2', color: 'orange' },
        { title: 'Shit', color: 'red' },
    ];
    const [user, setUser] = useState({ firstName: '?', lastName: '' });
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(
        'errorReport' as
            | 'delete'
            | 'upload'
            | 'report'
            | 'selectError'
            | 'wifiError'
            | 'internetError'
            | 'errorReport'
    );
    const { readDomainFolder, readFile } = handleImagesHook();

    const [cars, setCars] = useState<Vehicle[]>([]);
    const { getRequest } = apiHeadersHook();
    const isSelectable = useSelector(getIsSelectable);
    const selectedVehicles = useSelector(getSelectedVehicles);
    const isFocused = useIsFocused();
    const { type, isConnected } = useNetInfo();
    const { width, height } = Dimensions.get('window');
    useEffect(() => {
        isFocused &&
            (async () => {
                console.log(width, height, h(20), w(20));
                const response = await getRequest('/novocapture/user');
                if (response?.status === 'ok') {
                    setUser(response.user);
                }

                const domainFolder = await readDomainFolder();
                // await deleteFolder('file:');

                if (domainFolder?.length) {
                    const elements = domainFolder.map(async (folder: any) => {
                        const element = await readFile(folder);
                        return element.car;
                    });
                    const list = await Promise.all(elements);
                    setCars(list);
                }
            })();
    }, [isFocused]);

    const handleAddBtn = () => {
        navigation.navigate('AddVehicle');
    };

    const deleteCars = async () => {
        if (selectedVehicles.length === 0) {
            setModalType('selectError');
            setShowModal(true);
            return;
        }

        setModalType('delete');
        setShowModal(true);
    };
    const upload = () => {
        if (selectedVehicles.length === 0) {
            setModalType('selectError');
            setShowModal(true);
            return;
        }

        if (!isConnected) {
            setModalType('internetError');
            setShowModal(true);
            return;
        }

        if (type === 'cellular') {
            setModalType('wifiError');
            setShowModal(true);
            return;
        }

        setModalType('upload');
        setShowModal(true);
    };

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderUnselectable
                    title={'Vehicles'}
                    user={user}
                    nav={navigation}
                />
            }
            footer={
                isSelectable && (
                    <CustomTabBar>
                        <CustomFooterIconButton
                            onPress={deleteCars}
                            icon={'trashcanIcon'}
                        />
                        <CustomFooterIconButton
                            onPress={upload}
                            icon={'uploadIcon'}
                        />
                    </CustomTabBar>
                )
            }>
            <SelectableButton buttons={buttons} />
            <SelectableButton buttons={buttons} />
            <SelectableButton buttons={buttons} />
            <SelectableButton buttons={buttons} />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    fullView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 2,
        backgroundColor: Colors.gray,
    },
    textContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...commonFonts.regularTitle,
        marginBottom: h(24),
        textAlign: 'center',
    },
});

export default VehiclesScreen;
