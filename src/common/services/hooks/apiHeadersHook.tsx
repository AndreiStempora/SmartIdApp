import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
    getAppDomain,
    getAppLanguage,
    getAppraisal,
    getAppToken,
    updateAppInfo,
} from '../../store/slices/appSlice.tsx';
import {
    updateFullPageError,
    updatePageError,
    updatePageErrorDetails,
} from '../../store/slices/errorSlice';
import DeviceInfo from 'react-native-device-info';

type BodyObject = {
    [key: string]: any;
};

const useApiHeaders = () => {
    const appVersion = DeviceInfo.getVersion();
    const BASE_URL = useSelector(getAppDomain);
    const token = useSelector(getAppToken);
    const dispatch = useDispatch<AppDispatch>();
    const appraisal = useSelector(getAppraisal);
    const language = useSelector(getAppLanguage);

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

    const getRequest = async (url: string, freshToken?: string) => {
        try {
            const response = await axios.get(URL(url), {
                headers: {
                    'Novotrade-In': freshToken ? freshToken : token,
                    'App-Version': DeviceInfo.getDeviceId() + '-' + appVersion,
                },
            });
            console.log(response, 'response.data +++');
            if (response.data.status === 'auth') {
                await dispatch(updateAppInfo({ token: '', stack: 'login' }));

                // if (response.data.error === 'confirm') {
                //     dispatch(updateUserLoggedIn('confirm'));
                // }
                // if (response.data.module === 'users-addon-2fa') {
                //     dispatch(updateUserLoggedIn('2fa'));
                // }
            }
            if (response.data.code === '404') {
                // console.log('got here');
                dispatch(
                    updateFullPageError({
                        pageError: true,
                        errorDetails: {
                            url: URL(url),
                            headers: response.headers,
                            body: response.data,
                        },
                    })
                );
            }
            if (
                response.data.status === 'error' &&
                response.data.error === 'appraisal'
            ) {
                console.log('appraisal error');
            }
            // if (response.data.language !== undefined) {
            //     // console.log('()()() TEXTS ()()()', response.data.language);
            //     dispatch(updateTranslation(response.data.language));
            // }
            return response.data;
        } catch (e) {
            console.log(e, 'error ANDREI ()()()()()()()()()()()()()');
            dispatch(updatePageError(true));
        }
    };
    const postRequest = async (url: string, obj: BodyObject, config = {}) => {
        console.log(
            'postRequest',
            URL(url),
            token,
            'token',
            'obj',
            obj,
            appVersion,
            'version',
            setRequestBody(obj)
        );
        try {
            let addBody;
            const body = setRequestBody(obj);
            //@ts-ignore
            if (body._parts.length !== 0) {
                addBody = body;
            }

            const response = await axios.post(URL(url), addBody, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Novotrade-in': token,
                    'App-Version': DeviceInfo.getDeviceId() + '-' + appVersion,
                },
                ...config,
            });

            if (response.data.status === 'auth') {
                await dispatch(updateAppInfo({ token: '', stack: 'login' }));

                // if (response.data.error === 'confirm') {
                //     dispatch(updateUserLoggedIn('confirm'));
                // }
                // if (response.data.module === 'users-addon-2fa') {
                //     dispatch(updateUserLoggedIn('2fa'));
                // }
            }
            if (
                response.data.status === 'error' &&
                response.data.error === 'appraisal'
            ) {
                dispatch(
                    updateAppInfo({ appraisalDeletedModalVisibility: true })
                );
            }
            if (response.data.code === '404') {
                dispatch(updatePageError(true));
            }
            console.log(response, 'response.data +++');
            return response.data;
        } catch (e) {
            if (axios.isCancel(e)) {
                console.error('Operation canceled');
            } else {
                console.log(e, 'error ANDREI ()()()()()()()()()()()()()');
                dispatch(updatePageError(true));

                dispatch(
                    updatePageErrorDetails({
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Novotrade-in': token,
                            'App-Version':
                                DeviceInfo.getDeviceId() + '-' + appVersion,
                        },
                        url: URL(url),
                        body: obj,
                        error3Response: JSON.stringify(e),
                    })
                );
            }
        }
    };
    //
    const setRequestBody = (obj: BodyObject) => {
        const formData = new FormData();
        formData.append('appraisal', appraisal);
        formData.append('code', language);
        for (let item in obj) {
            formData.append(item, obj[item]);
        }

        return formData;
    };

    const errorPostRequest = async (url: string, obj: BodyObject) => {
        const response = await axios.post(URL(url), obj, {
            headers: {
                'Content-Type': 'application/json',
                'Novotrade-in': token,
                'App-Version': DeviceInfo.getDeviceId() + '-' + appVersion,
            },
        });
        console.log(response, 'response 333333333333333 error');
        return response.data;
    };

    return {
        getRequest,
        postRequest,
        setRequestBody,
        errorPostRequest,
    };
};

export default useApiHeaders;
