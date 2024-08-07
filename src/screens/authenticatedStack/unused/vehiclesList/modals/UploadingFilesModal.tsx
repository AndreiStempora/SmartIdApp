import CustomModal from '../../../../../common/components/modals/customModal.tsx';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import {
    Colors,
    commonFonts,
} from '../../../../../common/styles/constants.tsx';
import { useSelector } from 'react-redux';
import { getSelectedVehicles } from '../../../../../common/store/slices/selectedVehiclesSlice.tsx';
import useHandleImages from '../../../../../common/services/hooks/handleImagesHook.tsx';
import { useEffect, useState } from 'react';
import useBlob from '../../../../../common/services/hooks/blobHook.tsx';
import { h } from '../../../../../common/styles/PixelPerfect.tsx';

type Props = {
    isVisible: boolean;
    cancelPress: () => void;
    nav: any;
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
};
const UploadingFilesModal = ({
    isVisible,
    cancelPress,
    nav,
    setType,
}: Props) => {
    const selectedVehicles = useSelector(getSelectedVehicles);
    const { deleteFolder, readFile, editFile, generatePicturePath } =
        useHandleImages();
    const [picturesUploaded, setPicturesUploaded] = useState(0);
    const [pictureUploadError, setPictureUploadError] = useState(0);
    const [pictureCounter, setPictureCounter] = useState(0);

    const { upload } = useBlob();

    useEffect(() => {
        // (async()=>{
        //
        //     await upload({
        //         image:{
        //             uri: 'file:///storage/emulated/0/Android/data/com.novosteer.novotrade_in.app/files/Pictures/birchwood.novosteer.me/1C4RJHDG9PC523486/mrousavy-5655768760736170505.jpg',
        //             type: 'image/jpg',
        //             name: 'mrousavy-5655768760736170505.jpg'
        //         },
        //         vehicle: '21732',
        //         spot: 1,
        //     }, {signal:abortController.signal})
        //     .then(async(res)=>{
        //         await upload({
        //             image:{
        //                 uri: 'file:///storage/emulated/0/Android/data/com.novosteer.novotrade_in.app/files/Pictures/birchwood.novosteer.me/1C4RJHDG9PC523486/mrousavy-1745857789842822365.jpg',
        //                 type: 'image/jpg',
        //                 name: 'mrousavy-5655768760736170506.jpg'
        //             },
        //             vehicle: '21732',
        //             spot: 2,
        //         }, {signal:abortController.signal})
        //         .then(async(res)=>{
        //             await upload({
        //                 image:{
        //                     uri: 'file:///storage/emulated/0/Android/data/com.novosteer.novotrade_in.app/files/Pictures/birchwood.novosteer.me/1C4RJHDG9PC523486/mrousavy-6224510873569784566.jpg',
        //                     type: 'image/jpg',
        //                     name: 'mrousavy-5655768760736170508.jpg'
        //                 },
        //                 vehicle: '21732',
        //                 spot: 3,
        //             }, {signal:abortController.signal})
        //         })
        //     })
        // })()
        // return ()=>{
        //     setPictureCounter(0)
        // }
    }, []);

    // useEffect(() => {
    //     console.log('signal fired', abortController.signal.aborted)
    // }, [signal]);

    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            if (isVisible) {
                let counter = 0;
                await getNumberOfPictures();
                await uploadEveryPicture(abortController.signal);
            }
        })();

        return () => {
            setPictureCounter(0);
            setPicturesUploaded(0);
            setPictureUploadError(0);
            abortController.abort();
        };
    }, [isVisible]);

    const getNumberOfPictures = async () => {
        for (const vehicle of selectedVehicles) {
            const folder = await readFile(vehicle);
            for (const spot of folder.spots) {
                if (spot.photo !== '' && spot.uploaded === false) {
                    setPictureCounter(prev => prev + 1);
                }
            }
        }
    };

    const uploadEveryPicture = async (signal: any) => {
        try {
            for (const vehicle of selectedVehicles) {
                const folder = await readFile(vehicle);
                for (const spot of folder.spots) {
                    if (spot.photo !== '' && spot.uploaded === false) {
                        const res = await upload(
                            {
                                image: {
                                    uri: generatePicturePath(
                                        vehicle,
                                        spot.photo
                                    ),
                                    type: 'image/jpg',
                                    name: spot.photo.split('/').pop(),
                                },
                                vehicle: folder.car.vehicle_id,
                                spot: Number(spot.id),
                            },
                            { signal: signal }
                        );
                        if (res.status === 'ok') {
                            setPicturesUploaded(prev => prev + 1);
                            await editFile(
                                vehicle,
                                { uploaded: true },
                                '',
                                spot.id
                            );
                        } else {
                            setPictureUploadError(prev => prev + 1);
                        }
                        // spot.uploaded = true;
                        // c(vehicle, 'vehicle')
                        // c(spot, 'spot')
                    }
                }
                // c(await readFile(vehicle), 'folder2')
                // c(folder, 'folder')
            }
        } catch (e) {}
    };

    const deleteUploadedFolders = async () => {
        for (const vehicle of selectedVehicles) {
            const folder = await readFile(vehicle);
            // check if all spots are uploaded
            let allUploaded = true;
            for (const spot of folder.spots) {
                if (spot.uploaded === false) {
                    allUploaded = false;
                }
            }
            if (allUploaded) {
                await deleteFolder(vehicle);
            }
        }
    };

    useEffect(() => {
        (async () => {
            if (picturesUploaded + pictureUploadError === pictureCounter) {
                if (pictureUploadError > 0) {
                    setType('errorReport');
                } else {
                    await deleteUploadedFolders().then(() => {
                        if (pictureCounter > 0) {
                            cancelPress();
                            nav.replace('Vehicles');
                        }
                    });
                }
            }
        })();
    }, [picturesUploaded, pictureUploadError]);

    return (
        <CustomModal
            isVisible={isVisible}
            buttons={[
                {
                    title: pictureCounter > 0 ? 'Cancel' : 'Ok',
                    onPress: () => {
                        cancelPress();
                    },
                },
            ]}
            title={pictureCounter > 0 ? 'Uploading Files...' : 'Upload Error'}
            blueTitle={pictureCounter > 0}>
            {pictureCounter > 0 ? (
                <Text style={styles.text}>
                    {picturesUploaded}/{pictureCounter} files uploaded.
                </Text>
            ) : (
                <Text style={styles.text}>No files to upload.</Text>
            )}
            {pictureUploadError > 0 && (
                <Text style={styles.errorText}>
                    {pictureUploadError} files failed to upload.
                </Text>
            )}
            {pictureCounter > 0 && (
                <ActivityIndicator size={'large'} color={Colors.skyBlue} />
            )}
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        ...commonFonts.regularTextSmall,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: 'red',
        width: '100%',
    },
    backLine: {
        height: h(2),
        width: '100%',
        backgroundColor: Colors.charcoal,
    },
    frontLine: {
        height: h(2),
        width: '50%',
        backgroundColor: '#30578E',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    errorText: {
        ...commonFonts.regularTextSmall,
        color: Colors.error,
    },
});

export default UploadingFilesModal;
