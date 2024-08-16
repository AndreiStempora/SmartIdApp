import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from "react-native";
type Props = {
    width?: number|undefined;
    height?: number|undefined;
    stroke?: ColorValue|undefined;
    fill?: ColorValue|undefined;
}
const DataLow = ({width,height,stroke,fill}:Props) => {
    return (
        <Svg
		width={width ? width:'65'}
		height={height ? height:'64'}
		viewBox="0 0 65 64"
		fill="none"
		// @ts-ignore
		xmlns="http://www.w3.org/2000/svg">
<Path
		d="M32.5001 52.2051L4.29492 24C8.12399 20.6473 12.4231 18.0313 17.1923 16.1521C21.9616 14.2729 27.0641 13.3333 32.5001 13.3333C37.9394 13.3333 43.038 14.2729 47.7958 16.1521C52.5536 18.0313 56.8568 20.6473 60.7052 24L32.5001 52.2051ZM24.2214 40.7573C25.3827 39.9003 26.6662 39.2279 28.0719 38.7402C29.4775 38.2524 30.9536 38.0085 32.5001 38.0085C34.0465 38.0085 35.5226 38.2524 36.9283 38.7402C38.3339 39.2279 39.6174 39.9003 40.7787 40.7573L57.3275 24.2085C53.7308 21.4792 49.8485 19.3604 45.6804 17.8521C41.5123 16.3439 37.1189 15.5897 32.5001 15.5897C27.8813 15.5897 23.4878 16.3439 19.3197 17.8521C15.1516 19.3604 11.2693 21.4792 7.67266 24.2085L24.2214 40.7573Z"
		fill={fill ? fill:'#FF4646'}/>
</Svg>

    )
}
export default DataLow;