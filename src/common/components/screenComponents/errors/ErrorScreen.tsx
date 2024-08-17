import {
    ScrollView,
    StyleSheet,
    Text,
    RefreshControl,
    View,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    updatePageError,
    getPageError,
    getPageErrorDetails,
} from '../../../store/slices/errorSlice.tsx';
import { Colors, commonFonts } from '../../../styles/constants.tsx';
import apiHeadersHook from '../../../services/hooks/apiHeadersHook.tsx';
import CustomTextButton from '../../buttons/buttonText/CustomTextButton.tsx';
import { useNetInfo } from '@react-native-community/netinfo';
import useText from '../../../services/hooks/textHook.tsx';
type Props = {
    nav: any;
};
const ErrorScreen = ({ nav }: Props) => {
    const [refreshing, setRefreshing] = useState(false);
    const route = useRoute();
    const dispatch = useDispatch();
    const error = useSelector(getPageError);
    const errorDetails = useSelector(getPageErrorDetails);
    const { errorPostRequest } = apiHeadersHook();
    const { isConnected } = useNetInfo();
    const { t } = useText();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            dispatch(updatePageError(false));
            // nav.replace(route.name);
            nav.popToTop();
        }, 1000);
    }, []);

    const [showReportMessage, setShowReportMessage] = useState(false);
    const [refNumber, setRefNumber] = useState('');
    const sendReport = async () => {
        try {
            const response = await errorPostRequest(
                '/novotradein/app/error',
                errorDetails
            );
            console.log(response, 'response +++---');
            if (response.status === 'ok') {
                setShowReportMessage(true);
                setRefNumber(response.id);
            }
        } catch (errorNew) {
            console.log('error', errorNew);
        }
    };

    return (
        <>
            {error && (
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={styles.content}>
                    <View style={styles.contentContainer}>
                        <View style={styles.icons}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    {t('pageError.title')}
                                </Text>
                                <View>
                                    {isConnected ? (
                                        <>
                                            {showReportMessage ? (
                                                <View>
                                                    <Text
                                                        style={
                                                            styles.textConfirmation
                                                        }>
                                                        {t(
                                                            'pageError.reference'
                                                        )}
                                                        <Text
                                                            style={
                                                                styles.importantNumber
                                                            }>
                                                            {refNumber}
                                                        </Text>{' '}
                                                    </Text>
                                                </View>
                                            ) : (
                                                <></>
                                                // <CustomTextButton
                                                //     onPress={sendReport}
                                                //     text={t('pageError.button')}
                                                // />
                                            )}
                                        </>
                                    ) : (
                                        <Text style={styles.noInternetText}>
                                            {t('pageError.noNetwork')}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: 'green',
    },
    textContainer: {
        gap: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.white,
    },
    contentContainer: {
        marginHorizontal: 18,
        // backgroundColor: 'red',
    },
    icons: {
        overflow: 'hidden',
        flexDirection: 'column',
        gap: 50,
    },
    noInternetText: {
        ...commonFonts.regularTextSmall,
        color: Colors.error,
        textAlign: 'center',
    },
    textConfirmation: {
        ...commonFonts.regularTextSmall,
        color: Colors.white,
        textAlign: 'center',
    },
    importantNumber: {
        ...commonFonts.regularText,
        color: Colors.skyBlue,
    },
});

export default ErrorScreen;
