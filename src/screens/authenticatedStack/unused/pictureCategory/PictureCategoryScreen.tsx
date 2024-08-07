import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ScreenContainer from '../../../../common/components/screenComponents/containers/ScreenContainer.tsx';
import HeaderComponent from '../../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import { useSelector } from 'react-redux';
import { getCurrentSelection } from '../../../../common/store/slices/selectedVehiclesSlice.tsx';
import CustomSpot from '../../../../common/components/Items/customSpot/CustomSpot.tsx';
import { Colors } from '../../../../common/styles/constants.tsx';
import { useIsFocused } from '@react-navigation/native';

import useHandleImages from '../../../../common/services/hooks/handleImagesHook.tsx';

const PictureCategoryScreen = ({ navigation }: any) => {
    const vehicle = useSelector(getCurrentSelection);

    const [selectedCategory, setSelectedCategory] = useState({});

    const { getElementsInCategory } = useHandleImages();
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused &&
            (async () => {
                const elements = await getElementsInCategory(
                    vehicle.vehicleVin,
                    vehicle.category
                );
                setSelectedCategory(elements);
            })();
    }, [isFocused]);

    return (
        <ScreenContainer
            nav={navigation}
            header={<HeaderComponent title={'Individual Capture'} />}>
            {/*<CustomSpot item={item} nav={navigation}/>*/}
            <FlatList
                //@ts-ignore
                data={selectedCategory}
                renderItem={({ item }) => (
                    <CustomSpot item={item} nav={navigation} />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyExtractor={item => item.id}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: Colors.gray,
    },
});

export default PictureCategoryScreen;
