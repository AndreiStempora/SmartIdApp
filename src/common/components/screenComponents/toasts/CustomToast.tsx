import { ToastConfigParams } from 'react-native-toast-message';
import { Text, View, StyleSheet } from 'react-native';
import { f, h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import Icon from '../../icons/Icon.tsx';

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component

    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.

      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    formError: ({ text1 }: ToastConfigParams<any>) => (
        <View style={styles.container}>
            <Icon
                icon={'warning'}
                width={f(24)}
                height={f(24)}
                fill={Colors.error}
            />
            <Text style={styles.text}>{text1}</Text>
        </View>
    ),
    internetError: ({ text1 }: ToastConfigParams<any>) => (
        <View style={styles.container}>
            <Text style={styles.text}>{text1}</Text>
        </View>
    ),
    internetReconnect: ({ text1 }: ToastConfigParams<any>) => (
        <View style={styles.containerSuccess}>
            <Text style={styles.textSuccess}>{text1}</Text>
        </View>
    ),
};

const styles = StyleSheet.create({
    container: {
        borderWidth: h(1),
        borderColor: Colors.error,
        paddingHorizontal: w(16),
        paddingVertical: h(12),
        backgroundColor: Colors.toastBg,
        width: '100%',
        borderRadius: w(8),
        flexDirection: 'row',
        gap: w(12),
        alignItems: 'center',
    },
    containerSuccess: {
        borderWidth: h(1),
        borderColor: Colors.lime,
        paddingHorizontal: w(16),
        paddingVertical: h(12),
        backgroundColor: Colors.toastBg,
        width: '100%',
        borderRadius: w(8),
        flexDirection: 'row',
        gap: w(12),
        alignItems: 'center',
    },
    text: {
        ...commonFonts.regularTitle,
        color: Colors.error,
    },
    textSuccess: {
        ...commonFonts.regularTitle,
        color: Colors.lime,
    },
});
