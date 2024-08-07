import {
    FlatList,
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors, commonFonts } from '../../../../common/styles/constants.tsx';
import { useEffect, useState } from 'react';
import ReconItem from './ReconItem.tsx';
import useRecon from '../../../../common/services/hooks/reconHook.tsx';

export type Option = {
    oid: string;
    name: string;
    color: string;
    bg: string;
};
export type Values = {
    id: string;
    oid: string;
    images: string[];
    note: string | null;
    note_dealer: string | null;
    price: string | null;
};
export type Item = {
    id: string;
    name: string;
    options: Option[];
    values: Values;
    cid: string;
};
export type Recon = {
    cid: string;
    name: string;
    items: Item[];
};
type Props = {
    recon: Recon;
    i: number;
    icon: string;
};

const ReconDrawerItem = ({ recon, i, icon }: Props) => {
    const [opened, setOpened] = useState(false);
    const { setReconIndex, reconIndex, reconList } = useRecon();
    const [completedItems, setCompletedItems] = useState(0);

    useEffect(() => {
        if (reconIndex === i) {
            setOpened(true);
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental &&
                    UIManager.setLayoutAnimationEnabledExperimental(true);
            } else {
                LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                );
            }
        } else {
            setOpened(false);
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
            );
        }
    }, [reconIndex]);

    useEffect(() => {
        let count = 0;
        recon.items.forEach(item => {
            if (item.values?.oid?.length > 0) {
                count++;
            }
        });
        setCompletedItems(count);
    }, []);

    return (
        <View
            style={[
                styles.mainContainer,
                reconList.length - 1 !== i && styles.separatorStyle,
                opened && styles.separatorFocusedStyle,
            ]}>
            <TouchableOpacity
                onPress={() => {
                    setReconIndex(i);
                }}>
                <View style={styles.innerContainer}>
                    <Icon
                        icon={icon}
                        width={w(24)}
                        height={h(24)}
                        fill={opened ? Colors.skyBlue : Colors.white}
                    />
                    <View style={styles.itemTitleContainer}>
                        <Text
                            style={[
                                styles.itemTitleText,
                                opened && styles.textBlue,
                            ]}>
                            {recon?.name} ({completedItems}/
                            {recon?.items?.length})
                        </Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon
                            icon={opened ? 'arrowCircleUp' : 'arrowCircleDown'}
                            width={w(24)}
                            height={h(24)}
                            fill={opened ? Colors.skyBlue : Colors.white}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={[styles.bodyContainer, opened && { height: 'auto' }]}>
                <FlatList
                    data={recon.items}
                    renderItem={({ item, index }) => {
                        return <ReconItem i={index} item={{ ...item }} />;
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        borderBottomColor: Colors.gray,
    },
    separatorStyle: {
        borderBottomWidth: h(2),
        borderBottomColor: Colors.gray,
    },
    separatorFocusedStyle: {
        borderBottomColor: Colors.skyBlue,
    },
    innerContainer: {
        height: h(72),
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitleContainer: {
        flexGrow: 1,
        marginLeft: w(16),
    },
    itemTitleText: {
        ...commonFonts.boldTitle,
    },
    textBlue: {
        color: Colors.skyBlue,
    },
    separator: {
        height: h(2),
        backgroundColor: Colors.gray,
    },
    iconContainer: {
        width: w(56),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyContainer: {
        height: h(0),
        overflow: 'hidden',
    },
});

export default ReconDrawerItem;
