import { StyleSheet, Text, View } from 'react-native';
import { h, w } from '../../../styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';

type Props = {
    name: string;
    value: string;
};

export const ListItem = ({ name, value }: Props) => {
    return (
        <View style={styles.liContainer}>
            <Text style={styles.liName}>{name}</Text>
            <Text style={styles.liValue}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    liContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical:h(8),
        // minHeight: h(47),
        gap: w(16),
    },
    liName: {
        ...commonFonts.regularTextSmall,
        color: Colors.metal,
    },
    liValue: {
        ...commonFonts.regularTextSmall,
        flexShrink: 1,
        paddingVertical: h(12),
        // flexGrow: 1,
    },
});

export default ListItem;
