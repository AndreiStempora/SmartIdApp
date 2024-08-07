import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const FlashOff = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M7 2H17L15 9H19L16.075 13.225L7 4.15V2ZM10 22V14H7V9.85L1.375 4.225L2.8 2.8L21.2 21.2L19.775 22.625L13.75 16.6L10 22Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default FlashOff;