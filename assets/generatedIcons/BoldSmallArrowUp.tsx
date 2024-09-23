import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldSmallArrowUp = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M11.9999 10.4538L7.39994 15.0538L6.34619 14L11.9999 8.34625L17.6537 14L16.5999 15.0538L11.9999 10.4538Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldSmallArrowUp;