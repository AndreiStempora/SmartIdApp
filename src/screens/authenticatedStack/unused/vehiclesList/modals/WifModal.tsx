import CustomModal from '../../../../../common/components/modals/customModal.tsx';
import { StyleSheet, Text } from 'react-native';
import { commonFonts } from '../../../../../common/styles/constants.tsx';

type Props = {
    isVisible: boolean;
    okPress: () => void;
    continueToUpload: () => void;
};
const WifiModal = ({ isVisible, okPress, continueToUpload }: Props) => {
    return (
        <CustomModal
            isVisible={isVisible}
            title={'You are not on a wifi connection!'}
            buttons={[
                { title: 'Close', onPress: okPress },
                { title: 'Continue', onPress: continueToUpload },
            ]}>
            <Text style={styles.text}>
                It is strongly advised that you switch to wifi before uploading
                pictures, to avoid unexpected high costs
            </Text>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        ...commonFonts.regularTextSmall,
    },
});

export default WifiModal;
