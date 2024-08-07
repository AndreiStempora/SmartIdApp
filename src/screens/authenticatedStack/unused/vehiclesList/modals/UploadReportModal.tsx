import { StyleSheet, Text } from 'react-native';
import CustomModal from '../../../../../common/components/modals/customModal.tsx';
import React from 'react';
import { commonFonts } from '../../../../../common/styles/constants.tsx';

type Props = {
    isVisible: boolean;
    okPress: () => void;
};
const UploadReportModal = ({ isVisible, okPress }: Props) => {
    return (
        <CustomModal
            isVisible={isVisible}
            buttons={[{ title: 'close', onPress: okPress }]}
            title={'Some pictures could not be uploaded!'}>
            <Text style={styles.text}>
                Please try again or contact support if the problem persists.
            </Text>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        ...commonFonts.regularTextSmall,
    },
});

export default UploadReportModal;
