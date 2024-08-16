import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Warning = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M2.73071 20L12 4L21.2692 20H2.73071ZM4.44996 19H19.55L12 6L4.44996 19ZM12 17.6155C12.1743 17.6155 12.3205 17.5565 12.4385 17.4385C12.5565 17.3205 12.6155 17.1743 12.6155 17C12.6155 16.8257 12.5565 16.6795 12.4385 16.5615C12.3205 16.4435 12.1743 16.3845 12 16.3845C11.8256 16.3845 11.6795 16.4435 11.5615 16.5615C11.4435 16.6795 11.3845 16.8257 11.3845 17C11.3845 17.1743 11.4435 17.3205 11.5615 17.4385C11.6795 17.5565 11.8256 17.6155 12 17.6155ZM11.5 15.3845H12.5V10.3845H11.5V15.3845Z"
		fill={fill ? fill:'#E8EAED'}/>
</Svg>

    )
}
export default Warning;