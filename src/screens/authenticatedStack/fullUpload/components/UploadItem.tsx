import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import Icon from '../../../../common/components/icons/Icon.tsx';
import boldBigWatch from '../../../../../assets/generatedIcons/BoldBigWatch.tsx';

const UploadItem = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Icon
                    icon={'boldBigWatch'}
                    width={w(40)}
                    height={h(40)}
                    fill={Colors.black500}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    boldBigWatch from '../../../../../assets/ge ne ra
                    tedIcons/BoldBigWatch.tsx
                </Text>
            </View>
            <TouchableOpacity style={styles.localButtonContainer}>
                <Icon icon={'camera'} width={w(24)} height={h(24)} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        borderWidth: w(1),
        borderColor: Colors.black400,
        borderRadius: w(4),
        padding: w(16),
        gap: w(16),
        flexDirection: 'column',
        backgroundColor: Colors.black300,
        maxWidth: '50%',
    },
    imageContainer: {
        width: w(136),
        height: h(136),
        borderWidth: w(1),
        borderColor: Colors.black500,
        borderRadius: w(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...commonFonts.boldTitle,
        color: Colors.white,
        textAlign: 'center',
    },
    localButtonContainer: {
        width: '100%',
        borderRadius: w(4),
        borderWidth: w(1),
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: h(56),
    },
});

export default UploadItem;
