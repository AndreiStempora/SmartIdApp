import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getItemFromStorage,
    updateItemInStorage,
} from '../../services/stateManager/asyncStorage';
import { RootState } from '../store';

export type Translation = {
    [key: string]: any;
};

type sliceProps = {
    data: Translation | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: undefined | string | null;
};

const initialState: sliceProps = {
    data: {
        dealerships: {
            title: 'Dealerships',
            button: 'add dealership',
            text: 'Franchised car dealerships are the front line for car manufacturers to get their products on the road.',
        },
    },
    status: 'idle',
    error: undefined,
};

export const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTranslationAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(getTranslationAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getTranslationAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateTranslation.pending, state => {
                state.status = 'loading';
            })
            .addCase(updateTranslation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(updateTranslation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getTranslationAsync = createAsyncThunk(
    'translation/getTranslation',
    async () => {
        return await getItemFromStorage('translation');
    }
);

export const updateTranslation = createAsyncThunk(
    'translation/updateTranslation',
    async (language: any) => {
        await updateItemInStorage('translation', language);
        return await getItemFromStorage('translation');
    }
);

export const getTranslation = (state: RootState) => state.translation.data;

export default translationSlice.reducer;
