import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import CustomHeaderIconButton from '../../../common/components/buttons/buttonIcon/CustomHeaderIconButton.tsx';
import React, { useEffect, useRef, useState } from 'react';
import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import CustomSearchInput from '../../../common/components/forms/formComponents/inputs/searchInput/CustomSearchInput.tsx';
import useDebounce from '../../../common/services/hooks/debounceHook.tsx';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomSearchItem from '../../../common/components/Items/customItemButton/CustomSearchItem.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { h } from '../../../common/styles/PixelPerfect.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../common/store/store.tsx';
import {
    getApp,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';

const BrowseAppraisalsScreen = ({ navigation }: any) => {
    const [refresh, setRefresh] = useState(false);
    const [searchText, setSearchText] = useState('');
    const handleScanReveal = () => {};
    const [appraisalsList, setAppraisalsList] = useState([]);
    const pagination = useRef({ page: 1, pages: 1, input: '' });
    const [isLoading, setIsLoading] = useState(false);
    const abortController = new AbortController();
    const { postRequest } = apiHeadersHook();
    const dispatch = useDispatch<AppDispatch>();
    const app = useSelector(getApp);
    const selectedItem = useRef(null);
    const { t } = useText();
    const handleInputChange = async (input: string) => {
        search(input);
    };

    const search = useDebounce(async (input: string) => {
        pagination.current = { page: 1, pages: 1, input: input };
        // controller.abort();
        setSearchText(input);
        setAppraisalsList([]);

        await searchString().then(() => setRefresh(false));
    }, 500);

    const searchString = async () => {
        try {
            setIsLoading(true);
            const response = await postRequest(
                '/novotradein/app/appraisal/search',
                { q: pagination.current.input, page: pagination.current.page },
                { signal: abortController.signal }
            );
            if (response.status === 'ok') {
                pagination.current.pages = response.appraisals.pages;
                pagination.current.page = response.appraisals.page;
                if (response.appraisals.records !== null) {
                    //@ts-ignore
                    setAppraisalsList(prev => [
                        ...prev,
                        ...response.appraisals.records,
                    ]);
                } else {
                    setAppraisalsList([]);
                }
            }
        } catch (e) {
            console.log('error', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(app, 'app.searchWord', searchText, selectedItem.current);
        pagination.current = { page: 1, pages: 1, input: app.searchWord };
        if (app.appraisal === selectedItem.current) {
            navigation.navigate('Details');
        }
    }, [app]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await postRequest(
                    '/novotradein/app/appraisal/search',
                    {
                        q: app.searchWord,
                        page: pagination.current.page,
                    },
                    { signal: abortController.signal }
                );
                console.log(response, 'response');
                if (response.status === 'ok') {
                    pagination.current.pages = response.appraisals.pages;
                    pagination.current.page = response.appraisals.page;
                    if (response.appraisals.records !== null) {
                        setAppraisalsList(response.appraisals.records);
                    } else {
                        setAppraisalsList([]);
                    }
                }
            } catch (e) {
                console.log('error', e);
            }
        })();
        return () => {
            selectedItem.current = null;
        };
    }, []);

    useEffect(() => {
        setSearchText(app.searchWord);
    }, []);

    const onReachingEnd = async () => {
        if (pagination.current.page < pagination.current.pages) {
            pagination.current.page++;
            await searchString();
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refresh &&
            (async () => {
                search(searchText);
            })();
    }, [refresh]);

    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('appraisals.title')}
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
            <CustomSearchInput
                clear={true}
                onChange={handleInputChange}
                type={'text'}
                placeholder={t('appraisals.searchPlaceholder')}
                handleScan={handleScanReveal}
                value={app.searchWord}
            />
            <FlatList
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                data={appraisalsList}
                renderItem={item => (
                    <View
                        onStartShouldSetResponder={() => {
                            return true;
                        }}>
                        <CustomSearchItem
                            // @ts-ignore
                            item={item.item}
                            onPress={async el => {
                                selectedItem.current = el.code;
                                dispatch(
                                    updateAppInfo({
                                        appraisal: el.code,
                                        searchWord: searchText,
                                    })
                                );
                            }}
                        />
                    </View>
                )}
                // refreshing={refresh}
                // onRefresh={() => {
                //     setRefresh(true);
                // }}
                // @ts-ignore
                keyExtractor={(item, index) => item.code + index}
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
                refreshing={refresh}
                onRefresh={() => {
                    setRefresh(true);
                }}
                ItemSeparatorComponent={() => (
                    <View style={styles.lineSeparator} />
                )}
                onEndReached={onReachingEnd}
                onEndReachedThreshold={0.3}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    lineSeparator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    emptyText: {
        ...commonFonts.regularTextSmall,
        // textAlign:'center',
        paddingTop: h(24),
        color: Colors.error,
    },
});

export default BrowseAppraisalsScreen;
