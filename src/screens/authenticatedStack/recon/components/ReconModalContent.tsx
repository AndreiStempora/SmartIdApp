import React, { useEffect } from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import SelectableButton from '../../../../common/components/buttons/selectableButton/SelectableButton.tsx';
import { h } from '../../../../common/styles/PixelPerfect.tsx';
import CustomWhiteButton from '../../../../common/components/buttons/buttonWhite/CustomWhiteButton.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import useRecon from '../../../../common/services/hooks/reconHook.tsx';
import useText from '../../../../common/services/hooks/textHook.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateUploadedLength,
    uploadingList,
} from '../../../../common/store/slices/uploadSlice.tsx';
import useApiHeaders from '../../../../common/services/hooks/apiHeadersHook.tsx';

const ReconModalContent = ({ nav }: any) => {
    const { t } = useText();
    const { optionsList, item, switchOpenedModal, setRecons } = useRecon();
    const list = useSelector(uploadingList);
    const { postRequest } = useApiHeaders();
    const dispatch = useDispatch();

    const getRecons = async () => {
        const response = await postRequest(
            '/novotradein/app/appraisal/recon',
            {}
        );
        if (response.status === 'ok') {
            setRecons(response.recon);
        }
    };

    useEffect(() => {
        (async () => {
            await getRecons();
        })();
    }, [list]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {item?.name} {t('')}
                </Text>
            </View>
            <View style={styles.fullWidth}>
                {optionsList?.length > 0 && (
                    <SelectableButton buttons={optionsList} />
                )}
            </View>
            <View style={styles.flatListContainer}>
                <ScrollView
                    style={styles.fullHeight}
                    contentContainerStyle={styles.grow}>
                    <FlatList
                        scrollEnabled={false}
                        style={styles.flatList}
                        numColumns={2}
                        columnWrapperStyle={{ gap: h(8) }}
                        data={[
                            ...(item?.values?.images || []),
                            { length2: list.length, last2: true },
                        ]}
                        contentContainerStyle={styles.listContentContainer}
                        ListEmptyComponent={() => (
                            <View style={styles.listContainerEmpty}>
                                <Text style={styles.emptyListText}>
                                    {t('recon.modals.item.emptyListText')}
                                </Text>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <View style={{ width: '50%' }}>
                                {/*@ts-ignore*/}
                                {item.last2 ? (
                                    <>
                                        {/*@ts-ignore*/}
                                        {item.length2 === 0 ? null : (
                                            <View
                                                style={
                                                    styles.uploadingContainer
                                                }>
                                                <View
                                                    style={{
                                                        height: h(92),
                                                        width: '100%',
                                                    }}></View>
                                                <View
                                                    style={
                                                        styles.spinnerContainer
                                                    }>
                                                    <ActivityIndicator
                                                        size={'large'}
                                                        color={Colors.skyBlue}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </>
                                ) : (
                                    <View style={styles.trueImageContainer}>
                                        <Image
                                            style={{
                                                height: h(92),
                                                width: '100%',
                                                resizeMode: 'cover',
                                            }}
                                            //@ts-ignore
                                            source={{ uri: item.src }}
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
            <View style={styles.btnContainer}>
                <CustomWhiteButton
                    text={t('recon.modals.item.buttons.upload')}
                    onPress={() => {
                        switchOpenedModal();
                        nav.navigate('Camera2');
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fullHeight: {
        height: '100%',
    },
    fullWidth: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    trueImageContainer: {
        backgroundColor: Colors.lightBlack,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        flexGrow: 1,
    },
    listContentContainer: {
        gap: h(8),
        height: '100%',
    },
    listContainerEmpty: {
        marginVertical: 'auto',
    },
    emptyListText: {
        ...commonFonts.regularText,
        textAlign: 'center',
        color: Colors.metal,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: h(24),
    },
    title: {
        ...commonFonts.boldText,
    },
    btnContainer: {},
    flatListContainer: {
        paddingVertical: h(24),
        flexShrink: 1,
    },
    flatList: {},
    spinnerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    uploadingContainer: {
        position: 'relative',
    },
});

export default ReconModalContent;
