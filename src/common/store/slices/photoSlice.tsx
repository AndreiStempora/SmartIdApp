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
    selectedMatch: match;
    takenPicturesData: {};
    code: string;
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
    slot: string;
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
    selectedMatch: {
        title: '',
        subtitle: '',
        reference: '',
        id: '',
        confidence: 0,
        images: [],
    },
    takenPicturesData: {},
    code: '',
};

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        updateInitialPhotoDetails: (state, action) => {
            state.initialPhotoDetails = action.payload;
        },
        updateSlotsData: (state, action) => {
            if (state.slotsData.length === 0) {
                state.slotsData = action.payload;
                return;
            }
            state.slotsData = state.slotsData.map((slot: slot) =>
                slot.slot === action.payload.slot
                    ? { ...slot, ...action.payload }
                    : slot
            );
        },
        updateInitialPhotoResponse: (state, action) => {
            state.initialPhotoResponse = action.payload;
        },
        updateSelectedMatch: (state, action) => {
            state.selectedMatch = action.payload;
        },
        updateTakenPicturesData: (state, action) => {
            state.takenPicturesData = {
                ...state.takenPicturesData,
                [action.payload.slot]: action.payload.image,
            };
        },
        updateCode: (state, action) => {
            state.code = action.payload;
        },
    },
});

export const {
    updateInitialPhotoDetails,
    updateSlotsData,
    updateInitialPhotoResponse,
    updateSelectedMatch,
    updateTakenPicturesData,
    updateCode,
} = photoSlice.actions;

export const getPhotoSliceData = (state: RootState) => state.photo;

export const getInitialPhotoDetails = (state: RootState) =>
    state.photo.initialPhotoDetails;

export const getInitialPhotoResponse = (state: RootState) =>
    state.photo.initialPhotoResponse;

export const getSelectedMatch = (state: RootState) => state.photo.selectedMatch;

export const getSlotsData = (state: RootState) => state.photo.slotsData;

export const getTakenPicturesData = (state: RootState) =>
    state.photo.takenPicturesData;

export const getCode = (state: RootState) => state.photo.code;

export default photoSlice.reducer;
