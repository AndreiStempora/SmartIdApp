import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldGrid = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M3.5 11V3.5H11V11H3.5ZM3.5 20.5V13H11V20.5H3.5ZM13 11V3.5H20.5V11H13ZM13 20.5V13H20.5V20.5H13ZM5 9.5H9.5V5H5V9.5ZM14.5 9.5H19V5H14.5V9.5ZM14.5 19H19V14.5H14.5V19ZM5 19H9.5V14.5H5V19Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldGrid;