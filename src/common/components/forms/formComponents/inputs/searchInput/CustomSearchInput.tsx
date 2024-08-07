import useComponent from '../customInput/CustomInputUtils.tsx';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, commonFonts } from '../../../../../styles/constants.tsx';
import Icon from '../../../../icons/Icon.tsx';
import { h, w } from '../../../../../styles/PixelPerfect.tsx';
import React from 'react';
import CustomIconButton from '../../../../buttons/buttonIcon/CustomIconButton.tsx';

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
    handleScan: () => void;
};
const CustomSearchInput = ({
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
    handleScan,
    clear,
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
        clearField,
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
                        error && styles.labelError,
                    ]}>
                    {label}
                </Text>
            ) : null}
            <View
                style={[
                    styles.inputContainer,
                    isFocused || (val && styles.inputContainerFocused),
                    withValue && !isFocused && styles.inputContainerWithValue,
                    error && styles.containerError,
                ]}>
                <TextInput
                    value={val}
                    style={[styles.input, error ? styles.inputError : null]}
                    placeholder={placeholder}
                    placeholderTextColor={
                        isFocused ? Colors.white : Colors.metal
                    }
                    onFocus={focus}
                    onBlur={blur}
                    onChangeText={text => {
                        onChangeText(text);
                    }}
                    editable={editable ?? true}
                    selectTextOnFocus={editable ?? true}
                    secureTextEntry={showPassword}
                    keyboardType={
                        type === 'number'
                            ? 'numeric'
                            : type === 'phone'
                            ? 'phone-pad'
                            : 'default'
                    }
                />
                {clear && val !== '' && (
                    <TouchableOpacity
                        onPress={clearField}
                        // activeOpacity={1}
                    >
                        <View style={styles.iconPadding}>
                            <Icon
                                icon={'circledCancelIcon'}
                                width={w(24)}
                                height={h(24)}
                                fill={
                                    isFocused || val
                                        ? Colors.white
                                        : Colors.metal
                                }
                            />
                        </View>
                    </TouchableOpacity>
                )}

                {/*{type === 'password' && (*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => setShowPassword(!showPassword)}>*/}
                {/*        <Icon*/}
                {/*            icon={showPassword ? 'eyeIcon' : 'eyeIconClosed'}*/}
                {/*            width={w(24)}*/}
                {/*            height={h(24)}*/}
                {/*        />*/}
                {/*    </TouchableOpacity>*/}
                {/*)}*/}
                <View>
                    <View style={styles.iconPadding}>
                        <Icon
                            icon={'search'}
                            height={h(24)}
                            width={w(24)}
                            fill={
                                isFocused || val ? Colors.white : Colors.metal
                            }></Icon>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activityIndicator: {},
    inputContainer: {
        borderBottomWidth: 2,
        borderColor: Colors.metal,
        flexDirection: 'row',
    },
    inputContainerFocused: {
        borderColor: Colors.white,
    },
    containerError: {
        borderColor: Colors.error,
    },
    inputContainerWithValue: {},
    label: {
        ...commonFonts.regularText,
        marginBottom: h(4),
        color: Colors.metal,
    },
    labelFocus: {
        color: Colors.skyBlue,
    },
    labelError: {
        color: Colors.error,
    },
    error: {},
    input: {
        height: h(56),
        // backgroundColor: Colors.error,
        ...commonFonts.regularTitle,
        // flexGrow: 0,
        flexBasis: '100%',
        flexShrink: 1,
    },
    inputError: {},
    flexGrow: {},
    iconPadding: {
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        right: 0,
        // backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        width: w(56),
        height: h(56),
    },
});

export default CustomSearchInput;
