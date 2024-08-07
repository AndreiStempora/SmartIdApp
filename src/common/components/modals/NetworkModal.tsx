import React from 'react';
import CustomModal from './customModal.tsx';
import { StyleSheet, Text } from 'react-native';
import { commonFonts } from '../../styles/constants.tsx';

type Props = {
    isVisible: boolean;
    okPress: () => void;
};

const NetworkModal = ({ isVisible, okPress }: Props) => {
    return (
        <CustomModal
            isVisible={isVisible}
            buttons={[{ title: 'Ok', onPress: okPress }]}
            title={'No internet connection'}>
            <Text style={styles.text}>
                Please check your internet connection and try again!
            </Text>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        ...commonFonts.regularTextSmall,
    },
});

export default NetworkModal;
