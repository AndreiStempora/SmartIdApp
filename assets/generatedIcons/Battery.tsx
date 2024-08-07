import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Battery = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M22 18.5L4 18.5L4 15.5L2 15.5L2 11.5L4 11.5L4 8.5L12 8.5C12 8.85 12.0292 9.19167 12.0875 9.525C12.1458 9.85833 12.2333 10.1833 12.35 10.5L6 10.5L6 16.5L20 16.5L20 14.15C20.3833 14.0167 20.7417 13.8542 21.075 13.6625C21.4083 13.4708 21.7167 13.2417 22 12.975L22 18.5Z"
		fill={fill ? fill:'#F8F9FA'}/>
<Path
		d="M16.5 10V13L20 8H17.5V5L14 10H16.5Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Battery;