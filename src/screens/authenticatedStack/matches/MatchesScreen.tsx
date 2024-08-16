import ScreenContainer from '../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { h, w } from '../../../common/styles/PixelPerfect.tsx';

import React, { useEffect, useState } from 'react';
import { Colors, commonFonts } from '../../../common/styles/constants.tsx';
import CustomTextButton from '../../../common/components/buttons/buttonText/CustomTextButton.tsx';
import MatchesItem from './components/MatchesItem.tsx';
import IdHeader from '../../../common/components/screenComponents/bars/headers/IdHeader.tsx';
import useApiHeaders from '../../../common/services/hooks/apiHeadersHook.tsx';
import { useRoute } from '@react-navigation/native';
import { ItemContent } from '../dashboard/DashboardScreen.tsx';

const MatchesScreen = ({ navigation }: any) => {
    const { postRequest } = useApiHeaders();
    const [item, setItem] = useState<ItemContent>({
        title: '',
        subtitle: '',
        date: '',
        tn: '',
        code: '',
        ref: '',
        conf: 0,
    });
    const [matches, setMatches] = useState([]);
    const router = useRoute();
    useEffect(() => {
        console.log(router.params, '<><><>');
        setItem(router.params as ItemContent);
        (async () => {
            const response = await postRequest('/scan', {
                //@ts-ignore
                code: router?.params?.code,
            });
            if (response?.matches !== undefined) {
                setMatches(response.matches);
            }
        })();
    }, []);

    const handleBack = () => {
        navigation.navigate('Dashboard');
    };
    return (
        <ScreenContainer nav={navigation} fullScreen={true}>
            <View style={styles.imageContainer}>
                {item?.tn && (
                    <Image style={styles.img} source={{ uri: item.tn }} />
                )}
            </View>
            <View style={styles.buttonFloater}>
                <IdHeader navigation={navigation} navigate={handleBack} />
            </View>
            <View style={styles.contentContainer}>
                <CustomTextButton
                    onPress={() => {}}
                    text={'Check authenticity'}
                    icon={'verified'}
                />

                <FlatList
                    data={matches}
                    renderItem={({ item }) => {
                        return (
                            <MatchesItem item={item} navigation={navigation} />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: h(16) }} />
                    )}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: h(250),
    },
    buttonFloater: {
        position: 'absolute',
        top: h(0),
        left: w(16),
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(6),
    },
    backBtnContainer: {
        position: 'absolute',
        top: h(16),
        left: w(0),
        backgroundColor: 'rgba(22, 22, 22, 0.24)',
        height: h(52),
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: w(16),
    },
    backBtnText: {
        ...commonFonts.boldText,
    },
    percentContainer: {
        position: 'absolute',
        bottom: h(8),
        right: w(8),
        height: h(43),
        borderWidth: 1,
        borderColor: Colors.black400,
        backgroundColor: Colors.black300,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: w(77),
    },
    percentText: {
        ...commonFonts.regularText,
        color: Colors.lime,
    },
    contentContainer: {
        padding: h(16),
        gap: h(16),
        flex: 1,
    },
});

export default MatchesScreen;
