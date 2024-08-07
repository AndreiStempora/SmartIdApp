import CustomModal from '../../../../../common/components/modals/customModal.tsx';
import { StyleSheet, Text } from 'react-native';
import { commonFonts } from '../../../../../common/styles/constants.tsx';

type Props = {
    isVisible: boolean;
    okPress: () => void;
};
const SelectVehicleError = ({ isVisible, okPress }: Props) => {
    return (
        <CustomModal
            isVisible={isVisible}
            buttons={[{ title: 'Ok', onPress: okPress }]}
            title={'Error'}>
            <Text style={styles.text}>You did not select any vehicles!</Text>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        ...commonFonts.regularTextSmall,
    },
});

export default SelectVehicleError;
