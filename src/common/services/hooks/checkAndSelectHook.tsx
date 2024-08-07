import { useEffect, useState } from 'react';

interface ListItem {
    item: {};
    checked: boolean;
}

// type Props = {
//     unselect: boolean;
// };type Props = {
//     unselect: boolean;
// };

const useCheckSelect = (unselect = false) => {
    const [list, setList] = useState<ListItem[]>([]);
    const [selected, setSelected] = useState<ListItem[]>([]);

    useEffect(() => {
        setSelected(list.filter(item => item.checked));
    }, [list]);

    useEffect(() => {
        return () => {
            console.log('unmounting');
            setList([]);
        };
    }, []);

    const addItemToList = (item: any) => {
        setList(prev => [...prev, { item, checked: false }]);
    };

    const checkThis = (index: number) => {
        setList(prev =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, checked: !item.checked };
                }
                return item;
            })
        );
    };

    const selectThis = (index: number) => {
        // if the item is already selected, unselect it
        if (unselect && list[index].checked) {
            setList(prev =>
                prev.map((item, i) => {
                    if (i === index) {
                        return { ...item, checked: false };
                    }
                    return item;
                })
            );
            return;
        }
        setList(prev =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, checked: true };
                }
                return { ...item, checked: false };
            })
        );
    };

    const isThisSelected = (index: number) => {
        return list[index]?.checked;
    };
    return {
        list,
        addItem: addItemToList,
        checkThis,
        selectThis,
        selected,
        isThisSelected,
    };
};

export default useCheckSelect;
