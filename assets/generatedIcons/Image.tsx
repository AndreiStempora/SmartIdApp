import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Image = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M6 17H18L14.25 12L11.25 16L9 13L6 17ZM3 21V3H21V21H3ZM5 19H19V5H5V19Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Image;