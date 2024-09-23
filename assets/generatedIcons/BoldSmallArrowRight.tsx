import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldSmallArrowRight = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M12.9462 12L8.34619 7.4L9.39994 6.34625L15.0537 12L9.39994 17.6538L8.34619 16.6L12.9462 12Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldSmallArrowRight;