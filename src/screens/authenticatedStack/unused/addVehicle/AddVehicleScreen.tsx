import React, { useRef, useState } from 'react';
import ScreenContainer from '../../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import useDebounce from '../../../../common/services/hooks/debounceHook.tsx';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import CustomSearchInput from '../../../../common/components/forms/formComponents/inputs/searchInput/CustomSearchInput.tsx';
import CustomScanner from '../../../../common/components/camera/CustomScanner.tsx';
import CustomTextTabBar from '../../../../common/components/screenComponents/bars/tabBars/CustomTextTabBar.tsx';
import useApiHeaders from '../../../../common/services/hooks/apiHeadersHook.tsx';
import CustomSearchItem from '../../../../common/components/Items/customItemButton/CustomSearchItem.tsx';
import CustomModal from '../../../../common/components/modals/customModal.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import handleImagesHook from '../../../../common/services/hooks/handleImagesHook.tsx';
import { AppDispatch } from '../../../../common/store/store.tsx';
import { useDispatch } from 'react-redux';
import { updateCurrentVehicle } from '../../../../common/store/slices/selectedVehiclesSlice.tsx';
import { Vehicle } from '../../../../common/tsTypes/commonTypes.tsx';

type VehicleArray = Vehicle[] | [];

const AddVehicleScreen = ({ navigation }: any) => {
    const [scannerIsOpened, setScannerIsOpened] = useState(false);
    const [scanErrorText, setScanErrorText] = useState(
        'Please scan the barcode of the vehicle.'
    );
    const [searchText, setSearchText] = useState('');
    const [vehicleList, setVehicleList] = useState<VehicleArray>([]);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [itemSelectedForAdd, setItemSelectedForAdd] =
        useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const pagination = useRef({ page: 1, pages: 1, input: '' });
    const { postRequest } = useApiHeaders();
    const { createCarFolder, readDomainFolder } = handleImagesHook();
    const dispatch = useDispatch<AppDispatch>();
    const abortController = new AbortController();

    const search = useDebounce(async (input: string) => {
        pagination.current = { page: 1, pages: 1, input: input };
        // controller.abort();
        setVehicleList([]);
        if (input.length) {
            await searchString();
        }
        // console.log('searching', input);
    }, 1000);

    // console.log(pagination)
    const searchString = async () => {
        try {
            setIsLoading(true);
            const response = await postRequest(
                '/novocapture/vehicle',
                { q: pagination.current.input, page: pagination.current.page },
                { signal: abortController.signal }
            );
            if (response.status === 'ok') {
                pagination.current.pages = response.vehicles.pages;
                pagination.current.page = response.vehicles.page;
                if (pagination.current.input.length) {
                    if (response.vehicles.records !== null) {
                        setVehicleList(prev => [
                            ...prev,
                            ...response.vehicles.records,
                        ]);
                    }
                } else {
                    setVehicleList([]);
                }
            }
        } catch (e) {
            console.log('error', e);
        } finally {
            setIsLoading(false);
        }
    };
    const handleScanReveal = () => {
        setScannerIsOpened(!scannerIsOpened);
    };
    // const processCode = (code: string) => {
    //     if (code.length === 17) {
    //         return code;
    //     } else if (code.length === 18) {
    //         return code.slice(1);
    //     } else if (code.length === 19) {
    //         return code.slice(1, -1);
    //     } else if (code.length === 20) {
    //         return code.slice(2, -1);
    //     }
    //     return code;
    // };
    const handleTypeQR = (codes: any) => {
        console.log(codes[0].value, 'qr');
        return codes[0].value.split(',')[0];
    };
    const handleTypeBarcode = (codes: any) => {
        console.log(codes[0].value, 'barcode');
        return processCode(codes[0].value);
    };
    const handleTypeDataMatrix = (codes: any) => {
        console.log(codes[0].value, 'data-matrix');
        return codes[0].value;
    };
    const handleScan = async (codes: any) => {
        let actualCode = '';
        if (codes[0].type === 'qr') {
            actualCode = handleTypeQR(codes);
        }
        if (codes[0].type === 'code-39') {
            actualCode = handleTypeBarcode(codes);
        }
        if (codes[0].type === 'data-matrix') {
            actualCode = handleTypeDataMatrix(codes);
        }

        // const actualCode = ;
        // console.log(actualCode, 'rrrr');
        // if (validateVin(actualCode)) {
        setScannerIsOpened(false);
        setSearchText(actualCode);
        // console.log('scanner text');
        pagination.current.input = actualCode;
        setVehicleList([]);
        await searchString();
        // } else {
        //     setScanErrorText(`Scanned VIN is invalid`);
        // }
    };

    function validateVin(vin: string) {
        return validate(vin);

        function transliterate(c: any) {
            return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
        }

        function get_check_digit(vin: string) {
            var map = '0123456789X';
            var weights = '8765432X098765432';
            var sum = 0;
            for (var i = 0; i < 17; ++i)
                sum += transliterate(vin[i]) * map.indexOf(weights[i]);
            return map[sum % 11];
        }

        function validate(vin: string) {
            if (vin.length !== 17) return false;
            return get_check_digit(vin) === vin[8];
        }
    }

    const processCode = (code: string) => {
        if (code.length === 17) {
            return code;
        } else if (code.length === 18) {
            return code.slice(1);
        } else if (code.length === 19) {
            return code.slice(1, -1);
        } else if (code.length === 20) {
            return code.slice(2, -1);
        }
        return code;
    };

    const handleInputChange = async (input: string) => {
        search(input);
    };

    const handleYes = async () => {
        if (!itemSelectedForAdd) return;
        await createCarFolder(
            itemSelectedForAdd.vehicle_vin,
            `${itemSelectedForAdd?.vehicle_year} ${itemSelectedForAdd?.brand_name} ${itemSelectedForAdd?.model_name} ${itemSelectedForAdd?.trim_name}`,
            itemSelectedForAdd
        );
        dispatch(
            updateCurrentVehicle({ vehicleVin: itemSelectedForAdd.vehicle_vin })
        );
        setShowModal(false);
        navigation.navigate('VehicleDetails', { vehicle: itemSelectedForAdd });
    };
    const handleNo = async () => {
        setShowModal(false);
    };

    const onReachingEnd = async () => {
        console.log(
            'reached end++++',
            pagination.current.page,
            pagination.current.pages
        );
        if (pagination.current.page < pagination.current.pages) {
            pagination.current.page++;
            await searchString();
            console.log(pagination.current.page, '-=-=-=-');
        } else {
            console.log('no more pages');
        }
    };

    //'code-93','code-128','itf','qr','aztec','codabar','data-matrix','ean-8','ean-13','pdf-417','upc-e'
    return (
        <>
            {scannerIsOpened ? (
                <>
                    <View style={{ backgroundColor: 'black', flex: 1 }}>
                        <HeaderComponent backBtn={true} />
                        <CustomScanner
                            onCodeScanned={handleScan}
                            scanTypes={['code-39', 'data-matrix', 'qr']}
                        />
                        <CustomTextTabBar text={scanErrorText} />
                    </View>
                </>
            ) : (
                <ScreenContainer
                    nav={navigation}
                    header={<HeaderComponent title={'Add Vehicle'} />}>
                    {showErrorModal ? (
                        <CustomModal
                            isVisible={showModal}
                            buttons={[{ title: 'ok', onPress: handleNo }]}
                            title={'Error'}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}>
                                    The vehicle below is already in list!
                                </Text>
                                <Text
                                    style={styles.modalText}
                                    numberOfLines={2}>
                                    <Text>
                                        {itemSelectedForAdd?.vehicle_year}{' '}
                                        {itemSelectedForAdd?.brand_name}{' '}
                                        {itemSelectedForAdd?.model_name}
                                    </Text>{' '}
                                    <Text>
                                        {itemSelectedForAdd?.trim_name}{' '}
                                    </Text>
                                </Text>
                                <View style={styles.inlineTexts}>
                                    <Text style={styles.vehicleStock}>
                                        {itemSelectedForAdd?.vehicle_stock}
                                    </Text>
                                    <Text style={styles.separator}>/</Text>
                                    <Text style={styles.vehicleVin}>
                                        {itemSelectedForAdd?.vehicle_vin}
                                    </Text>
                                </View>
                            </View>
                        </CustomModal>
                    ) : (
                        <CustomModal
                            isVisible={showModal}
                            buttons={[
                                { title: 'No', onPress: handleNo },
                                { title: 'Yes', onPress: handleYes },
                            ]}
                            title={'Are you sure you want to proceed?'}
                            blueTitle>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}>
                                    Please confirm if you want to add this
                                    vehicle to the list:
                                </Text>
                                <Text
                                    style={styles.modalText}
                                    numberOfLines={2}>
                                    <Text>
                                        {itemSelectedForAdd?.vehicle_year}{' '}
                                        {itemSelectedForAdd?.brand_name}{' '}
                                        {itemSelectedForAdd?.model_name}
                                    </Text>{' '}
                                    <Text>
                                        {itemSelectedForAdd?.trim_name}{' '}
                                    </Text>
                                </Text>
                                <View style={styles.inlineTexts}>
                                    <Text style={styles.vehicleStock}>
                                        {itemSelectedForAdd?.vehicle_stock}
                                    </Text>
                                    <Text style={styles.separator}>/</Text>
                                    <Text style={styles.vehicleVin}>
                                        {itemSelectedForAdd?.vehicle_vin}
                                    </Text>
                                </View>
                            </View>
                        </CustomModal>
                    )}
                    <CustomSearchInput
                        clear={true}
                        onChange={handleInputChange}
                        type={'text'}
                        placeholder={'Search Name, Stock, VIN'}
                        handleScan={handleScanReveal}
                        value={searchText}
                    />
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled={true}
                        data={vehicleList}
                        renderItem={item => (
                            <View
                                onStartShouldSetResponder={() => {
                                    return true;
                                }}>
                                <CustomSearchItem
                                    // @ts-ignore
                                    item={item.item}
                                    onPress={async el => {
                                        const folders =
                                            await readDomainFolder();
                                        if (folders?.includes(el.vehicle_vin)) {
                                            setShowErrorModal(true);
                                            setItemSelectedForAdd(el);
                                            setShowModal(true);
                                        } else {
                                            setShowErrorModal(false);
                                            setItemSelectedForAdd(el);
                                            setShowModal(true);
                                        }
                                    }}
                                />
                            </View>
                        )}
                        keyExtractor={item => item.vehicle_id}
                        ListFooterComponent={
                            <>
                                {isLoading && (
                                    <ActivityIndicator
                                        size={'large'}
                                        color={Colors.skyBlue}
                                        style={{ marginTop: h(15) }}
                                    />
                                )}
                            </>
                        }
                        ItemSeparatorComponent={() => (
                            <View style={styles.lineSeparator} />
                        )}
                        onEndReached={onReachingEnd}
                        onEndReachedThreshold={0.3}
                        ListEmptyComponent={
                            <>
                                {!isLoading && (
                                    <Text style={styles.emptyText}>
                                        A valid vehicle stock number / VIN (no
                                        special characters) is required to
                                        proceed.
                                    </Text>
                                )}
                            </>
                        }
                    />
                </ScreenContainer>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    lineSeparator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    scanBtn: {
        paddingHorizontal: w(12),
        paddingVertical: h(14),
    },
    modalContainer: {
        justifyContent: 'center',
        gap: h(8),
    },
    modalText: {
        ...commonFonts.regularText,
        textAlign: 'center',
    },
    inlineTexts: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: w(5),
    },
    modalNumber: {},
    separator: {
        ...commonFonts.regularText,
    },
    vehicleStock: {
        ...commonFonts.regularText,
        color: Colors.metal,
    },
    vehicleVin: {
        ...commonFonts.regularText,
        color: Colors.metal,
    },
    emptyText: {
        ...commonFonts.regularTextSmall,
        // textAlign:'center',
        paddingTop: h(24),
        color: Colors.error,
    },
});

export default AddVehicleScreen;
