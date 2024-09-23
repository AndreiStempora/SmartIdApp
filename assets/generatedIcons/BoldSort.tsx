import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldSort = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M3.5 17.5V16H8.875V17.5H3.5ZM3.5 12.75V11.25H14.6827V12.75H3.5ZM3.5 8V6.5H20.5V8H3.5Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldSort;