import React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const ArrrowNext = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<G
		clipPath="url(#clip0_872_2675)">
<Path
		d="M14 22L24 12L14 2L12.225 3.775L20.45 12L12.225 20.225L14 22Z"
		fill={fill ? fill:'#F8F9FA'}/>
</G>
<Defs>
<ClipPath
		id="clip0_872_2675">
<Rect
		width={width ? width:'24'}
		height={height ? height:'24'}
		fill={fill ? fill:'white'}/>
</ClipPath>
</Defs>
</Svg>

    )
}
export default ArrrowNext;