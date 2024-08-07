import ReactNativeBlobUtil from 'react-native-blob-util';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Platform } from 'react-native';
import {
    getAppDomain,
    getAppraisal,
    getAppToken,
} from '../../store/slices/appSlice.tsx';
import useRecon from './reconHook.tsx';

type BodyObject = {
    [key: string]: any;
};

type PictureUpload = {
    image: {
        uri: string;
        type: string;
        name: string;
    };
    vehicle: string;
    spot: number;
};

const useBlob = () => {
    const BASE_URL = useSelector(getAppDomain);
    const token = useSelector(getAppToken);
    const appraisal = useSelector(getAppraisal);
    const { item } = useRecon();

    const setRequestBody = (token: boolean | string, obj: BodyObject) => {
        const formData = new FormData();
        // formData.append('token', token);
        for (let item in obj) {
            formData.append(item, obj[item]);
        }
        return formData;
    };

    const URL = (url: string) => {
        if (url.startsWith('/')) {
            return `${BASE_URL}${url}`;
        }
        return url;
    };
    const download = async (
        url: string,
        token: boolean | string,
        obj: BodyObject
    ) => {
        try {
            const ax = axios.create({ responseType: 'blob' });
            const response = await ax.post(
                URL(url),
                setRequestBody(token, obj),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            // console.log(response, 'response blob');
            const type = response.headers['content-type'];
            const nameMatch = /filename[^;=\n]*=(['"])?([^"';\n]*)\1?/g.exec(
                response.headers['content-disposition']
            );
            if (!nameMatch || !nameMatch[2]) {
                throw new Error('Filename not found in headers.');
            }
            const filePath =
                ReactNativeBlobUtil.fs.dirs.CacheDir + `/${nameMatch[2]}`;

            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = String(reader.result).split(',')[1]; // Get the base64 data part

                ReactNativeBlobUtil.fs
                    .writeFile(filePath, base64Data, 'base64')
                    .then(async () => {
                        if (Platform.OS === 'android') {
                            await ReactNativeBlobUtil.android.actionViewIntent(
                                filePath,
                                type
                            );
                        } else {
                            await ReactNativeBlobUtil.ios.openDocument(
                                filePath
                            );
                        }
                    })
                    .catch(error => {
                        console.log(error, 'error');
                    });
            };

            reader.readAsDataURL(response.data);
            return filePath;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const tryUpload = async (
        file: any,
        counter: number,
        options: any
    ): Promise<any> => {
        try {
            const formData = new FormData();
            for (let item in file) {
                formData.append(item, file[item]);
            }
            // formData.append('token', token);

            console.log(formData, 'formData');
            const response = await axios.post(
                BASE_URL + '/novocapture/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        novocapture: token,
                    },
                    ...options,
                }
            );
            console.log(response, 'response.UPLOAD');
            return response.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                // console.error('Operation canceled',error);
                console.log('Operation canceled', error);
            } else {
                if (counter < 3) {
                    return tryUpload(file, counter + 1, options);
                } else {
                    console.log('upload error', error);
                }
            }
        }
    };

    const upload = async (file: PictureUpload, options = {}) => {
        let tries = 0;
        console.log('test upload', options);
        return await tryUpload(file, tries, options);
    };

    const downloadPics = async (
        url: string,
        token: boolean | string,
        obj: BodyObject
    ) => {
        try {
            const ax = axios.create({ responseType: 'blob' });
            const response = await ax.post(
                URL(url),
                setRequestBody(token, obj),
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('this response', response);
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Data = String(reader.result).split(',')[1]; // Get the base64 data part
                    resolve({
                        data: base64Data,
                        type: response.headers['content-type'],
                    });
                };

                reader.onerror = error => {
                    console.error('Error reading blob data:', error);
                    reject('upload error');
                };

                reader.readAsDataURL(response.data);
            });
        } catch (error) {
            console.log(error, 'error');
            return 'upload error';
        }
    };

    const uploadThis = async (url: string, file: PictureUpload) => {
        let tries = 0;
        return await uploadNew(url, file, tries);
    };

    const uploadThis2 = async (url: string, file: PictureUpload) => {
        let tries = 0;
        return await uploadNew2(url, file, tries);
    };

    const uploadNew2 = (url: string, file: PictureUpload, tries: number) => {
        //@ts-ignore
        const aaa = ReactNativeBlobUtil.wrap(file.replace('file://', ''));
        // const formData = new FormData();
        // formData.append('image', aaa);
        // formData.append('appraisal', appraisal);
        // formData.append('item', item.id);

        return new Promise((resolve, reject) => {
            ReactNativeBlobUtil.fetch(
                'POST',
                BASE_URL + url,
                {
                    'Content-Type': 'multipart/form-data',
                    'Novotrade-in': token,
                },
                [
                    { name: 'appraisal', data: appraisal },
                    { name: 'image', filename: 'image.jpg', data: aaa },
                    { name: 'item', data: item.id },
                ]
            )
                .then((res: any) => {
                    console.log(res, 'res');
                    resolve(res);
                })
                .catch((err: any) => {
                    console.log(err, 'err');
                    if (tries < 3) {
                        uploadNew(url, file, tries + 1);
                    } else {
                        reject('upload error');
                    }
                });
        });
    };

    const uploadNew = (url: string, file: PictureUpload, tries: number) => {
        //@ts-ignore
        const aaa = ReactNativeBlobUtil.wrap(file.replace('file://', ''));
        // const formData = new FormData();
        // formData.append('image', aaa);
        // formData.append('appraisal', appraisal);
        return new Promise((resolve, reject) => {
            ReactNativeBlobUtil.fetch(
                'POST',
                BASE_URL + url,
                {
                    'Content-Type': 'multipart/form-data',
                    'Novotrade-in': token,
                },
                [
                    { name: 'appraisal', data: appraisal },
                    { name: 'image', filename: 'image.jpg', data: aaa },
                ]
            )
                .then((res: any) => {
                    console.log(res, 'res');
                    resolve(res);
                })
                .catch((err: any) => {
                    console.log(err, 'err');
                    if (tries < 3) {
                        uploadNew(url, file, tries + 1);
                    } else {
                        reject('upload error');
                    }
                });
        });
    };

    return {
        download,
        upload,
        downloadPics,
        tryUpload,
        uploadThis,
        uploadThis2,
    };
};

export default useBlob;
