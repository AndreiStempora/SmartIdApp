import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const BoldList = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'24'}
		height={height ? height:'24'}
		viewBox="0 0 24 24"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M19 16.6923V12.75H5V16.6923C5 16.7692 5.03208 16.8398 5.09625 16.9038C5.16025 16.9679 5.23075 17 5.30775 17H18.6923C18.7692 17 18.8398 16.9679 18.9038 16.9038C18.9679 16.8398 19 16.7692 19 16.6923ZM19 11.25V7.30775C19 7.23075 18.9679 7.16025 18.9038 7.09625C18.8398 7.03208 18.7692 7 18.6923 7H5.30775C5.23075 7 5.16025 7.03208 5.09625 7.09625C5.03208 7.16025 5 7.23075 5 7.30775V11.25H19ZM5.30775 18.5C4.80258 18.5 4.375 18.325 4.025 17.975C3.675 17.625 3.5 17.1974 3.5 16.6923V7.30775C3.5 6.80258 3.675 6.375 4.025 6.025C4.375 5.675 4.80258 5.5 5.30775 5.5H18.6923C19.1974 5.5 19.625 5.675 19.975 6.025C20.325 6.375 20.5 6.80258 20.5 7.30775V16.6923C20.5 17.1974 20.325 17.625 19.975 17.975C19.625 18.325 19.1974 18.5 18.6923 18.5H5.30775Z"
		fill={fill ? fill:'white'}/>
</Svg>

    )
}
export default BoldList;