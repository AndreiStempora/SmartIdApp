import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { f, h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { ItemContent } from '../DashboardScreen.tsx';
import { useEffect, useState } from 'react';
import Icon from '../../../../common/components/icons/Icon.tsx';

type Props = {
    item: ItemContent;
    navigation: any;
};
const ScanItem = ({ item, navigation }: Props) => {
    const [color, setColor] = useState(Colors.white);
    const getOpacityColor = (color: string, opacity: number) => {
        return color + Math.round(opacity * 255).toString(16);
    };
    const formatDate = (ms: string) => {
        const date = new Date(Number(ms));
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (item.fakeResult === '1') {
            setColor(Colors.error);
        }
        if (item.fakeResult === '2') {
            setColor(Colors.yellow100);
        }
        if (item.fakeResult === '3') {
            setColor(Colors.lime);
        }
    }, []);

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
                        {item.title} {item.subtitle}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.group}>
                        {item.fakeResult !== null && (
                            <View
                                style={[
                                    styles.iconBackground,
                                    {
                                        backgroundColor: getOpacityColor(
                                            color,
                                            0.15
                                        ),
                                        borderColor: color,
                                    },
                                ]}>
                                <Icon
                                    icon={'verified'}
                                    width={w(10)}
                                    height={h(10)}
                                    fill={color}
                                    stroke={color}
                                />
                            </View>
                        )}
                        <Text style={styles.ref} numberOfLines={1}>
                            {item.ref}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={styles.description}>
                        {formatDate(item.date)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconBackground: {
        width: w(12),
        height: w(12),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        // backgroundColor: Colors.white,
    },
    group: {
        // height: h(12),
        // backgroundColor: 'red',
        flexDirection: 'row',
        gap: w(8),
        alignItems: 'center',
    },
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
    descriptionContainer: {
        flexDirection: 'row',
        gap: w(24),
        justifyContent: 'space-between',
    },
    title: {
        ...commonFonts.boldText,
        fontSize: f(14),
        lineHeight: h(16.8),
        overflow: 'hidden',
        // backgroundColor: 'green',
    },
    description: {
        ...commonFonts.regularText,

        color: Colors.grey100,
        fontSize: f(12),
        lineHeight: h(14.4),
    },
    ref: {
        ...commonFonts.regularText,
        overflow: 'hidden',
        color: Colors.white,
        flexShrink: 1,
        fontSize: f(12),
        lineHeight: h(14.4),
    },
});

export default ScanItem;
