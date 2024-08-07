import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const ArrowPrevious = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M10 22L0 12L10 2L11.775 3.775L3.55 12L11.775 20.225L10 22Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default ArrowPrevious;