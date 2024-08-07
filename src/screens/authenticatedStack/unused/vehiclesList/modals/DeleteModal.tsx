import React from 'react';
import CustomModal from '../../../../../common/components/modals/customModal.tsx';
import { StyleSheet, Text } from 'react-native';
import { commonFonts } from '../../../../../common/styles/constants.tsx';

type Props = {
    isVisible: boolean;
    // setIsVisible: () => void;
    yesPress: () => void;
    cancelPress: () => void;
};
const DeleteModal = ({ isVisible, yesPress, cancelPress }: Props) => {
    return (
        <CustomModal
            isVisible={isVisible}
            buttons={[
                { title: 'Cancel', onPress: cancelPress },
                { title: 'Yes', onPress: yesPress },
            ]}
            title={'Are you sure you want to proceed?'}>
            <Text style={styles.text}>
                Please confirm if you want to delete the selected vehicles.
            </Text>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        ...commonFonts.regularTextSmall,
    },
});
export default DeleteModal;
