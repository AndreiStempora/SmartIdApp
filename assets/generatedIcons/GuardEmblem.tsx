import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const GuardEmblem = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'12'}
		height={height ? height:'13'}
		viewBox="0 0 12 13"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Rect
		x="0.25"
		y="0.75"
		width={width ? width:'11.5'}
		height={height ? height:'11.5'}
		rx="5.75"
		fill={fill ? fill:'#D19D36'}
		fillOpacity="0.16"/>
<Rect
		x="0.25"
		y="0.75"
		width={width ? width:'11.5'}
		height={height ? height:'11.5'}
		rx="5.75"
		stroke={stroke ? stroke:'#D19D36'}
		strokeWidth="0.5"/>
<Path
		d="M5.475 7.92884L7.95385 5.44999L7.59711 5.09325L5.475 7.21538L4.40578 6.14614L4.04904 6.50288L5.475 7.92884ZM6 10.9808C4.99551 10.6827 4.16105 10.0742 3.49664 9.15528C2.83221 8.23637 2.5 7.20127 2.5 6.04999V3.34614L6 2.03845L9.5 3.34614V6.04999C9.5 7.20127 9.16779 8.23637 8.50336 9.15528C7.83895 10.0742 7.00449 10.6827 6 10.9808ZM6 10.45C6.86667 10.175 7.58333 9.62499 8.15 8.79999C8.71667 7.97499 9 7.05832 9 6.04999V3.68749L6 2.5721L3 3.68749V6.04999C3 7.05832 3.28333 7.97499 3.85 8.79999C4.41667 9.62499 5.13333 10.175 6 10.45Z"
		fill={fill ? fill:'#D19D36'}/>
</Svg>

    )
}
export default GuardEmblem;