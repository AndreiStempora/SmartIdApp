import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { h, w } from '../../../common/styles/PixelPerfect.tsx';
import UserIcon from '../../../common/components/smallComponents/user/UserIcon.tsx';
import ScanItem from './components/ScanItem.tsx';
import CustomIconButton from '../../../common/components/buttons/buttonIcon/CustomIconButton.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';

import {
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import { Colors } from '../../../common/styles/constants.tsx';
import { useSelector } from 'react-redux';
import { getApp } from '../../../common/store/slices/appSlice.tsx';
import { useIsFocused } from '@react-navigation/native';
import Icon from '../../../common/components/icons/Icon.tsx';
import useDebounce from '../../../common/services/hooks/debounceHook.tsx';

export type ItemContent = {
    title: string;
    subtitle: string;
    date: string;
    tn: string;
    code: string;
    ref: string;
    conf: number;
    fakeResult: string | null;
};

type File = {
    type: string | undefined;
    uri: string | undefined;
    name: string | undefined;
};
const DashboardScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [scans, setScans] = useState<ItemContent[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const pagination = useRef({ page: 1, ipp: 10, pages: 1 });
    const [refresh, setRefresh] = useState(false);
    const { postRequest } = useApiHeaders();
    const isFocused = useIsFocused();
    const app = useSelector(getApp);
    const [searchText, setSearchText] = useState('');
    const [grid, setGrid] = useState(false);

    const textSearch = async () => {
        const response = await postRequest('/scans', {
            page: pagination.current.page,
            ipp: pagination.current.ipp,
            q: searchText,
        });

        if (response?.status !== 'ok') {
            return;
        }
        setScans(response.results.records);
        pagination.current.pages = response.results.pages;
    };
    //
    const search = useDebounce(textSearch, 500);

    const photoHandler = (res: ImagePickerResponse) => {
        if (res.didCancel) {
            console.log('User cancelled image picker');
            setIsVisible(false);
            return;
        }
        const file: File | undefined = res.assets?.[0] && {
            type: res.assets[0].type,
            uri: res.assets[0].uri,
            name: res.assets[0].fileName,
        };
        setIsVisible(false);
        navigation.navigate('Analyzing', { file: file });
    };
    const handleAddPhoto = async () => {
        const res = await launchImageLibrary({ mediaType: 'photo' });
        photoHandler(res);
    };
    const handleAddPhotoCamera = async () => {
        const res = await launchCamera({ mediaType: 'photo' });
        photoHandler(res);
    };

    // useEffect(() => {
    //     return () => {
    //         pagination.current = { page: 1, ipp: 10, pages: 1 };
    //         setScans([]);
    //     };
    // }, []);

    useEffect(() => {
        if (app.domain === '') {
            return;
        }
        (isFocused || refresh) &&
            (async () => {
                search();
            })();
        console.log('xx', pagination.current, searchText);
        setRefresh(false);

        return () => {
            pagination.current = { page: 1, ipp: 10, pages: 1 };
            setScans([]);
        };
    }, [app.domain, isFocused, refresh, searchText]);

    const handleReachEnd = async () => {
        if (pagination.current.page < pagination.current.pages) {
            pagination.current.page++;
            const response = await postRequest('/scans', {
                page: pagination.current.page,
                ipp: pagination.current.ipp,
                query: searchText,
            });
            console.log('response end', response);
            setScans(prevScans => [
                ...prevScans,
                ...response?.results?.records,
            ]);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={'Dashboard'}
                    backBtn={false}
                    leftSide={<UserIcon nav={navigation} />}
                />
            }>
            {/*<CustomModal*/}
            {/*    isVisible={isVisible}*/}
            {/*    buttons={[*/}
            {/*        { title: 'cancel', onPress: () => setIsVisible(false) },*/}
            {/*    ]}>*/}
            {/*    <View style={styles.btnContainer}>*/}
            {/*        <View style={styles.btn}>*/}
            {/*            <CustomIconButton*/}
            {/*                onPress={handleAddPhoto}*/}
            {/*                icon={'gallery'}*/}
            {/*                background={'transparent'}*/}
            {/*            />*/}
            {/*            <Text style={styles.btnText}>Library</Text>*/}
            {/*        </View>*/}

            {/*        <View style={styles.btn}>*/}
            {/*            <CustomIconButton*/}
            {/*                onPress={handleAddPhotoCamera}*/}
            {/*                icon={'camera'}*/}
            {/*                background={'transparent'}*/}
            {/*            />*/}
            {/*            <Text style={styles.btnText}>Camera</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</CustomModal>*/}
            <View style={styles.controlsContainer}>
                {/*<TouchableOpacity*/}
                {/*    style={styles.filtersBtnContainer}*/}
                {/*    onPress={() => {}}>*/}
                {/*    <View style={styles.gridBtnContainer}>*/}
                {/*        <Icon icon={'boldFilters'} />*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
                <TextInput
                    numberOfLines={1}
                    style={styles.searchInput}
                    placeholder={'Search'}
                    onChange={e => {
                        setSearchText(e.nativeEvent.text);
                    }}
                />
                <TouchableOpacity
                    style={{}}
                    onPress={() => {
                        setGrid(!grid);
                    }}>
                    <View style={styles.gridBtnContainer}>
                        {grid ? (
                            <Icon icon={'boldList'} />
                        ) : (
                            <Icon icon={'boldGrid'} />
                        )}
                    </View>
                </TouchableOpacity>
                {/*<TouchableOpacity style={{}} onPress={() => {}}>*/}
                {/*    <View style={styles.gridBtnContainer}>*/}
                {/*        <Icon icon={'boldSort'} />*/}
                {/*    </View>*/}
                {/*</TouchableOpacity>*/}
            </View>
            <FlatList
                key={grid ? 'grid' : 'list'}
                numColumns={grid ? 2 : 1}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                style={{ marginBottom: h(16) }}
                columnWrapperStyle={grid ? { gap: 8 } : null}
                data={scans}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={async () => {
                            setRefresh(true);
                        }}
                    />
                }
                //@ts-ignore
                renderItem={({ item }: ItemContent) => {
                    return (
                        <ScanItem
                            item={item}
                            navigation={navigation}
                            grid={grid}
                        />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
                onEndReached={handleReachEnd}
                onEndReachedThreshold={0.5}
            />

            <View
                style={{
                    position: 'absolute',
                    bottom: h(16),
                    right: w(0),
                }}>
                <CustomIconButton
                    onPress={() => navigation.navigate('Camera')}
                    icon={'scan'}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: h(16),
    },

    separator: {
        height: h(8),
    },
    logoContainer: {
        position: 'absolute',
        top: h(48),
        width: '100%',
        alignItems: 'center',
        marginBottom: h(96),
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    searchInput: {
        height: h(56),
        flexGrow: 1,
        backgroundColor: Colors.black300,
        borderRadius: w(4),
        borderWidth: 1,
        borderColor: Colors.black400,
        paddingHorizontal: w(16),
    },
    filtersBtnContainer: {
        marginRight: 'auto',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: h(8),
    },
    btnText: {
        color: Colors.white,
    },
    controlsContainer: {
        flexDirection: 'row',
        marginBottom: h(8),
    },
    gridBtnContainer: {
        paddingHorizontal: w(15),
        paddingVertical: h(15),
    },
});

export default DashboardScreen;
