import ScreenContainer from '../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import { View, Text, StyleSheet } from 'react-native';
import { commonFonts } from '../../common/styles/constants.tsx';
import useText from '../../common/services/hooks/textHook.tsx';

const PlaceholderScreen = ({ navigation }: any) => {
    const { t } = useText();
    return (
        <ScreenContainer
            nav={navigation}
            header={
                <HeaderComponent
                    title={t('placeholder.title')}
                    backBtn={true}
                />
            }>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Content For This Page Comming Soon
                </Text>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...commonFonts.boldTitle,
        textAlign: 'center',
    },
});

export default PlaceholderScreen;
