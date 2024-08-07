import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

type selectedVehicles = {
    selectedVehicles: string[];
    isSelectable: boolean;
    selectAll: boolean;
    currentSelection: {
        vehicleVin: string;
        category: string;
        spot: string;
        picture: string;
    };
};

const initialState: selectedVehicles = {
    selectedVehicles: [],
    isSelectable: false,
    selectAll: false,
    // fullVehicleList:[],

    currentSelection: {
        vehicleVin: '',
        category: '',
        spot: '',
        picture: '',
    },
};

export const selectedVehiclesSlice = createSlice({
    name: 'selectedVehicles',
    initialState,
    reducers: {
        // updateVehicleList: (state, action) => {
        //     state.fullVehicleList = action.payload;
        // },
        updateSelectedVehicles: (state, action) => {
            state.selectedVehicles = action.payload;
        },
        updateIsSelectable: (state, action) => {
            state.isSelectable = action.payload;
        },
        updateSelectAll: (state, action) => {
            state.selectAll = action.payload;
        },
        updateCurrentVehicle: (state, action) => {
            state.currentSelection = {
                ...state.currentSelection,
                ...action.payload,
            };
        },
    },
});

export const {
    updateSelectedVehicles,
    updateIsSelectable,
    updateSelectAll,
    updateCurrentVehicle,
} = selectedVehiclesSlice.actions;

export const getSelectedVehicles = (state: RootState) =>
    state.selectedVehicles.selectedVehicles;
export const getIsSelectable = (state: RootState) =>
    state.selectedVehicles.isSelectable;
export const getSelectAll = (state: RootState) =>
    state.selectedVehicles.selectAll;
export const getCurrentSelection = (state: RootState) =>
    state.selectedVehicles.currentSelection;

export default selectedVehiclesSlice.reducer;
