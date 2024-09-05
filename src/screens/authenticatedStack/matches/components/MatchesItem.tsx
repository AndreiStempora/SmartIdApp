import { StyleSheet, Text, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import CustomTextButton from '../../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import ConfidenceContainer from '../../../../common/components/smallComponents/confidenceContainer/ConfidenceContainer.tsx';
import CustomImageComponent from '../../../../common/components/smallComponents/imageCompoent/CustomImageComponent.tsx';

export type MatchItem = {
    brand: string;
    confidence: number;
    model: string;
    details: {}[];
    images: string[];
    reference: string;
    code?: string;
    position: number;
    selectedPos: boolean;
};
type Props = {
    item: MatchItem;
    navigation: any;
    code: string;
    changeSelectedPos: (confidence: number) => void;
    fakeResult?: null | string;
};
const MatchesItem = ({
    navigation,
    item,
    code,
    changeSelectedPos,
    fakeResult,
}: Props) => {
    const handleSeeDetails = () => {
        console.log('See details', item, code, fakeResult);
        navigation.navigate('Details', {
            ...item,
            code: code,
            fakeResult: fakeResult,
        });
    };
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <CustomImageComponent
                    image={item.images[0]}
                    btnPosition={{ top: h(2), right: 2 }}
                    resizeMode={'contain'}
                />
                <ConfidenceContainer
                    confidence={item.confidence}
                    selectedPos={item.selectedPos}
                    changeSelectedPos={() => {
                        changeSelectedPos(item.position);
                    }}
                />
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
        gap: h(8),
    },
    imageContainer: {
        width: '100%',
        height: h(210),
        backgroundColor: Colors.white,
        borderRadius: w(8),
        marginBottom: h(8),
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        ...commonFonts.label,
        color: Colors.white,
        // backgroundColor: 'red',
    },
    description: {
        ...commonFonts.regularTextSmall,
        color: Colors.white,
    },
    descriptionContainer: {
        gap: h(8),
        // marginBottom: h(16),
        marginBottom: h(8),
        // backgroundColor: 'red',
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
