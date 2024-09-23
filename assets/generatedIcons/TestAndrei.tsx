import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const TestAndrei = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'14'}
		height={height ? height:'14'}
		viewBox="0 0 14 14"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Rect
		width={width ? width:'14'}
		height={height ? height:'14'}
		rx="7"
		fill={fill ? fill:'#23C36D'}
		fillOpacity="0.16"/>
<Path
		d="M6.475 8.60191L9.12688 5.95004L8.59225 5.41541L6.475 7.53279L5.41538 6.47316L4.88075 7.00779L6.475 8.60191ZM7 11.7404C5.91858 11.4455 5.02325 10.809 4.314 9.83079C3.60467 8.85262 3.25 7.75904 3.25 6.55004V3.67316L7 2.26929L10.75 3.67316V6.55004C10.75 7.75904 10.3953 8.85262 9.686 9.83079C8.97675 10.809 8.08142 11.4455 7 11.7404ZM7 10.95C7.86667 10.675 8.58333 10.125 9.15 9.30004C9.71667 8.47504 10 7.55837 10 6.55004V4.18754L7 3.06729L4 4.18754V6.55004C4 7.55837 4.28333 8.47504 4.85 9.30004C5.41667 10.125 6.13333 10.675 7 10.95Z"
		fill={fill ? fill:'#23C36D'}/>
</Svg>

    )
}
export default TestAndrei;