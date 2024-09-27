import { RootState } from '../store.tsx';
import { createSlice } from '@reduxjs/toolkit';

type selectedItem = {
    [key: string]: string | number;
};
const initialState: selectedItem = {};

export const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState,
    reducers: {
        updateSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
});

export const { updateSelectedItem } = selectedItemSlice.actions;

export const getSelectedItem = (state: RootState) => state.selectedItem;

export default selectedItemSlice.reducer;
