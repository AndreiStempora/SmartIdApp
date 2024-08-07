import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import useCodeFieldComponent from './codeFieldComponentUtils';

type Props = {
    receivedCode: string;
    returnCode?: (val: string) => void;
};

const CodeFieldComponent = ({ receivedCode, returnCode }: Props) => {
    const { CELL_COUNT, value, setValue, ref, props, getCellOnLayoutHandler } =
        useCodeFieldComponent({
            receivedCode,
            returnCode,
        });
    return (
        <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    root: {
        // flex: 1,
        // padding: 20,
    },
    title: {
        // textAlign: 'center',
        // fontSize: 30,
        // color: Colors.skin,
    },
    codeFieldRoot: {
        // marginTop: 20,
    },
    cell: {
        // backgroundColor: 'red',
        // position: 'relative',
        // width: 40,
        // height: 40,
        // borderBottomWidth: 2,
        // color: Colors.blue,
        // borderBottomColor: Colors.blue,
        // flexDirection: 'column',
    },
    cellText: {
        // fontFamily: Fonts.MBold,
        // fontSize: 18,
        // lineHeight: 40,
        // textAlign: 'center',
        // color: Colors.blue,
    },
    focusCell: {
        // borderBottomColor: Colors.skin,
        // color: Colors.skin,
    },
    newStyle: {
        // position: 'absolute',
        // width: 40,
        // height: 2,
        // borderRadius: 20,
        // backgroundColor: Colors.skin,
        // opacity: 0.3,
    },
});

export default CodeFieldComponent;
