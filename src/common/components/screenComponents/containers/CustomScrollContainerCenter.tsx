import {ScrollView, StyleSheet, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import React from "react";

type Props = {
    children: React.ReactNode;
    centeredContent?: boolean;
    scrollEnabled?: boolean;
};

const CustomScrollContainerCenter = ({children, centeredContent, scrollEnabled}:Props) => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={ [styles.childContainer, centeredContent!== false && styles.childContainerCentered] }
            scrollEnabled={scrollEnabled}
        >
            {children}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    childContainer: {
        flexGrow: 1,
    },
    childContainerCentered: {
        justifyContent: 'center',
    }
})

export default CustomScrollContainerCenter;
