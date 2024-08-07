import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import HeaderComponent from '../../../../common/components/screenComponents/bars/headers/HeaderComponent.tsx';
import { useSelector } from 'react-redux';
import { getApp } from '../../../../common/store/slices/appSlice.tsx';
import SettingsCategoryItem from '../../../../common/components/Items/customSettingsCategoryItem/CustomSettingsCategoryItem.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import Icon from '../../../../common/components/icons/Icon.tsx';
import handleImagesHook from '../../../../common/services/hooks/handleImagesHook.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import useUtility from '../../../../common/services/hooks/utilityHook.tsx';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

type Props = {
    name: string;
    value: string;
};

export const ListItem = ({ name, value }: Props) => {
    return (
        <View style={styles.liContainer}>
            <Text style={styles.liName}>{name}</Text>
            <Text style={styles.liValue}>{value}</Text>
        </View>
    );
};

const VehicleDetailsScreen = ({ navigation, route }: any) => {
    const app = useSelector(getApp);
    const [date, setDate] = useState('');
    const { readFile, readCarFolder, generatePicturePath } = handleImagesHook();
    const { c, currentSelection } = useUtility();
    const [mainPicture, setMainPicture] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused &&
            (async () => {
                const arg = await readFile(currentSelection.vehicleVin);
                const xxx = await readCarFolder(currentSelection.vehicleVin);
                // c(currentSelection, 'currentSelection.vehicleVin');
                // c(arg, 'arg');
                // c(xxx, 'xxx');
                const photos = arg.spots.filter((x: any) => x.photo !== '');
                if (photos.length) {
                    setMainPicture(
                        generatePicturePath(
                            currentSelection.vehicleVin,
                            photos[0].photo
                        )
                    );
                }
                setDate(arg.date);
            })();
    }, [isFocused]);

    useEffect(() => {}, []);

    const secondTime = useRef(false);

    return (
        <>
            <HeaderComponent title={'Vehicle Details'} backBtn={true} />
            <View style={styles.imageContainer}>
                {mainPicture ? (
                    <Image source={{ uri: mainPicture }} style={styles.image} />
                ) : (
                    <Icon
                        icon={'missingCarPictureIcon'}
                        width={w(48)}
                        height={h(48)}></Icon>
                )}
            </View>
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <Text style={styles.fullName}>
                        <Text style={styles.blueName}>
                            {route.params.vehicle.vehicle_year}{' '}
                            {route.params.vehicle.brand_name}{' '}
                            {route.params.vehicle.model_name}
                        </Text>{' '}
                        <Text style={styles.regularName}>
                            {route.params.vehicle.trim_name}
                        </Text>
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                    {date && <ListItem name={'Created'} value={date} />}
                    <View style={styles.separator}></View>
                    {route.params.vehicle.vehicle_stock && (
                        <ListItem
                            name={'Stock No.'}
                            value={`${route.params.vehicle.vehicle_stock}`}
                        />
                    )}
                    <View style={styles.separator}></View>
                    {route.params.vehicle.vehicle_vin && (
                        <ListItem
                            name={'VIN'}
                            value={`${route.params.vehicle.vehicle_vin}`}
                        />
                    )}
                    <View style={styles.separator}></View>
                    {route.params.vehicle.vehicle_odometer && (
                        <ListItem
                            name={'Odometer'}
                            value={`${route.params.vehicle.vehicle_odometer} Km`}
                        />
                    )}
                </View>
                <FlatList
                    //@ts-ignore
                    data={app.settings}
                    renderItem={({ item }: any) => {
                        return (
                            <SettingsCategoryItem
                                item={item}
                                nav={navigation}
                            />
                        );
                    }}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator}></View>
                    )}
                    keyExtractor={(item: any) => item.id}></FlatList>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: h(24),
        paddingHorizontal: w(24),
        paddingVertical: h(24),
    },
    imageContainer: {
        height: h(176),
        backgroundColor: Colors.lightCharcoal,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameContainer: {},
    fullName: {
        ...commonFonts.boldText,
    },
    blueName: {
        color: Colors.skyBlue,
    },
    regularName: {},
    detailsContainer: {},
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    liContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical:h(8),
        height: h(43),
    },
    liName: {
        ...commonFonts.regularTextSmall,
        color: Colors.metal,
    },
    liValue: {
        ...commonFonts.regularTextSmall,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
export default VehicleDetailsScreen;
