import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Fullscreen = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M4 20V15.577H5V19H8.423V20H4ZM15.5962 20V19H19.0193V15.577H20.0193V20H15.5962ZM4 8.423V4H8.423V5H5V8.423H4ZM19.0193 8.423V5H15.5962V4H20.0193V8.423H19.0193Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Fullscreen;