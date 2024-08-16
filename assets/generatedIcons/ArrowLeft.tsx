import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const ArrowLeft = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'40'}
		height={height ? height:'40'}
		viewBox="0 0 40 40"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M12 32L0 20L12 8L13.2306 9.23556L2.44959 20L13.2306 30.7644L12 32Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default ArrowLeft;