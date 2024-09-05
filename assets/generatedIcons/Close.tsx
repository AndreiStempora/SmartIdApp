import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Close = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M6.40013 18.3078L5.69238 17.6L11.2924 12L5.69238 6.40001L6.40013 5.69226L12.0001 11.2923L17.6001 5.69226L18.3079 6.40001L12.7079 12L18.3079 17.6L17.6001 18.3078L12.0001 12.7078L6.40013 18.3078Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Close;