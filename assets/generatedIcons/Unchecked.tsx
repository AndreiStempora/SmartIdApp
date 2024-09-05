import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Unchecked = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'25'}
		viewBox="0 0 24 25"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M5.6155 20.5C5.15517 20.5 4.77083 20.3458 4.4625 20.0375C4.15417 19.7292 4 19.3448 4 18.8845V6.1155C4 5.65517 4.15417 5.27083 4.4625 4.9625C4.77083 4.65417 5.15517 4.5 5.6155 4.5H18.3845C18.8448 4.5 19.2292 4.65417 19.5375 4.9625C19.8458 5.27083 20 5.65517 20 6.1155V18.8845C20 19.3448 19.8458 19.7292 19.5375 20.0375C19.2292 20.3458 18.8448 20.5 18.3845 20.5H5.6155ZM5.6155 19.5H18.3845C18.5385 19.5 18.6796 19.4359 18.8077 19.3077C18.9359 19.1796 19 19.0385 19 18.8845V6.1155C19 5.9615 18.9359 5.82042 18.8077 5.69225C18.6796 5.56408 18.5385 5.5 18.3845 5.5H5.6155C5.4615 5.5 5.32042 5.56408 5.19225 5.69225C5.06408 5.82042 5 5.9615 5 6.1155V18.8845C5 19.0385 5.06408 19.1796 5.19225 19.3077C5.32042 19.4359 5.4615 19.5 5.6155 19.5Z"
		fill={fill ? fill:'#D19D36'}/>
</Svg>

    )
}
export default Unchecked;