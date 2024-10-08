import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldTrash = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M9.4 16.1538L12 13.5538L14.6 16.1538L15.6538 15.1L13.0538 12.5L15.6538 9.90001L14.6 8.84626L12 11.4463L9.4 8.84626L8.34625 9.90001L10.9463 12.5L8.34625 15.1L9.4 16.1538ZM7.30775 20.5C6.80258 20.5 6.375 20.325 6.025 19.975C5.675 19.625 5.5 19.1974 5.5 18.6923V6.00001H4.5V4.50001H9V3.61551H15V4.50001H19.5V6.00001H18.5V18.6923C18.5 19.1974 18.325 19.625 17.975 19.975C17.625 20.325 17.1974 20.5 16.6923 20.5H7.30775ZM17 6.00001H7V18.6923C7 18.7693 7.03208 18.8398 7.09625 18.9038C7.16025 18.9679 7.23075 19 7.30775 19H16.6923C16.7692 19 16.8398 18.9679 16.9038 18.9038C16.9679 18.8398 17 18.7693 17 18.6923V6.00001Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldTrash;