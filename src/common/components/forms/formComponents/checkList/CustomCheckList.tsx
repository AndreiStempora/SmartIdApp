import CheckItem, { OptionItem } from './CheckItem.tsx';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { h } from '../../../../styles/PixelPerfect.tsx';

type Props = {
    list: OptionItem[];
    onChange: (list: OptionItem[]) => void;
};
const CustomCheckList = ({ list, onChange }: Props) => {
    // const [updatedList, setUpdatedList] = useState<OptionItem[]>(list);
    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled={false}
                data={list}
                renderItem={({ item, index }) => {
                    return (
                        <CheckItem
                            item={item}
                            onChange={index => {
                                const updatedList2 = list.map((item, ind) => {
                                    if (index === ind) {
                                        return {
                                            ...item,
                                            selected: !item.selected,
                                        };
                                    } else {
                                        return {
                                            ...item,
                                        };
                                    }
                                });
                                console.log('index', updatedList2);
                                onChange(updatedList2);
                            }}
                            index={index}
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
export default CustomCheckList;
