import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Colors, commonFonts } from '../../../../../styles/constants';
import useComponent from './CustomInputUtils.tsx';
import { h, w } from '../../../../../styles/PixelPerfect.tsx';
import Icon from '../../../../icons/Icon.tsx';

type Props = {
    placeholder?: string;
    label?: string;
    err?: string;
    clear?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange: (text: string) => void;
    editable?: boolean;
    secureText?: boolean;
    type: string;
    value?: string;
    borderProps?: (isFocused: boolean, withValue: boolean) => void;
    multiline?: string;
};
const CustomInput = ({
    placeholder,
    label,
    err,
    onBlur,
    onFocus,
    onChange,
    editable,
    secureText,
    type,
    value,
    borderProps,
    multiline,
}: Props) => {
    const {
        isFocused,
        error,
        val,
        focus,
        blur,
        onChangeText,
        showPassword,
        setShowPassword,
        errorText,
        withValue,
    } = useComponent({
        onFocus,
        onBlur,
        onChange,
        err,
        secureText,
        value,
        borderProps,
        type,
    });

    return (
        <View style={styles.flexGrow}>
            {label ? (
                <Text
                    style={[
                        styles.label,
                        isFocused && styles.labelFocus,
                        // error && styles.labelError,
                    ]}>
                    {label}
                </Text>
            ) : null}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused,
                    withValue && !isFocused && styles.inputContainerWithValue,
                    error && styles.containerError,
                ]}>
                <TextInput
                    // selectTextOnFocus={false}
                    multiline={type === 'textarea' ? true : false}
                    numberOfLines={type === 'textarea' ? Number(multiline) : 1}
                    value={val}
                    style={[
                        styles.input,
                        error ? styles.inputError : null,
                        type === 'textarea' && styles.multiInput,
                        type === 'textarea' && {
                            height: h(24 * Number(multiline)),
                        },
                        withValue && styles.inputWithValue,
                        isFocused && styles.inputFocused,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={error ? Colors.error : Colors.white}
                    onFocus={focus}
                    onBlur={blur}
                    onChangeText={text => {
                        onChangeText(text);
                    }}
                    editable={editable ?? true}
                    selectTextOnFocus={type === 'textarea' ? false : true}
                    secureTextEntry={showPassword}
                    keyboardType={
                        type === 'number'
                            ? 'numeric'
                            : type === 'phone'
                            ? 'phone-pad'
                            : 'default'
                    }
                />
                {type === 'password' && (
                    <View style={styles.iconContainer2}>
                        <TouchableOpacity
                            style={{ flexGrow: 1 }}
                            onPress={() => setShowPassword(!showPassword)}>
                            <View style={styles.iconPadding}>
                                {/*<Icon*/}
                                {/*    icon={*/}
                                {/*        showPassword*/}
                                {/*            ? 'visibilityOn'*/}
                                {/*            : 'visibilityOff'*/}
                                {/*    }*/}
                                {/*    fill={Colors.metal}*/}
                                {/*    width={w(24)}*/}
                                {/*    height={h(24)}*/}
                                {/*/>*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {/*{error && errorText && (*/}
            {/*    <Text style={styles.error}>{errorText}</Text>*/}
            {/*)}*/}
        </View>
    );
};

const styles = StyleSheet.create({
    activityIndicator: {},
    inputContainer: {
        borderWidth: h(1),
        borderRadius: w(4),
        backgroundColor: Colors.black300,
        borderColor: Colors.black400,
        flexDirection: 'row',

        // height: h(52),
    },
    inputContainerFocused: {
        borderColor: Colors.white,
    },
    containerError: {
        borderColor: Colors.error,
    },
    inputContainerWithValue: {
        borderColor: Colors.black400,
    },
    label: {
        // position: 'absolute',
        top: h(4),
        left: 0,
        ...commonFonts.label,
        marginTop: h(0),
        color: Colors.grey100,
        pointerEvents: 'none',
        marginBottom: h(10),
        zIndex: 1,
    },
    labelFocus: {
        color: Colors.white,
    },
    labelError: {
        color: Colors.error,
    },
    error: {},
    input: {
        ...commonFonts.regularTitle,
        // flexGrow: 1,
        flexBasis: '100%',
        flexShrink: 1,

        paddingTop: h(0),
        paddingBottom: h(0),
        height: h(48),
        paddingHorizontal: w(16),
        alignItems: 'center',
        color: Colors.grey100,
    },
    inputFocused: {
        color: Colors.white,
    },
    inputWithValue: {
        color: Colors.grey100,
    },
    inputTextArea: {},
    multiInput: {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: h(24),
        // backgroundColor: 'blue',
        textAlignVertical: 'top',
        // overflow: 'hidden',
        // height: h(24 * Number(multiline)),
    },
    inputError: {},
    flexGrow: {
        gap: h(4),
        // backgroundColor: 'red',
    },
    iconPadding: {
        // backgroundColor: Colors.white,
        // paddingHorizontal: w(12),
        // width: w(56),
        // height: h(56),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: h(4),
        zIndex: 20,
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        // top: -24,
        // height: h(56),
        // backgroundColor: 'red',
    },
    iconContainer2: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: h(56),
        // backgroundColor: 'red',
    },
});

export default CustomInput;
