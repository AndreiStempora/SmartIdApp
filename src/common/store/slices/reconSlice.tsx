import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.tsx';
import { Recon } from '../../../screens/authenticatedStack/recon/components/ReconDrawerItem.tsx';

type ReconData = {
    recons: Recon[];
    reconSelectedIndex: number;
    itemSelectedIndex: number;
    optionSelectedIndex: number;
    differentOptionSelected: boolean;
    returningFromCamera: boolean;
    openedModal: boolean;
};

type sliceProps = {
    data: ReconData;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: undefined | string | null;
};

const initState = {
    recons: [],
    reconSelectedIndex: -1,
    itemSelectedIndex: -1,
    optionSelectedIndex: -1,
    differentOptionSelected: false,
    returningFromCamera: false,
    openedModal: false,
};

export const ReconSlice = createSlice({
    name: 'recon',
    initialState: {
        data: initState,
        status: 'idle',
        error: null,
    } as sliceProps,
    reducers: {
        resetRecons: state => {
            state.data = initState;
        },
        updateRecons: (state, action) => {
            state.data.recons = action.payload;
        },
        updateReconIndex: (state, action) => {
            state.data.reconSelectedIndex = action.payload;
        },
        updateItemIndex: (state, action) => {
            state.data.itemSelectedIndex = action.payload;
        },
        updateOptionIndex: (state, action) => {
            state.data.optionSelectedIndex = action.payload;
        },
        updateReturningFromCamera: (state, action) => {
            state.data.returningFromCamera = action.payload;
        },
        updateOpenedModal: (state, action) => {
            state.data.openedModal = action.payload;
        },
        updateDifferentOptionSelected: (state, action) => {
            state.data.differentOptionSelected = action.payload;
        },
    },
});

export const {
    updateRecons,
    updateReconIndex,
    updateItemIndex,
    updateOptionIndex,
    updateReturningFromCamera,
    updateOpenedModal,
    resetRecons,
    updateDifferentOptionSelected,
} = ReconSlice.actions;

export const getReconData = (state: RootState) => state.recon.data;
export const getReconIndex = (state: RootState) =>
    state.recon.data.reconSelectedIndex;
export const getItemIndex = (state: RootState) =>
    state.recon.data.itemSelectedIndex;
export const getOptionIndex = (state: RootState) =>
    state.recon.data.optionSelectedIndex;
export const getReturningFromCamera = (state: RootState) =>
    state.recon.data.returningFromCamera;
export const getOpenedModal = (state: RootState) =>
    state.recon.data.openedModal;
export const getDifferentOptionSelected = (state: RootState) =>
    state.recon.data.differentOptionSelected;
export default ReconSlice.reducer;
