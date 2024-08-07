import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Box = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M4.94995 20V18L4.95 16V14V12V10V7.05L3 2.85L4.8 2L7.15 7H18.75L16.8 2.85L18.6 2L20.95 7V20H4.94995ZM10.95 13H14.95C15.2333 13 15.4708 12.9042 15.6625 12.7125C15.8542 12.5208 15.95 12.2833 15.95 12C15.95 11.7167 15.8542 11.4792 15.6625 11.2875C15.4708 11.0958 15.2333 11 14.95 11H10.95C10.6667 11 10.4292 11.0958 10.2375 11.2875C10.0458 11.4792 9.95 11.7167 9.95 12C9.95 12.2833 10.0458 12.5208 10.2375 12.7125C10.4292 12.9042 10.6667 13 10.95 13ZM6.95 18H18.95V9H6.95V18Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Box;