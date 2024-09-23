import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldSmallArrowLeft = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M13.9999 17.6538L8.34619 12L13.9999 6.34625L15.0537 7.4L10.4537 12L15.0537 16.6L13.9999 17.6538Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldSmallArrowLeft;