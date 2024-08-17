import { Image, StyleSheet, Text, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import CustomTextButton from '../../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import ConfidenceContainer from '../../../../common/components/smallComponents/confidenceContainer/ConfidenceContainer.tsx';

export type MatchItem = {
    brand: string;
    confidence: number;
    model: string;
    details: {}[];
    images: string[];
    reference: string;
    code?: string;
};
type Props = {
    item: MatchItem;
    navigation: any;
    code: string;
};
const MatchesItem = ({ item, code, navigation }: Props) => {
    const handleSeeDetails = () => {
        console.log('See details', item, code);
        navigation.navigate('Details', { ...item, code: code });
    };
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{ uri: item.images[0] }} />
                <ConfidenceContainer confidence={item.confidence} />
            </View>

            <Text style={styles.title}>{item.brand}</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.model}</Text>
                <Text style={styles.description}>{item.reference}</Text>
            </View>
            <CustomTextButton
                onPress={handleSeeDetails}
                text={'See Details'}
                background={Colors.black300}
                border={Colors.black400}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        gap: h(16),
    },
    imageContainer: {
        width: '100%',
        height: h(210),
        backgroundColor: Colors.white,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        ...commonFonts.label,
        color: Colors.white,
    },
    description: {
        ...commonFonts.regularTextSmall,
        color: Colors.white,
    },
    descriptionContainer: {
        gap: h(8),
    },
    confidenceContainer: {
        position: 'absolute',
        bottom: h(8),
        right: w(8),
        height: h(43),
        borderWidth: 1,
        borderColor: Colors.black400,
        backgroundColor: Colors.black300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: w(12),
        borderRadius: w(8),
    },
    confidenceText: {
        ...commonFonts.regularText,
        color: Colors.lime,
        textAlign: 'center',
        lineHeight: h(19.2),
    },
    confidenceLow: {
        color: Colors.yellow100,
    },
});
export default MatchesItem;
