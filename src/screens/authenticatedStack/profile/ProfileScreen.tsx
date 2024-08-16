import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { f, h, w } from '../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import ItemWithIcon from '../../../common/components/Items/itemWithIcon/ItemWithIcon.tsx';
import CustomModal from '../../../common/components/modals/customModal.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import { updateAppInfo } from '../../../common/store/slices/appSlice.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../common/store/store.tsx';

const ProfileScreen = ({ navigation }: any) => {
    const route = useRoute();
    const [user, setUser] = useState<any>({ firstName: '', lastName: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const { postRequest } = useApiHeaders();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // @ts-ignore
        setUser(route.params.user);
    }, []);

    const handleLogout = async () => {
        const response = await postRequest('/logout', {});
        if (response?.status === 'ok') {
            dispatch(updateAppInfo({ token: '', stack: 'login' }));
        }
    };
    return (
        <ScreenContainer nav={navigation} removeBg={true}>
            <IdHeader navigation={navigation} title={'My Account'} />
            <CustomModal
                isVisible={modalVisible}
                buttons={[
                    {
                        title: 'No',
                        onPress: () => {
                            setModalVisible(false);
                        },
                    },
                    {
                        title: 'Yes',
                        color: 'red',
                        onPress: handleLogout,
                    },
                ]}>
                <Text style={styles.modalTitle}>
                    Are you sure you want to log out?
                </Text>
                <Text style={styles.modalText}>
                    Please confirm if you want to log out.
                </Text>
            </CustomModal>
            <View style={styles.userContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user?.firstName[0]}
                        {user?.lastName[0]}
                    </Text>
                </View>
                <Text style={styles.userName}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>
            <View style={styles.listContainer}>
                <></>
                <ItemWithIcon
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    icon={'logOut'}
                    name={'Log Out'}
                    color={true}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        alignItems: 'center',
        marginTop: h(84),
    },
    userBubbleContainer: {
        width: w(64),
        height: w(64),
    },
    logoContainer: {
        alignItems: 'center',
    },

    modalText: {
        ...commonFonts.regularTextSmall,
        textAlign: 'center',
    },
    avatar: {
        width: w(64),
        height: w(64),
        backgroundColor: Colors.black100,
        borderRadius: w(32),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: w(1),
        borderColor: Colors.black300,
    },
    avatarText: {
        ...commonFonts.boldText,
        fontSize: f(18),
        lineHeight: f(21.6),
        color: Colors.white,
    },
    userName: {
        marginTop: h(12),
        ...commonFonts.boldText,
    },
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    listContainer: {
        marginTop: h(48),
        borderWidth: 1,
        borderColor: Colors.black400,
        paddingHorizontal: h(16),
        paddingVertical: h(11),
        borderRadius: w(8),
        backgroundColor: Colors.black300,
    },
    modalTitle: {
        ...commonFonts.boldText,
        textAlign: 'center',
    },
});

export default ProfileScreen;
