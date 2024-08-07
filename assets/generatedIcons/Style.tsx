import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Style = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M9.82501 21.675L1.32501 13.175L8.25001 6.275L5.60001 3.625L7.15001 2L18.325 13.175L9.82501 21.675ZM9.82501 7.85L4.47501 13.2H15.175L9.82501 7.85ZM19.8 21C19.2 21 18.6917 20.7875 18.275 20.3625C17.8583 19.9375 17.65 19.4167 17.65 18.8C17.65 18.35 17.7625 17.925 17.9875 17.525C18.2125 17.125 18.4667 16.7333 18.75 16.35L19.8 15L20.9 16.35C21.1667 16.7333 21.4167 17.125 21.65 17.525C21.8833 17.925 22 18.35 22 18.8C22 19.4167 21.7833 19.9375 21.35 20.3625C20.9167 20.7875 20.4 21 19.8 21Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Style;