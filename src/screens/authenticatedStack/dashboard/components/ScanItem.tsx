import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { useEffect } from 'react';
import { ItemContent } from '../DashboardScreen.tsx';

type Props = {
    item: ItemContent;
    navigation: any;
};
const ScanItem = ({ item, navigation }: Props) => {
    const formatDate = (ms: string) => {
        const date = new Date(Number(ms));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    // useEffect(() => {
    //     console.log('ScanItem', item);
    // }, []);
    const handleSeeDetails = () => {
        navigation.navigate('Matches', { ...item });
    };
    return (
        <TouchableOpacity
            onPress={handleSeeDetails}
            style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{ uri: item.tn }} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={2} style={styles.title}>
                        {item.title}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text numberOfLines={1} style={styles.description}>
                        {formatDate(item.date)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        minHeight: h(72),
        borderWidth: 1,
        borderColor: Colors.black400,
        backgroundColor: Colors.black300,
        borderRadius: 4,
        paddingHorizontal: w(16),
        paddingVertical: h(12),
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(16),
    },
    imageContainer: {
        width: w(48),
        height: h(48),
        borderWidth: 1,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        gap: h(8),
        flex: 1,
    },
    titleContainer: {
        // backgroundColor: 'red',
        // height: 20,
    },
    descriptionContainer: {},
    title: {
        ...commonFonts.boldText,
        lineHeight: h(19.2),
        overflow: 'hidden',
        // backgroundColor: 'green',
    },
    description: {
        ...commonFonts.regularText,
        lineHeight: h(16.8),
        color: Colors.grey100,
    },
});

export default ScanItem;
