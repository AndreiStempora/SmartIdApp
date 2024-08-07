import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BarcodeScanner = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M1 21V16H3V19H6V21H1ZM18 21V19H21V16H23V21H18ZM4 18V6H6V18H4ZM7 18V6H8V18H7ZM10 18V6H12V18H10ZM13 18V6H16V18H13ZM17 18V6H18V18H17ZM19 18V6H20V18H19ZM1 8V3H6V5H3V8H1ZM21 8V5H18V3H23V8H21Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default BarcodeScanner;