import { useEffect, useState } from 'react';

type Props = {
    err: string | undefined | null;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange: (text: string) => void;
    secureText?: boolean;
    value?: string;
    borderProps?: (isFocused: boolean, withValue: boolean) => void;
    type: string;
};
const CustomInputUtils = ({
    onFocus,
    onBlur,
    onChange,
    err,
    secureText,
    value,
    borderProps,
    type,
}: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [val, setVal] = useState(value ? value : '');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(secureText);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState(err);
    const [withValue, setWithValue] = useState(false);

    const focus = () => {
        setIsFocused(true);
        borderProps && borderProps(true, true);
        onFocus && onFocus();
    };
    const blur = () => {
        setIsFocused(false);
        onBlur && onBlur();
        if (val !== '') {
            setWithValue(true);
            borderProps && borderProps(false, true);
        } else {
            setWithValue(false);
            borderProps && borderProps(false, false);
        }
    };
    const clearField = () => {
        setVal('');
        setError(false);
        onChange('');
    };
    const onChangeText = (text: string) => {
        if (type === 'phone') {
            const newText = formatPhoneNumber(text);
            setVal(newText);
            onChange(newText);
            setErrorText('');
            setError(false);
        } else {
            setVal(text);
            onChange(text);
            setErrorText('');
            setError(false);
        }
    };

    const formatPhoneNumber = (text: string) => {
        // Remove any non-digit characters and limit to 10 digits
        const cleanedInput = text.replace(/\D/g, '').slice(0, 10);

        // Add spaces or dots every 3 characters
        let formattedInput = '';
        for (let i = 0; i < cleanedInput.length; i++) {
            if (i === 3 || i === 6) {
                formattedInput += ' ';
            }
            formattedInput += cleanedInput[i];
        }

        return formattedInput;
    };

    useEffect(() => {
        // console.log(err?.length, 'ccc');
        err?.length ? setError(true) : setError(false);
    }, [err]);

    useEffect(() => {
        setVal(value ? value : '');
        if (value?.length) {
            setWithValue(true);
        } else {
            setWithValue(false);
        }
    }, [value]);

    return {
        isFocused,
        error,
        val,
        focus,
        blur,
        onChangeText,
        clearField,
        showPassword,
        setShowPassword,
        isLoading,
        err,
        errorText,
        withValue,
        setVal,
    };
};

export default CustomInputUtils;
