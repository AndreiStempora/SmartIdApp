import { useEffect, useState } from 'react';
import {
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

type Props = {
    receivedCode: string;
    returnCode?: (val: string) => void;
};
const useCodeFieldComponent = ({ receivedCode, returnCode }: Props) => {
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        setTimeout(() => {
            ref.current?.focus();
        }, 300);
    }, []);

    useEffect(() => {
        setValue(receivedCode);
    }, [receivedCode]);

    useEffect(() => {
        if (value.length === 6) {
            returnCode && returnCode(value);
            // setValue('');
            // ref.current?.focus();
        }
    }, [value]);

    return {
        CELL_COUNT,
        value,
        setValue,
        ref,
        props,
        getCellOnLayoutHandler,
    };
};

export default useCodeFieldComponent;
