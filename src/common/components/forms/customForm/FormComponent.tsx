import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import CustomInput from '../formComponents/inputs/customInput/CustomInput';
import { h } from '../../../styles/PixelPerfect.tsx';
import CustomModal from '../../modals/customModal.tsx';
import { commonFonts } from '../../../styles/constants.tsx';
import useText from '../../../services/hooks/textHook.tsx';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../screenComponents/toasts/CustomToast.tsx';

interface Field {
    name: string;
    placeholder: string;
    clearable?: boolean;
    type: string;
    required: boolean;
    err?: string;
    setErr?: (val: string) => void;
    checkAvailability?: boolean;
    value?: string;
    title?: string;
}

type Props = {
    fields: Field[];
    formData: (data: object) => void;
    fieldsFilled?: (val: boolean) => void;
    err?: string;
    setErr?: (val: string) => void;
};

const FormComponent = ({
    fields,
    formData,
    fieldsFilled,
    err,
    setErr,
}: Props) => {
    const [localFields, setLocalFields] = useState(fields);
    const [isVisible, setIsVisible] = useState(false);
    const formDataAfterInput = useRef({});
    const [formFilled, setFormFilled] = useState(false);
    const { t } = useText();
    const changeFormData = (name: string, value: string) => {
        formDataAfterInput.current = {
            ...formDataAfterInput.current,
            [name]: value,
        };
        formData(formDataAfterInput.current);
        setFormFilled(checkIfAllFieldsAreCompleted());
    };

    useEffect(() => {
        localFields?.forEach(field => {
            changeFormData(field.name, field.value ?? '');
        });
    }, []);

    useEffect(() => {
        const newFields = localFields.map(field => ({ ...field, err: err }));
        setLocalFields(newFields);
        if (err) {
            Toast.show({
                type: 'formError',
                text1: err,
                bottomOffset: h(11),
                position: 'bottom',
            });
            console.log('err', err);
        }
    }, [err]);

    useEffect(() => {
        fieldsFilled && fieldsFilled(true);
    }, [formFilled]);
    const checkIfAllFieldsAreCompleted = () => {
        let obj = Object.values(formDataAfterInput.current);
        let completed = true;
        obj.forEach(val => {
            if (val === '') {
                completed = false;
            }
        });
        return completed;
    };

    return (
        <>
            {/*<CustomModal*/}
            {/*    isVisible={isVisible}*/}
            {/*    title={err}*/}
            {/*    setIsVisible={() => {}}*/}
            {/*    buttons={[*/}
            {/*        {*/}
            {/*            title: t('login.formErrorButton'),*/}
            {/*            onPress: () => {*/}
            {/*                setIsVisible(false);*/}
            {/*            },*/}
            {/*        },*/}
            {/*    ]}>*/}
            {/*    <Text style={styles.errorMessage}>*/}
            {/*        {t('login.formErrorText')}*/}
            {/*    </Text>*/}
            {/*</CustomModal>*/}

            <FlatList
                style={styles.formStyle}
                scrollEnabled={false}
                data={localFields}
                renderItem={({ item }) => {
                    // if (item.type === 'phone') {
                    //     return (
                    //         <PhoneInput
                    //             item={item}
                    //             onChange={val => {
                    //                 // console.log(val, 'val');
                    //                 changeFormData(item.name, val);
                    //             }}
                    //             type={item.type}
                    //             label={item.title}
                    //         />
                    //     );
                    // }
                    return (
                        <CustomInput
                            err={item.err}
                            multiline={
                                item.type === 'textarea'
                                    ? // @ts-ignore
                                      item.textarea?.rows
                                    : undefined
                            }
                            onChange={val => {
                                changeFormData(item.name, val);
                                setErr && setErr('');
                            }}
                            placeholder={item.placeholder}
                            clear={item.clearable}
                            secureText={item.type === 'password'}
                            type={item.type}
                            value={item.value}
                            label={item.title}
                        />
                    );
                }}
                ItemSeparatorComponent={() => (
                    <View style={styles.separatorHeight} />
                )}
                keyExtractor={item => `${item.name}-${item.type}`}
            />
            <Toast config={toastConfig} />
            {/*{err && <Text style={styles.error}>{err}</Text>}*/}
        </>
    );
};

const styles = StyleSheet.create({
    formStyle: {},
    separatorHeight: {
        height: h(16),
    },
    error: {},
    errorMessage: {
        ...commonFonts.regularText,
        textAlign: 'center',
    },
});

export default FormComponent;
