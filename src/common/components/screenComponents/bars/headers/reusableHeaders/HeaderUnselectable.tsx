import CustomHeaderIconButton from '../../../../buttons/buttonIcon/CustomHeaderIconButton.tsx';
import HeaderComponent from '../HeaderComponent.tsx';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { f, h, w } from '../../../../../styles/PixelPerfect.tsx';
import { Colors, Fonts } from '../../../../../styles/constants.tsx';
import { AppDispatch } from '../../../../../store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getIsSelectable,
    getSelectAll,
    updateIsSelectable,
    updateSelectAll,
} from '../../../../../store/slices/selectedVehiclesSlice.tsx';

type Props = {
    title: string;
    user: {
        firstName: string;
        lastName: string;
    };
    nav: any;
};

export const UserIcon = ({ user, nav }: any) => {
    return (
        <TouchableOpacity
            onPress={() => {
                nav.navigate('Profile', { user: user });
            }}>
            <View style={styles.userIconContainer}>
                {/*@ts-ignore*/}
                <Text style={styles.userLetter}>
                    {/*// @ts-ignore*/}
                    {Array.from(user.firstName)[0]}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const HeaderUnselectable = ({ title, user, nav }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const isSelectable = useSelector(getIsSelectable);
    const selected = useSelector(getSelectAll);

    return (
        <HeaderComponent
            title={title}
            leftSide={
                isSelectable ? (
                    <CustomHeaderIconButton
                        icon={'closeIcon'}
                        onPress={() => {
                            dispatch(updateIsSelectable(false));
                        }}
                    />
                ) : (
                    <UserIcon user={user} nav={nav} />
                )
            }
            rightSide={
                // isSelectable?
                <CustomHeaderIconButton
                    icon={isSelectable ? 'selectMultipleIcon' : 'dotsIcon'}
                    onPress={() => {
                        isSelectable
                            ? dispatch(updateSelectAll(!selected))
                            : dispatch(updateIsSelectable(!isSelectable));
                    }}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    userIconContainer: {
        width: w(36),
        height: h(36),
        borderRadius: h(500),
        marginHorizontal: w(6),
        marginVertical: h(8),
        backgroundColor: Colors.darkGray,
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
export default HeaderUnselectable;
