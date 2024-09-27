import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import errorReducer from './slices/errorSlice';
import translationReducer from './slices/translationSlice';
import selectedVehiclesReducer from './slices/selectedVehiclesSlice';
import reconSliceReducer from './slices/reconSlice';
import uploadingListReducer from './slices/uploadSlice';
import selectedItemReducer from './slices/selectedItemSlice.tsx';
import photoSliceReducer from './slices/photoSlice.tsx';

export const store = configureStore({
    reducer: {
        app: appReducer,
        errors: errorReducer,
        translation: translationReducer,
        selectedVehicles: selectedVehiclesReducer,
        recon: reconSliceReducer,
        uploadingList: uploadingListReducer,
        selectedItem: selectedItemReducer,
        photo: photoSliceReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
