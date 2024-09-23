import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldSmallArrowDown = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M11.9999 15.0538L6.34619 9.4L7.39994 8.34625L11.9999 12.9463L16.5999 8.34625L17.6537 9.4L11.9999 15.0538Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldSmallArrowDown;