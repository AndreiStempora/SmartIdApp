import { FlatList, StyleSheet, View } from 'react-native';
import RadioItem, { Item } from './RadioItem.tsx';
import { h } from '../../../../styles/PixelPerfect.tsx';
import { useEffect, useState } from 'react';
import React from 'react';

type Props = {
    list: Item[];
    onChange: (list: Item[]) => void;
    error: boolean;
};
const CustomRadioList = ({ list, onChange, error }: Props) => {
    const [updatedList, setUpdatedList] = useState<Item[]>(list);

    useEffect(() => {
        onChange(updatedList);
    }, [updatedList]);

    // useEffect(() => {
    //     const updatedList = list.map((item: ScanItem) => {
    //         return {
    //             ...item,
    //             selected: false,
    //         };
    //     });
    //     setUpdatedList(updatedList);
    // }, []);

    const changeSelected = (index: number) => {
        const updatedList = list.map((item: Item, ind: number) => {
            if (ind === index) {
                return {
                    ...item,
                    selected: true,
                };
            } else {
                return {
                    ...item,
                    selected: false,
                };
            }
        });
        setUpdatedList(updatedList);
    };

    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled={false}
                data={updatedList}
                renderItem={({ item, index }) => {
                    return (
                        <RadioItem
                            error={error}
                            item={item}
                            unselect={false}
                            index={index}
                            onChange={(index: number) => {
                                changeSelected(index);
                            }}
                        />
                    );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: h(24),
    },
    separator: {
        height: h(8),
    },
});

export default CustomRadioList;
