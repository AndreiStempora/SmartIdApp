import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { w } from '../../../common/styles/PixelPerfect.tsx';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import React, { useEffect, useState } from 'react';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import { useSelector } from 'react-redux';
import { getAppraisal } from '../../../common/store/slices/appSlice.tsx';
import { Name } from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import CustomCheckList from '../../../common/components/forms/formComponents/checkList/CustomCheckList.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';
import VehicleNameWithIcon from '../../../common/components/smallComponents/vehicle/VehicleNameWithIcon.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
const OptionsScreen = ({ navigation }: any) => {
    const appraisal = useSelector(getAppraisal);
    const [name, setName] = useState<Name>({
        year: '',
        make: '',
        model: '',
        trim: '',
        style: '',
    });
    const [options, setOptions] = useState([]);
    const { postRequest } = apiHeadersHook();
    const { changeScreen } = useChangeScreen();
    const { t } = useText();

    useEffect(() => {
        (async () => {
            const response = await postRequest(
                '/novotradein/app/appraisal/getOptions',
                { appraisal: appraisal }
            );
            console.log('response', response);
            if (response.status === 'ok') {
                setName(response.appraisal);
                setOptions(response.options);
            }
        })();
    }, []);

    const handleContinue = async () => {
        const selectedOptions = options.filter((i: any) => i.selected === true);
        const optionsString = selectedOptions.map((i: any) => i.id).join(',');

        const response = await postRequest(
            '/novotradein/app/appraisal/updateOptions',
            { appraisal: appraisal, options: optionsString }
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
                    title={t('options.title')}
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
            <VehicleNameWithIcon name={name} />
            <ScrollView
                style={styles.mainContainer}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.elementsContainer}>
                    {options.length > 0 && (
                        <CustomCheckList
                            list={options}
                            onChange={list => {
                                //@ts-ignore
                                setOptions(list);
                            }}
                        />
                    )}
                </View>
            </ScrollView>
            <View style={styles.sendBtnContainer}>
                <CustomTextButton
                    onPress={handleContinue}
                    text={t('options.button')}
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
    elementsContainer: {
        marginBottom: w(16),
    },
});

export default OptionsScreen;
