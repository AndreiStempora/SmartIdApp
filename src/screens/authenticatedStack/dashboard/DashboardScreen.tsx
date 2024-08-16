import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    VirtualizedList,
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

export type ItemContent = {
    title: string;
    subtitle: string;
    date: string;
    tn: string;
    code: string;
    ref: string;
    conf: number;
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
    const { postRequest } = useApiHeaders();
    const app = useSelector(getApp);

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
        console.log('app domain 00000000000', app.domain);
        if (app.domain === '') {
            return;
        }
        console.log(
            'app domain 00000000000---------------------------------------------',
            app.domain
        );
        (async () => {
            const response = await postRequest('/scans', {
                page: pagination.current.page,
                ipp: pagination.current.ipp,
            });

            if (response?.status !== 'ok') {
                return;
            }
            console.log('response', response.results.records);
            setScans(response.results.records);
            pagination.current.pages = response.results.pages;
        })();

        return () => {
            pagination.current = { page: 1, ipp: 10, pages: 1 };
        };
    }, [app.domain]);

    const handleReachEnd = async () => {
        console.log(
            'reached end',
            pagination.current.page,
            pagination.current.pages
        );

        if (pagination.current.page < pagination.current.pages) {
            pagination.current.page++;
            const response = await postRequest('/scans', {
                page: pagination.current.page,
                ipp: pagination.current.ipp,
            });
            console.log('response end', response);
            setScans(prevScans => [
                ...prevScans,
                ...response?.results?.records,
            ]);
        }

        //     setIsLoading(false);
        else {
            setIsLoading(false);
        }
    };

    return (
        <ScreenContainer
            nav={navigation}
            removeBg={true}
            header={
                <HeaderComponent
                    title={'Dashboard'}
                    backBtn={false}
                    leftSide={<UserIcon nav={navigation} />}
                />
            }>
            <CustomModal
                isVisible={isVisible}
                buttons={[
                    { title: 'cancel', onPress: () => setIsVisible(false) },
                ]}>
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <CustomIconButton
                            onPress={handleAddPhoto}
                            icon={'gallery'}
                            background={'transparent'}
                        />
                        <Text style={styles.btnText}>Library</Text>
                    </View>
                    <View style={styles.btn}>
                        <CustomIconButton
                            onPress={handleAddPhotoCamera}
                            icon={'camera'}
                            background={'transparent'}
                        />
                        <Text style={styles.btnText}>Camera</Text>
                    </View>
                </View>
            </CustomModal>

            <FlatList
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                data={scans}
                //@ts-ignore
                renderItem={({ item }: ItemContent) => {
                    return <ScanItem item={item} navigation={navigation} />;
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
                onEndReachedThreshold={1000}
            />

            <View
                style={{
                    position: 'absolute',
                    bottom: h(16),
                    right: w(0),
                }}>
                <CustomIconButton
                    onPress={() => setIsVisible(true)}
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

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: h(8),
    },
    btnText: {
        color: Colors.white,
    },
});

export default DashboardScreen;
