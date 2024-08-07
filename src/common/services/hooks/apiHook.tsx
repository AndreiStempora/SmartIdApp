// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../../store/store';
// import {
//     getAppDomain,
//     getAppLanguage,
//     getAppToken,
//     updateAppInfo,
// } from '../../store/slices/appSlice.tsx';
// import { updatePageError } from '../../store/slices/errorSlice';
// type BodyObject = {
//     [key: string]: any;
// };
//
// const useApi = () => {
//     const BASE_URL = useSelector(getAppDomain);
//     const token = useSelector(getAppToken);
//     const dispatch = useDispatch<AppDispatch>();
//     const language = useSelector(getAppLanguage);
//     const URL = (url: string) => {
//         const newUrl = BASE_URL.slice(0, -1);
//         if (url.startsWith('/')) {
//             if (language.code === undefined || language.code === '') {
//                 return `${newUrl}${url}`;
//             }
//             return `${BASE_URL}/${language.code}${url}`;
//         }
//         return url;
//     };
//
//     const getRequest = async (url: string) => {
//         try {
//             const response = await axios.get(URL(url));
//             if (response.data.code === '404') {
//                 // console.log('got here');
//                 dispatch(updatePageError(true));
//             }
//             // if (response.data.language !== undefined) {
//             //     // console.log('()()() TEXTS ()()()', response.data.language);
//             //     dispatch(updateTranslation(response.data.language));
//             // }
//             return response.data;
//         } catch (e) {
//             // console.log(e, 'error');
//             dispatch(updatePageError(true));
//         }
//     };
//     const postRequest = async (
//         url: string,
//         obj: BodyObject
//     ) => {
//         console.log(
//             'postRequest',
//             URL(url),
//             token,
//             'token',
//             'obj',
//             obj,
//             setRequestBody(obj)
//         );
//         try {
//             let addBody;
//             const body = setRequestBody(obj);
//             //@ts-ignore
//             if (body._parts.length !== 0) {
//                 addBody = body;
//             }
//
//             const response = await axios.post(URL(url), addBody, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//
//             if (response.data.status === 'error') {
//                 if (response.data.module === 'user/auth') {
//                     await dispatch(
//                         updateAppInfo({ token: '', stack: 'login' })
//                     );
//                 }
//                 // if (response.data.error === 'confirm') {
//                 //     dispatch(updateUserLoggedIn('confirm'));
//                 // }
//                 // if (response.data.module === 'users-addon-2fa') {
//                 //     dispatch(updateUserLoggedIn('2fa'));
//                 // }
//                 if (response.data.code === '404') {
//                     dispatch(updatePageError(true));
//                 }
//             }
//             console.log(response, 'response.data +++');
//             return response.data;
//         } catch (e) {
//             console.log(e, 'error');
//             dispatch(updatePageError(true));
//         }
//     };
//     //
//     const setRequestBody = (obj: BodyObject) => {
//         const formData = new FormData();
//         formData.append('token', token);
//
//         for (let item in obj) {
//             formData.append(item, obj[item]);
//         }
//
//         return formData;
//     };
//
//     return {
//         getRequest,
//         postRequest,
//         setRequestBody,
//     };
// };
//
// export default useApi;
