import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Verified = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M10.95 14.8577L15.9077 9.89998L15.1942 9.1865L10.95 13.4308L8.81155 11.2923L8.09808 12.0058L10.95 14.8577ZM12 20.9615C9.99102 20.3654 8.32211 19.1484 6.99327 17.3106C5.66442 15.4727 5 13.4025 5 11.1V5.69228L12 3.0769L19 5.69228V11.1C19 13.4025 18.3356 15.4727 17.0067 17.3106C15.6779 19.1484 14.009 20.3654 12 20.9615ZM12 19.9C13.7333 19.35 15.1667 18.25 16.3 16.6C17.4333 14.95 18 13.1166 18 11.1V6.37498L12 4.1442L6 6.37498V11.1C6 13.1166 6.56667 14.95 7.7 16.6C8.83333 18.25 10.2667 19.35 12 19.9Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Verified;