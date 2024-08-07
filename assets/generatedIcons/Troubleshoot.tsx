import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Troubleshoot = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M20.6 21L15.9 16.3C15.2167 16.8333 14.4625 17.25 13.6375 17.55C12.8125 17.85 11.9333 18 11 18C9.5 18 8.14583 17.6333 6.9375 16.9C5.72917 16.1667 4.775 15.2 4.075 14H6.525C7.09167 14.6167 7.75417 15.1042 8.5125 15.4625C9.27083 15.8208 10.1 16 11 16C12.6667 16 14.0833 15.4167 15.25 14.25C16.4167 13.0833 17 11.6667 17 10C17 8.33333 16.4167 6.91667 15.25 5.75C14.0833 4.58333 12.6667 4 11 4C9.43333 4 8.07917 4.52917 6.9375 5.5875C5.79583 6.64583 5.15833 7.95 5.025 9.5H3.025C3.15833 7.38333 3.9875 5.60417 5.5125 4.1625C7.0375 2.72083 8.86667 2 11 2C13.2333 2 15.125 2.775 16.675 4.325C18.225 5.875 19 7.76667 19 10C19 10.9333 18.85 11.8125 18.55 12.6375C18.25 13.4625 17.8333 14.2167 17.3 14.9L22 19.6L20.6 21ZM9.925 14L8.35 8.8L7.05 12.5H2V11H6L7.65 6.25H9.15L10.675 11.35L11.75 8H13.25L14.75 11H15.5V12.5H13.825L12.65 10.15L11.4 14H9.925Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Troubleshoot;