import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Shuffle = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M14.2308 19V18H17.3307L13.8095 14.4788L14.523 13.7655L18 17.2423V14.2885H19V19H14.2308ZM5.70775 19L5 18.2923L17.2923 6H14.2308V5H19V9.7115H18V6.70775L5.70775 19ZM9.3865 10.075L5 5.6885L5.6885 5L10.075 9.3865L9.3865 10.075Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default Shuffle;