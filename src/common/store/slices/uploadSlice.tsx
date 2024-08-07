import { RootState } from '../store.tsx';
import { createSlice } from '@reduxjs/toolkit';

export const uploadingListSlice = createSlice({
    name: 'uploadingList',
    initialState: {
        list: [],
        uploadedLength: 0,
    },
    reducers: {
        updateUploadingList: (state, action) => {
            // @ts-ignore
            const itemExists = state.list.includes(action.payload);

            if (itemExists) {
                state.list = state.list.filter(item => item !== action.payload);
            } else {
                // @ts-ignore
                state.list.push(action.payload);
            }

            if (action.payload === 'clear') {
                state.list = [];
            }
            console.log(state.list, 'newList');
        },
    },
});
// 5j8tb1h26aa801662
export const { updateUploadingList } = uploadingListSlice.actions;

export const uploadingList = (state: RootState) => state.uploadingList.list;

export default uploadingListSlice.reducer;
