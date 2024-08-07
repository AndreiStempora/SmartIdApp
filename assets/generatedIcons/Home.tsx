import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Home = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M6 19H9V15H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V17H11V21H4Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Home;