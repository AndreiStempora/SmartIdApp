import { StyleSheet, Text, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import CustomTextButton from '../../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import ConfidenceContainer from '../../../../common/components/smallComponents/confidenceContainer/ConfidenceContainer.tsx';
import CustomImageComponent from '../../../../common/components/smallComponents/imageCompoent/CustomImageComponent.tsx';
import {
    getPhotoSliceData,
    match,
    updateSelectedMatch,
} from '../../../../common/store/slices/photoSlice.tsx';
import { useState } from 'react';
import CustomModal from '../../../../common/components/modals/customModal.tsx';
import { AppDispatch } from '../../../../common/store/store.tsx';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    item: match;
    navigation: any;
    code: string;
    // changeSelectedPos: (confidence: number) => void;
    // fakeResult?: null | string;
};
const MatchesItem = ({
    navigation,
    item,
    code,
}: // changeSelectedPos,
// fakeResult,
Props) => {
    const [showModal, setShowModal] = useState(false);
    const handleSelectMatch = () => {
        setShowModal(true);
    };

    const dispatch = useDispatch<AppDispatch>();
    // const photoSlice = useSelector(getPhotoSliceData);

    const handleModalYes = () => {
        setShowModal(false);
        dispatch(updateSelectedMatch(item));
        navigation.navigate('FullUpload');
    };

    return (
        <View style={styles.itemContainer}>
            <CustomModal
                isVisible={showModal}
                buttons={[
                    {
                        title: 'Cancel',
                        onPress: () => {
                            setShowModal(false);
                        },
                    },
                    {
                        title: 'yes',
                        onPress: () => {
                            handleModalYes();
                        },
                    },
                ]}>
                <Text style={styles.modalText}>
                    Are you sure this is the correct match?
                </Text>
            </CustomModal>
            <View style={styles.imageContainer}>
                <CustomImageComponent
                    image={item.images[0]}
                    btnPosition={{ top: h(2), right: 2 }}
                    resizeMode={'contain'}
                />
                <ConfidenceContainer confidence={item.confidence} />
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.subtitle}</Text>
                <Text style={styles.description}>{item.reference}</Text>
            </View>
            <CustomTextButton
                onPress={handleSelectMatch}
                text={'Match this'}
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
    modalText: {
        ...commonFonts.regularText,
        color: Colors.white,
        textAlign: 'center',
    },
});
export default MatchesItem;
