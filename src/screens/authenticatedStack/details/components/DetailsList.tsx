import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useEffect } from 'react';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import DetailsItem from './DetailsItem.tsx';

type Props = {
    item: {
        title: string;
        values: [];
    };
};
const DetailsList = ({ item }: Props) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <FlatList
                scrollEnabled={false}
                data={item.values}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <DetailsItem item={item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        gap: h(16),
    },
    separator: {
        height: h(8),
    },
    listTitle: {
        ...commonFonts.label,
        color: Colors.white,
    },
});

export default DetailsList;
