import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Menu = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'40'}
		height={height ? height:'40'}
		viewBox="0 0 40 40"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M6.66663 28.7821V27.3716H33.3333V28.7821H6.66663ZM6.66663 20.705V19.295H33.3333V20.705H6.66663ZM6.66663 12.6283V11.2179H33.3333V12.6283H6.66663Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Menu;