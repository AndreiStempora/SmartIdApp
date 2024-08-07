import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Monitoring = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M3 21V19L5 17V21H3ZM7 21V15L9 13V21H7ZM11 21V13L13 15.025V21H11ZM15 21V15.025L17 13.025V21H15ZM19 21V11L21 9V21H19ZM3 15.825V13L10 6L14 10L21 3V5.825L14 12.825L10 8.825L3 15.825Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Monitoring;