import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { f, h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { ItemContent } from '../DashboardScreen.tsx';
import { useEffect, useState } from 'react';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../common/store/store.tsx';
import { updateSelectedItem } from '../../../../common/store/slices/selectedItemSlice.tsx';

type Props = {
    item: ItemContent;
    navigation: any;
    grid?: boolean;
};
const ScanItem = ({ item, navigation, grid }: Props) => {
    const [color, setColor] = useState(Colors.white);
    const getOpacityColor = (color: string, opacity: number) => {
        return color + Math.round(opacity * 255).toString(16);
    };
    const dispatch = useDispatch<AppDispatch>();
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
        dispatch(updateSelectedItem(item));
        navigation.navigate('Matches', { ...item });
        // navigation.navigate('Matches');
    };
    return (
        <TouchableOpacity
            onPress={handleSeeDetails}
            style={grid ? styles.mainContainerGrid : styles.mainContainer}>
            <View
                style={
                    grid ? styles.imageContainerGrid : styles.imageContainer
                }>
                <Image
                    style={grid ? styles.imgGrid : styles.img}
                    source={{ uri: item.tn }}
                />
            </View>
            <View
                style={
                    grid ? styles.contentContainerGrid : styles.contentContainer
                }>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={2} style={styles.title}>
                        {item.title} {item.subtitle}
                    </Text>
                </View>
                <View
                    style={
                        grid
                            ? styles.descriptionContainerGrid
                            : styles.descriptionContainer
                    }>
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
                                    width={w(12)}
                                    height={h(12)}
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
        width: w(14),
        height: w(14),
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 0.5,
        // backgroundColor: Colors.white,
    },
    group: {
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(16),
    },
    mainContainerGrid: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.black400,
        borderRadius: 4,
    },
    imageContainer: {
        paddingHorizontal: w(16),
        paddingVertical: h(16),
        borderRightWidth: w(1),
        borderRightColor: Colors.black400,
    },
    imageContainerGrid: {
        paddingHorizontal: w(16),
        paddingVertical: h(16),
        borderBottomWidth: w(1),
        borderBottomColor: Colors.black400,
    },
    img: {
        width: w(48),
        height: h(48),
        resizeMode: 'cover',
        borderRadius: w(2),
    },
    imgGrid: {
        // width: w(136),
        // height: h(136),
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: w(2),
    },
    contentContainer: {
        gap: h(8),
        flex: 1,
        paddingRight: w(16),
    },
    contentContainerGrid: {
        paddingHorizontal: w(16),
        paddingVertical: h(16),
        gap: h(8),
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
    descriptionContainerGrid: {
        // flexDirection: 'row',
        gap: h(8),
        // justifyContent: 'space-between',
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
