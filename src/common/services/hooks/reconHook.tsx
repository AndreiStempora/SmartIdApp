import {
    getItemIndex,
    getOpenedModal,
    getOptionIndex,
    getReconData,
    getReconIndex,
    getReturningFromCamera,
    updateItemIndex,
    updateOpenedModal,
    updateOptionIndex,
    updateReconIndex,
    updateReturningFromCamera,
    resetRecons,
    updateRecons,
    updateDifferentOptionSelected,
    getDifferentOptionSelected,
} from '../../store/slices/reconSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store.tsx';
import {
    Recon,
    Values,
} from '../../../screens/authenticatedStack/recon/components/ReconDrawerItem.tsx';

const useRecon = () => {
    const reconData = useSelector(getReconData);
    const reconIndex = useSelector(getReconIndex);
    const itemIndex = useSelector(getItemIndex);
    const optionIndex = useSelector(getOptionIndex);
    const returnedFromCamera = useSelector(getReturningFromCamera);
    const openedModal = useSelector(getOpenedModal);
    const differentOptionSelected = useSelector(getDifferentOptionSelected);
    const dispatch = useDispatch<AppDispatch>();

    const setReconIndex = (index: number) => {
        if (reconIndex !== index) {
            dispatch(updateReconIndex(index));
        } else {
            dispatch(updateReconIndex(-1));
        }
    };

    const setRecons = (recons: Recon[]) => {
        dispatch(updateRecons(recons));
    };

    const setItemIndex = (index: number) => {
        dispatch(updateItemIndex(index));
    };

    const setOptionIndex = (index: number) => {
        dispatch(updateOptionIndex(index));
    };
    const reset = () => {
        dispatch(resetRecons());
    };
    const returningFromCameraHandler = () => {
        if (returnedFromCamera) {
            dispatch(updateReturningFromCamera(false));
            dispatch(updateOpenedModal(true));
        } else {
            dispatch(resetRecons());
        }
    };

    const setReturnFromCamera = (val: boolean) => {
        dispatch(updateReturningFromCamera(val));
    };

    const switchOpenedModal = () => {
        dispatch(updateOpenedModal(!openedModal));
    };
    const setDifferentOptionSelected = (val: boolean) => {
        dispatch(updateDifferentOptionSelected(val));
    };
    const updateValues = (vals: Values) => {
        // Map through recons to create a new array with updated items
        const newRecons = reconData.recons.map(recon => {
            // Map through items to create a new array with updated values
            const newItems = recon.items.map(item => {
                // Check if the item id matches the vals id
                if (item.id === vals.id) {
                    // console.log('item KKKKKKKKKKKKKKKKKKKKKKK', item, vals);
                    // Create a new item object with updated values
                    return { ...item, values: vals };
                }
                // Return the original item if no match
                return item;
            });

            // console.log('newItems kkkkkkkkkkkkk', newItems);

            // Return a new recon object with updated items
            return { ...recon, items: newItems };
        });

        dispatch(updateRecons(newRecons));
        // Update reconData.recons with the new recons array
        // reconData.recons = newRecons;

        // console.log(reconData.recons, vals);
        // console.log('new recons', newRecons);
    };

    const recon = reconData.recons[reconIndex];
    const itemsList = reconData.recons[reconIndex]?.items;
    const item = itemsList?.[itemIndex];
    const optionsList = itemsList?.[itemIndex]?.options;
    const option = optionsList?.[optionIndex];
    const values = item?.values;

    return {
        reconList: reconData.recons,
        setRecons,
        setReconIndex,
        setItemIndex,
        setOptionIndex,
        switchOpenedModal,
        returningFromCameraHandler,
        setDifferentOptionSelected,
        updateValues,
        setReturnFromCamera,
        reset,
        recon,
        reconIndex,
        itemsList,
        item,
        itemIndex,
        optionsList,
        option,
        optionIndex,
        openedModal,
        returnedFromCamera,
        values,
        differentOptionSelected,
    };
};

export default useRecon;
