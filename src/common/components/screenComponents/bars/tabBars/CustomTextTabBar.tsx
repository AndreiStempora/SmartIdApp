import {StyleSheet, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {f, h, w} from "../../../../styles/PixelPerfect.tsx";

import CustomFooterIconButton from "../../../buttons/buttonIcon/CustomFooterIconButton.tsx";
import {Colors, Fonts} from "../../../../styles/constants.tsx";

type Props = {
    text: string,

};

const  CustomTextTabBar = ({text}:Props) => {
    const insets = useSafeAreaInsets();
    return(
        <View style={[{paddingBottom:insets.bottom},styles.mainContainer]}>
            <View style={styles.contentContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        position:'absolute',
        bottom:0,
        width:'100%',
        backgroundColor:'#1A1A1A',
    },
    contentContainer: {
        zIndex: 100,
        height:h(69),
        borderTopWidth:h(2),
        // borderBottomWidth:h(2),
        borderTopColor:'#8E9297',
        justifyContent:'center',
        alignItems:'center',
        gap:w(64),
        flexDirection:'row',
    },
    text:{
        fontFamily:Fonts.Med,
        fontSize:f(14),
        lineHeight:f(21),
        color:Colors.white
    }
});

export default CustomTextTabBar;
