import React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const VehicleOptions = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<G
		clipPath="url(#clip0_872_2356)">
<Path
		d="M12 6.35L9.175 3.55L10.575 2.125L12 3.55L15.55 0L16.95 1.4L12 6.35ZM3 24V15L5.45 8H18.55L21 15V24H18V22H6V24H3ZM5.8 13H18.2L17.15 10H6.85L5.8 13ZM7.5 19C7.91667 19 8.27083 18.8542 8.5625 18.5625C8.85417 18.2708 9 17.9167 9 17.5C9 17.0833 8.85417 16.7292 8.5625 16.4375C8.27083 16.1458 7.91667 16 7.5 16C7.08333 16 6.72917 16.1458 6.4375 16.4375C6.14583 16.7292 6 17.0833 6 17.5C6 17.9167 6.14583 18.2708 6.4375 18.5625C6.72917 18.8542 7.08333 19 7.5 19ZM16.5 19C16.9167 19 17.2708 18.8542 17.5625 18.5625C17.8542 18.2708 18 17.9167 18 17.5C18 17.0833 17.8542 16.7292 17.5625 16.4375C17.2708 16.1458 16.9167 16 16.5 16C16.0833 16 15.7292 16.1458 15.4375 16.4375C15.1458 16.7292 15 17.0833 15 17.5C15 17.9167 15.1458 18.2708 15.4375 18.5625C15.7292 18.8542 16.0833 19 16.5 19ZM5 20H19V15H5V20Z"
		fill={fill ? fill:'#F8F9FA'}/>
</G>
<Defs>
<ClipPath
		id="clip0_872_2356">
<Rect
		width={width ? width:'24'}
		height={height ? height:'24'}
		fill={fill ? fill:'white'}/>
</ClipPath>
</Defs>
</Svg>

    )
}
export default VehicleOptions;