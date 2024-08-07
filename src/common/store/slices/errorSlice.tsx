import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

type errors = {
    pageError: boolean;
    errorDetails: any;
};

const initialState: errors = {
    pageError: false,
    errorDetails: undefined,
};

export const errorsSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        updatePageError: (state, action) => {
            state.pageError = action.payload;
        },
        updatePageErrorDetails: (state, action) => {
            state.errorDetails = action.payload;
        },
        updateFullPageError: (state, action) => {
            state.pageError = action.payload.pageError;
            state.errorDetails = action.payload.errorDetails;
        },
    },
});

export const { updatePageError, updatePageErrorDetails, updateFullPageError } =
    errorsSlice.actions;

export const getErrors = (state: RootState) => state.errors;
export const getPageErrorDetails = (state: RootState) =>
    state.errors.errorDetails;
export const getPageError = (state: RootState) => state.errors.pageError;
export default errorsSlice.reducer;
