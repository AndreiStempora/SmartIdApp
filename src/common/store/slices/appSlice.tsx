import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
    getItemFromStorage,
    updateItemInStorage,
} from '../../services/stateManager/asyncStorage.tsx';
import { App } from '../../tsTypes/commonTypes.tsx';

type sliceProps = {
    data: App;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: undefined | string | null;
};

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        data: {
            stack: 'dealership',
            domain: '',
            token: '',
            appraisal: '',
            searchWord: '',
            language: 'en',
            dealerships: [],
            appraisalDeletedModalVisibility: false,
            photoUploadingList: [],
            uploadServiceEnabled: true,
        },
        status: 'idle',
        error: null,
    } as sliceProps,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAppInfo.pending, state => {
                state.status = 'loading';
            })
            .addCase(getAppInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getAppInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateAppInfo.pending, state => {
                state.status = 'loading';
            })
            .addCase(updateAppInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(updateAppInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getAppInfo = createAsyncThunk(
    'app/getAppInfo',
    async () => await getItemFromStorage('app')
);

export const updateAppInfo = createAsyncThunk(
    'app/updateAppInfo',
    async (obj: object) => {
        await updateItemInStorage('app', obj);
        return await getItemFromStorage('app');
    }
);

export const getAppStack = (state: RootState) => state.app.data.stack;
export const getAppDomain = (state: RootState) => state.app.data.domain;
export const getAppToken = (state: RootState) => state.app.data.token;
export const getAppLanguage = (state: RootState) => state.app.data.language;
export const getAppraisal = (state: RootState) => state.app.data.appraisal;
export const getAppDealerships = (state: RootState) =>
    state.app.data.dealerships;
export const getApp = (state: RootState) => state.app.data;
export const getAppraisalDeletedModalVisibility = (state: RootState) =>
    state.app.data.appraisalDeletedModalVisibility;

export default AppSlice.reducer;
