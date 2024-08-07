import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import { Name } from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import CustomRadioList from '../../../common/components/forms/formComponents/radioList/CustomRadioList.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';
import { Item } from '../../../common/components/forms/formComponents/radioList/RadioItem.tsx';
import VehicleNameWithIcon from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import { useIsFocused } from '@react-navigation/native';
import useText from '../../../common/services/hooks/textHook.tsx';

const TrimsScreen = ({ navigation }: any) => {
    const [selectedRadioItem, setSelectedRadioItem] = useState([{}]);
    const [radioError, setRadioError] = useState(false);
    const { postRequest } = apiHeadersHook();
    const [res, setRes] = useState();
    const onFocused = useIsFocused();
    const [name, setName] = useState({
        year: '',
        make: '',
        model: '',
        trim: '',
        style: '',
    } as Name);
    const [trims, setTrims] = useState([]);
    const { changeScreen, backButton } = useChangeScreen();
    const { t } = useText();

    useEffect(() => {
        //@ts-ignore
        onFocused &&
            (async () => {
                const response = await postRequest(
                    '/novotradein/app/appraisal/getTrims',
                    {}
                );
                if (response.status === 'ok') {
                    setName(response.appraisal);
                    setTrims(response.trims);
                    setRes(response);
                }
            })();
    }, [onFocused]);

    useEffect(() => {
        if (trims.length > 0) {
            setSelectedRadioItem(
                trims?.filter((i: Item) => i.selected === true)
            );
        }
    }, [trims]);

    useEffect(() => {
        if (selectedRadioItem?.length > 0) {
            setRadioError(false);
        }
    }, [selectedRadioItem]);

    const handleContinue = async () => {
        if (selectedRadioItem?.length === 0) {
            setRadioError(true);
            return;
        }
        const response = await postRequest(
            '/novotradein/app/appraisal/updateTrim',
            {
                //@ts-ignore
                trim: selectedRadioItem[0].id,
            }
        );
        if (response.status === 'ok') {
            changeScreen(response);
        }
    };

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('trims.title')}
                    backBtn={false}
                    //@ts-ignore
                    leftSide={backButton(res)}
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
            <VehicleNameWithIcon name={name} />
            <ScrollView
                // scrollEnabled={false}
                style={styles.mainContainer}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: h(16) }}>
                {trims.length > 0 && (
                    <CustomRadioList
                        error={radioError}
                        list={trims}
                        onChange={newList => {
                            setSelectedRadioItem(
                                newList.filter(i => i.selected === true)
                            );
                        }}
                    />
                )}
            </ScrollView>
            <View style={styles.sendBtnContainer}>
                <CustomTextButton
                    onPress={handleContinue}
                    text={t('trims.button')}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'white',
    },
    nameContainer: {
        flexDirection: 'row',
        gap: w(16),
        alignItems: 'center',
    },
    carName: {
        ...commonFonts.boldTitle,
    },
    blueText: {
        color: Colors.skyBlue,
    },
    sendBtnContainer: {
        marginTop: 'auto',
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    },
});
export default TrimsScreen;
