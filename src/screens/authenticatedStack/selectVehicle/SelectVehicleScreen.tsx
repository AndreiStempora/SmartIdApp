import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useState } from 'react';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import CustomSelect from '../../../common/components/forms/formComponents/select/CustomSelect.tsx';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import { useRoute } from '@react-navigation/native';
import CustomInput from '../../../common/components/forms/formComponents/inputs/customInput/CustomInput.tsx';
import { commonFonts } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import {
    getAppraisal,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../common/store/store.tsx';
import useChangeScreen from '../../../common/services/hooks/changeScreenHook.tsx';

export type Item = {
    id: number | string;
    name: string;
};

type FormData = {
    vin: string;
    odometer: string;
    dealership: number;
    year: number;
    make: string | number;
    model: string | number;
    trim: string | number;
};
const SelectVehicleScreen = ({ navigation }: any) => {
    const { t } = useText();
    const [res, setRes] = useState({});
    const { getRequest, postRequest } = apiHeadersHook();
    const [dealerships, setDealerships] = useState([]);
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const route = useRoute<any>();
    const { changeScreen } = useChangeScreen();
    const appraisal = useSelector(getAppraisal);
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState<FormData>({
        vin: '',
        odometer: '',
        dealership: -1,
        year: -1,
        make: -1,
        model: -1,
        trim: -1,
    });

    useEffect(() => {
        (async () => {
            try {
                replacePreviousValues();
                // console.log('route', route.params.dealership);
                const response = await getRequest(
                    '/novotradein/app/dealerships'
                );
                if (response.status === 'ok') {
                    setDealerships(response.dealerships);
                    if (response.dealerships.length === 1) {
                        setFormData(prev => ({
                            ...prev,
                            dealership: response.dealerships[0].id,
                        }));
                        await getYears();
                    }
                }
            } catch (error) {
                console.log('error', error);
            }
            if (route.params?.dealership) {
                await getYears();
            }
        })();
    }, []);

    const replacePreviousValues = () => {
        console.log('route', route.params);
        setFormData({
            ...formData,
            vin: route.params?.vin ?? '',
            odometer: route.params?.odometer ?? '',
            dealership: route.params?.dealership ?? -1,
        });
    };

    useEffect(() => {
        (async () => {
            if (formData.trim === -1) {
                setTrims([]);
            }
            if (formData.model === -1) {
                setTrims([]);
                setModels([]);
            }
            if (formData.make === -1) {
                setMakes([]);
                setModels([]);
                setTrims([]);
            }
            if (formData.year === -1) {
                setYears([]);
                setMakes([]);
                setModels([]);
                setTrims([]);
            }
            console.log('formData-------------', formData);
        })();
    }, [formData]);

    const getYears = async () => {
        const response = await postRequest(
            '/novotradein/app/vehicles/years',
            {}
        );
        if (response.status === 'ok') {
            setYears(response.results);
        }
    };
    const getMakes = async (selectedYear: number) => {
        const response = await postRequest('/novotradein/app/vehicles/makes', {
            year: selectedYear,
        });
        if (response.status === 'ok') {
            setMakes(response.results);
        }
    };

    const getModels = async (model: string) => {
        const response = await postRequest('/novotradein/app/vehicles/models', {
            year: formData.year,
            make: model,
        });
        if (response.status === 'ok') {
            setModels(response.results);
        }
    };

    const getTrims = async (model: string) => {
        const response = await postRequest('/novotradein/app/vehicles/trims', {
            year: formData.year,
            make: formData.make,
            model: model,
        });
        if (response.status === 'ok') {
            setTrims(response.results);
        }
    };

    useEffect(() => {
        if (formData.trim !== -1 && formData.odometer !== '') {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [formData]);

    const handleContinue = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/create',
            {
                vin: route.params?.vin,
                odometer: formData.odometer,
                dealership: formData.dealership,
                id: formData.trim,
            }
        );
        console.log('response', response);
        if (response.status === 'ok') {
            setRes(response);
            dispatch(updateAppInfo({ appraisal: response.appraisal }));
            // changeScreen(response);
        }
        // if (response.status === 'error') {
        //     setFormError(response);
        //     setShowModal(true);
        // }
    };

    useEffect(() => {
        //@ts-ignore
        if (res.appraisal === appraisal) {
            //@ts-ignore
            changeScreen(res);
        }
    }, [appraisal]);

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('selectVehicle.title')}
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
            <ScrollView
                contentContainerStyle={styles.mainContainer}
                scrollEnabled={false}>
                {dealerships.length > 1 &&
                    route.params?.dealership === undefined && (
                        <CustomSelect
                            selectedIndex={Number(formData.dealership)}
                            data={dealerships}
                            label={t('selectVehicle.form.dealership')}
                            clear={true}
                            onChange={async (item: Item) => {
                                // setSelectedDealership(item);
                                console.log(
                                    'item',
                                    item,
                                    'dealership+++++++++'
                                );
                                setFormData(prev => ({
                                    ...prev, //@ts-ignore
                                    dealership: Number(item?.id),
                                    year: -1,
                                    make: -1,
                                    model: -1,
                                    trim: -1,
                                }));
                                await getYears();
                            }}
                        />
                    )}
                {years.length > 0 && (
                    <CustomSelect
                        selectedIndex={Number(formData.year)}
                        data={years}
                        label={t('selectVehicle.form.year')}
                        clear={true}
                        onChange={async (item: Item) => {
                            // setSelectedDealership(item);
                            console.log('item', item, 'year');
                            setFormData(prev => ({
                                ...prev, //@ts-ignore
                                year: Number(item?.name),
                                make: -1,
                                model: -1,
                                trim: -1,
                            }));
                            await getMakes(Number(item?.name));
                        }}
                    />
                )}
                {makes.length > 0 && (
                    <CustomSelect
                        selectedIndex={Number(formData.make)}
                        data={makes}
                        label={t('selectVehicle.form.make')}
                        clear={true}
                        onChange={async (item: Item) => {
                            console.log('item', item, 'make');
                            // setSelectedDealership(item);
                            setFormData(prev => ({
                                ...prev,
                                make: item?.name,
                                model: -1,
                                trim: -1,
                            }));
                            await getModels(item?.name);
                        }}
                    />
                )}
                {models.length > 0 && (
                    <CustomSelect
                        selectedIndex={Number(formData.model)}
                        data={models}
                        label={t('selectVehicle.form.model')}
                        clear={true}
                        onChange={async (item: Item) => {
                            console.log('item', item, 'model');
                            // setSelectedDealership(item);
                            setFormData(prev => ({
                                ...prev, //@ts-ignore
                                model: item?.name,
                                trim: -1,
                            }));
                            await getTrims(item?.name);
                        }}
                    />
                )}
                {trims.length > 0 && (
                    <CustomSelect
                        selectedIndex={Number(formData.trim)}
                        data={trims}
                        label={t('selectVehicle.form.trim')}
                        clear={true}
                        onChange={async (item: Item) => {
                            console.log('item', item, 'trim');
                            // setSelectedDealership(item);
                            setFormData(prev => ({
                                ...prev, //@ts-ignore
                                trim: item?.id,
                            }));
                        }}
                    />
                )}
                {formData.trim !== -1 && (
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
                                label={t('selectVehicle.form.odometer')}
                            />
                        </View>
                        <View style={styles.floatingText}>
                            <Text style={styles.text}>
                                {t('scanVin.distanceUnit')}
                            </Text>
                        </View>
                    </View>
                )}
                {showButton && (
                    <View style={styles.sendBtnContainer}>
                        <CustomTextButton
                            onPress={handleContinue}
                            text={t('scanVin.button')}
                        />
                    </View>
                )}
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        gap: h(16),

        flex: 1,
    },
    inputContainer: {
        flexGrow: 0,
        flexShrink: 1,
    },
    floatingText: {
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
    },
});

export default SelectVehicleScreen;
