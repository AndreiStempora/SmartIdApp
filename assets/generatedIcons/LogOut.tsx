import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const LogOut = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M5.6155 20C5.15517 20 4.77083 19.8458 4.4625 19.5375C4.15417 19.2292 4 18.8448 4 18.3845V5.6155C4 5.15517 4.15417 4.77083 4.4625 4.4625C4.77083 4.15417 5.15517 4 5.6155 4H12.0192V5H5.6155C5.4615 5 5.32042 5.06408 5.19225 5.19225C5.06408 5.32042 5 5.4615 5 5.6155V18.3845C5 18.5385 5.06408 18.6796 5.19225 18.8077C5.32042 18.9359 5.4615 19 5.6155 19H12.0192V20H5.6155ZM16.4615 15.5385L15.7595 14.8193L18.0788 12.5H9.19225V11.5H18.0788L15.7595 9.18075L16.4615 8.4615L20 12L16.4615 15.5385Z"
		fill={fill ? fill:'#FF4646'}/>
</Svg>

    )
}
export default LogOut;