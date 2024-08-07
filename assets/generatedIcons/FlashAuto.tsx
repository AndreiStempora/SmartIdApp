import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const FlashAuto = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M5 22V14H2V2H12L10 9H14L5 22ZM14.625 11L18 2H19.6L23.025 11H21.475L20.675 8.7H16.975L16.175 11H14.625ZM17.425 7.4H20.175L18.85 3.65H18.8L17.425 7.4Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default FlashAuto;