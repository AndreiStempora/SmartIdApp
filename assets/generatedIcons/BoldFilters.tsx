import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldFilters = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M11.25 20.75V15.25H12.75V17.25H20.75V18.75H12.75V20.75H11.25ZM3.25 18.75V17.25H8.75V18.75H3.25ZM7.25 14.75V12.75H3.25V11.25H7.25V9.25H8.75V14.75H7.25ZM11.25 12.75V11.25H20.75V12.75H11.25ZM15.25 8.75V3.25H16.75V5.25H20.75V6.75H16.75V8.75H15.25ZM3.25 6.75V5.25H12.75V6.75H3.25Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldFilters;