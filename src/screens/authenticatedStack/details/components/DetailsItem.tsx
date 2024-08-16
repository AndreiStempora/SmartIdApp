import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { w } from '../../../../common/styles/PixelPerfect';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';

type Props = {
    item: {
        title: string;
        value: string;
    };
};
const DetailsItem = ({ item }: Props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: '100%',
        gap: w(16),
    },
    titleContainer: {
        width: '50%',
        paddingRight: w(16),
    },
    valueContainer: {
        width: '50%',
    },
    title: {
        ...commonFonts.regularTextSmall,
        color: Colors.grey100,
    },
    value: {
        ...commonFonts.regularTextSmall,
        color: Colors.white,
    },
});

export default DetailsItem;
