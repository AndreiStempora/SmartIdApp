import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Item } from './ReconDrawerItem.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import useRecon from '../../../../common/services/hooks/reconHook.tsx';

type Props = {
    item: Item;
    i: number;
};
const ReconItem = ({ item, i }: Props) => {
    const { itemsList, setItemIndex, switchOpenedModal } = useRecon();

    const getName = (str: string | undefined | null) => {
        if (!str) return '-';
        const name = item.options.filter(option => option.oid === str)[0]?.name;
        return name?.length > 0 ? name : '-';
    };
    return (
        <View style={[itemsList?.length - 1 !== i && styles.separator]}>
            <TouchableOpacity
                onPress={() => {
                    setItemIndex(i);
                    switchOpenedModal();
                }}>
                <View style={[styles.container]}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.condition}>
                        {getName(item.values?.oid)}
                    </Text>
                    <Text style={styles.details}>
                        {item.values?.images?.length &&
                            item.values?.images?.length + ' photos'}
                    </Text>
                    <View style={styles.iconContainer}>
                        <Icon
                            icon={'settings'}
                            width={w(24)}
                            height={h(24)}></Icon>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: h(44),
        alignItems: 'center',
    },
    separator: {
        borderBottomWidth: h(2),
        borderBottomColor: Colors.gray,
    },
    name: {
        ...commonFonts.regularTextSmall,
        color: Colors.silver,
        marginRight: w(24),
    },
    condition: {
        ...commonFonts.regularTextSmall,
        flexGrow: 1,
    },
    details: {
        ...commonFonts.regularTextSmall,
        color: Colors.skyBlue,
    },
    iconContainer: {
        width: w(46),
        height: h(44),
        // backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ReconItem;
