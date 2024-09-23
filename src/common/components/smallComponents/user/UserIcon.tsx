import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { f, h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, Fonts } from '../../../styles/constants.tsx';
import useApiHeaders from '../../../services/hooks/apiHeadersHook.tsx';
import { getApp } from '../../../store/slices/appSlice.tsx';
import { useSelector } from 'react-redux';

const UserIcon = ({ nav }: any) => {
    const { getRequest } = useApiHeaders();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
    });

    const app = useSelector(getApp);

    useEffect(() => {
        if (app.domain === '') {
            return;
        }
        (async () => {
            const response = await getRequest('/user');
            // console.log('response', response);
            if (response?.status === 'ok') {
                setUser(response.user);
            }
        })();
    }, [app.domain]);

    return (
        <TouchableOpacity
            style={styles.mainContainer}
            onPress={() => {
                nav.navigate('Profile', { user: user });
            }}>
            <View style={styles.userIconContainer}>
                {/*@ts-ignore*/}
                <Text style={styles.userLetter}>
                    {Array.from(user.firstName)[0]}
                    {Array.from(user.lastName)[0]}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: h(6),
    },
    userIconContainer: {
        width: h(40),
        height: h(40),
        borderRadius: h(500),
        marginHorizontal: w(8),
        marginVertical: h(8),
        backgroundColor: Colors.black400,
        borderWidth: h(1),
        borderColor: Colors.black400,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    userLetter: {
        fontFamily: Fonts.Semi,
        fontSize: f(16),
        lineHeight: f(20.8),
        color: Colors.white,
    },
});

export default UserIcon;
