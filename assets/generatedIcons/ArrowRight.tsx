import React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const ArrowRight = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'40'}
		height={height ? height:'40'}
		viewBox="0 0 40 40"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<G
		clipPath="url(#clip0_555_88042)">
<Path
		d="M28.2306 32L40.2306 20L28.2306 8L27 9.23556L37.781 20L27 30.7644L28.2306 32Z"
		fill={fill ? fill:'white'}/>
</G>
<Defs>
<ClipPath
		id="clip0_555_88042">
<Rect
		width={width ? width:'40'}
		height={height ? height:'40'}
		fill={fill ? fill:'white'}/>
</ClipPath>
</Defs>
</Svg>

    )
}
export default ArrowRight;