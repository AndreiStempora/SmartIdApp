import { FlatList } from 'react-native';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import VehicleNameWithIcon, {
    Name,
} from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import { useIsFocused } from '@react-navigation/native';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import ReconDrawerItem, { Recon } from './components/ReconDrawerItem.tsx';
import ReconModal from './components/ReconModal.tsx';
import useRecon from '../../../common/services/hooks/reconHook.tsx';
import ReconModalContent from './components/ReconModalContent.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';

type ResponseProps = {
    appraisal: Name;
    recon: Recon[];
};
const ReconScreen = ({ navigation }: any) => {
    const [res, setRes] = useState<ResponseProps>();
    const isFocused = useIsFocused();
    const { postRequest } = apiHeadersHook();
    const { reconList, setRecons, openedModal, switchOpenedModal, item } =
        useRecon();
    const { t } = useText();

    useEffect(() => {
        isFocused &&
            (async () => {
                const response = await postRequest(
                    '/novotradein/app/appraisal/recon',
                    {}
                );
                if (response.status === 'ok') {
                    setRes(response);
                    setRecons(response.recon);
                }
            })();
    }, [isFocused]);

    const determineIcon = (name: string) => {
        switch (name) {
            case 'Exterior':
                return 'garage';
            case 'Interior':
                return 'steeringWheel';
            case 'Mechanical':
                return 'tools';
            case 'Under Hood':
                return 'battery';
            case 'Transport':
                return 'box';
            default:
                return 'garage';
        }
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('recon.title')}
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
            <ReconModal
                isVisible={openedModal}
                buttons={[
                    {
                        title: t('recon.modals.item.buttons.close'),
                        onPress: () => {
                            switchOpenedModal();
                        },
                    },
                ]}>
                {item && <ReconModalContent nav={navigation} />}
            </ReconModal>
            <VehicleNameWithIcon name={res?.appraisal} />

            <FlatList
                data={reconList}
                renderItem={({ item, index }) => {
                    return (
                        <ReconDrawerItem
                            recon={item}
                            i={index}
                            icon={determineIcon(item.name)}
                        />
                    );
                }}
            />
        </ScreenContainer>
    );
};

export default ReconScreen;
