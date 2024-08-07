import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Garage = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M2 22V2H22V22H2ZM4 20H20V4H4V20ZM9 14C8.71667 14 8.47917 13.9042 8.2875 13.7125C8.09583 13.5208 8 13.2833 8 13C8 12.7167 8.09583 12.4792 8.2875 12.2875C8.47917 12.0958 8.71667 12 9 12C9.28333 12 9.52083 12.0958 9.7125 12.2875C9.90417 12.4792 10 12.7167 10 13C10 13.2833 9.90417 13.5208 9.7125 13.7125C9.52083 13.9042 9.28333 14 9 14ZM15 14C14.7167 14 14.4792 13.9042 14.2875 13.7125C14.0958 13.5208 14 13.2833 14 13C14 12.7167 14.0958 12.4792 14.2875 12.2875C14.4792 12.0958 14.7167 12 15 12C15.2833 12 15.5208 12.0958 15.7125 12.2875C15.9042 12.4792 16 12.7167 16 13C16 13.2833 15.9042 13.5208 15.7125 13.7125C15.5208 13.9042 15.2833 14 15 14ZM5 11.1V18.5H7V16.5H17V18.5H19V11.1L17.075 5.5H6.925L5 11.1ZM7.65 9.5L8.35 7.5H15.65L16.35 9.5H7.65ZM7 14.5V11.5H17V14.5H7Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Garage;