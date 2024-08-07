import React from 'react';
import DeleteModal from './DeleteModal.tsx';
import {
    getSelectedVehicles,
    updateIsSelectable,
} from '../../../../../common/store/slices/selectedVehiclesSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import useUtility from '../../../../../common/services/hooks/utilityHook.tsx';
import useHandleImages from '../../../../../common/services/hooks/handleImagesHook.tsx';
import { AppDispatch } from '../../../../../common/store/store.tsx';
import UploadingFilesModal from './UploadingFilesModal.tsx';
import SelectVehicleError from './SelectVehicleError.tsx';
import WifiModal from './WifModal.tsx';
import NetworkModal from '../../../../../common/components/modals/NetworkModal.tsx';
import UploadReportModal from './UploadReportModal.tsx';

type Props = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    type:
        | 'delete'
        | 'upload'
        | 'report'
        | 'selectError'
        | 'wifiError'
        | 'internetError'
        | 'errorReport';
    setType: (
        type:
            | 'delete'
            | 'upload'
            | 'report'
            | 'selectError'
            | 'wifiError'
            | 'internetError'
            | 'errorReport'
    ) => void;
    navigation: any;
};

const MainModal = ({
    showModal,
    setShowModal,
    type,
    setType,
    navigation,
}: Props) => {
    const selectedVehicles = useSelector(getSelectedVehicles);
    const { c } = useUtility();
    const { deleteFolder } = useHandleImages();
    const dispatch = useDispatch<AppDispatch>();

    const handleCloseModal = () => {
        setShowModal(false);
        dispatch(updateIsSelectable(false));
    };

    const handleCloseAndRefresh = () => {
        setShowModal(false);
        dispatch(updateIsSelectable(false));
        navigation.replace('Vehicles');
    };

    const handleDeleteCars = async () => {
        try {
            for (const vehicle of selectedVehicles) {
                await deleteFolder(vehicle);
            }
            dispatch(updateIsSelectable(false));
            navigation.replace('Vehicles');
            setShowModal(false);
        } catch (e) {
            c(e, 'error');
        }
    };

    const handleContinueUpload = () => {
        setType('upload');
    };

    return (
        <>
            {type === 'delete' && (
                <DeleteModal
                    isVisible={showModal}
                    yesPress={handleDeleteCars}
                    cancelPress={handleCloseModal}
                />
            )}
            {type === 'upload' && (
                <UploadingFilesModal
                    isVisible={showModal}
                    cancelPress={handleCloseModal}
                    setType={setType}
                    nav={navigation}
                />
            )}
            {type === 'selectError' && (
                <SelectVehicleError
                    isVisible={showModal}
                    okPress={handleCloseModal}
                />
            )}
            {type === 'wifiError' && (
                <WifiModal
                    isVisible={showModal}
                    okPress={handleCloseModal}
                    continueToUpload={handleContinueUpload}
                />
            )}
            {type === 'internetError' && (
                <NetworkModal
                    isVisible={showModal}
                    okPress={handleCloseModal}
                />
            )}
            {type === 'errorReport' && (
                <UploadReportModal
                    isVisible={showModal}
                    okPress={handleCloseAndRefresh}
                />
            )}
        </>
    );
};

export default MainModal;
