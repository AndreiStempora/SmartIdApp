import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { f, h, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import { AppDispatch } from '../../../common/store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';
import apiHeadersHook from '../../../common/services/hooks/apiHeadersHook.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import {
    getApp,
    getAppDomain,
    getAppToken,
    updateAppInfo,
} from '../../../common/store/slices/appSlice.tsx';
import ItemWithIcon from '../../../common/components/Items/itemWithIcon/ItemWithIcon.tsx';
import useText from '../../../common/services/hooks/textHook.tsx';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Upload from 'react-native-background-upload';

const ProfileScreen = ({ navigation }: any) => {
    const route = useRoute();
    const [user, setUser] = useState({ firstName: '?', lastName: '' });
    const dispatch = useDispatch<AppDispatch>();
    const { getRequest } = apiHeadersHook();
    const [showModal, setShowModal] = useState(false);
    const { t } = useText();
    const token = useSelector(getAppToken);
    const BASE_URL = useSelector(getAppDomain);
    const app = useSelector(getApp);

    const [showAndroidSettingModal, setShowAndroidSettingModal] =
        useState(false);
    const handleChangeLanguage = () => {
        // dispatch(updateAppInfo({ stack: 'language' }));
        navigation.navigate('Language');
    };
    const handleSupport = () => {
        navigation.navigate('Help');
    };

    const handleUploadMethod = () => {
        if (!app.uploadServiceEnabled) {
            setShowAndroidSettingModal(true);
        } else {
            dispatch(
                updateAppInfo({
                    uploadServiceEnabled: !app.uploadServiceEnabled,
                })
            );
        }
    };
    const handleLogout = async () => {
        try {
            const response = await getRequest('/novotradein/app/logout');
            if (response?.status === 'ok') {
                dispatch(updateAppInfo({ token: '', stack: 'login' }));
            }
            console.log('response', response);
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleShowLogout = async () => {
        setShowModal(true);
    };

    useEffect(() => {
        //@ts-ignore
        setUser(route.params?.user);
    }, []);

    const list = [
        {
            onPress: handleChangeLanguage,
            icon: 'language',
            name: t('profile.list.language'),
            color: false,
        },
        {
            onPress: handleSupport,
            icon: 'support',
            name: t('profile.list.support'),
        },
        Platform.OS === 'android' && {
            onPress: handleUploadMethod,
            icon: 'setting',
            name: t('profile.list.upload'),
            setting: true,
        },
        {
            onPress: handleShowLogout,
            icon: 'logout',
            name: t('profile.list.logout'),
            color: true,
        },
    ].filter(Boolean);

    const handleChangeMethod = async () => {
        try {
            if (
                await ReactNativeBlobUtil.fs.exists(
                    ReactNativeBlobUtil.fs.dirs.DocumentDir + 'text.txt'
                )
            ) {
                console.log('File exists');
            } else {
                console.log('File does not exist');
                await ReactNativeBlobUtil.fs.createFile(
                    ReactNativeBlobUtil.fs.dirs.DocumentDir + 'text.txt',
                    'text.txt',
                    'utf8'
                );
            }
            const options = {
                url: BASE_URL + 'novotradein/app/appraisal/uploadImage',
                path: ReactNativeBlobUtil.fs.dirs.DocumentDir + 'text.txt',
                method: 'POST',
                type: 'multipart',
                field: 'txt',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Novotrade-in': token,
                },
            };
            //@ts-ignore
            const uploadId = await Upload.startUpload(options);
            console.log('Upload started');

            Upload.addListener('progress', uploadId, data => {
                console.log(`Progress: ${data.progress}%`);
            });

            Upload.addListener('error', uploadId, data => {
                console.log(`Error: ${data.error}`);
            });

            Upload.addListener('cancelled', uploadId, data => {
                console.log('Cancelled!', data);
            });

            Upload.addListener('completed', uploadId, data => {
                // data includes responseCode: number and responseBody: Object
                console.log('Completed!', data);

                if (data.responseCode === 200) {
                    const response = JSON.parse(data.responseBody);
                    if (
                        response.status === 'error' &&
                        response.error === 'appraisal'
                    ) {
                        dispatch(
                            updateAppInfo({
                                uploadServiceEnabled: !app.uploadServiceEnabled,
                            })
                        );
                        setShowAndroidSettingModal(false);
                    }
                }
            });
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent title={t('profile.title')} backBtn={true} />
            }>
            <CustomModal
                isVisible={showModal}
                buttons={[
                    {
                        title: t('profile.modals.confirmLogout.buttons.no'),
                        onPress: () => setShowModal(false),
                    },
                    {
                        title: t('profile.modals.confirmLogout.buttons.yes'),
                        onPress: handleLogout,
                    },
                ]}
                title={t('profile.modals.confirmLogout.title')}>
                <Text style={styles.modalText}>
                    {t('profile.modals.confirmLogout.text')}
                </Text>
            </CustomModal>
            <CustomModal
                isVisible={showAndroidSettingModal}
                buttons={[
                    {
                        title: t(
                            'profile.modals.changeUploadMethod.buttons.no'
                        ),
                        onPress: () => setShowAndroidSettingModal(false),
                    },
                    {
                        title: t(
                            'profile.modals.changeUploadMethod.buttons.yes'
                        ),
                        onPress: handleChangeMethod,
                    },
                ]}
                title={t('profile.modals.changeUploadMethod.title')}>
                <Text style={styles.modalText}>
                    {t('profile.modals.changeUploadMethod.text')}
                </Text>
            </CustomModal>
            <View style={styles.logoContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user.firstName.at(0)}
                    </Text>
                </View>
                <Text style={styles.userName}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>

            <FlatList
                style={styles.listContainer}
                data={list}
                renderItem={({ item }) => (
                    // <SettingElement {...item.item} />
                    <ItemWithIcon
                        //@ts-ignore
                        onPress={item.onPress}
                        //@ts-ignore
                        icon={item.icon}
                        //@ts-ignore
                        name={item.name}
                        //@ts-ignore
                        color={item.color}
                        //@ts-ignore
                        setting={item.setting}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
    },
    listContainer: {
        marginTop: h(24),
    },
    modalText: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
    avatar: {
        width: w(64),
        height: w(64),
        backgroundColor: Colors.darkGray,
        borderRadius: w(32),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        ...commonFonts.boldText,
        fontSize: f(24),
        lineHeight: f(31.2),
    },
    userName: {
        marginTop: h(24),
        ...commonFonts.boldText,
    },
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
});

export default ProfileScreen;
