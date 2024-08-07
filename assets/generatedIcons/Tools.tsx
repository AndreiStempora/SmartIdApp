import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const Tools = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M18.9 21.0001L13.425 15.5251L15.525 13.4251L21 18.9001L18.9 21.0001ZM5.1 21.0001L3 18.9001L9.9 12.0001L8.2 10.3001L7.5 11.0001L6.225 9.7251V11.7751L5.525 12.4751L2.5 9.4501L3.2 8.7501H5.25L4 7.5001L7.55 3.9501C7.88333 3.61676 8.24167 3.3751 8.625 3.2251C9.00833 3.0751 9.4 3.0001 9.8 3.0001C10.2 3.0001 10.5917 3.0751 10.975 3.2251C11.3583 3.3751 11.7167 3.61676 12.05 3.9501L9.75 6.2501L11 7.5001L10.3 8.2001L12 9.9001L14.25 7.6501C14.1833 7.46676 14.1292 7.2751 14.0875 7.0751C14.0458 6.8751 14.025 6.6751 14.025 6.4751C14.025 5.49176 14.3625 4.6626 15.0375 3.9876C15.7125 3.3126 16.5417 2.9751 17.525 2.9751C17.775 2.9751 18.0125 3.0001 18.2375 3.0501C18.4625 3.1001 18.6917 3.1751 18.925 3.2751L16.45 5.7501L18.25 7.5501L20.725 5.0751C20.8417 5.30843 20.9208 5.5376 20.9625 5.7626C21.0042 5.9876 21.025 6.2251 21.025 6.4751C21.025 7.45843 20.6875 8.2876 20.0125 8.9626C19.3375 9.6376 18.5083 9.9751 17.525 9.9751C17.325 9.9751 17.125 9.95843 16.925 9.9251C16.725 9.89176 16.5333 9.83343 16.35 9.7501L5.1 21.0001Z"
		fill={fill ? fill:'#F8F9FA'}/>
</Svg>

    )
}
export default Tools;