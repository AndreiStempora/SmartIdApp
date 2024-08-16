import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BackBtnIcon = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'40'}
		height={height ? height:'40'}
		viewBox="0 0 40 40"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Rect
		x="0.5"
		y="0.5"
		width={width ? width:'39'}
		height={height ? height:'39'}
		rx="19.5"
		fill={fill ? fill:'#262626'}/>
<Rect
		x="0.5"
		y="0.5"
		width={width ? width:'39'}
		height={height ? height:'39'}
		rx="19.5"
		stroke={stroke ? stroke:'#363636'}/>
<Path
		d="M22.2559 27L15 20L22.2559 13L23 13.7207L16.4812 20L23 26.2793L22.2559 27Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BackBtnIcon;