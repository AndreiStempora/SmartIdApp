import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const VerifiedCheck = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M10.95 14.8577L15.9078 9.9L15.1943 9.1865L10.95 13.4307L8.8115 11.2922L8.098 12.0057L10.95 14.8577ZM12 20.9615C9.991 20.3653 8.32208 19.1483 6.99325 17.3105C5.66442 15.4727 5 13.4025 5 11.1V5.69225L12 3.077L19 5.69225V11.1C19 13.4025 18.3356 15.4727 17.0068 17.3105C15.6779 19.1483 14.009 20.3653 12 20.9615ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1167 18 11.1V6.375L12 4.14425L6 6.375V11.1C6 13.1167 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default VerifiedCheck;