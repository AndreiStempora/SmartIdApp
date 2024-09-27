import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type photo = {
    initialPhotoDetails: {};
    slotsData: slot[];
    initialPhotoResponse: {
        matches: match[];
        images: string[];
        code: string;
    };
};

export type match = {
    title: string;
    subtitle: string;
    reference: string;
    id: string;
    confidence: number;
    images: string[];
};
type slot = {
    id: string;
    name: string;
    required: boolean;
    editable: boolean;
    mask: [];
    src?: string;
};

const initialState: photo = {
    initialPhotoDetails: {},
    slotsData: [],
    initialPhotoResponse: {
        matches: [],
        images: [],
        code: '',
    },
};

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        updateInitialPhotoDetails: (state, action) => {
            state.initialPhotoDetails = action.payload;
        },
        updateSlotsData: (state, action) => {
            state.slotsData = state.slotsData.map((slot: slot) =>
                slot.id === action.payload.id
                    ? { ...slot, ...action.payload }
                    : slot
            );
        },
        updateInitialPhotoResponse: (state, action) => {
            state.initialPhotoResponse = action.payload;
        },
    },
});

export const {
    updateInitialPhotoDetails,
    updateSlotsData,
    updateInitialPhotoResponse,
} = photoSlice.actions;

export const getPhotoSliceData = (state: RootState) => state.photo;

export const getInitialPhotoDetails = (state: RootState) =>
    state.photo.initialPhotoDetails;

export const getInitialPhotoResponse = (state: RootState) =>
    state.photo.initialPhotoResponse;

export const getSlotsData = (state: RootState) => state.photo.slotsData;

export default photoSlice.reducer;
