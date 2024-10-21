import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { h, w } from '../../../../common/styles/PixelPerfect.tsx';
import { Colors } from '../../../../common/styles/constants.tsx';
import { useEffect, useRef, useState } from 'react';
import Icon from '../../../../common/components/icons/Icon.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../common/store/store.tsx';
import { getPhotoSliceData } from '../../../../common/store/slices/photoSlice.tsx';
import { useIsFocused } from '@react-navigation/native';
import useBlob from '../../../../common/services/hooks/blobHook.tsx';
import useApiHeaders from '../../../../common/services/hooks/apiHeadersHook.tsx';

type Props = {
    slot: any;
    onFinished: (el: boolean) => void;
};

type ResponseProps = {
    status: string;
    code: string;
    next?: string;
    text?: string;
    finish?: boolean;
    image: string;
};

const UploadPictureElement = ({ slot, onFinished }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const photoSlice = useSelector(getPhotoSliceData);
    const [error, setError] = useState(false);
    const [finished, setFinished] = useState(false);
    const [loadPercent, setLoadPercent] = useState(0);
    const [steps, setSteps] = useState(0);
    const [step, setStep] = useState(0);
    const inFocus = useIsFocused();
    const signal = useRef<AbortController>();
    const { postRequest } = useApiHeaders();
    const { upload } = useBlob();
    const [uploading, setUploading] = useState(true);
    const [next, setNext] = useState<ResponseProps>({
        status: '',
        code: '',
        next: '',
        image: '',
        finish: false,
    });

    const [test, setTest] = useState(true);

    useEffect(() => {
        if (loadPercent === 100) {
            setError(false);
            setFinished(true);
        }
    }, [loadPercent]);

    const nextRequest = async () => {
        try {
            console.log(
                'nextRequest',
                next,
                '=======================',
                slot.slot
            );
            const response = await postRequest(
                `/${next?.next}`,
                { code: next.code, image: next.image },
                { signal: signal.current?.signal }
            );
            console.log(response, 'responsecccc', next?.next);
            if (response.status === 'ok') {
                // if (
                //     slot.slot === '2' &&
                //     response.next === 'ai/screws-latest' &&
                //     test
                // ) {
                //     throw new Error('error');
                // }
                if (response.next) {
                    setNext(prev => ({ ...prev, ...response }));
                }
                setLoadPercent(loadPercent + step);
            }
            if (response.finish) {
                console.log('finished!!!!!', slot.slot);
                setUploading(false);
                setFinished(true);
                setLoadPercent(100);
                onFinished(true);
            }
        } catch (error) {
            console.error('Error in AnalyzingScreen: ', error);
            setError(true);
            setFinished(false);
        }
    };

    useEffect(() => {
        inFocus &&
            (async () => {
                if (!slot.editable) {
                    setLoadPercent(100);
                    onFinished(true);
                } else {
                    try {
                        const abortController = new AbortController();
                        signal.current = abortController;
                        const code = photoSlice.initialPhotoResponse.code;
                        const img = {
                            //@ts-ignore
                            uri: photoSlice.takenPicturesData[slot.slot].path,
                            //@ts-ignore
                            type: photoSlice.takenPicturesData[slot.slot].mime,
                            //@ts-ignore
                            name: photoSlice.takenPicturesData[slot.slot].path
                                .split('/')
                                .pop(),
                        };
                        const sl = slot.slot;

                        console.log(img, code, sl, 'img');

                        const res = await upload(
                            '/images/upload',

                            { image: img, code: code, slot: sl },
                            { signal: signal.current?.signal }
                        );
                        console.log(res, 'res', slot.slot);
                        if (res.status === 'ok') {
                            setSteps(res.steps);
                            setStep(100 / res.steps);
                            setLoadPercent(100 / res.steps);
                        }
                        //     setUploading(false);
                        if (res.next) {
                            setNext(res);
                        }
                        // } else {
                        //     setError(true);
                        // }
                    } catch (error) {
                        console.error('Error in AnalyzingScreen: ', error);
                        setError(true);
                    }
                }
            })();
    }, [inFocus]);

    useEffect(() => {
        if (next.code !== '' && next.finish !== true) {
            const abortController = new AbortController();
            signal.current = abortController;
            (async () => {
                await nextRequest();
            })();
        }
    }, [next]);

    const handleRetry = () => {
        setTest(false);
        setError(false);
        setNext(prev => ({ ...prev, error: '' }));
    };

    return (
        <View
            style={[styles.mainContainer, error && styles.mainContainerError]}>
            <View style={styles.imageContainer}>
                <Image
                    style={[styles.img, error && styles.imgError]}
                    source={{ uri: slot.src }}
                />
                {error && (
                    <TouchableOpacity
                        onPress={handleRetry}
                        style={styles.retryBtn}>
                        <Icon icon={'boldRetry'} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.loaderContainer}>
                <View
                    style={[
                        styles.leftContainer,
                        error && styles.leftContainerError,
                    ]}>
                    <Text>{slot.name}</Text>
                    <View style={styles.loadingBarContainer}>
                        <View
                            style={[
                                styles.loadingBar,
                                { width: `${loadPercent}%` },
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    {finished && !error && (
                        <Icon
                            icon={'boldSmallCheck'}
                            height={h(24)}
                            width={w(24)}
                        />
                    )}
                    {!finished && error && (
                        <Icon
                            icon={'boldWarning'}
                            height={h(24)}
                            width={w(24)}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        borderRadius: w(4),
        borderWidth: w(1),
        borderColor: Colors.black400,
        height: w(85),
        flexDirection: 'row',
    },
    mainContainerError: {
        borderColor: Colors.error,
    },
    imageContainer: {
        borderRightWidth: w(1),
        borderColor: Colors.black400,
        // width: w(50),
        flexShrink: 1,
        flexGrow: 0,
        justifyContent: 'center',
        // alignItems: 'center',
        height: '100%',
        paddingHorizontal: w(16),
        position: 'relative',
    },
    img: {
        width: 48,
        height: 48,
        resizeMode: 'cover',
        borderRadius: w(4),
    },
    imgError: {
        opacity: 0.5,
    },
    loaderContainer: {
        flex: 1,
        paddingHorizontal: w(16),
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(16),
        borderRadius: w(2),
    },
    loadingBarContainer: {
        width: '100%',
        height: h(2),
        backgroundColor: Colors.black400,
    },
    leftContainer: {
        flexGrow: 1,
        gap: h(16),
    },
    leftContainerError: {
        opacity: 0.5,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: w(24),
        height: h(24),
    },
    loadingBar: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    retryBtn: {
        position: 'absolute',
        top: 0,
        left: w(16),
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UploadPictureElement;
