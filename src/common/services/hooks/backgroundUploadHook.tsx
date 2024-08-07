import { useDispatch, useSelector } from 'react-redux';
import {
    getApp,
    getAppDomain,
    getAppLanguage,
    getAppraisal,
    getAppToken,
    updateAppInfo,
} from '../../store/slices/appSlice.tsx';

import useRecon from './reconHook.tsx';
import Upload from 'react-native-background-upload';
import { AppDispatch } from '../../store/store.tsx';
import { Platform } from 'react-native';
import {
    updateUploadingList,
    uploadingList,
} from '../../store/slices/uploadSlice.tsx';

const useBackgroundUpload = () => {
    const BASE_URL = useSelector(getAppDomain);
    const language = useSelector(getAppLanguage);
    const token = useSelector(getAppToken);
    const appraisal = useSelector(getAppraisal);
    const { item } = useRecon();
    const dispatch = useDispatch<AppDispatch>();
    const list = useSelector(uploadingList);
    const app = useSelector(getApp);

    const URL = (url: string) => {
        const newUrl = BASE_URL.slice(0, -1);
        if (url.startsWith('/')) {
            //@ts-ignore
            if (language.code === undefined || language.code === '') {
                return `${newUrl}${url}`;
            }
            //@ts-ignore
            return `${BASE_URL}/${language.code}${url}`;
        }
        return url;
    };

    const func = async (options: any) => {
        try {
            const uploadId = await Upload.startUpload(options);
            console.log('Upload started', uploadId, options, app);

            if (Platform.OS === 'android' && !app.uploadServiceEnabled) {
                return await new Promise((resolve, reject) => {
                    Upload.addListener('progress', uploadId, data => {
                        console.log(`Progress: ${data.progress}%`);
                    });

                    Upload.addListener('error', uploadId, data => {
                        console.log(`Error: ${data.error}`);
                        reject(data);
                    });

                    Upload.addListener('cancelled', uploadId, data => {
                        console.log('Cancelled!', data);
                        reject(data);
                    });

                    Upload.addListener('completed', uploadId, data => {
                        // data includes responseCode: number and responseBody: Object

                        if (data.responseCode === 200) {
                            console.log('i am here', data.responseBody);
                            const response = JSON.parse(data.responseBody);
                            if (
                                response.status === 'error' &&
                                response.error === 'appraisal'
                            ) {
                                dispatch(
                                    updateAppInfo({
                                        appraisalDeletedModalVisibility: true,
                                    })
                                );
                            }
                        }
                        resolve(data);
                    });
                });
            } else {
                Upload.addListener('progress', uploadId, data => {
                    console.log(`Progress: ${data.progress}%`);
                });

                Upload.addListener('error', uploadId, data => {
                    console.log(`Error: ${data.error}`);
                });

                Upload.addListener('cancelled', uploadId, data => {
                    console.log('Cancelled!', data);
                });

                Upload.addListener('completed', uploadId, data => {
                    // data includes responseCode: number and responseBody: Object
                    console.log('Completed!3333', data);

                    if (data.responseCode === 200) {
                        const response = JSON.parse(data.responseBody);

                        if (
                            response.status === 'error' &&
                            response.error === 'appraisal'
                        ) {
                            dispatch(
                                updateAppInfo({
                                    appraisalDeletedModalVisibility: true,
                                })
                            );
                        }
                        if (response.status === 'ok') {
                            dispatch(updateUploadingList(options.path));
                        }
                    }
                });
            }
        } catch (err) {
            console.log('Upload error!', err);
            await func(options); // Retry the upload on error
        }
    };

    const upload = async (url: string, pic: string) => {
        console.log(
            url,
            URL(url),
            BASE_URL,
            'caca maca',

            list.length
        );
        const time = new Date().getTime();
        console.log('time', time, 'appraisal', appraisal, 'token', token);
        const options = {
            url: BASE_URL + url,
            path: pic,
            method: 'POST',
            type: 'multipart',
            field: 'image',
            parameters: {
                appraisal: appraisal,
                timeStamp: String(time),
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Novotrade-in': token,
            },
        };

        dispatch(updateUploadingList(options.path));
        //@ts-ignore
        return await func(options);
    };

    const upload2 = async (url: string, pic: string) => {
        const time = new Date().getTime();
        console.log('time', time, 'appraisal', appraisal, 'token', token);
        const options = {
            url: URL(url),
            path: pic,
            method: 'POST',
            type: 'multipart',
            field: 'image',
            parameters: {
                appraisal: appraisal,
                item: item.id,
                timeStamp: String(time),
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Novotrade-in': token,
            },
        };
        dispatch(updateUploadingList(options.path));

        await func(options);
    };

    return { upload, upload2 };
};

export default useBackgroundUpload;
